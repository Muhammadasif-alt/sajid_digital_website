import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import sharp from 'sharp';

/**
 * Streams an image that lives in the database as a base64 data URI.
 *
 * Responses are immutable — the caller passes ?v=<updatedAt>, so a replaced
 * image gets a new URL and the old cache entry is simply never requested again.
 * ?w=<px> resizes on the way out, so a 300px-wide card doesn't pull a 1280px file.
 */

const SOURCES: Record<string, { model: string; field: string }> = {
  service: { model: 'service', field: 'featuredImage' },
  job: { model: 'job', field: 'featuredImage' },
  blog: { model: 'blog', field: 'featuredImage' },
  announcement: { model: 'announcement', field: 'featuredImage' },
  course: { model: 'course', field: 'featuredImage' },
  partner: { model: 'partner', field: 'logo' },
  gallery: { model: 'galleryItem', field: 'image' },
  team: { model: 'teamMember', field: 'photo' },
  testimonial: { model: 'testimonial', field: 'avatar' },
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  try {
    const { type, id } = await params;
    const source = SOURCES[type];
    if (!source) return new NextResponse('Unknown image type', { status: 404 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const model = (db as any)[source.model];
    const row = await model.findUnique({ where: { id }, select: { [source.field]: true } });
    const value: string | null = row?.[source.field] ?? null;

    if (!value) return new NextResponse('Not found', { status: 404 });
    if (!value.startsWith('data:')) return NextResponse.redirect(new URL(value, request.url));

    const match = value.match(/^data:([^;]+);base64,(.*)$/s);
    if (!match) return new NextResponse('Not an image', { status: 404 });

    let contentType = match[1];
    let bytes = Buffer.from(match[2], 'base64');

    const width = parseInt(new URL(request.url).searchParams.get('w') || '0', 10);
    if (width > 0 && width <= 2000) {
      bytes = await sharp(bytes)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 74 })
        .toBuffer();
      contentType = 'image/webp';
    }

    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(bytes.length),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new NextResponse('Failed to load image', { status: 500 });
  }
}
