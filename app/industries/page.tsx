// app/industries/page.tsx
import Link from 'next/link';
import {
  Factory,
  ShoppingBag,
  Landmark,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  Scale,
  Calculator,
} from 'lucide-react';

export const metadata = {
  title: 'Industry Solutions & Operational Deep-Dives | Arslan Rehmani',
  description:
    'Tailored operational architectures for manufacturing mills, e-commerce operators, finance teams, and professional service firms transitioning from spreadsheets to secure systems.',
};

const INDUSTRIES = [
  {
    id: 'manufacturing',
    title: 'Textile & Discrete Manufacturing',
    icon: Factory,
    summary:
      'Replacing paper shift logs, chalk tallies, and manual loom registers with audited real-time ERP systems and deterministic piece-rate payroll.',
    painPoints: [
      'Shift supervisors recording fabric defects, warp breaks, and operator output on paper registers that are transcribed into spreadsheets 24 hours later.',
      'Yarn and greige inventory shrinkage: physical stock counts never matching the purchase register or loom consumption sheets.',
      'Piece-rate payroll disputes: operator wages calculated manually from physical tokens or shift logbooks with frequent transcription errors.',
    ],
    architecture:
      'PostgreSQL relational schema with barcode-authenticated tablet entry at loom stations, automated yardage calculations, and double-entry piece-rate payroll generation.',
    caseStudyHref: '/work/textilemode-manufacturing-erp',
    caseStudyTitle: 'Case Study: TextileMode (27 Looms Migrated)',
    recommendedTools: [
      { name: 'Spreadsheet Readiness Check', href: '/tools/readiness' },
      { name: 'Operational Process Mapper', href: '/tools/process-mapper' },
    ],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce & Multi-Channel Logistics',
    icon: ShoppingBag,
    summary:
      'Reconciling inventory, 3PL warehouse dispatches, and returns across Shopify, Amazon, and ERP ledgers with zero silent stockouts.',
    painPoints: [
      'Multi-channel inventory drift: selling out-of-stock items on Amazon while inventory sits uncounted in a returns holding pen.',
      'Manual 3PL shipping charge reconciliation: carrier invoices with hundreds of micro-surcharges paid without automated line-item verification.',
      'Returns and exchange leakage: customer refunds issued without confirming physical return receipt into inventory.',
    ],
    architecture:
      'Webhook ingestion buffer with deterministic SKU mapping, automated carrier rate card reconciliation, and staged returns inspection queues.',
    caseStudyHref: '/work/belhide-ops',
    caseStudyTitle: 'Case Study: Belhide Ops (Multi-Channel Order Pipeline)',
    recommendedTools: [
      { name: 'Reconciliation Gap Checker', href: '/tools/reconciliation' },
      { name: 'Agent Cost Estimator', href: '/tools/cost-estimator' },
    ],
  },
  {
    id: 'finance',
    title: 'Finance & Accounting Operations',
    icon: Landmark,
    summary:
      'Eliminating month-end close panic, unrecorded liabilities, and fragile cross-workbook VLOOKUP chains with double-entry invariant ledgers.',
    painPoints: [
      'Month-end close taking 5–10 business days because staff must manually reconcile bank statements against general ledger accounts.',
      'Fragile master workbooks with thousands of VLOOKUP and IMPORTRANGE formulas that freeze laptops and break when files are moved.',
      'Zero audit trails: unable to prove who edited a line item, modified a transaction value, or deleted a voucher.',
    ],
    architecture:
      'Append-only double-entry ledger with database-level debit=credit invariant triggers, automated bank feed ingestion, and role-based access control.',
    caseStudyHref: '/work/financial-reconciliation-suite',
    caseStudyTitle: 'Case Study: Financial Reconciliation Engine (80% Time Reduction)',
    recommendedTools: [
      { name: 'Manual-Work Cost Calculator', href: '/tools/calculator' },
      { name: 'Data Quality Scanner', href: '/tools/scanner' },
    ],
  },
  {
    id: 'professional-services',
    title: 'Professional Services & Digital Agencies',
    icon: Briefcase,
    summary:
      'Closing billing leakage, automating contractor timesheet validation, and providing real-time margin visibility across client engagements.',
    painPoints: [
      'Contractor hours submitted via disconnected spreadsheets and Slack messages, resulting in unbilled client disbursements.',
      'Fixed-fee projects drifting into negative margin without early operational warning.',
      'Invoice generation delayed by 2 weeks after milestone completion due to manual verification of billable expenses.',
    ],
    architecture:
      'Timesheet ingestion pipeline with automated budget threshold alerts, client milestone approval portals, and integrated invoice generation.',
    caseStudyHref: '/work',
    caseStudyTitle: 'View All Operational Projects',
    recommendedTools: [
      { name: 'Agent-or-Workflow Decision Tool', href: '/tools/decision' },
      { name: 'Manual-Work Cost Calculator', href: '/tools/calculator' },
    ],
  },
];

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-24 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header Block */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Field-Tested Operational Patterns</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-text-primary">
            Built for Businesses Where Data Must Be Right.
          </h1>
          <p className="text-base sm:text-lg text-text-muted leading-relaxed">
            I work primarily with owner-operators, finance controllers, and operations leads across manufacturing, logistics, and digital services who have outgrown spreadsheets but cannot stomach a multi-million-dollar SAP or NetSuite implementation.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="space-y-12">
          {INDUSTRIES.map((industry) => (
            <div
              key={industry.id}
              className="rounded-2xl bg-bg-secondary border border-border-color p-6 sm:p-10 space-y-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-color">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-bg-primary border border-border-color flex items-center justify-center text-text-primary">
                    <industry.icon className="w-6 h-6 text-accent-gold" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-accent-gold uppercase">Sector Architecture</span>
                    <h2 className="text-2xl font-bold text-text-primary">{industry.title}</h2>
                  </div>
                </div>

                <Link
                  href={industry.caseStudyHref}
                  className="btn-ghost !px-4 !py-2 !text-xs font-mono flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span>{industry.caseStudyTitle}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <p className="text-sm sm:text-base text-text-primary leading-relaxed">
                {industry.summary}
              </p>

              {/* Three Pillars: Problems, Target Architecture, Tools */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* Column 1: Core Operational Problems */}
                <div className="p-5 rounded-xl bg-bg-primary border border-border-color space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold">
                    The Problems in Your Words
                  </h3>
                  <ul className="space-y-2.5 text-xs text-text-muted leading-relaxed">
                    {industry.painPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-400 font-mono mt-0.5">&bull;</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: Hardened System Solution */}
                <div className="p-5 rounded-xl bg-bg-primary border border-border-color space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                    Hardened Architecture
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {industry.architecture}
                  </p>
                  <div className="pt-2 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>0 cent balance drift &bull; Full audit trail</span>
                  </div>
                </div>

                {/* Column 3: Recommended Diagnostic Tools */}
                <div className="p-5 rounded-xl bg-bg-primary border border-border-color space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-text-primary font-semibold">
                    Free Operational Diagnostics
                  </h3>
                  <p className="text-xs text-text-muted">
                    Test your current spreadsheets client-side before scoping:
                  </p>
                  <div className="space-y-2 pt-1">
                    {industry.recommendedTools.map((tool) => (
                      <Link
                        key={tool.name}
                        href={tool.href}
                        className="block p-2 rounded-lg bg-bg-secondary border border-border-color hover:border-border-gold transition-colors text-xs font-mono text-text-primary"
                      >
                        {tool.name} &rarr;
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="p-8 rounded-2xl bg-bg-secondary border border-border-color flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h4 className="text-base font-bold text-text-primary">
              Do not see your exact industry listed?
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              If your operations rely on spreadsheets, physical logs, or disconnected SaaS tools that do not reconcile, the underlying mathematical and architectural principles remain identical.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-primary !px-6 !py-3 !text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 whitespace-nowrap"
          >
            <span>Book a 20-minute discovery call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
