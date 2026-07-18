import { requirePatientSession } from '@/lib/auth-context';
import Link from 'next/link';

function PortalNav() {
  return (
    <nav className="flex gap-4 p-4 border-b">
      <Link href="/appointments">Appointments</Link>
      <Link href="/messages">Messages</Link>
      <Link href="/billing">Billing</Link>
      <Link href="/settings/notifications">Settings</Link>
    </nav>
  );
}

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  await requirePatientSession();
  return (
    <div>
      <PortalNav />
      <main>{children}</main>
    </div>
  );
}
