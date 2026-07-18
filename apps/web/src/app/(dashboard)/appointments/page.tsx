import { WeekCalendar } from '@/components/appointments/week-calendar';
import { getAppointmentsForWeek } from '@/lib/data/appointments';

export default async function AppointmentsPage({ searchParams }: any) {
  const { week } = await searchParams;
  const appointments = await getAppointmentsForWeek(week);
  return <WeekCalendar appointments={appointments} />;
}
