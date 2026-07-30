// app/accessibility/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Accessibility Statement | Arslan Rehmani',
  description: 'Accessibility commitment and standards compliance (WCAG 2.1 Level AA) for arslanrehmani.com.',
  alternates: {
    canonical: '/accessibility',
  },
  openGraph: {
    title: 'Accessibility Statement | Arslan Rehmani',
    description: 'Accessibility policy and compliance details for arslanrehmani.com.',
    url: 'https://arslanrehmani.com/accessibility',
    siteName: 'Arslan Rehmani',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Accessibility Statement | Arslan Rehmani',
    description: 'Accessibility policy for arslanrehmani.com.',
  },
};

export default function AccessibilityPage() {
  return (
    <main className="bg-bg-primary min-h-screen py-16 md:py-28">
      <div className="max-w-4xl mx-auto px-6">
        <span className="eyebrow mb-4">Legal & Compliance</span>
        <h1 className="headline text-3xl md:text-5xl leading-[1.1] mb-4">
          Accessibility Statement
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
              This statement documents arslanrehmani.com&apos;s commitment to digital accessibility for all users, including individuals with disabilities.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">1. Accessibility Standards</h2>
            {/* <!-- PLACEHOLDER: Insert WCAG 2.1 AA Compliance details here --> */}
            <p>
              We strive to adhere to the Web Content Accessibility Guidelines (WCAG 2.1 Level AA) standards. Key accessibility features implemented include high-contrast typography, explicit semantic HTML tags, minimal 44px tap target dimensions, screen-reader accessible forms, keyboard navigation support, and reduced motion options.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">2. Continuous Improvement</h2>
            {/* <!-- PLACEHOLDER: Insert Testing & Verification methods here --> */}
            <p>
              Our code design system undergoes continuous auditing against automated accessibility tools and manual screen-reader navigation tests to preserve a friction-free experience across screen sizes and assistive devices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-3">3. Feedback & Accessibility Assistance</h2>
            {/* <!-- PLACEHOLDER: Insert Accessibility Officer Contact information here --> */}
            <p>
              If you experience any accessibility barrier while browsing this website, please report it directly to{' '}
              <a href="mailto:hello@arslanrehmani.com" className="text-accent-gold hover:underline font-mono">
                hello@arslanrehmani.com
              </a>. We will address the issue promptly.
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
