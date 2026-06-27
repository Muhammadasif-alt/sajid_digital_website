import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession } from '@/lib/auth';

const blogCatSchema = z.object({
  name: z.string().min(2, 'Name is required'),
});

export async function GET() {
  try {
    const blogCategories = await db.blogCategory.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { blogs: true } } },
    });
    return NextResponse.json({ blogCategories });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch blog categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    const validated = blogCatSchema.parse(body);
    const slug = validated.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const blogCategory = await db.blogCategory.create({ data: { ...validated, slug } });
    return NextResponse.json({ blogCategory }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}