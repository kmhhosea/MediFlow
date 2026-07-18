'use server';
import { db } from '@/lib/db';
import { requireRole } from '@/lib/rbac';
import { logAudit } from '@/lib/audit';
import { prescriptionSchema } from '@/lib/validations/prescription';

export async function createPrescription(input: unknown, clinicalNoteId: string, patientId: string) {
  const session = await requireRole(['PROVIDER']);
  const data = prescriptionSchema.parse(input);
  const activeConflict = await db.prescription.findFirst({
    where: { patientId, status: 'ACTIVE', drugName: data.drugName },
  });
  if (activeConflict) {
    throw new Error(`Patient already has an active prescription for ${data.drugName}`);
  }
  const rx = await db.prescription.create({ data: { ...data, clinicalNoteId, patientId } });
  await logAudit(session, 'PRESCRIBE', 'Prescription', rx.id);
  return rx;
}
