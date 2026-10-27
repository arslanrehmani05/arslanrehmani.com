// components/hero.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, MapPin, Wrench, BookOpen } from 'lucide-react';
import { getPlaceholdersList } from '@/lib/facts';
import PipelineMiniDemo from '@/components/pipeline-mini-demo';

const HEADLINE_OPTIONS = [
  'Your business data, finally right.',
  'Spreadsheets and paper to secure systems that reconcile.',
];

export default function Hero() {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const placeholders = getPlaceholdersList();

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 border-b border-border-color bg-bg-primary overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        <div className="max-w-4xl space-y-8">
          {/* Location & Availability Line Stated Plainly Near Top */}
          <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 px-3.5 py-1.5 rounded-full bg-bg-secondary border border-border-color text-xs text-text-muted">
            <span className="inline-flex items-center gap-1.5 text-text-primary font-medium">
              <MapPin className="w-3.5 h-3.5 text-accent-gold" />
              <span>{placeholders.BASE_LOCATION}</span>
            </span>
            <span className="text-border-color">&bull;</span>
            <span>Working overlap: {placeholders.OVERLAP || placeholders.OVERLAP_WINDOWS}</span>
            <span className="hidden sm:inline text-border-color">&bull;</span>
            <span className="hidden sm:inline">On-site visits: {placeholders.VISITS || placeholders.VISIT_POLICY}</span>
          </div>

          {/* Headline with subtle A/B toggle for review */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary leading-[1.08]">
              {HEADLINE_OPTIONS[headlineIndex]}
            </h1>
            <button
              type="button"
              onClick={() => setHeadlineIndex((prev) => (prev === 0 ? 1 : 0))}
              className="text-[11px] font-mono text-text-subtle hover:text-text-muted transition-colors underline underline-offset-4"
              title="Click to toggle alternate headline variant"
            >
              Alternate headline: &ldquo;{HEADLINE_OPTIONS[headlineIndex === 0 ? 1 : 0]}&rdquo;
            </button>
          </div>

          {/* Who it is for & positioning: One sentence */}
          <p className="text-lg sm:text-xl text-text-muted leading-relaxed max-w-3xl">
            I build secure, reliable data systems and agentic systems that do real operational work inside strict guardrails, for small and mid-sized businesses (and teams inside bigger ones) still running on spreadsheets, paper registers and disconnected tools.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="btn-primary !px-8 !py-4 !text-base font-semibold flex items-center justify-center gap-2"
            >
              <span>Book a 20-minute discovery call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/tools"
              className="btn-ghost !px-6 !py-4 !text-sm font-medium flex items-center justify-center gap-2 text-text-primary hover:border-text-primary/40"
            >
              <Wrench className="w-4 h-4 text-accent-gold" />
              <span>Try a tool</span>
            </Link>

            <Link
              href="/work"
              className="btn-ghost !px-6 !py-4 !text-sm font-medium flex items-center justify-center gap-2 text-text-primary hover:border-text-primary/40"
            >
              <BookOpen className="w-4 h-4 text-accent-gold" />
              <span>Read a case study</span>
            </Link>
          </div>

          {/* Truth Gate Trust Note */}
          <div className="pt-2 flex items-center gap-2 text-xs font-mono text-text-subtle">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>The Truth Gate: Every metric on this site is backed by verified evidence in facts.json.</span>
          </div>
        </div>

        {/* Inline Mini-Demo: 20-second Staging/Validation/Review Loop with Synthetic Data */}
        <div className="pt-4">
          <PipelineMiniDemo />
        </div>
      </div>
    </section>
  );
}
