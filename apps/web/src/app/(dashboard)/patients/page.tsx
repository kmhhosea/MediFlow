import { PatientsTable } from '@/components/patients/patients-table';
import { getPatients } from '@/lib/data/patients';

export default async function PatientsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = '' } = await searchParams;
  const patients = await getPatients(q);
  return <PatientsTable initialData={patients} query={q} />;
}
