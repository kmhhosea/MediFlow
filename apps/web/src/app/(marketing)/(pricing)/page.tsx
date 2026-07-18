import { PLANS } from '@/lib/plans';
import { PricingCard } from '@/components/marketing/pricing-card';

export const revalidate = 86400;

export default function PricingPage() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {PLANS.map((p) => <PricingCard key={p.id} plan={p} />)}
    </div>
  );
}
