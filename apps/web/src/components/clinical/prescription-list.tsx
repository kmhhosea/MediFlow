'use client';
export function PrescriptionList({ prescriptions }: { prescriptions: any[] }) {
  return (
    <ul>
      {prescriptions.map((rx) => <li key={rx.id}>{rx.drugName} - {rx.dosage} ({rx.status})</li>)}
    </ul>
  );
}
