// components/security-claims.tsx
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Lock, KeyRound, Check } from 'lucide-react';

const claims = [
  {
    icon: Lock,
    title: 'Row-Level Security on Every Single Table',
    tag: 'Database Engine Level',
    claim: 'Zero public tables. Security policies are enforced inside PostgreSQL, not in application code. An unauthorized user cannot read or update rows even if client code is manipulated.',
    proofLinkText: 'Inspect sanitized RLS policy',
  },
  {
    icon: ShieldCheck,
    title: 'Deterministic Staging Before Any Model Output Commits',
    tag: 'AI Safety Architecture',
    claim: 'Probabilistic AI models propose records into isolated staging tables. Strict deterministic code validates data types, mathematical totals, and duplicate constraints before committing.',
    proofLinkText: 'Inspect staging validation pipeline',
  },
  {
    icon: KeyRound,
    title: 'Client Holds 100% of Accounts, Keys, and Source Code',
    tag: 'Zero Hostage Architecture',
    claim: 'All cloud accounts (Supabase, AWS, Vercel) are created under your organization. Arslan works via scoped IAM developer accounts. Master keys and source code belong to you on day one.',
    proofLinkText: 'Inspect ownership breakdown',
  },
];

export default function SecurityClaims() {
  return (
    <section className="py-24 md:py-32 border-b border-border-color bg-bg-secondary/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs uppercase font-mono tracking-wider text-text-subtle">
              Security &amp; Reliability &bull; Checkable Claims
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
              Engineered so you never have to wonder if the data is safe.
            </h2>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              Real reliability isn&apos;t a vague promise. Here are three architectural guarantees built into every deployment.
            </p>
          </div>
          <Link
            href="/security"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-primary hover:text-accent-gold transition-colors font-mono"
          >
            <span>View test matrix &amp; audit log preview</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {claims.map((claim) => {
            const Icon = claim.icon;
            return (
              <div
                key={claim.title}
                className="p-8 rounded-3xl bg-bg-primary border border-border-color hover:border-text-primary/30 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-bg-secondary border border-border-color flex items-center justify-center text-text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> Checkable
                    </span>
                  </div>

                  <div className="text-[11px] font-mono uppercase tracking-wider text-text-subtle">
                    {claim.tag}
                  </div>

                  <h3 className="text-xl font-bold text-text-primary leading-snug">
                    {claim.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {claim.claim}
                  </p>
                </div>

                <div className="pt-4 border-t border-border-color/60">
                  <Link
                    href="/security"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-text-primary hover:text-accent-gold transition-colors"
                  >
                    <span>{claim.proofLinkText}</span>
                    <ArrowRight className="w-3 h-3" />
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
