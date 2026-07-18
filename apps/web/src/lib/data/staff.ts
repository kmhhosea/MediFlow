import { db } from '@/lib/db';
import { scoped } from './tenant-scope';

export function getStaffForClinic() {
  return scoped((clinicId) => db.staffMember.findMany({ where: { clinicId }, include: { user: true } } ));
}

export function getStaffById(id: string) {
  return scoped((clinicId) => db.staffMember.findFirstOrThrow({ where: { id, clinicId }, include: { user: true } }));
}
