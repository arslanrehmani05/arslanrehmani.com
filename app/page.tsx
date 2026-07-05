import Hero from '@/components/hero';
import CredibilityBar from '@/components/credibility-bar';
import ProblemSection from '@/components/problem-section';
import ServicesSection from '@/components/services-section';
import PortfolioSection from '@/components/portfolio-section';
import BelhideSection from '@/components/belhide-section';
import ThinkingSection from '@/components/thinking-section';
import ToolsSection from '@/components/tools-section';
import AboutSection from '@/components/about-section';
import CtaSection from '@/components/cta-section';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Arslan Rehmani',
    url: 'https://arslanrehmani.com',
    jobTitle: 'AI Systems Consultant',
    worksFor: {
      '@type': 'Organization',
      name: 'Vanthrope',
    },
    sameAs: [
      'https://linkedin.com/in/arslanrehmani',
      'https://x.com/arslanrehmani',
    ],
  };

  return (
    <main className="flex flex-col min-h-screen">
      {/* Sections 1 - 10 */}
      <Hero />
      <CredibilityBar />
      <ProblemSection />
      <ServicesSection />
      {/* @ts-ignore Server Component */}
      <PortfolioSection />
      <BelhideSection />
      {/* @ts-ignore Server Component */}
      <ThinkingSection />
      <ToolsSection />
      <AboutSection />
      <CtaSection />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}


