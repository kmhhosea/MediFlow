import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-16 text-center">
      <h2>Ready to modernize your clinic?</h2>
      <Link href="/sign-up">Start your free trial</Link>
    </section>
  );
}
