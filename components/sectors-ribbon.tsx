// components/sectors-ribbon.tsx
import Link from 'next/link';
import {
  ShoppingBag,
  Factory,
  Boxes,
  Landmark,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Database,
  Lock,
} from 'lucide-react';

const SECTORS = [
  {
    id: 'ecommerce',
    title: 'E-Commerce & Multi-Channel Logistics',
    icon: ShoppingBag,
    summary:
      'Eliminating inventory drift across Shopify, Amazon FBA, and 3PL warehouses with automated carrier invoice audits.',
    liveAsset: 'Belhide Ops (erp.belhide.com)',
    capabilities: [
      'Real-time inventory sync across channels with zero stockouts',
      'Automated carrier and warehouse invoice audits flagging overcharges',
      'Streamlined returns workflow confirming physical receipt before refunds',
    ],
    anchor: '/industries#ecommerce',
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing & Discrete Production',
    icon: Factory,
    summary:
      'Replacing paper shift logs and manual registers with real-time floor tracking and automated worker payroll.',
    liveAsset: 'TextileMode ERP (erp.textilemode.com)',
    capabilities: [
      'Simple tablet interfaces built for fast, error-free factory floor entry',
      'Real-time tracking of raw material usage, waste, and finished goods',
      'Automated worker piece-rate payroll calculated straight from production logs',
    ],
    anchor: '/industries#manufacturing',
  },
  {
    id: 'wholesale',
    title: 'Wholesale & B2B Distribution',
    icon: Boxes,
    summary:
      'Automating high-volume supplier purchase order intake, customer tier pricing, and dispatch fulfillment without software freezes.',
    liveAsset: 'Custom Distribution Pipelines',
    capabilities: [
      'Instant purchase order intake checking prices and inventory automatically',
      'Smart multi-warehouse dispatch queues preventing delayed shipments',
      'Three-way match between customer orders, packing slips, and carrier bills',
    ],
    anchor: '/industries#wholesale',
  },
  {
    id: 'finance',
    title: 'Finance & Multi-Entity Operations',
    icon: Landmark,
    summary:
      'Consolidating multi-currency ledgers, automating bank statement reconciliation, and compressing month-end closes from days to minutes.',
    liveAsset: 'Financial Reconcile Suite (98% match)',
    capabilities: [
      'Rock-solid accounting ledger where numbers balance to the exact cent',
      'Automated daily bank feed matching cutting month-end close to minutes',
      'Permanent audit trail showing who created, approved, or edited each record',
    ],
    anchor: '/industries#finance',
  },
];

export default function SectorsRibbon() {
  return (
    <section className="py-20 md:py-28 border-b border-border-color bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono text-accent-gold">
              <span>Operational Environments &bull; Field-Tested Systems</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
              Where Manual Overhead and Software Silos Break.
            </h2>
            <p className="text-base sm:text-lg text-text-muted leading-relaxed">
              We specialize by <span className="text-text-primary font-medium">operational bottleneck and autonomous execution</span>, not narrow industry silos. Whether your business coordinates physical production, multi-channel commerce, or high-volume customer fulfillment, the architectural fundamentals remain identical.
            </p>
          </div>

          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-gold hover:text-accent-gold/80 transition-colors group self-start md:self-end"
          >
            <span>Explore all industry architectures</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Sector Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SECTORS.map((sector) => {
            const Icon = sector.icon;
            return (
              <div
                key={sector.id}
                className="p-6 rounded-2xl bg-bg-secondary/40 border border-border-color flex flex-col justify-between space-y-6 hover:border-text-primary/30 transition-all duration-200 group"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border-color flex items-center justify-center text-accent-gold group-hover:text-text-primary group-hover:border-accent-gold/40 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-text-primary group-hover:text-accent-gold transition-colors">
                      {sector.title}
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {sector.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border-color/60 space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-text-subtle">
                      Core Workflows:
                    </div>
                    <ul className="space-y-1.5">
                      {sector.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-text-muted">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-border-color/60 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-text-subtle">Reference:</span>
                    <span className="text-text-primary font-medium truncate max-w-[150px]">
                      {sector.liveAsset}
                    </span>
                  </div>
                  <Link
                    href={sector.anchor}
                    className="text-xs font-semibold text-text-primary hover:text-accent-gold flex items-center justify-between pt-1 group/link"
                  >
                    <span>View Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5 text-text-subtle group-hover/link:text-accent-gold group-hover/link:translate-x-0.5 transition-all" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Operational Qualification Filter (The Anti-Cheap / Executive Filter) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-bg-secondary/70 border border-border-color flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-3xl">
            <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border-color flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-accent-gold font-semibold">
                  Engineering Standards &amp; Client Fit
                </span>
                <span className="text-text-subtle text-xs">&bull;</span>
                <span className="text-xs text-text-muted">Production Software vs. Disposable Scripts</span>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                Designed for businesses with <span className="text-text-primary font-medium">$1M–$50M in annual transaction volume</span> or teams losing 20+ hours weekly to manual data reconciliation. We build dedicated, private software applications with <span className="text-text-primary font-medium">100% client code and data ownership</span>—never brittle no-code patches or unverified AI outputs.
              </p>
            </div>
          </div>

          <Link
            href="/services"
            className="btn-primary !pl-5 !pr-1.5 !py-2 !text-xs font-semibold uppercase tracking-wider whitespace-nowrap flex items-center gap-2 self-stretch md:self-auto justify-center group shrink-0"
          >
            <span>Review Scope &amp; Pricing</span>
            <span className="btn-arrow-badge w-6 h-6">
              <ArrowRight className="w-3 h-3 text-white" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
