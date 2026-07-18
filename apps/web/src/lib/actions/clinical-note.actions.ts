'use server';
import { db } from '@/lib/db';
import { requireRole } from '@/lib/rbac';
import { clinicalNoteDraftSchema, clinicalNoteSignSchema } from '@/lib/validations/clinical-note';
import { revalidatePath } from 'next/cache';

export async function saveNoteDraft(appointmentId: string, input: unknown) {
  await requireRole(['PROVIDER', 'NURSE']);
  const data = clinicalNoteDraftSchema.parse(input);
  return db.clinicalNote.upsert({
    where: { appointmentId },
    create: { appointmentId, ...data },
    update: data,
  });
}

export async function signNote(appointmentId: string, input: unknown) {
  const session = await requireRole(['PROVIDER']);
  const data = clinicalNoteSignSchema.parse(input);
  const note = await db.clinicalNote.update({
    where: { appointmentId },
    data: { ...data, signedAt: new Date(), signedById: session.user.id },
    include: { appointment: true },
  });
  revalidatePath(`/patients/${note.appointment.patientId}`);
  return note;
}
