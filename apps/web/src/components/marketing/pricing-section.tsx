import { PLANS } from '@/lib/plans';
import { PricingCard } from './pricing-card';

export function PricingSection() {
  return (
    <section className="grid grid-cols-3 gap-6">
      {PLANS.map((p) => <PricingCard key={p.id} plan={p} />)}
    </section>
  );
}
