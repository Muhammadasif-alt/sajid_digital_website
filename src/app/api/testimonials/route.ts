import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession } from '@/lib/auth';

const testimonialSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  title: z.string().min(2, 'Title is required'),
  company: z.string().min(2, 'Company is required'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  rating: z.number().min(1).max(5).optional().default(5),
  isFeatured: z.boolean().optional().default(false),
  avatar: z.string().optional(),
});

export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
    });
    return NextResponse.json({ testimonials });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    const validated = testimonialSchema.parse(body);
    const testimonial = await db.testimonial.create({ data: validated });
    return NextResponse.json({ testimonial }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}