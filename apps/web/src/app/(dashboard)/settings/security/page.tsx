'use client';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { db } from '@/lib/db';
import { getCurrentClinicId } from '@/lib/auth-context';
import { ClinicSettingsForm } from '@/components/clinic/clinic-settings-form';

export default async function SettingsPage() {
  const clinic = await db.clinic.findUniqueOrThrow({ where: { id: await getCurrentClinicId() } });
  return <ClinicSettingsForm clinic={clinic} />;
}


function EnrollMfaForm({ qr, onEnroll }: { qr: string | null; onEnroll: () => void }) {
  const [code, setCode] = useState('');
  if (!qr) return <button onClick={onEnroll}>Enable two-factor authentication</button>;
  return (
    <div>
      <img src={qr} alt="Scan with your authenticator app" />
      <input value={code} onChange={(e) => setCode(e.target.value)} placeholder=""6-digit code"" />
      <button onClick={() => authClient.twoFactor.verifyTotp({ code })}>Confirm</button>
    </div>
  );
}

export default function SecuritySettingsPage() {
  const [qr, setQr] = useState<string | null>(null);
  async function enroll() {
    const { data } = await authClient.twoFactor.enable();
    setQr(data.totpURI);
  }
  return <EnrollMfaForm qr={qr} onEnroll={enroll} />;
}
