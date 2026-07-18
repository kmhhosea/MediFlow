import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export class ForbiddenError extends Error {}

export async function requireRole(allowed: string[]) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || !allowed.includes(session.user.role)) {
    throw new ForbiddenError('Insufficient permissions');
  }
  return session;
}
