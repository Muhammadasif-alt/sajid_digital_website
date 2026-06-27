import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession } from '@/lib/auth';

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  title: z.string().min(2).optional(),
  company: z.string().min(2).optional(),
  content: z.string().min(10).optional(),
  rating: z.number().min(1).max(5).optional(),
  isFeatured: z.boolean().optional(),
  avatar: z.string().nullable().optional(),
});

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = updateSchema.parse(body);
    const testimonial = await db.testimonial.update({ where: { id }, data: validated });
    return NextResponse.json({ testimonial });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await params;
    await db.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}