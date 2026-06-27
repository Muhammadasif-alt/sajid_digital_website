import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const settings = await db.setting.findMany();
    const stats: Record<string, string> = {};
    settings.forEach((s) => { stats[s.key] = s.value; });
    return NextResponse.json({ stats, settings });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { settings }: { settings: { key: string; value: string }[] } = await request.json();
    const results = await Promise.all(
      settings.map(({ key, value }) =>
        db.setting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        })
      )
    );
    return NextResponse.json({ success: true, settings: results });
  } catch {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}