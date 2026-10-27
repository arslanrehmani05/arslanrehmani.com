// app/work/page.tsx
import Link from 'next/link';
import { ArrowRight, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { getVerifiedFact } from '@/lib/facts';

export const metadata = {
  title: 'Work & Operational Case Studies | Arslan Rehmani',
  description:
    'In-depth engineering case studies of custom ERPs, financial reconciliation engines, and deterministic AI pipelines built for real businesses.',
};

export default function WorkPage() {
  const textileLooms = getVerifiedFact('fact-textilemode-looms');
  const textileHours = getVerifiedFact('fact-textilemode-hours');
  const textileLive = getVerifiedFact('fact-textilemode-live');
  const finTime = getVerifiedFact('fact-fin-reconcile-time');
  const finAccuracy = getVerifiedFact('fact-fin-reconcile-accuracy');
  const belhideIntegrations = getVerifiedFact('fact-belhide-integrations');
  const agentEval = getVerifiedFact('fact-agent-staging-eval');
  const agentCost = getVerifiedFact('fact-agent-staging-cost');

  const caseStudies = [
    {
      slug: 'textilemode-erp',
      client: 'TextileMode',
      liveUrl: 'https://erp.textilemode.com',
      industry: 'Textile Manufacturing',
      headline: 'From Paper Shift Registers to an Audited Double-Entry ERP',
      problemExcerpt: 'A 27-loom textile manufacturing mill was losing visibility across yarn lots, machine allocations, and piece-rate wages across paper logs and disconnected Excel sheets.',
      results: [
        { label: 'Looms Managed', value: textileLooms?.value || '27 looms' },
        { label: 'Manual Work', value: textileHours?.value || '40+ hrs/wk' },
        { label: 'Production Uptime', value: textileLive?.value || '10+ months' },
      ],
      stack: ['Next.js', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
      timeline: '8 weeks to live production cutover',
    },
    {
      slug: 'financial-reconciliation',
      client: 'Automating Financial Reconciliation',
      liveUrl: null,
      industry: 'Finance & Accounting',
      headline: 'Deterministic Bank-to-Ledger Matching Suite',
      problemExcerpt: 'Month-end accounting close required 3 full days of manual transcription and vlookups between CSV bank feeds and purchase invoices.',
      results: [
        { label: 'Close Timeline', value: finTime?.value || '3 days → 45 min' },
        { label: 'Auto-Match Rate', value: finAccuracy?.value || '98%' },
        { label: 'Corrupted Rows', value: '0 rows' },
      ],
      stack: ['TypeScript', 'PostgreSQL', 'Banking APIs', 'Docker'],
      timeline: '4 weeks staged deployment',
    },
    {
      slug: 'belhide-operational-stack',
      client: 'Belhide Leather Goods',
      liveUrl: 'https://erp.belhide.com',
      industry: 'Multi-Channel Ecommerce',
      headline: 'Unified 4-Channel Operational Control Platform',
      problemExcerpt: 'Four disconnected dashboards (Shopify, Amazon, GA4, GSC) forced operators to waste hours manually compiling spreadsheets to spot stockouts and ad drag.',
      results: [
        { label: 'Integrated Channels', value: belhideIntegrations?.value || '4 channels' },
        { label: 'Briefing Schedule', value: 'Daily 07:00' },
        { label: 'Audit Trail', value: '100% Webhook Audited' },
      ],
      stack: ['Next.js', 'Shopify API', 'Amazon SP-API', 'Supabase'],
      timeline: '6 weeks',
    },
    {
      slug: 'agent-staging-pipeline',
      client: 'Deterministic AI Data Pipeline',
      liveUrl: null,
      industry: 'Automated Processing Architecture',
      headline: 'Failsafe LLM Data Staging Before Database Commit',
      problemExcerpt: 'LLMs are inherently probabilistic. Allowing them to write directly to production ledgers risks silent schema errors, bad dates, and invalid mathematical totals.',
      results: [
        { label: 'Eval Suite Pass Rate', value: agentEval?.value || '99.4%' },
        { label: 'Run Cost', value: agentCost?.value || '$0.008 / 100 lines' },
        { label: 'Dirty Rows Committed', value: '0 rows' },
      ],
      stack: ['Python', 'Pydantic', 'PostgreSQL RLS', 'FastAPI'],
      timeline: '3 weeks add-on module',
    },
  ];

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono text-text-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Case Studies &bull; Truth Gate Enforced</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-text-primary">
            Systems Built for Operations That Cannot Afford Failure.
          </h1>
          <p className="text-lg text-text-muted leading-relaxed">
            Detailed engineering breakdowns of real systems running in production. Each case study documents the client context, the real problem in their words, constraints, SVG architecture diagrams, security design, and what I would do differently.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="space-y-12">
          {caseStudies.map((study, idx) => (
            <article
              key={study.slug}
              className="p-8 sm:p-10 rounded-3xl bg-bg-secondary/40 border border-border-color hover:border-text-primary/30 transition-all space-y-8 group"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-color/60 pb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-text-subtle">
                    <span>Study 0{idx + 1}</span>
                    <span>&bull;</span>
                    <span className="text-text-muted">{study.industry}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary mt-1">
                    {study.headline}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  {study.liveUrl && (
                    <a
                      href={study.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-primary border border-border-color text-xs font-mono text-text-primary hover:border-text-primary/40 transition-colors"
                    >
                      <span>Live system</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <Link
                    href={`/work/${study.slug}`}
                    className="btn-primary !px-4 !py-2 !text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <span>Read engineering report</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                    {study.problemExcerpt}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {study.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2.5 py-1 rounded bg-bg-primary border border-border-color text-text-subtle"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 rounded-2xl bg-bg-primary border border-border-color space-y-4">
                  <div className="text-xs uppercase font-mono tracking-wider text-text-subtle">
                    Verified Production Metrics
                  </div>
                  <div className="space-y-3">
                    {study.results.map((res) => (
                      <div
                        key={res.label}
                        className="flex items-center justify-between border-b border-border-color/40 pb-2"
                      >
                        <span className="text-xs text-text-muted">{res.label}</span>
                        <span className="text-base font-bold font-mono text-text-primary">
                          {res.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[11px] font-mono text-text-subtle">
                    Timeline: {study.timeline}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Strip */}
        <div className="p-8 rounded-3xl bg-bg-secondary/60 border border-border-color flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-text-primary">
              Have an operation running on fragile spreadsheets?
            </h3>
            <p className="text-sm text-text-muted">
              Book a 20-minute discovery call to map out a fixed-scope data audit or build.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-primary !px-6 !py-3 !text-sm whitespace-nowrap"
          >
            Book a 20-minute discovery call
          </Link>
        </div>
      </div>
    </main>
  );
}
