import Link from 'next/link';

export function PricingCard({ plan }: { plan: { id: string; name: string; priceCents: number; features: string[] } }) {
  return (
    <div className="border rounded p-6">
      <h3>{plan.name}</h3>
      <p>${(plan.priceCents / 100).toFixed(0)}/mo</p>
      <ul>{plan.features.map((f) => <li key={f}>{f}</li>)}</ul>
      <Link href={`/sign-up?plan=${plan.id}`}>Choose {plan.name}</Link>
    </div>
  );
}
