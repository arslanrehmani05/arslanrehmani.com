// app/disclaimer/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Disclaimer | Arslan Rehmani',
  description: 'Disclaimer regarding website content, live proof asset representations, and operational estimates.',
  alternates: {
    canonical: '/disclaimer',
  },
  openGraph: {
    title: 'Disclaimer | Arslan Rehmani',
    description: 'Disclaimer regarding content, proof assets, and ROI estimations on arslanrehmani.com.',
    url: 'https://arslanrehmani.com/disclaimer',
    siteName: 'Arslan Rehmani',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Disclaimer | Arslan Rehmani',
    description: 'Disclaimer for arslanrehmani.com.',
  },
};

export default function DisclaimerPage() {
  return (
    <main className="bg-bg-primary min-h-screen py-16 md:py-28">
      <div className="max-w-4xl mx-auto px-6">
        <span className="eyebrow mb-4">Legal & Compliance</span>
        <h1 className="headline text-3xl md:text-5xl leading-[1.1] mb-4">
          Disclaimer
        </h1>
        <p className="text-sm text-text-subtle mb-12">
          Last Updated: July 30, 2026
        </p>

        <div className="space-y-10 text-text-muted leading-relaxed text-base border-t border-border-color pt-10">
          {/* ========================================================================= */}
          {/* LEGAL PLACEHOLDER SECTION START — TO BE REPLACED WITH FINALIZED LEGAL COPY */}
          {/* ========================================================================= */}

          <div className="p-6 bg-bg-secondary border border-border-gold/40 rounded-2xl">
            <span className="text-xs font-bold text-accent-gold uppercase tracking-wider block mb-2">
              Production Placeholder Notice
            </span>
            <p className="text-xs text-text-muted leading-relaxed">
              This disclaimer governs the interpretation of case studies, live proof system demonstrations, and calculations presented on this site.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">1. Case Studies & Metrics</h2>
            {/* <!-- PLACEHOLDER: Insert Case Study Verifiability Disclaimer here --> */}
            <p>
              Metrics detailed in case studies (e.g. 5 headcount reduction, 40+ hours saved weekly, managing 27 looms) represent actual, verified production performance achieved for TextileMode ERP and client projects. Operational results for future engagements vary based on client workflow complexity and implementation scope.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">2. Client Engagement Context</h2>
            {/* <!-- PLACEHOLDER: Insert Client Framing & Relationship Disclaimer here --> */}
            <p>
              Belhide Operational Stack is a client engagement software stack built for an ecommerce brand client. Belhide is not owned or operated as Arslan Rehmani&apos;s personal brand.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">3. External Links</h2>
            {/* <!-- PLACEHOLDER: Insert External Links Disclaimer here --> */}
            <p>
              This website links to external live production software systems (such as erp.textilemode.com and erp.belhide.com). While these systems are active production assets, access and availability remain subject to individual platform status.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">4. Inquiries</h2>
            {/* <!-- PLACEHOLDER: Insert Contact Information here --> */}
            <p>
              Questions regarding content disclaimers should be directed to{' '}
              <a href="mailto:contact@arslanrehmani.com" className="text-accent-gold hover:underline font-mono">
                contact@arslanrehmani.com
              </a>.
            </p>
          </section>

          {/* ========================================================================= */}
          {/* LEGAL PLACEHOLDER SECTION END */}
          {/* ========================================================================= */}
        </div>

        <div className="mt-16 pt-8 border-t border-border-color">
          <Link href="/contact" className="btn-ghost !text-xs">
            Return to Contact →
          </Link>
        </div>
      </div>
    </main>
  );
}
