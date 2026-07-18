'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateClinicSchema } from '@/lib/validations/clinic';
import { updateClinic } from '@/lib/actions/clinic.actions';
import { toast } from 'sonner';

export function ClinicSettingsForm({ clinic }: { clinic: any }) {
  const form = useForm({ resolver: zodResolver(updateClinicSchema), defaultValues: clinic });
  const onSubmit = form.handleSubmit(async (values) => {
    await updateClinic(values);
    toast.success('Clinic settings saved');
  });
  return <form onSubmit={onSubmit}>{/* fields */}</form>;
}
