// app/diagnostics/page.tsx
import type { Metadata } from 'next';
import DiagnosticsRoiCalculator from '@/components/diagnostics/roi-calculator';
import DiagnosticsOperationalAudit from '@/components/diagnostics/operational-audit';
import DiagnosticsTechStackFit from '@/components/diagnostics/tech-stack-fit';
import DiagnosticsCostEstimator from '@/components/diagnostics/cost-estimator';

export const metadata: Metadata = {
  title: "See What's Costing You | Diagnostics Hub | Arslan Rehmani",
  description: 'Interactive operational diagnostics, ROI calculators, tech stack fit checkers, and cost estimators for SMB manufacturing and ecommerce.',
  alternates: {
    canonical: '/diagnostics',
  },
  openGraph: {
    title: "See What's Costing You | Diagnostics Hub | Arslan Rehmani",
    description: 'Free interactive operational diagnostics, ROI calculators, and system estimators.',
    url: 'https://arslanrehmani.com/diagnostics',
    siteName: 'Arslan Rehmani',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "See What's Costing You | Diagnostics Hub",
    description: 'Interactive operational diagnostics and ROI calculators.',
  },
};

export default function DiagnosticsPage() {
  return (
    <main className="bg-bg-primary min-h-screen py-16 md:py-28 space-y-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Hero */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow mb-4">Diagnostics Hub</span>
          <h1 className="headline text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            See what manual drag is{' '}
            <span className="italic text-accent-gold">costing your business.</span>
          </h1>
          <p className="text-base md:text-lg text-text-muted leading-relaxed mt-6">
            Interactive, non-form tools engineered to pinpoint manual administrative drag, calculate financial ROI, evaluate technology stack maturity, and estimate system build scopes.
          </p>
        </div>

        {/* Tools Suite Grid */}
        <div className="space-y-20">
          <section id="roi-calculator">
            <DiagnosticsRoiCalculator />
          </section>

          <section id="readiness-audit">
            <DiagnosticsOperationalAudit />
          </section>

          <section id="tech-stack-fit">
            <DiagnosticsTechStackFit />
          </section>

          <section id="cost-estimator">
            <DiagnosticsCostEstimator />
          </section>
        </div>
      </div>
    </main>
  );
}
