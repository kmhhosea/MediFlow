import { db } from '@/lib/db';
import { scoped } from './tenant-scope';

export function getAppointmentsForWeek(weekStartISO?: string) {
  const weekStart = weekStartISO ? new Date(weekStartISO) : new Date();
  const weekEnd = new Date(weekStart.getTime() + 7 * 86_400_000);
  return scoped((clinicId) => db.appointment.findMany({
    where: { clinicId, startsAt: { gte: weekStart, lte: weekEnd } },
    include: { patient: true, staff: { include: { user: true } } },
    orderBy: { startsAt: 'asc' },
  }));
}