'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/lib/validations/auth';
import { onboardClinic } from '@/lib/actions/clinic.actions';

function SignUpForm({ onSubmit }: { onSubmit: (values: unknown) => Promise<unknown> }) {
  const form = useForm({ resolver: zodResolver(signUpSchema) });
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register('name')} placeholder="Your name" />
      <input {...form.register('email')} placeholder="Email" />
      <input {...form.register('password')} type="password" placeholder="Password" />
      <input {...form.register('clinicName')} placeholder="Clinic name" />
      <button type="submit">Create account</button>
    </form>
  );
}

export default function SignUpPage() {
  return <SignUpForm onSubmit={onboardClinic} />;
}
