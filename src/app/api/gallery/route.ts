import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession } from '@/lib/auth';

const schema = z.object({
  title: z.string().min(2, 'Title is required'),
  image: z.string().min(1, 'Image is required'),
  caption: z.string().optional().nullable(),
  status: z.enum(['draft', 'published']).optional().default('published'),
  sortOrder: z.number().optional().default(0),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '100');
    const where: Record<string, unknown> = {};
    if (status) where.status = status;

    const items = await db.galleryItem.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      take: limit,
    });
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const data = schema.parse(await request.json());
    const item = await db.galleryItem.create({ data });
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 });
  }
}
