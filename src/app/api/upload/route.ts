import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { getSession } from '@/lib/auth';

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB (raw upload)

// Vercel (and most serverless hosts) have a READ-ONLY filesystem, so we cannot
// write uploaded files to disk. Instead we compress the image with sharp and
// return it as a base64 data URI, which is stored directly in the database
// (logo / featuredImage are @db.Text columns). This works everywhere.
export async function POST(request: Request) {
  // Only logged-in admins can upload.
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'Image must be under 5 MB' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const input = Buffer.from(bytes);

    // Resize down to a sane max width and re-encode as WebP to keep the data
    // URI small (typically 30-150 KB) so DB rows and API responses stay light.
    const output = await sharp(input)
      .rotate() // respect EXIF orientation
      .resize({ width: 1280, height: 1280, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 78 })
      .toBuffer();

    const url = `data:image/webp;base64,${output.toString('base64')}`;
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ error: 'Upload failed. Please try a different image.' }, { status: 500 });
  }
}