import { db } from '@/lib/db';

export async function getStoredTranscript(appointmentId: string) {
  const row = await db.visitTranscript.findUnique({ where: { appointmentId } });
  if (!row) throw new Error(`No transcript found for appointment ${appointmentId}`);
  return row.text;
}
