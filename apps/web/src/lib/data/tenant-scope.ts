import { getCurrentClinicId } from '@/lib/auth-context';

export async function scoped<T>(query: (clinicId: string) => Promise<T>): Promise<T> {
  const clinicId = await getCurrentClinicId();
  if (!clinicId) throw new Error('No active clinic in session');
  return query(clinicId);
}
