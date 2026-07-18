'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchTodayAppointments, checkInAppointment } from '@/lib/actions/appointment.actions';

function CheckInList({ appointments }: { appointments: any[] }) {
  return (
    <ul>
      {appointments.map((a) => (
        <li key={a.id}>
          {a.patient.firstName} {a.patient.lastName}
          <button onClick={() => checkInAppointment(a.id)}>Check In</button>
        </li>
      ))}
    </ul>
  );
}

export default function CheckInBoard() {
  const { data } = useQuery({ queryKey: ['today-appointments'], queryFn: fetchTodayAppointments, refetchInterval: 30_000 });
  return <CheckInList appointments={data ?? []} />;
}
