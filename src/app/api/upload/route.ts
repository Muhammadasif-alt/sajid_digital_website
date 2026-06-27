import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { getSession } from '@/lib/auth';

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

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
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
    const safeName = `banner_${Date.now()}_${Math.round(Math.random() * 1e6)}.${ext}`;
    await writeFile(path.join(uploadDir, safeName), buffer);

    return NextResponse.json({ url: `/uploads/${safeName}` });
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
