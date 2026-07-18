import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { getPatientById } from '@/lib/data/patients';

function PatientOverview({ patient }: { patient: any }) {
  return (
    <div>
      <h2>{patient.firstName} {patient.lastName}</h2>
      <p>DOB: {new Date(patient.dob).toLocaleDateString()}</p>
      <p>Phone: {patient.phone}</p>
      <p>Insurance: {patient.insuranceProvider}</p>
    </div>
  );
}

export default async function PatientChartPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const patient = await getPatientById(id);
  return (
    <Tabs defaultValue="overview">
      <TabsList>{/* tab triggers */}</TabsList>
      <TabsContent value="overview"><PatientOverview patient={patient} /></TabsContent>
    </Tabs>
  );
}
