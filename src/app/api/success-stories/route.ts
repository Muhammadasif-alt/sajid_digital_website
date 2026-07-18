import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession } from '@/lib/auth';
import { imageUrl } from '@/lib/image-url';

const schema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image: z.string().optional().nullable(),
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

    const stories = await db.successStory.findMany({
      where,
      // Admin-controlled order first; newest wins when two share a number.
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      take: limit,
    });

    return NextResponse.json({
      stories: stories.map((s) => ({
        ...s,
        image: imageUrl('successStory', s.id, s.image, s.updatedAt, 800),
      })),
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch success stories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const data = schema.parse(await request.json());

    // No explicit order? Append to the end instead of jumping to the top.
    let sortOrder = data.sortOrder;
    if (!sortOrder) {
      const last = await db.successStory.findFirst({ orderBy: { sortOrder: 'desc' }, select: { sortOrder: true } });
      sortOrder = (last?.sortOrder ?? 0) + 1;
    }

    const story = await db.successStory.create({ data: { ...data, sortOrder } });
    return NextResponse.json({ story }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create success story' }, { status: 500 });
  }
}
