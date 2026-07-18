'use server';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';
import { signUpSchema } from '@/lib/validations/auth';

function slugify(name: string) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export async function onboardClinic(input: unknown) {
  const data = signUpSchema.parse(input);
  const { user } = await auth.api.signUpEmail({ body: { email: data.email, password: data.password, name: data.name } });
  return db.$transaction(async (tx) => {
    const clinic = await tx.clinic.create({ data: { name: data.clinicName, slug: slugify(data.clinicName) } });
    const location = await tx.location.create({ data: { clinicId: clinic.id, name: 'Main Location', address: '' } });
    await tx.staffMember.create({ data: { userId: user.id, clinicId: clinic.id, role: 'ADMIN' } });
    return clinic;
  });
}

