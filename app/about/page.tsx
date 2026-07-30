// app/about/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { BUSINESS_EMAILS } from '@/lib/emails';

export const metadata: Metadata = {
  title: 'About | Arslan Rehmani — Operational AI Systems Builder',
  description: 'Arslan Rehmani builds custom operational software and ERPs for SMB manufacturing and ecommerce. Based in Karachi, Pakistan.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About | Arslan Rehmani — Operational AI Systems Builder',
    description: 'Founder of Vanthrope. Building systems that replace manual work permanently. Live proof software and verifiable metrics.',
    url: 'https://arslanrehmani.com/about',
    siteName: 'Arslan Rehmani',
    locale: 'en_US',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Arslan Rehmani',
    description: 'Operational AI systems builder. Custom ERPs and automation engines for manufacturing and ecommerce.',
  },
};

const proofMetrics = [
  { metric: '5', label: 'Employees Replaced', sub: 'Full-time manual roles eliminated at textile plant' },
  { metric: '40+', label: 'Hours Saved / Week', sub: 'Weekly manual reporting drag removed permanently' },
  { metric: '27', label: 'Looms Managed Live', sub: 'Real-time production floor control at TextileMode' },
  { metric: '10+', label: 'Months Live', sub: 'Continuous production uptime with real financial data' },
];

export default function AboutPage() {
  return (
    <main className="bg-bg-primary min-h-screen py-16 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Hero */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow mb-4">Background & Approach</span>
          <h1 className="headline text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            Systems over slideware.{' '}
            <span className="italic text-accent-gold">Code over claims.</span>
          </h1>
          <p className="text-base md:text-lg text-text-muted leading-relaxed mt-6">
            I am Arslan Rehmani, founder of Vanthrope, based in Karachi, Pakistan. I walk into businesses, diagnose operational drag, and engineer custom software systems that replace manual overhead permanently.
          </p>
        </div>

        {/* Two-column layout: Bio & Headshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          <div className="lg:col-span-7 space-y-6 text-text-muted text-base leading-relaxed">
            <p>
              Most AI consulting consists of deck presentations, vague prompts, and unfulfilled automation promises. My approach is built on a single premise: <strong className="text-text-primary">claims are cheap, working software is not.</strong>
            </p>
            <p>
              The first production system I engineered — TextileMode ERP — replaced five employees at a textile manufacturing plant managing 27 looms across 5 production modules and 11 financial reports. It has run daily operations for over 10 months.
            </p>
            <p>
              The second system — Belhide Operational Stack — acts as a multi-channel operational intelligence platform for an ecommerce client, unifying Shopify, Amazon, analytics, and custom AI-generated daily briefings.
            </p>
            <p>
              Every system I build is deployed to infrastructure owned and controlled directly by the client. No vendor lock-in, no fragile third-party middleware, and zero operational fluff.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={`mailto:${BUSINESS_EMAILS.direct.email}`}
                className="btn-primary !text-sm"
              >
                Direct Contact ({BUSINESS_EMAILS.direct.email})
              </a>
              <Link href="/projects" className="btn-ghost !text-sm">
                View Live Proof Systems →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-bg-secondary border border-border-color ring-1 ring-border-gold">
              <Image
                src="/headshot.jpg"
                alt="Arslan Rehmani - Operational AI Systems Builder"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Verifiable Proof Metrics Grid */}
        <div className="bg-bg-secondary border border-border-color rounded-2xl p-8 md:p-12 mb-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-border-color">
            <div>
              <span className="eyebrow mb-2">Empirical Proof</span>
              <h2 className="headline text-2xl md:text-3xl text-text-primary">
                Hard Numbers. No Projections.
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-accent-gold bg-accent-gold-dim border border-border-gold px-3.5 py-2 rounded-xl">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Verified Production Operations</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {proofMetrics.map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className="text-4xl md:text-5xl font-black font-sans text-accent-gold">
                  {item.metric}
                </span>
                <span className="text-sm font-bold text-text-primary mt-2">
                  {item.label}
                </span>
                <span className="text-xs text-text-muted mt-1 leading-relaxed">
                  {item.sub}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Operating Principles */}
        <div className="mb-24">
          <span className="eyebrow mb-4">Engineering Principles</span>
          <h2 className="headline text-3xl md:text-4xl mb-10">
            How I build operational software.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-bg-secondary border border-border-color rounded-2xl p-8">
              <span className="text-accent-gold font-mono text-xs font-bold block mb-3">01 / DIAGNOSIS FIRST</span>
              <h3 className="text-lg font-bold text-text-primary mb-3">Workflow Before Code</h3>
              <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                Software fails when built on assumptions. Every project begins with a deep-dive audit of how your business actually moves data, products, and money.
              </p>
            </div>

            <div className="bg-bg-secondary border border-border-color rounded-2xl p-8">
              <span className="text-accent-gold font-mono text-xs font-bold block mb-3">02 / INFRASTRUCTURE OWNERSHIP</span>
              <h3 className="text-lg font-bold text-text-primary mb-3">Client-Controlled Code</h3>
              <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                You own your code, databases, and deployment keys. Systems are deployed to your infrastructure with clear documentation and zero licensing traps.
              </p>
            </div>

            <div className="bg-bg-secondary border border-border-color rounded-2xl p-8">
              <span className="text-accent-gold font-mono text-xs font-bold block mb-3">03 / PERMANENT OVERHEAD REMOVAL</span>
              <h3 className="text-lg font-bold text-text-primary mb-3">Zero Manual Repeat Drag</h3>
              <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                If a human task is repetitive, structured, and predictable, it belongs in deterministic code or targeted AI pipeline automation.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Routing Section */}
        <div className="bg-bg-secondary border border-border-color rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="eyebrow mb-2">Direct Contact</span>
            <h3 className="headline text-2xl md:text-3xl text-text-primary">
              Have an operational bottleneck?
            </h3>
            <p className="text-sm text-text-muted mt-2 max-w-xl">
              Write directly to <span className="font-mono text-accent-gold">arslan@arslanrehmani.com</span> for strategic inquiries, or use the dedicated business channels.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link href="/contact" className="btn-primary !text-sm">
              Contact Directory & Form
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
