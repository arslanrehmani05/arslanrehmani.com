// app/page.tsx
import Hero from '@/components/hero';
import ProofStrip from '@/components/proof-strip';
import SectorsRibbon from '@/components/sectors-ribbon';
import AgentFunctionGrid from '@/components/agent-function-grid';
import FeaturedWork from '@/components/featured-work';
import HowIWork from '@/components/how-i-work';
import SecurityClaims from '@/components/security-claims';
import WritingPreview from '@/components/writing-preview';
import FinalCta from '@/components/final-cta';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Arslan Rehmani',
    url: 'https://arslanrehmani.com',
    description:
      'Custom operational software and autonomous agentic systems that eliminate operational bottlenecks and manual overhead for growing businesses.',
    jobTitle: 'Operational Systems Builder & Agentic Architect',
    serviceType: [
      'Operational Diagnosis & Systems Audit',
      'Custom Operational Software Build',
      'Autonomous AI Agent Pipelines',
      'Systems Maintenance and Disaster Recovery',
    ],
    sameAs: [
      'https://linkedin.com/in/arslanrehmani',
      'https://github.com/arslanrehmani05',
    ],
  };

  return (
    <main className="flex flex-col min-h-screen bg-bg-primary text-text-primary">
      <Hero />
      <ProofStrip />
      <SectorsRibbon />
      <AgentFunctionGrid />
      <FeaturedWork />
      <HowIWork />
      <SecurityClaims />
      {/* Testimonials strictly hidden per Truth Gate until signed permissions exist */}
      <WritingPreview />
      <FinalCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
