import Link from 'next/link';

export function MarketingHeader() {
  return (
    <header className="flex justify-between p-4">
      <Link href="/">MediFlow</Link>
      <nav className="flex gap-4">
        <Link href="/pricing">Pricing</Link>
        <Link href="/sign-in">Sign in</Link>
      </nav>
    </header>
  );
}
