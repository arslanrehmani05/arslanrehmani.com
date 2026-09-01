// app/media/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Download, Mail, ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { BUSINESS_EMAILS } from '@/lib/emails';

export const metadata: Metadata = {
  title: 'Media Kit & Press | Arslan Rehmani',
  description: 'Official press kit, biography, verified facts, headshot assets, and media contact for Arslan Rehmani.',
  alternates: {
    canonical: '/media',
  },
  openGraph: {
    title: 'Media Kit & Press | Arslan Rehmani',
    description: 'Press resources, approved speaker biography, headshots, and media contact for Arslan Rehmani.',
    url: 'https://arslanrehmani.com/media',
    siteName: 'Arslan Rehmani',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Media Kit & Press | Arslan Rehmani',
    description: 'Press resources and media contact for Arslan Rehmani.',
  },
};

const verifiedFacts = [
  { label: 'Full Name', value: 'Arslan Rehmani' },
  { label: 'Role / Title', value: 'AI Operational Systems Builder & ERP Architect' },
  { label: 'Practice', value: 'Independent AI Engineering & Software Systems' },
  { label: 'Location', value: 'Karachi, Pakistan' },
  { label: 'Primary Proof System', value: 'TextileMode ERP (erp.textilemode.com)' },
  { label: 'Client Engagement Stack', value: 'Belhide Operational Stack (erp.belhide.com)' },
  { label: 'Key Impact Metric', value: 'Replaced 5 manual roles & saved 40+ hours/week' },
  { label: 'Official Media Email', value: BUSINESS_EMAILS.media.email },
];

export default function MediaPage() {
  return (
    <main className="bg-bg-primary min-h-screen py-16 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Hero */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow mb-4">Press & Media Kit</span>
          <h1 className="headline text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            Media resources and{' '}
            <span className="italic text-accent-gold">verified background.</span>
          </h1>
          <p className="text-base md:text-lg text-text-muted leading-relaxed mt-6">
            Official biography, approved headshot photography, verified operational metrics, and direct press contact channels for journalists, podcast hosts, and conference organizers.
          </p>
        </div>

        {/* Two-Column: Bio & Headshot Asset */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          <div className="lg:col-span-7 space-y-6 text-text-muted text-base leading-relaxed">
            <h2 className="headline text-2xl md:text-3xl text-text-primary mb-4">
              Approved Short Biography
            </h2>

            <div className="bg-bg-secondary border border-border-color rounded-2xl p-6 md:p-8 space-y-4">
              <p className="text-sm md:text-base text-text-primary leading-relaxed">
                &ldquo;Arslan Rehmani is an operational AI systems builder and ERP architect based in Karachi, Pakistan. He specializes in engineering production ERP software and automated channel pipelines that replace repetitive manual overhead for SMB manufacturing companies and ecommerce brands.&rdquo;
              </p>
              <p className="text-xs text-text-muted leading-relaxed">
                &ldquo;His primary operational build, TextileMode ERP, eliminated five full-time manual administrative roles and 40+ hours of weekly manual drag at a textile plant managing 27 looms. All systems built by Arslan are deployed to client-owned infrastructure without generic SaaS middleware.&rdquo;
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={`mailto:${BUSINESS_EMAILS.media.email}`}
                className="btn-primary !text-sm flex items-center gap-2"
              >
                <span>Inquire via {BUSINESS_EMAILS.media.email}</span>
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="/headshot.jpg"
                download="Arslan-Rehmani-Headshot.jpg"
                className="btn-ghost !text-sm flex items-center gap-2"
              >
                <span>Download Official Headshot (JPG)</span>
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-bg-secondary border border-border-color rounded-2xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-4">
                Approved Media Headshot
              </h3>
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-bg-primary border border-border-color mb-4">
                <Image
                  src="/headshot.jpg"
                  alt="Arslan Rehmani - Official Press Photo"
                  fill
                  sizes="(max-width: 1024px) 100vw, 35vw"
                  className="object-cover"
                />
              </div>
              <p className="text-[11px] text-text-subtle">
                High-resolution JPEG suitable for web, conference programs, and press releases.
              </p>
            </div>
          </div>
        </div>

        {/* Fact Sheet Grid */}
        <div className="bg-bg-secondary border border-border-color rounded-2xl p-8 md:p-12 mb-24">
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-border-color">
            <div>
              <span className="eyebrow mb-1">Empirical Summary</span>
              <h2 className="headline text-2xl md:text-3xl text-text-primary">
                Verified Press Fact Sheet
              </h2>
            </div>
            <ShieldCheck className="w-6 h-6 text-accent-gold" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {verifiedFacts.map((fact) => (
              <div key={fact.label} className="bg-bg-primary border border-border-color rounded-xl p-5">
                <span className="text-xs font-bold text-accent-gold uppercase tracking-wider block mb-1">
                  {fact.label}
                </span>
                <span className="text-sm font-semibold text-text-primary block font-mono">
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Media Email Contact Card */}
        <div className="bg-bg-secondary border border-border-color rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="eyebrow mb-2">Media & Press Channel</span>
            <h3 className="headline text-2xl md:text-3xl text-text-primary">
              Have a podcast invitation or press inquiry?
            </h3>
            <p className="text-sm text-text-muted mt-2 max-w-xl">
              Write directly to <span className="font-mono text-accent-gold">{BUSINESS_EMAILS.media.email}</span> for podcast bookings, interviews, and media quotes.
            </p>
          </div>
          <a
            href={`mailto:${BUSINESS_EMAILS.media.email}`}
            className="btn-primary !text-sm shrink-0 flex items-center gap-2"
          >
            <span>Send Media Inquiry</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </main>
  );
}
