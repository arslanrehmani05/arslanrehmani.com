// components/agent-function-grid.tsx
import Link from 'next/link';
import { ArrowRight, Bot, Shield, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { getAgentCapabilities } from '@/lib/facts';

const MATURITY_COLORS: Record<string, string> = {
  'Running in production': 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40',
  'Prototype': 'text-amber-400 bg-amber-950/40 border-amber-800/40',
  'Design': 'text-text-subtle bg-bg-primary border-border-color',
};

export default function AgentFunctionGrid() {
  const capabilities = getAgentCapabilities();

  return (
    <section className="py-24 md:py-32 border-b border-border-color bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs uppercase font-mono tracking-wider text-text-subtle">
              Agent Capabilities &bull; Autonomous Operational Workers
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.1]">
              What agents can do for your operation.
            </h2>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              Every agent is an operational worker with scoped database permissions, spend budgets, strict rejection gates, and a human in the loop.
            </p>
          </div>

          <Link
            href="/agents"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-primary hover:text-accent-gold transition-colors font-mono shrink-0"
          >
            <span>Explore architecture &amp; failure injection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.id}
              className="p-6 rounded-3xl bg-bg-secondary/40 border border-border-color hover:border-text-primary/30 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border uppercase tracking-wider font-semibold ${
                      MATURITY_COLORS[cap.maturity] || 'text-text-subtle'
                    }`}
                  >
                    {cap.maturity}
                  </span>
                  <span className="text-[11px] font-mono text-text-subtle">
                    {cap.costPerRun}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-text-primary group-hover:text-accent-gold transition-colors leading-snug">
                  {cap.name}
                </h3>

                <p className="text-xs text-text-muted leading-relaxed">
                  {cap.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border-color/60 space-y-2">
                <div className="text-[10px] font-mono text-text-subtle">
                  Human approval point:
                </div>
                <div className="text-xs text-text-primary font-medium truncate">
                  {cap.humanApprovalPoints[0]}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note linking to decision tool */}
        <div className="mt-12 p-6 rounded-2xl bg-bg-secondary/30 border border-border-color flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <span>Unsure if your process needs an agent or a simple deterministic script?</span>
          <Link
            href="/tools/decision"
            className="text-text-primary underline hover:text-accent-gold font-medium shrink-0 flex items-center gap-1.5"
          >
            <span>Try the Agent-or-Workflow Decision Tool</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
