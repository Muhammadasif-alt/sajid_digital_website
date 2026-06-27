import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const messages = await db.message.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (id) {
      await db.message.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }
    await db.message.deleteMany();
    return NextResponse.json({ success: true, deleted: 'all' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete messages' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id, isRead } = await request.json();
    await db.message.update({ where: { id }, data: { isRead } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}