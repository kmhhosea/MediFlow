'use client';
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export function StaffTable({ staff }: { staff: any[] }) {
  return (
    <Table>
      <TableBody>
        {staff.map((s) => (
          <TableRow key={s.id}>
            <TableCell>{s.user.name}</TableCell>
            <TableCell><Badge>{s.role}</Badge></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
