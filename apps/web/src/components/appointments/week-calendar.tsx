'use client';
import { Badge } from '@/components/ui/badge';

const STATUS_COLOR: Record<string, string> = {
  SCHEDULED: 'bg-blue-100',
  CHECKED_IN: 'bg-amber-100',
  IN_PROGRESS: 'bg-purple-100',
  COMPLETED: 'bg-green-100',
  CANCELED: 'bg-gray-100',
  NO_SHOW: 'bg-red-100',
};

function AppointmentBlock({ appointment }: { appointment: any }) {
  return (
    <div className={`${STATUS_COLOR[appointment.status]} rounded p-1 text-xs`}>
      {appointment.patient.firstName} {appointment.patient.lastName}
      <Badge>{appointment.status}</Badge>
    </div>
  );
}

export function WeekCalendar({ appointments }: { appointments: any[] }) {
  return (
    <div className="grid grid-cols-7 gap-px bg-border">
      {appointments.map((a) => <AppointmentBlock key={a.id} appointment={a} />)}
    </div>
  );
}
