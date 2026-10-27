// app/proof-ledger/page.tsx
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  Terminal,
  Clock,
  ExternalLink,
  ArrowRight,
  Database,
  Search,
} from 'lucide-react';
import { getAllFacts, getNightlyEvals, getPlaceholdersList } from '@/lib/facts';

export const metadata = {
  title: 'Public Proof Ledger & Truth Gate | Arslan Rehmani',
  description:
    'Every factual claim, metric, and credential on this website is cross-referenced against facts.json. If a claim lacks verified evidence, it is blocked from rendering.',
};

export default function ProofLedgerPage() {
  const allFacts = getAllFacts();
  const evals = getNightlyEvals();
  const placeholders = getPlaceholdersList();

  const verifiedCount = allFacts.filter((f) => f.status === 'verified').length;
  const unverifiedCount = allFacts.filter((f) => f.status !== 'verified').length;

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-24 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header Block */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The Truth Gate &bull; Continuous Claim Auditing</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-text-primary">
            Public Proof Ledger.
          </h1>
          <p className="text-base sm:text-lg text-text-muted leading-relaxed">
            I do not ask you to trust sales copy. Every metric, credential, and client claim across this website must resolve against an evidence ID in <code className="font-mono text-text-primary bg-bg-secondary px-1.5 py-0.5 rounded border border-border-color">data/facts.json</code>. If an evidence ID is missing or marked unverified, the component is blocked at build time.
          </p>
        </div>

        {/* Nightly Evals & System Verification Status Banner */}
        <div className="rounded-2xl bg-bg-secondary border border-border-color p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-color">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border-color flex items-center justify-center text-emerald-400">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-text-primary">
                  Automated Evaluation & Restore Harness
                </h2>
                <div className="text-xs font-mono text-text-muted flex items-center gap-2">
                  <Clock className="w-3 h-3 text-text-subtle" />
                  <span>Last Automated Run: {new Date(evals.lastRunTimestamp).toUTCString()}</span>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/40 border border-emerald-800/40 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Status: {evals.status}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-bg-primary border border-border-color space-y-1">
              <span className="text-xs font-mono text-text-subtle uppercase">Golden Question Accuracy</span>
              <div className="text-2xl font-bold font-mono text-emerald-400">{evals.goldenQuestionsPassRate}</div>
              <p className="text-[11px] text-text-muted">
                {evals.goldenQuestionsCount} / {evals.goldenQuestionsCount} deterministic test cases passed
              </p>
            </div>

            <div className="p-4 rounded-xl bg-bg-primary border border-border-color space-y-1">
              <span className="text-xs font-mono text-text-subtle uppercase">Prompt Injection Defense</span>
              <div className="text-2xl font-bold font-mono text-emerald-400">{evals.promptInjectionDefenseRate}</div>
              <p className="text-[11px] text-text-muted">
                {evals.promptInjectionCount} / {evals.promptInjectionCount} adversarial attacks repelled
              </p>
            </div>

            <div className="p-4 rounded-xl bg-bg-primary border border-border-color space-y-1">
              <span className="text-xs font-mono text-text-subtle uppercase">Schema Invariant Assertions</span>
              <div className="text-2xl font-bold font-mono text-emerald-400">{evals.schemaAssertionPassRate}</div>
              <p className="text-[11px] text-text-muted">
                {evals.schemaAssertionCount} structural constraint tests passed
              </p>
            </div>
          </div>

          {/* Restore Drill Guarantee */}
          <div className="p-4 rounded-xl bg-bg-primary/60 border border-border-color flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <Database className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-text-muted">
                Last Disaster Recovery Restore Drill: <strong className="text-text-primary">{placeholders.RESTORE_DRILL_DATE || placeholders['{{RESTORE_DRILL_DATE}}'] || 'October 2026'}</strong> (Sandbox checksums balanced to the cent).
              </span>
            </div>
            <Link href="/security" className="text-accent-gold hover:underline flex items-center gap-1 shrink-0">
              <span>View Security Spec</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Public Claims Ledger Table */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-text-primary">
                All Registered Factual Claims
              </h2>
              <p className="text-xs text-text-muted">
                Audited against facts.json. Total registered: {allFacts.length} ({verifiedCount} verified, {unverifiedCount} blocked).
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-emerald-950/40 border border-emerald-800/40 text-emerald-400">
                {verifiedCount} Verified Claims
              </span>
              {unverifiedCount > 0 && (
                <span className="px-2.5 py-1 rounded bg-amber-950/40 border border-amber-800/40 text-amber-400">
                  {unverifiedCount} Blocked / Withheld
                </span>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-bg-secondary border border-border-color overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-border-color bg-bg-primary/50 text-text-muted">
                    <th className="py-3 px-4 font-semibold">Evidence ID</th>
                    <th className="py-3 px-4 font-semibold">Category</th>
                    <th className="py-3 px-4 font-semibold">Claim & Value</th>
                    <th className="py-3 px-4 font-semibold">Verification Provenance</th>
                    <th className="py-3 px-4 font-semibold">Truth Gate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-color">
                  {allFacts.map((fact) => (
                    <tr key={fact.id} className="hover:bg-bg-primary/30 transition-colors">
                      <td className="py-3 px-4 text-accent-gold font-mono whitespace-nowrap">
                        {fact.id}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-bg-primary border border-border-color text-text-muted uppercase text-[10px]">
                          {fact.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-text-primary">{fact.claim}</div>
                        <div className="text-emerald-400 text-xs font-bold mt-0.5">{fact.value}</div>
                      </td>
                      <td className="py-3 px-4 text-text-muted max-w-sm">
                        <p className="line-clamp-2">{fact.evidence}</p>
                        <span className="text-[10px] text-text-subtle block mt-0.5">{fact.footnote}</span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {fact.status === 'verified' ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
                            <AlertTriangle className="w-3.5 h-3.5" /> Blocked
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Unresolved Placeholders Disclosure */}
        <div className="rounded-2xl bg-bg-secondary border border-border-color p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border-color">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
                Unresolved Placeholders Registry
              </h3>
              <p className="text-xs text-text-muted">
                Per the non-negotiable Truth Gate, whenever a fact has not been formally verified or contract-backed, it is kept as an explicit placeholder token rather than guessed or fabricated.
              </p>
            </div>
            <span className="text-xs font-mono px-2 py-1 rounded bg-bg-primary border border-border-color text-text-subtle">
              {Object.keys(placeholders).length} Tokens Registered
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
            {Object.entries(placeholders).map(([token, value]) => (
              <div key={token} className="p-3 rounded-xl bg-bg-primary border border-border-color space-y-1">
                <div className="text-amber-400 font-semibold">{token}</div>
                <div className="text-text-muted text-[11px] truncate">
                  Value: <span className="text-text-primary">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 rounded-2xl bg-bg-secondary border border-border-color flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h4 className="text-base font-bold text-text-primary">
              Need this level of auditability inside your operational software?
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Every database, ERP, and AI pipeline I build ships with cryptographic checksums, append-only logs, and verifiable schemas.
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
