'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookAppointmentSchema } from '@/lib/validations/appointment';
import { bookAppointment, getAvailableSlotsAction } from '@/lib/actions/appointment.actions';

export function BookingDialog() {
  const [staffId, setStaffId] = useState('');
  const form = useForm({ resolver: zodResolver(bookAppointmentSchema) });
  const { data: slots = [] } = useQuery({
    queryKey: ['available-slots', staffId],
    queryFn: () => getAvailableSlotsAction(staffId),
    enabled: !!staffId,
  });
  return <form onSubmit={form.handleSubmit(bookAppointment)}>
    <select onChange={(e) => setStaffId(e.target.value)}>{/* provider options */}</select>
    <select {...form.register('slotId')}>{slots.map((s: any) => <option key={s.id} value={s.id}>{s.startsAt}</option>)}</select>
  </form>;
}
