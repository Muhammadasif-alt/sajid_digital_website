import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession } from '@/lib/auth';

const updateSchema = z.object({
  title: z.string().min(3).optional(),
  organization: z.string().min(2).optional(),
  sector: z.string().optional(),
  location: z.string().optional(),
  description: z.string().min(10).optional(),
  details: z.string().min(10).optional(),
  officialLink: z.string().nullable().optional(),
  featuredImage: z.string().min(1).optional(),
  whatsapp: z.string().nullable().optional(),
  lastDate: z.string().nullable().optional(),
  status: z.enum(['draft', 'published', 'closed']).optional(),
  isFeatured: z.boolean().optional(),
});

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const announcement = await db.announcement.findUnique({ where: { id } });
    if (!announcement) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ announcement });
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
    const { lastDate, ...rest } = updateSchema.parse(body);
    const announcement = await db.announcement.update({
      where: { id },
      data: { ...rest, ...(lastDate !== undefined ? { lastDate: lastDate ? new Date(lastDate) : null } : {}) },
    });
    return NextResponse.json({ announcement });
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
    await db.announcement.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
