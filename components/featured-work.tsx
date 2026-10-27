// components/featured-work.tsx
import Link from 'next/link';
import { ArrowRight, ExternalLink, CheckCircle2, Cpu, Database } from 'lucide-react';
import { getVerifiedFact } from '@/lib/facts';

export default function FeaturedWork() {
  const textileLooms = getVerifiedFact('fact-textilemode-looms');
  const textileHours = getVerifiedFact('fact-textilemode-hours');
  const textileLive = getVerifiedFact('fact-textilemode-live');
  const finTime = getVerifiedFact('fact-fin-reconcile-time');
  const finAccuracy = getVerifiedFact('fact-fin-reconcile-accuracy');
  const belhideIntegrations = getVerifiedFact('fact-belhide-integrations');

  const studies = [
    {
      id: 'textilemode-erp',
      client: 'TextileMode ERP',
      liveUrl: 'https://erp.textilemode.com',
      industry: 'Custom Manufacturing ERP & Floor Intelligence',
      coreSystem: 'Custom 5-module ERP built to manage yarn lot accounting, loom allocation, greige inspection, piece-rate wages, and double-entry accounting.',
      agenticLayer: 'Agentic shift briefings, predictive yarn shortage alerts, and automated variance flagging running directly on top of the relational ledger.',
      results: [
        { label: 'Looms Managed', value: textileLooms?.value || '27 looms' },
        { label: 'Manual Work Eliminated', value: textileHours?.value || '40+ hrs/wk' },
        { label: 'Continuous Production', value: textileLive?.value || '10+ months' },
      ],
      link: '/work/textilemode-erp',
    },
    {
      id: 'financial-reconciliation',
      client: 'Automating Financial Reconciliation',
      liveUrl: null,
      industry: 'Custom Accounting System & Reconcile Engine',
      coreSystem: 'Custom double-entry ledger platform with multi-currency normalized transaction store and QuickBooks integration.',
      agenticLayer: 'Deterministic matching agents that ingest daily bank webhooks, apply rule-based heuristics, and route exceptions to human review.',
      results: [
        { label: 'Close Duration', value: finTime?.value || '3 days → 45 min' },
        { label: 'Automated Match Rate', value: finAccuracy?.value || '98%' },
        { label: 'Corrupted Rows Committed', value: '0' },
      ],
      link: '/work/financial-reconciliation',
    },
    {
      id: 'belhide-operational-stack',
      client: 'Belhide Operational Stack',
      liveUrl: 'https://erp.belhide.com',
      industry: 'Custom Ecommerce Control Platform',
      coreSystem: 'Custom unified operational hub connecting Shopify, Amazon, Google Analytics 4, and Search Console into a single relational database.',
      agenticLayer: 'Daily 07:00 autonomous executive briefings, automated shipping cost audits, and real-time inventory reorder triggers.',
      results: [
        { label: 'Unified Channels', value: belhideIntegrations?.value || '4 channels' },
        { label: 'Daily Briefing', value: 'Automated 07:00' },
        { label: 'Single Pane of Glass', value: 'Live Platform' },
      ],
      link: '/work/belhide-operational-stack',
    },
  ];

  return (
    <section id="featured-work" className="py-24 md:py-32 border-b border-border-color bg-bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs uppercase font-mono tracking-wider text-text-subtle">
              Featured Work &bull; Custom Projects &amp; Agentic Improvements
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
              Custom projects built from scratch. Agentic intelligence layered on top.
            </h2>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              We engineer custom production systems tailored to your business, and layer agentic improvements over them—never replacing custom software with fragile AI-only wrappers.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-primary hover:text-accent-gold transition-colors py-1 font-mono shrink-0"
          >
            <span>View all custom projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-12">
          {studies.map((study, idx) => (
            <div
              key={study.id}
              className="p-8 sm:p-10 rounded-3xl bg-bg-primary border border-border-color space-y-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-color/60 pb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-text-subtle">0{idx + 1}</span>
                    <h3 className="text-2xl font-bold tracking-tight text-text-primary">
                      {study.client}
                    </h3>
                  </div>
                  <div className="text-xs text-text-muted font-mono">
                    {study.industry}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {study.liveUrl && (
                    <a
                      href={study.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-secondary border border-border-color text-xs text-text-primary hover:border-text-primary/40 transition-colors font-mono"
                    >
                      <span>Open live system</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <Link
                    href={study.link}
                    className="btn-primary !px-4 !py-1.5 !text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <span>Read case study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 space-y-5">
                  <div className="p-4 rounded-xl bg-bg-secondary/40 border border-border-color space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-primary font-bold">
                      <Database className="w-3.5 h-3.5 text-accent-gold" />
                      <span>The Core Custom Project:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                      {study.coreSystem}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-bg-secondary/40 border border-border-color space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent-gold font-bold">
                      <Cpu className="w-3.5 h-3.5 text-accent-gold" />
                      <span>Agentic Improvements Built Over It:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                      {study.agenticLayer}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-bg-secondary/40 p-6 rounded-2xl border border-border-color flex flex-col justify-between space-y-4">
                  <div className="text-xs uppercase font-mono tracking-wider text-text-subtle">
                    Measured Outcomes (Verified)
                  </div>
                  <div className="space-y-3">
                    {study.results.map((res) => (
                      <div key={res.label} className="flex items-center justify-between border-b border-border-color/40 pb-2">
                        <span className="text-xs text-text-muted">{res.label}</span>
                        <span className="text-base font-bold font-mono text-text-primary">
                          {res.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Cross-referenced with production logs</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
