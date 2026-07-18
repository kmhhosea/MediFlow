'use client';
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { deleteLocation } from '@/lib/actions/location.actions';
import { toast } from 'sonner';

export function LocationsTable({ locations }: { locations: any[] }) {
  async function handleDelete(id: string) {
    try {
      await deleteLocation(id);
    } catch (err) {
      toast.error((err as Error).message);
    }
  }
  return (
    <Table>
      <TableBody>
        {locations.map((l) => (
          <TableRow key={l.id}>
            <TableCell>{l.name}</TableCell>
            <TableCell>{l.address}</TableCell>
            <TableCell><button onClick={() => handleDelete(l.id)}>Delete</button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
