import { z } from 'zod';

export const prescriptionSchema = z.object({
  drugName: z.string().min(1),
  dosage: z.string().min(1),
  frequency: z.string().min(1),
  quantity: z.coerce.number().int().positive(),
  refills: z.coerce.number().int().min(0).max(5),
});
