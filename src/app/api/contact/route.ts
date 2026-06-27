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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = contactSchema.parse(body);

    await db.message.create({
      data: validated,
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}