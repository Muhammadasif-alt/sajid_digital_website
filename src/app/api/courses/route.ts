import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession } from '@/lib/auth';

const schema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  category: z.string().optional().default('General'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  details: z.string().min(10, 'Details are required'),
  price: z.number().optional(),
  currency: z.string().optional().default('PKR'),
  discountPrice: z.number().optional(),
  duration: z.string().optional(),
  level: z.string().optional().default('Beginner'),
  featuredImage: z.string().min(1, 'Banner image is required'),
  whatsapp: z.string().min(5, 'WhatsApp number is required'),
  status: z.enum(['draft', 'published', 'closed']).optional().default('draft'),
  isFeatured: z.boolean().optional().default(false),
});

function makeSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'course';
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { category: { contains: search } },
      ];
    }

    const courses = await db.course.findMany({
      where,
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
      take: limit,
    });
    return NextResponse.json({ courses });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    const data = schema.parse(body);
    const base = makeSlug(data.title);
    const existing = await db.course.findUnique({ where: { slug: base } });
    const slug = existing ? `${base}-${Math.random().toString(36).slice(2, 7)}` : base;

    const course = await db.course.create({ data: { ...data, slug } });
    return NextResponse.json({ course }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}
