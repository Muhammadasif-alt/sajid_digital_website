import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession } from '@/lib/auth';

const categorySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  icon: z.string().optional(),
  description: z.string().optional(),
});

export async function GET() {
  try {
    const [categories, industries] = await Promise.all([
      db.jobCategory.findMany({ orderBy: { name: 'asc' }, include: { _count: { select: { jobs: true } } } }),
      db.industry.findMany({ orderBy: { name: 'asc' } }),
    ]);
    return NextResponse.json({ categories, industries });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    const { type, ...data } = body;

    if (type === 'industry') {
      const validated = categorySchema.parse(data);
      const slug = validated.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const industry = await db.industry.create({ data: { ...validated, slug } });
      return NextResponse.json({ industry }, { status: 201 });
    } else {
      const validated = categorySchema.parse(data);
      const slug = validated.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const category = await db.jobCategory.create({ data: { ...validated, slug } });
      return NextResponse.json({ category }, { status: 201 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}