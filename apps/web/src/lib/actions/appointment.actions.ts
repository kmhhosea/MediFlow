'use server';
import { db } from '@/lib/db';
import { bookAppointmentSchema } from '@/lib/validations/appointment';
import { reminderQueue } from '@/lib/queue/reminder-queue';
import { getCurrentClinicId } from '@/lib/auth-context';
import { getAvailableSlots } from '@/lib/scheduling/availability';
import { requireRole } from '@/lib/rbac';
import type { Appointment } from '@/generated/prisma';
import { logAudit } from '@/lib/audit';


function reminderDelayMs(startsAt: Date) {
  const reminderTime = startsAt.getTime() - 24 * 60 * 60 * 1000;
  return Math.max(0, reminderTime - Date.now());
}

export async function bookAppointment(input: unknown) {
  const { slotId, durationMinutes, ...data } = bookAppointmentSchema.parse(input);
  const clinicId = await getCurrentClinicId();
  return db.$transaction(async (tx) => {
    const slot = await tx.availabilitySlot.findUniqueOrThrow({ where: { id: slotId } });
    if (slot.isBooked) throw new Error('This slot is already booked');
    await tx.availabilitySlot.update({ where: { id: slot.id }, data: { isBooked: true } });
    const appt = await tx.appointment.create({ data: { ...data, clinicId } });
    await reminderQueue.add('appointment-reminder', { appointmentId: appt.id }, { jobId: `reminder-${appt.id}`, delay: reminderDelayMs(data.startsAt) });
    return appt;
  });
}

export async function getAvailableSlotsAction(staffId: string) {
  const from = new Date();
  const to = new Date(from.getTime() + 14 * 86_400_000);
  return getAvailableSlots(staffId, from, to);
}



export async function checkInAppointment(id: string) {
  await requireRole(['ADMIN', 'FRONT_DESK']);
  return db.appointment.update({ where: { id }, data: { status: 'CHECKED_IN' } });
}

export async function startVisit(id: string) {
  await requireRole(['ADMIN', 'PROVIDER']);
  return db.appointment.update({ where: { id }, data: { status: 'IN_PROGRESS' } });
}

export async function fetchTodayAppointments() {
  const clinicId = await getCurrentClinicId();
  const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(); todayEnd.setHours(23, 59, 59, 999);
  return db.appointment.findMany({
    where: { clinicId, startsAt: { gte: todayStart, lte: todayEnd }, status: 'SCHEDULED' },
    include: { patient: true },
    orderBy: { startsAt: 'asc' },
  });
}


export async function cancelAppointment(id: string, reason: string) {
  const session = await requireRole(['ADMIN', 'FRONT_DESK', 'PROVIDER']);
  const appt = await db.appointment.update({ where: { id }, data: { status: 'CANCELED' } });
  await db.availabilitySlot.updateMany({ where: { staffId: appt.staffId, startsAt: appt.startsAt }, data: { isBooked: false } });
  await reminderQueue.remove(`reminder-${id}`);
  await logAudit(session, 'CANCEL', 'Appointment', id, { reason });
  await notifyPatientOfCancellation(appt, reason);
  return appt;
}

export async function markNoShow(id: string) {
  const session = await requireRole(['ADMIN', 'FRONT_DESK', 'PROVIDER']);
  const appt = await db.appointment.update({ where: { id }, data: { status: 'NO_SHOW' } });
  await logAudit(session, 'NO_SHOW', 'Appointment', id);
  return appt;
}

async function notifyPatientOfCancellation(appt: Appointment, reason: string) {
  await db.notification.create({
    data: {
      userId: appt.patientId,
      type: 'appointment_canceled',
      payload: { appointmentId: appt.id, reason },
    },
  });
}

interface RecurringInput {
  patientId: string;
  staffId: string;
  locationId: string;
  startsAt: Date;
  endsAt: Date;
  visitType: 'IN_PERSON' | 'TELEHEALTH';
  cadence: 'WEEKLY' | 'BIWEEKLY';
  occurrences?: number;
  until?: Date;
}

function expandRecurrence(input: RecurringInput): Date[] {
  const stepDays = input.cadence === 'WEEKLY' ? 7 : 14;
  const dates: Date[] = [];
  let cursor = new Date(input.startsAt);
  while (
    (input.occurrences ? dates.length < input.occurrences : true) &&
    (input.until ? cursor <= input.until : dates.length < 52)
  ) {
    dates.push(new Date(cursor));
    cursor = new Date(cursor.getTime() + stepDays * 86_400_000);
  }
  return dates;
}

export async function bookRecurringAppointments(input: RecurringInput) {
  const clinicId = await getCurrentClinicId();
  const seriesId = crypto.randomUUID();
  const durationMs = input.endsAt.getTime() - input.startsAt.getTime();
  const dates = expandRecurrence(input);
  return db.$transaction(dates.map((d) => db.appointment.create({ data: { clinicId, patientId: input.patientId, staffId: input.staffId, locationId: input.locationId, visitType: input.visitType, startsAt: d, endsAt: new Date(d.getTime() + durationMs), seriesId } })));
}



