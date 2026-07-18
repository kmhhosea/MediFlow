import { z } from 'zod';

export const updateClinicSchema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
  address: z.string().optional(),
  timezone: z.string(),
});

export const locationSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  timezone: z.string().default('America/New_York'),
});
