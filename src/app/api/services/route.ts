import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession } from '@/lib/auth';

const schema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  details: z.string().optional(),
  eligibility: z.string().optional().default('Disabled persons & Govt employees'),
  icon: z.string().optional(),
  featuredImage: z.string().min(1, 'Banner image is required'),
  whatsapp: z.string().optional(),
  isFree: z.boolean().optional().default(true),
  status: z.enum(['draft', 'published', 'closed']).optional().default('draft'),
  isFeatured: z.boolean().optional().default(false),
  sortOrder: z.number().optional().default(0),
});

function makeSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'service';
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    const where: Record<string, unknown> = {};
    if (status) where.status = status;

    const services = await db.service.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { isFeatured: 'desc' }, { createdAt: 'desc' }],
      take: limit,
    });
    return NextResponse.json({ services });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    const data = schema.parse(body);
    const base = makeSlug(data.title);
    const existing = await db.service.findUnique({ where: { slug: base } });
    const slug = existing ? `${base}-${Math.random().toString(36).slice(2, 7)}` : base;

    const service = await db.service.create({ data: { ...data, slug } });
    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
