'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NAV_ITEMS } from '@/lib/nav-items';
import { useSession } from '@/lib/auth-client';

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const items = NAV_ITEMS.filter((i) => i.roles.includes(session?.user.role ?? 'guest'));
  return (
    <nav className="flex flex-col gap-1 p-4">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className={pathname === item.href ? 'bg-brand-100 font-medium' : ''}>{item.label}</Link>
      ))}
    </nav>
  );
}
