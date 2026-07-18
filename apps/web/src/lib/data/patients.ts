import { db } from '@/lib/db';
import { scoped } from './tenant-scope';

export function getPatients(query: string, page = 1) {
  return scoped((clinicId) => db.patient.findMany({
    where: { clinicId, status: 'ACTIVE', OR: [
      { firstName: { contains: query, mode: 'insensitive' } },
      { lastName: { contains: query, mode: 'insensitive' } },
    ] },
    take: 25,
    skip: (page - 1) * 25,
  }));
}

export function getPatientById(id: string) {
  return scoped((clinicId) => db.patient.findFirstOrThrow({
    where: { id, clinicId },
    include: {
      appointments: { orderBy: { startsAt: 'desc' }, take: 10 },
      documents: { orderBy: { createdAt: 'desc' }, take: 10 },
    },
  }));
}

export async function getPatientTimeline(id: string) {
  const [appointments, notes, prescriptions, labResults] = await Promise.all([
    db.appointment.findMany({ where: { patientId: id } }),
    db.clinicalNote.findMany({ where: { appointment: { patientId: id } } }),
    db.prescription.findMany({ where: { patientId: id } }),
    db.labResult.findMany({ where: { patientId: id } }),
  ]);
  return [...appointments, ...notes, ...prescriptions, ...labResults].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
