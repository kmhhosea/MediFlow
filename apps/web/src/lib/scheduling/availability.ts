import { db } from '@/lib/db';

export async function getAvailableSlots(staffId: string, from: Date, to: Date) {
  const slots = await db.availabilitySlot.findMany({
    where: { staffId, isBooked: false, startsAt: { gte: from, lte: to } },
    orderBy: { startsAt: 'asc' },
  });
  return slots;
}
