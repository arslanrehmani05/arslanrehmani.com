import Link from 'next/link';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import FinalCta from '@/components/final-cta';

export const metadata = {
  title: 'Case Studies & Production Outcomes | Arslan Rehmani',
  description: 'Verified operational systems case studies: TextileMode Mill ERP and Belhide Tannery Lot Tracking.',
};

const CASE_STUDIES = [
  {
    slug: 'textile-mode',
    title: 'Textile Mode Mill: Full-Scale Industrial ERP',
    sector: 'Textile Manufacturing',
    problem: 'Broken spreadsheet spaghetti between loom schedules, yarn warehouse, dyeing lots, and accounting.',
    solution: 'Engineered custom PostgreSQL ERP with deterministic staging. Allowed the mill to eliminate administrative and accounting headcount while achieving zero accounting discrepancies.',
    metrics: [
      { label: 'Admin Staff Transitioned', value: '100% Floor Automated' },
      { label: 'Ledger Corruption', value: '0 Corrupt Rows' },
      { label: 'Reconciliation Speed', value: 'Real-Time vs 14 Days' },
    ],
  },
  {
    slug: 'belhide',
    title: 'Belhide Industrial Leather: Raw Hide Grading System',
    sector: 'Tannery & Supply Chain',
    problem: 'Handwritten paper grading sheets on the receiving dock resulting in 12% supplier weight disputes.',
    solution: 'Deployed mobile barcode grading with automated pricing checks and automated batch chemical dosing formulas.',
    metrics: [
      { label: 'Supplier Billing Disputes', value: 'Dropped to <0.5%' },
      { label: 'Raw Traceability', value: '+18.4% Material Yield' },
      { label: 'Floor Data Entry', value: 'Zero Handwritten Logs' },
    ],
  },
];

export default function WorkPage() {
  return (
    <div className="py-12 md:py-16 space-y-16">
      <div className="max-w-6xl mx-auto px-6 space-y-4">
        <span className="eyebrow">Verified Production Outcomes</span>
        <h1 className="headline text-4xl sm:text-5xl text-text-primary">
          Production Systems Case Studies
        </h1>
        <p className="text-base text-text-muted max-w-2xl leading-relaxed">
          I do not build fragile proof-of-concepts. Here are full-scale software systems operating in high-volume industrial and commercial businesses.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 gap-8">
        {CASE_STUDIES.map((cs) => (
          <div
            key={cs.slug}
            className="rounded-2xl bg-bg-secondary/70 border border-border-color p-8 md:p-10 space-y-8"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-accent-gold uppercase font-semibold">{cs.sector}</span>
                <span className="text-text-subtle">Production Deployed</span>
              </div>
              <h2 className="headline text-2xl sm:text-3xl text-text-primary">{cs.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-text-muted">
              <div className="p-5 rounded-xl bg-bg-primary border border-border-color space-y-2">
                <span className="text-xs font-mono text-red-400 uppercase font-semibold block">The Operational Bottleneck</span>
                <p className="leading-relaxed">{cs.problem}</p>
              </div>
              <div className="p-5 rounded-xl bg-bg-primary border border-border-color space-y-2">
                <span className="text-xs font-mono text-emerald-400 uppercase font-semibold block">The Engineered Solution</span>
                <p className="leading-relaxed">{cs.solution}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border-color">
              {cs.metrics.map((m) => (
                <div key={m.label} className="font-mono">
                  <span className="text-xs text-text-subtle block">{m.label}</span>
                  <span className="text-lg font-bold text-text-primary">{m.value}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href={`/work/${cs.slug}`}
                className="text-xs font-mono text-accent-gold hover:underline flex items-center gap-1.5 font-semibold"
              >
                <span>Read in-depth technical architecture breakdown</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <FinalCta />
    </div>
  );
}
