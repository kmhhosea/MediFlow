'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { patientSchema } from '@/lib/validations/patient';

export function PatientForm({ patient, onSubmit }: any) {
  const form = useForm({ resolver: zodResolver(patientSchema), defaultValues: patient });
  return <form onSubmit={form.handleSubmit(onSubmit)}>{/* fields */}</form>;
}
