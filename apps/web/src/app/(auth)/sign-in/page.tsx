'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from '@/lib/auth-client';
import { signInSchema } from '@/lib/validations/auth';

export default function SignInPage() {
  const form = useForm({ resolver: zodResolver(signInSchema) });
  const onSubmit = form.handleSubmit(async (values) => {
    await signIn.email(values);
  });
  return <form onSubmit={onSubmit}>{/* fields */}</form>;
}
