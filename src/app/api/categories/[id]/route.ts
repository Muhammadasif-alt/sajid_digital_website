import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession } from '@/lib/auth';

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  icon: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
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
    const { type } = body;

    if (type === 'industry') {
      const industry = await db.industry.update({ where: { id }, data: validated });
      return NextResponse.json({ industry });
    } else {
      const category = await db.jobCategory.update({ where: { id }, data: validated });
      return NextResponse.json({ category });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
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
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'category';

    if (type === 'industry') {
      await db.industry.delete({ where: { id } });
    } else {
      await db.jobCategory.delete({ where: { id } });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}