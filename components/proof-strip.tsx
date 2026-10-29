import { ShieldCheck, Cpu, Database, CheckCheck } from 'lucide-react';

const PILLARS = [
  {
    icon: Database,
    title: 'Deterministic Database Layer',
    desc: 'Strict relational schemas (PostgreSQL / Supabase) enforcing foreign keys, check constraints, and ACID transactions.',
  },
  {
    icon: ShieldCheck,
    title: 'Isolated Safety Staging',
    desc: 'Zero raw model writes to production. Every AI extraction is quarantined in uncommitted staging tables first.',
  },
  {
    icon: Cpu,
    title: 'Rule Invariant Engine',
    desc: 'Mathematical checksums, rate cards, and line-item audits execute via deterministic code before commit.',
  },
  {
    icon: CheckCheck,
    title: 'Human-in-the-Loop Signoff',
    desc: 'Anomalies trigger one-click human review queues with highlighted deltas. 100% audit log permanence.',
  },
];

export default function ProofStrip() {
  return (
    <section className="border-t border-border-color py-16 px-6 bg-bg-primary">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="eyebrow justify-center">Engineering Principles</span>
          <h2 className="headline text-2xl sm:text-3xl text-text-primary">
            How I guarantee zero production corruption.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-6 rounded-2xl bg-bg-secondary/60 border border-border-color space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border-color flex items-center justify-center text-accent-gold">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-text-primary">{p.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
