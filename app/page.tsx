// app/page.tsx
import Hero from '@/components/hero';
import ProofStrip from '@/components/proof-strip';
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
      'Custom operational data systems and deterministic agentic systems for small and mid-sized businesses.',
    jobTitle: 'Operational Systems Builder & Agentic Architect',
    serviceType: [
      'Data Audit',
      'Operational Systems Build',
      'Deterministic Agent Staging Pipelines',
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
