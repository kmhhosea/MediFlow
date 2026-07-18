'use server';
import { db } from '@/lib/db';
import { requireRole } from '@/lib/rbac';

interface WeeklyHours {
  [weekday: number]: { start: string; end: string } | null;
}

export async function generateAvailability(staffId: string, hours: WeeklyHours) {
  await requireRole(['ADMIN', 'PROVIDER']);
  const slots: { staffId: string; startsAt: Date; endsAt: Date }[] = [];
  const today = new Date();
  for (let day = 0; day < 56; day++) {
    const date = new Date(today.getTime() + day * 86_400_000);
    const window = hours[date.getDay()];
    if (!window) continue;
    const [startH, startM] = window.start.split(':').map(Number);
    const [endH, endM] = window.end.split(':').map(Number);
    let cursor = new Date(date.setHours(startH, startM, 0, 0));
    const end = new Date(date.setHours(endH, endM, 0, 0));
    while (cursor < end) {
      const slotEnd = new Date(cursor.getTime() + 30 * 60_000);
      slots.push({ staffId, startsAt: new Date(cursor), endsAt: slotEnd });
      cursor = slotEnd;
    }
  }
  return db.availabilitySlot.createMany({ data: slots, skipDuplicates: true });
}
