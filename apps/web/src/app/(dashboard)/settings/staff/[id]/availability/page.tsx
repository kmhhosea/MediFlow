import { AvailabilityEditor } from '@/components/scheduling/availability-editor';

export default function AvailabilityPage({ params }: { params: { id: string } }) {
  return <AvailabilityEditor staffId={params.id} />;
}
