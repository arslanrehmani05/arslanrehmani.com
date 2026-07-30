// app/privacy/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Arslan Rehmani',
  description: 'Privacy Policy for arslanrehmani.com. Overview of data collection practices, lead capture, and privacy standards.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Arslan Rehmani',
    description: 'Privacy policy and data protection practices for arslanrehmani.com.',
    url: 'https://arslanrehmani.com/privacy',
    siteName: 'Arslan Rehmani',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Arslan Rehmani',
    description: 'Privacy policy and data protection practices for arslanrehmani.com.',
  },
};

export default function PrivacyPage() {
  return (
    <main className="bg-bg-primary min-h-screen py-16 md:py-28">
      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb / Eyebrow */}
        <span className="eyebrow mb-4">Legal & Compliance</span>
        <h1 className="headline text-3xl md:text-5xl leading-[1.1] mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-text-subtle mb-12">
          Last Updated: July 30, 2026
        </p>

        <div className="space-y-10 text-text-muted leading-relaxed text-base border-t border-border-color pt-10">
          {/* NOTICE: PLACEHOLDER FOR FINALIZED LEGAL COPY */}
          {/* ========================================================================= */}
          {/* LEGAL PLACEHOLDER SECTION START — TO BE REPLACED WITH FINALIZED LEGAL COPY */}
          {/* ========================================================================= */}

          <div className="p-6 bg-bg-secondary border border-border-gold/40 rounded-2xl">
            <span className="text-xs font-bold text-accent-gold uppercase tracking-wider block mb-2">
              Production Placeholder Notice
            </span>
            <p className="text-xs text-text-muted leading-relaxed">
              This document serves as the operational privacy notice outline for arslanrehmani.com. Finalized formal legal terms will be reviewed and updated by legal counsel.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">1. Information Collection</h2>
            {/* <!-- PLACEHOLDER: Insert detailed Information Collection terms here --> */}
            <p>
              We collect information that you directly provide to us via form submissions (such as contact inquiries, AI Readiness Audits, and newsletter signups). This data may include your name, work email address, company name, and message details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">2. Use of Information</h2>
            {/* <!-- PLACEHOLDER: Insert detailed Use of Information terms here --> */}
            <p>
              Information collected is strictly utilized to respond to your direct inquiries, deliver tool output reports (such as ROI calculations and operational audits), and maintain communication regarding software engagements. We do not sell, rent, or trade your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">3. Storage & Security</h2>
            {/* <!-- PLACEHOLDER: Insert detailed Data Security terms here --> */}
            <p>
              Form submissions are processed via secure server-side API routes and stored in encrypted Supabase databases equipped with strict Row Level Security (RLS) policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">4. Contact Information</h2>
            {/* <!-- PLACEHOLDER: Insert Privacy Officer contact details here --> */}
            <p>
              For any questions or data access requests regarding this Privacy Policy, please write directly to{' '}
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
