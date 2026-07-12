import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession } from '@/lib/auth';
import { imageUrl } from '@/lib/image-url';

const jobCreateSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  responsibilities: z.string().optional().default(''),
  requirements: z.string().optional().default(''),
  benefits: z.string().optional(),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
  currency: z.string().optional().default('USD'),
  whatsapp: z.string().min(5, 'WhatsApp number is required'),
  featuredImage: z.string().min(1, 'Banner image is required'),
  location: z.string().min(2, 'Location is required'),
  city: z.string().optional(),
  employmentType: z.string().optional().default('Full-time'),
  department: z.string().optional().default('General'),
  experience: z.string().optional().default('Mid-level'),
  education: z.string().optional().default("Bachelor's"),
  workMode: z.string().optional().default('On-site'),
  deadline: z.string().optional(),
  status: z.enum(['draft', 'published', 'closed']).optional().default('draft'),
  isFeatured: z.boolean().optional().default(false),
  categoryId: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const experience = searchParams.get('experience');
    const workMode = searchParams.get('workMode');
    const location = searchParams.get('location');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '12');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }
    if (featured === 'true') where.isFeatured = true;
    if (category) where.categoryId = category;
    if (experience) where.experience = experience;
    if (workMode) where.workMode = workMode;
    if (location) where.location = { contains: location };

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { location: { contains: search } },
        { department: { contains: search } },
      ];
    }

    const [jobs, total] = await Promise.all([
      db.job.findMany({
        where,
        include: { category: true, _count: { select: { applications: true } } },
        orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
      }),
      db.job.count({ where }),
    ]);

    return NextResponse.json({
      jobs: jobs.map((j) => ({
        ...j,
        featuredImage: imageUrl('job', j.id, j.featuredImage, j.updatedAt, 700),
      })),
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validated = jobCreateSchema.parse(body);

    const baseSlug =
      validated.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || 'job';
    // Ensure the slug is unique (titles can repeat).
    const existing = await db.job.findUnique({ where: { slug: baseSlug } });
    const slug = existing
      ? `${baseSlug}-${Math.random().toString(36).slice(2, 7)}`
      : baseSlug;

    const job = await db.job.create({
      data: {
        ...validated,
        slug,
        deadline: validated.deadline ? new Date(validated.deadline) : undefined,
      },
      include: { category: true },
    });

    return NextResponse.json({ job }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}