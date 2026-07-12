import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession } from '@/lib/auth';
import { imageUrl } from '@/lib/image-url';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  type: z.enum(['Partner', 'MoU']).optional().default('Partner'),
  logo: z.string().min(1, 'Logo image is required'),
  website: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.enum(['draft', 'published']).optional().default('published'),
  sortOrder: z.number().optional().default(0),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '100');

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (type) where.type = type;

    const partners = await db.partner.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      take: limit,
    });
    return NextResponse.json({
      partners: partners.map((p) => ({
        ...p,
        logo: imageUrl('partner', p.id, p.logo, p.updatedAt, 500),
      })),
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    const data = schema.parse(body);
    const partner = await db.partner.create({ data });
    return NextResponse.json({ partner }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
  }
}