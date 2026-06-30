import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactData = z.infer<typeof contactSchema>;

// Defaults so the owner only has to set the secret API keys in Vercel.
const WHATSAPP_PHONE = process.env.CALLMEBOT_PHONE || '923157033832';
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'sajaddigitalservices@gmail.com';
const NOTIFY_FROM = process.env.NOTIFY_FROM || 'Sajad Digital <onboarding@resend.dev>';

/**
 * Best-effort notifications. Never throws — a notification failure must not
 * break the visitor's form submission (the message is already saved in the DB).
 */
async function notify(data: ContactData) {
  const lines = [
    '📩 New Contact Message — Sajad Digital Services',
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : '',
    `Subject: ${data.subject}`,
    '',
    data.message,
  ].filter(Boolean);
  const text = lines.join('\n');

  const tasks: Promise<unknown>[] = [];

  // --- WhatsApp via CallMeBot (free) ---
  if (process.env.CALLMEBOT_APIKEY) {
    const url =
      `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(WHATSAPP_PHONE)}` +
      `&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(process.env.CALLMEBOT_APIKEY)}`;
    tasks.push(fetch(url).catch(() => {}));
  }

  // --- Email via Resend (free) ---
  if (process.env.RESEND_API_KEY) {
    tasks.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: NOTIFY_FROM,
          to: NOTIFY_EMAIL,
          reply_to: data.email,
          subject: `New contact message: ${data.subject}`,
          html: `
            <div style="font-family:Arial,sans-serif;font-size:14px;color:#0B1B2E">
              <h2 style="color:#9B6A16">📩 New Contact Message</h2>
              <p><b>Name:</b> ${data.name}</p>
              <p><b>Email:</b> ${data.email}</p>
              ${data.phone ? `<p><b>Phone:</b> ${data.phone}</p>` : ''}
              <p><b>Subject:</b> ${data.subject}</p>
              <p><b>Message:</b></p>
              <p style="white-space:pre-line;background:#f5f5f5;padding:12px;border-radius:8px">${data.message}</p>
            </div>`,
        }),
      }).catch(() => {})
    );
  }

  if (tasks.length) await Promise.allSettled(tasks);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = contactSchema.parse(body);

    // 1) Always save first — this is the source of truth (admin Messages tab).
    await db.message.create({ data: validated });

    // 2) Then fire notifications (best-effort, never fatal).
    await notify(validated);

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}