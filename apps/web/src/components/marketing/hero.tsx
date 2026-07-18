import { sign } from 'crypto';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="py-24 text-center">
      <h1 className="text-4xl font-bold">Run your clinic from one place</h1>
      <Link href="/sign-up">Get started</Link>
    </section>
  );
}
