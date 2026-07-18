import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10),
});

export const signUpSchema = signInSchema.extend({
  name: z.string().min(2),
  clinicName: z.string().min(2),
});
