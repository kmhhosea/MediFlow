'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePatients } from '@/hooks/use-patients';

export function PatientsTable({ initialData, query }: { initialData: any[]; query: string }) {
  const [search, setSearch] = useState(query);
  const { data = initialData } = usePatients(search);
  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder=""Search patients"" />
      <table>
        <tbody>{data.map((p: any) => (
          <tr key={p.id}><td><Link href={`/patients/${p.id}`}>{p.firstName} {p.lastName}</Link></td></tr>
        ))}</tbody>
      </table>
    </div>
  );
}
