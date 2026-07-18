'use server';
import { db } from '@/lib/db';
import { patientSchema } from '@/lib/validations/patient';
import { requireRole } from '@/lib/rbac';
import { logAudit } from '@/lib/audit';
import { revalidatePath } from 'next/cache';
import { syncPatientToSearch } from '@/lib/search/sync-patient';
import { getPatients, getPatientById } from '@/lib/data/patients';

export async function createPatient(input: unknown) {
  const session = await requireRole(['ADMIN', 'PROVIDER', 'FRONT_DESK']);
  const data = patientSchema.parse(input);
  const patient = await db.patient.create({ data: { ...data, clinicId: session.user.clinicId } });
  await logAudit(session, 'CREATE', 'Patient', patient.id);
  await syncPatientToSearch(patient);
  revalidatePath('/patients');
  return patient;
}

export async function updatePatient(id: string, input: unknown) {
  const session = await requireRole(['ADMIN', 'PROVIDER', 'FRONT_DESK']);
  const data = patientSchema.parse(input);
  const patient = await db.patient.update({ where: { id }, data });
  await logAudit(session, 'UPDATE', 'Patient', id);
  await syncPatientToSearch(patient);
  revalidatePath(`/patients/${id}`);
  return patient;
}

export async function archivePatient(id: string) {
  const session = await requireRole(['ADMIN']);
  const patient = await db.patient.update({ where: { id }, data: { status: 'ARCHIVED' } });
  await logAudit(session, 'ARCHIVE', 'Patient', id);
  revalidatePath('/patients');
  return patient;
}

// Thin read wrappers so client components/hooks (which cannot call next/headers-based data-access functions directly) can fetch through a Server Action instead.
export async function getPatientsAction(query: string, page = 1) {
  return getPatients(query, page);
}

export async function getPatientByIdAction(id: string) {
  return getPatientById(id);
}
