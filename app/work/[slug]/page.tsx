import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, ShieldCheck, Database, Layers } from 'lucide-react';
import FinalCta from '@/components/final-cta';

interface PageProps {
  params: { slug: string };
}

const CASE_STUDIES: Record<string, {
  title: string;
  client: string;
  sector: string;
  timeline: string;
  headline: string;
  background: string;
  problem: string[];
  architecture: string[];
  outcomes: { label: string; value: string }[];
}> = {
  'textile-mode': {
    title: 'Textile Mode Mill ERP',
    client: 'Textile Mode (Pvt.) Ltd.',
    sector: 'Industrial Textile Manufacturing',
    timeline: '14+ Months Continuous Production',
    headline: 'Replacing legacy administrative & accounting floors with deterministic ERP pipelines.',
    background: 'I was initially brought in to fix malfunctioning spreadsheet templates for yarn accounting. Recognizing that spreadsheets could never enforce referential integrity across complex spinning, weaving, and dyeing cycles, I developed a production-ready software system starting with a single department and scaling to the entire mill enterprise.',
    problem: [
      'Yarn procurement math variances that escaped manual notice, leading to unaccounted material leakage.',
      'Shop-floor paper tickets for dyeing batches lost in transmission, causing repeat re-dyeing runs.',
      'Reconciliation lag of up to 30 days between warehouse shipments and core accounting ledgers.',
      'High administrative overhead of clerical data entry staff constantly re-typing numbers.',
    ],
    architecture: [
      'PostgreSQL Relational Core: Enforces foreign key constraints, composite unique indexes, and audit logs.',
      'Isolated Safety Staging: All machine and dock inputs stage in quarantine tables before ledger write.',
      'Deterministic Rule Engine: Automated arithmetic verification of invoice line items against weighbridge logs.',
      'Human-in-the-Loop Queue: Discrepancies flagged instantly for factory manager sign-off.',
    ],
    outcomes: [
      { label: 'Administrative Headcount', value: '100% Transitioned / Floor Replaced' },
      { label: 'Ledger Corruption Rate', value: '0.00% Corrupt Transactions' },
      { label: 'Dispute Resolution Time', value: 'Instant with SHA256 Audit Logs' },
      { label: 'Yarn Material Waste', value: 'Reduced by 14.8%' },
    ],
  },
  'belhide': {
    title: 'Belhide Tannery Lot Tracking',
    client: 'Belhide Industrial',
    sector: 'Tannery & Raw Leather Supply Chain',
    timeline: 'Production Active',
    headline: 'Real-time dock grading and lot tracing from raw animal hide to finished export drum.',
    background: 'Belhide handled thousands of square feet of raw hides daily with handwritten paper grading slips. Disputes over moisture content and defect grades constantly held up payments to suppliers and distorted cost-per-drum calculations.',
    problem: [
      'Graders on the wet dock recorded hide weights on clipboards that frequently blurred or smeared.',
      'Chemical tanning recipes were manually calculated, leading to inconsistent drum batches.',
      'Suppliers disputed grading deductibles on 12% of total delivered shipments.',
    ],
    architecture: [
      'Supabase Database Layer: Real-time subscriptions for dock scale updates and warehouse status.',
      'Mobile Barcode Flow: Ruggedized tablet interface for immediate grading tag printing.',
      'Automated Formula Engine: Chemical dosing ratios automatically calculated based on lot moisture.',
    ],
    outcomes: [
      { label: 'Supplier Billing Disputes', value: 'Dropped to <0.5%' },
      { label: 'Traceability Accuracy', value: '100% Lot Lineage' },
      { label: 'Chemical Waste', value: 'Reduced by 11.2%' },
      { label: 'Documentation Time', value: 'Real-time vs 48hr delay' },
    ],
  },
};

export default function CaseStudyPage({ params }: PageProps) {
  const data = CASE_STUDIES[params.slug];
  if (!data) notFound();

  return (
    <div className="py-12 md:py-16 space-y-16">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all case studies</span>
        </Link>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs font-mono text-accent-gold">
            <span>{data.sector}</span>
            <span>·</span>
            <span>{data.timeline}</span>
          </div>
          <h1 className="headline text-3xl sm:text-5xl text-text-primary leading-[1.1]">
            {data.title}
          </h1>
          <p className="text-lg text-text-muted leading-relaxed">
            {data.headline}
          </p>
        </div>

        {/* Outcomes Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-bg-secondary/70 border border-border-color font-mono">
          {data.outcomes.map((o) => (
            <div key={o.label}>
              <span className="text-[11px] text-text-subtle block">{o.label}</span>
              <span className="text-base font-bold text-accent-gold mt-1 block">{o.value}</span>
            </div>
          ))}
        </div>

        {/* Narrative Sections */}
        <div className="space-y-10 text-sm leading-relaxed text-text-muted">
          <div className="space-y-3">
            <h2 className="headline text-xl text-text-primary">Executive Background</h2>
            <p>{data.background}</p>
          </div>

          <div className="space-y-3">
            <h2 className="headline text-xl text-text-primary">The Core Operational Bottlenecks</h2>
            <ul className="space-y-2">
              {data.problem.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0 font-mono">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="headline text-xl text-text-primary">The Engineered System Architecture</h2>
            <ul className="space-y-2">
              {data.architecture.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <FinalCta />
    </div>
  );
}
