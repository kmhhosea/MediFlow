import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest, { params }: { params: Promise<{ appointmentId: string }> }) {
  const { appointmentId } = await params;
  const { transcript } = await req.json();
  await db.visitTranscript.upsert({ where: { appointmentId }, create: { appointmentId, text: transcript }, update: { text: transcript } });
  return NextResponse.json({ ok: true });
}
