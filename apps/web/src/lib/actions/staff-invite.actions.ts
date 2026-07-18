'use server';
import { requireRole } from '@/lib/rbac';
import { db } from '@/lib/db';
import { sendStaffInviteEmail } from '@/lib/email/send';
import { auth } from '@/lib/auth';
import { randomBytes } from 'crypto';

export async function inviteStaffMember(input: { email: string; role: string }) {
  const session = await requireRole(['ADMIN']);
  const token = randomBytes(24).toString('hex');
  const invite = await db.staffInvite.create({ data: { clinicId: session.user.clinicId, email: input.email, role: input.role as any, token, expiresAt: new Date(Date.now() + 7 * 86400_000) } });
  await sendStaffInviteEmail(input.email, token);
  return invite;
}

export async function acceptStaffInvite(token: string, input: { name: string; password: string }) {
  const invite = await db.staffInvite.findUniqueOrThrow({ where: { token } });
  if (invite.expiresAt < new Date()) throw new Error('This invitation has expired');
  if (invite.acceptedAt) throw new Error('This invitation was already accepted');
  const { user } = await auth.api.signUpEmail({ body: { email: invite.email, password: input.password, name: input.name } });
  return db.$transaction([
    db.staffMember.create({ data: { userId: user.id, clinicId: invite.clinicId, role: invite.role } }),
    db.staffInvite.update({ where: { token }, data: { acceptedAt: new Date() } }),
  ]);
}
