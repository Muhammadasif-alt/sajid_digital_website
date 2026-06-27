import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const settings = await db.setting.findMany();
    const stats: Record<string, string> = {};
    settings.forEach((s) => {
      stats[s.key] = s.value;
    });
    return NextResponse.json({ stats });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}