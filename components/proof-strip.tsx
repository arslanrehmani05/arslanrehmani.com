// components/proof-strip.tsx
import Link from 'next/link';
import { getProofStripMetrics } from '@/lib/facts';
import { ExternalLink } from 'lucide-react';

const CASE_STUDY_LINKS: Record<string, string> = {
  'fact-textilemode-looms': '/work/textilemode-erp',
  'fact-textilemode-hours': '/work/textilemode-erp',
  'fact-textilemode-live': '/work/textilemode-erp',
  'fact-fin-reconcile-time': '/work/financial-reconciliation',
};

export default function ProofStrip() {
  const metrics = getProofStripMetrics();

  if (metrics.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-border-color bg-bg-secondary/40 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="text-xs uppercase font-mono tracking-wider text-text-subtle">
            Verified Operational Outcomes &bull; Reference Evidence IDs
          </div>
          <div className="text-xs text-text-muted">
            All metrics measured in active production deployments.
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((item, idx) => {
            const caseStudyUrl = CASE_STUDY_LINKS[item.id] || '/work';

            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-bg-primary border border-border-color flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-text-subtle">
                    <span>Evidence #{idx + 1}</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-1.5 py-0.5 rounded">
                      verified
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary mt-2">
                    {item.value}
                  </div>
                  <p className="text-xs text-text-muted mt-1 leading-snug">
                    {item.claim}
                  </p>
                </div>

                <div className="pt-2 border-t border-border-color/60">
                  <Link
                    href={caseStudyUrl}
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono text-text-subtle hover:text-text-primary transition-colors"
                  >
                    <span>{item.footnote}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
