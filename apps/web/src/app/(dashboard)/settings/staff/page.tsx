import { getStaffForClinic } from '@/lib/data/staff';
import { StaffTable } from '@/components/clinic/staff-table';

export default async function StaffPage() {
  const staff = await getStaffForClinic();
  return <StaffTable staff={staff} />;
}
