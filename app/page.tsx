import Hero from '@/components/hero';
import CredibilityBar from '@/components/credibility-bar';
import ProblemSection from '@/components/problem-section';
import ServicesSection from '@/components/services-section';
import PortfolioSection from '@/components/portfolio-section';
import AboutSection from '@/components/about-section';
import CtaSection from '@/components/cta-section';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Arslan Rehmani',
    url: 'https://arslanrehmani.com',
    jobTitle: 'Operational AI Systems Builder',
    sameAs: [
      'https://linkedin.com/in/arslanrehmani',
      'https://github.com/arslanrehmani05',
      'https://x.com/arslanrehmani',
    ],
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <CredibilityBar />
      <ProblemSection />
      <ServicesSection />
      <PortfolioSection />
      <AboutSection />
      <CtaSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
