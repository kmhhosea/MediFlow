import { db } from '@/lib/db';
import { getCurrentClinicId } from '@/lib/auth-context';
import { LocationsTable } from '@/components/clinic/locations-table';

export default async function LocationsPage() {
  const locations = await db.location.findMany({ where: { clinicId: await getCurrentClinicId() } });
  return <LocationsTable locations={locations} />;
}
