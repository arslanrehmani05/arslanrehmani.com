// app/tools/page.tsx
import Link from 'next/link';
import { ArrowRight, FileSpreadsheet, Scale, Calculator, CheckSquare, GitFork, DollarSign, Lock, Network, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Operational Tools Suite | Arslan Rehmani',
  description:
    'Eight honest, client-side operational tools. Nothing uploaded to external servers. Formulas and assumptions shown on screen, zero email gating.',
};

const tools = [
  {
    id: 'scanner',
    title: 'Data Quality Scanner',
    href: '/tools/scanner',
    icon: FileSpreadsheet,
    badge: 'Runs 100% in Browser',
    desc: 'Drop a CSV. Parsing runs locally in your browser with zero data uploaded. Profiles duplicates, missing values, type mismatches, outliers, and suspicious dates.',
    formula: 'Deterministic profiling: null counts, uniqueness ratio, z-score outlier detection.',
  },
  {
    id: 'reconciliation',
    title: 'Reconciliation Gap Checker',
    href: '/tools/reconciliation',
    icon: Scale,
    badge: 'Client-Side Key Matcher',
    desc: 'Compare two CSV files (e.g. bank statement vs purchase ledger) by key column. Identifies missing rows, surplus records, and cent-level line variances.',
    formula: 'Inner/outer join comparison with tolerance threshold and net discrepancy sum.',
  },
  {
    id: 'calculator',
    title: 'Manual-Work Cost Calculator',
    href: '/tools/calculator',
    icon: Calculator,
    badge: 'Visitor Inputs Only',
    desc: 'Calculate the annual drag of repetitive manual clerical workflows using your own hours, rates, and error costs. Shows ranges, not false precision.',
    formula: 'Annual Cost = (Hours × Rate × Weeks) + (Error Frequency × Remediation Cost).',
  },
  {
    id: 'readiness',
    title: 'Spreadsheet-to-System Readiness Check',
    href: '/tools/readiness',
    icon: CheckSquare,
    badge: '12-Point Transparent Rubric',
    desc: 'Assess whether your operational workbooks have reached the critical breaking point. Transparent scoring rubric with prioritized remediation steps.',
    formula: 'Weighted score across schema fragility, concurrent users, audit risks, and manual latency.',
  },
  {
    id: 'decision',
    title: 'Agent-or-Workflow Decision Tool',
    href: '/tools/decision',
    icon: GitFork,
    badge: 'Pragmatic Decision Tree',
    desc: 'An honest diagnostic tree that frequently recommends simpler deterministic scripts over AI agents when rule-based automation is faster, cheaper, and safer.',
    formula: 'Branching tree evaluating structured vs unstructured inputs, error tolerance, and latency.',
  },
  {
    id: 'cost-estimator',
    title: 'Agent Cost Estimator',
    href: '/tools/cost-estimator',
    icon: DollarSign,
    badge: 'Dated API Pricing File',
    desc: 'Compute realistic monthly API spend for agentic pipelines. Accounts for token volumes, multi-turn retries, structured extraction schemas, and human review time.',
    formula: 'Cost = (Tokens_in × Rate_in) + (Tokens_out × Rate_out) × Volume × (1 + Retry_rate).',
  },
  {
    id: 'access-audit',
    title: 'Access & Backup Self-Audit',
    href: '/tools/access-audit',
    icon: Lock,
    badge: 'Security Checklist',
    desc: 'Checklist audit for Postgres and Supabase deployments. Evaluates public table risks, RLS policies, service role leak hazards, and restore drill frequency.',
    formula: 'Security health index based on CIS Benchmarks & PostgreSQL defense-in-depth principles.',
  },
  {
    id: 'process-mapper',
    title: 'Operational Process Mapper',
    href: '/tools/process-mapper',
    icon: Network,
    badge: 'Interactive Flow Builder',
    desc: 'Map how data moves through your business today. Generates a one-page current-state diagram and a proposed staged database pipeline with zero data lock-in.',
    formula: 'Deterministic SVG layout generator compiling nodes, bottlenecks, and handoff points.',
  },
];

export default function ToolsHubPage() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header Block */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono text-text-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Honest Operational Tools &bull; Zero Email Gates</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-text-primary">
            Diagnostic Tools Built to Give Honest Answers.
          </h1>
          <p className="text-base sm:text-lg text-text-muted leading-relaxed">
            Every tool below runs entirely in your browser. No files are uploaded to my servers, all formulas and assumptions are shown on screen for you to edit, and results are never held hostage behind an email form.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className="p-8 rounded-3xl bg-bg-secondary/40 border border-border-color hover:border-text-primary/30 transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border-color flex items-center justify-center text-text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-text-subtle uppercase tracking-wider px-2.5 py-1 rounded-full bg-bg-primary border border-border-color">
                      {tool.badge}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-text-primary group-hover:text-accent-gold transition-colors">
                    {tool.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {tool.desc}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-border-color/60">
                  <div className="p-3 rounded-xl bg-bg-primary/80 border border-border-color/80 text-[11px] font-mono text-text-subtle">
                    <span className="text-text-primary font-medium">Formula: </span>
                    {tool.formula}
                  </div>

                  <Link
                    href={tool.href}
                    className="btn-primary !py-2.5 !text-xs w-full text-center flex items-center justify-center gap-2 uppercase tracking-wider font-semibold"
                  >
                    <span>Launch {tool.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & Architecture Note */}
        <div className="p-6 rounded-2xl bg-bg-secondary/40 border border-border-color text-xs font-mono text-text-muted flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Privacy Guarantee: CSV processing for the Scanner and Gap Checker runs exclusively inside your browser&apos;s JavaScript engine. No row data or uploaded financial data ever leaves your device.
          </p>
        </div>
      </div>
    </main>
  );
}
