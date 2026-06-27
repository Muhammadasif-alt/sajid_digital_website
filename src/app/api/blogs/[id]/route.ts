import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession } from '@/lib/auth';

const blogUpdateSchema = z.object({
  title: z.string().min(3).optional(),
  excerpt: z.string().optional(),
  content: z.string().min(10).optional(),
  categoryId: z.string().nullable().optional(),
  author: z.string().optional(),
  tags: z.string().nullable().optional(),
  status: z.enum(['draft', 'published']).optional(),
  featuredImage: z.string().nullable().optional(),
  seoTitle: z.string().nullable().optional(),
  seoDescription: z.string().nullable().optional(),
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
    const validated = blogUpdateSchema.parse(body);

    const blog = await db.blog.update({
      where: { id },
      data: validated,
      include: { category: true },
    });

    return NextResponse.json({ blog });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
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
    await db.blog.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}