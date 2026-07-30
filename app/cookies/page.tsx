// app/cookies/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy | Arslan Rehmani',
  description: 'Cookie Policy for arslanrehmani.com explaining cookie usage, analytics, and privacy preferences.',
  alternates: {
    canonical: '/cookies',
  },
  openGraph: {
    title: 'Cookie Policy | Arslan Rehmani',
    description: 'Cookie policy and technical preference tracking disclosure for arslanrehmani.com.',
    url: 'https://arslanrehmani.com/cookies',
    siteName: 'Arslan Rehmani',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Cookie Policy | Arslan Rehmani',
    description: 'Cookie policy for arslanrehmani.com.',
  },
};

export default function CookiesPage() {
  return (
    <main className="bg-bg-primary min-h-screen py-16 md:py-28">
      <div className="max-w-4xl mx-auto px-6">
        <span className="eyebrow mb-4">Legal & Compliance</span>
        <h1 className="headline text-3xl md:text-5xl leading-[1.1] mb-4">
          Cookie Policy
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
              This page outlines how cookies and web performance storage technologies are used on arslanrehmani.com.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">1. What Are Cookies?</h2>
            {/* <!-- PLACEHOLDER: Insert Cookie Definition section here --> */}
            <p>
              Cookies are small text files placed on your device when visiting a website. They are widely used to make websites function efficiently and provide performance reporting.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">2. Essential & Performance Cookies</h2>
            {/* <!-- PLACEHOLDER: Insert Detailed Cookie Categories here --> */}
            <p>
              Arslanrehmani.com uses minimal essential cookies and standard Google Analytics script tags to aggregate visitor traffic patterns and ensure optimal site performance. No invasive tracking cookies or third-party ad network cookies are used on this site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">3. Managing Cookie Preferences</h2>
            {/* <!-- PLACEHOLDER: Insert Cookie Management instructions here --> */}
            <p>
              You can configure your browser settings to restrict or block cookies at any time. For questions regarding analytics cookies, email{' '}
              <a href="mailto:hello@arslanrehmani.com" className="text-accent-gold hover:underline font-mono">
                hello@arslanrehmani.com
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
