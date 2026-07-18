import { z } from 'zod';

export const patientSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  dob: z.coerce.date().max(new Date()),
  sex: z.enum(['male', 'female', 'other']),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  insuranceProvider: z.string().optional(),
  insuranceMemberId: z.string().optional(),
});
