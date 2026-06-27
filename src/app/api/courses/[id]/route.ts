import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession } from '@/lib/auth';

const updateSchema = z.object({
  title: z.string().min(3).optional(),
  category: z.string().optional(),
  description: z.string().min(10).optional(),
  details: z.string().min(10).optional(),
  price: z.number().nullable().optional(),
  currency: z.string().optional(),
  discountPrice: z.number().nullable().optional(),
  duration: z.string().nullable().optional(),
  level: z.string().optional(),
  featuredImage: z.string().min(1).optional(),
  whatsapp: z.string().nullable().optional(),
  status: z.enum(['draft', 'published', 'closed']).optional(),
  isFeatured: z.boolean().optional(),
});

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const course = await db.course.findUnique({ where: { id } });
    if (!course) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ course });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await params;
    const body = await request.json();
    const data = updateSchema.parse(body);
    const course = await db.course.update({ where: { id }, data });
    return NextResponse.json({ course });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await params;
    await db.course.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
