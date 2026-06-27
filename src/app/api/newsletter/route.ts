import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const newsletters = await db.newsletter.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ newsletters });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch newsletters' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (id) {
      await db.newsletter.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }
    await db.newsletter.deleteMany();
    return NextResponse.json({ success: true, deleted: 'all' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}