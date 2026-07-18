import { z } from 'zod';

export const bookAppointmentSchema = z.object({
  slotId: z.string(),
  patientId: z.string(),
  staffId: z.string(),
  locationId: z.string(),
  startsAt: z.coerce.date(),
  durationMinutes: z.number().int().positive().default(30),
  visitType: z.enum(['IN_PERSON', 'TELEHEALTH']),
  reason: z.string().optional(),
}).refine((d) => d.startsAt > new Date(), { message: 'Cannot book an appointment in the past' }).transform((d) => ({
  ...d,
  endsAt: new Date(d.startsAt.getTime() + d.durationMinutes * 60_000),
}));
