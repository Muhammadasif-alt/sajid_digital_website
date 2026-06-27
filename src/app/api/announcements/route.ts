import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession } from '@/lib/auth';

const schema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  organization: z.string().min(2, 'Organization is required'),
  sector: z.string().optional().default('Government'),
  location: z.string().optional().default('Pakistan'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  details: z.string().min(10, 'Details are required'),
  officialLink: z.string().optional(),
  featuredImage: z.string().min(1, 'Banner image is required'),
  whatsapp: z.string().optional(),
  lastDate: z.string().optional(),
  status: z.enum(['draft', 'published', 'closed']).optional().default('draft'),
  isFeatured: z.boolean().optional().default(false),
});

function makeSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'announcement';
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const sector = searchParams.get('sector');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (sector) where.sector = sector;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { organization: { contains: search } },
        { location: { contains: search } },
      ];
    }

    const announcements = await db.announcement.findMany({
      where,
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
      take: limit,
    });
    return NextResponse.json({ announcements });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch announcements' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    const data = schema.parse(body);
    const base = makeSlug(data.title);
    const existing = await db.announcement.findUnique({ where: { slug: base } });
    const slug = existing ? `${base}-${Math.random().toString(36).slice(2, 7)}` : base;

    const announcement = await db.announcement.create({
      data: { ...data, slug, lastDate: data.lastDate ? new Date(data.lastDate) : undefined },
    });
    return NextResponse.json({ announcement }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create announcement' }, { status: 500 });
  }
}
