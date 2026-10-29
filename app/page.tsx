import Hero from '@/components/hero';
import SectorsRibbon from '@/components/sectors-ribbon';
import FeaturedWork from '@/components/featured-work';
import OperationalScan from '@/components/operational-scan';
import ProofStrip from '@/components/proof-strip';
import FinalCta from '@/components/final-cta';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <SectorsRibbon />
      <FeaturedWork />
      <OperationalScan />
      <ProofStrip />
      <FinalCta />
    </div>
  );
}
