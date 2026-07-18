'use server';
import { db } from '@/lib/db';
import { scribeQueue } from '@/lib/queue/scribe-queue';

export async function endVisit(id: string) {
  await db.appointment.update({ where: { id }, data: { status: 'COMPLETED' } });
  await scribeQueue.add('finalize-note', { appointmentId: id });
}
