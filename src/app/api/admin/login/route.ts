import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createSessionToken, setSessionCookie } from '@/lib/auth';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(1, 'Password required'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    const admin = await db.admin.findUnique({ where: { email: email.toLowerCase() } });
    if (!admin) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = await createSessionToken({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });
    await setSessionCookie(token);

    return NextResponse.json({
      user: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
