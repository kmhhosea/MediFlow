import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function getCurrentSession() {
  return auth.api.getSession({ headers: await headers() });
}

export async function getCurrentClinicId() {
  const session = await getCurrentSession();
  return session?.user.clinicId ?? null;
}

export async function requirePatientSession() {
  const session = await getCurrentSession();
  if (!session) redirect('/sign-in');
  const patient = await db.patient.findFirst({ where: { email: session.user.email } });
  if (!patient) redirect('/sign-in');
  return { session, patient };
}
