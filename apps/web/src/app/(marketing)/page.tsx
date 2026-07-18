export const revalidate = 86400;

import { Hero } from '@/components/marketing/hero';
import { FeatureGrid } from '@/components/marketing/feature-grid';
import { PricingSection } from '@/components/marketing/pricing-section';
import { CTASection } from '@/components/marketing/cta-section';


export default function LandingPage() {
  return (
    <>
      <Hero />
      <FeatureGrid />
      <PricingSection />
      <CTASection />
    </>
  );
}
