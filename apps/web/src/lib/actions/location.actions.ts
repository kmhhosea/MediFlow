'use server';
import { db } from '@/lib/db';
import { requireRole } from '@/lib/rbac';
import { revalidatePath } from 'next/cache';
import { locationSchema } from '@/lib/validations/clinic';
import { getCurrentClinicId } from '@/lib/auth-context';

export async function createLocation(input: unknown) {
  await requireRole(['ADMIN']);
  const data = locationSchema.parse(input);
  const location = await db.location.create({ data: { ...data, clinicId: await getCurrentClinicId() } });
  revalidatePath('/settings/locations');
  return location;
}

export async function updateLocation(id: string, input: unknown) {
  await requireRole(['ADMIN']);
  const data = locationSchema.parse(input);
  const location = await db.location.update({ where: { id }, data });
  revalidatePath('/settings/locations');
  return location;
}

export async function deleteLocation(id: string) {
  await requireRole(['ADMIN']);
  const future = await db.appointment.count({ where: { locationId: id, startsAt: { gte: new Date() } } });
  if (future > 0) throw new Error('Cannot delete a location with upcoming appointments');
  await db.location.delete({ where: { id } });
  revalidatePath('/settings/locations');
}
