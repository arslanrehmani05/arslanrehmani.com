import Link from 'next/link';
import { ShieldCheck, Lock, Database, FileCheck, CheckCircle2 } from 'lucide-react';
import FinalCta from '@/components/final-cta';

export const metadata = {
  title: 'Security & Data Isolation Architecture | Arslan Rehmani',
  description: 'Zero hallucination guardrails, isolated staging buffers, PostgreSQL row-level security, and permanent audit trails.',
};

const PROTOCOLS = [
  {
    icon: Lock,
    title: 'Isolated Buffer Staging',
    desc: 'Autonomous models and document OCR extractors never receive direct WRITE access to production database tables. All mutations are quarantined in memory buffers or staging tables with uncommitted state.',
  },
  {
    icon: Database,
    title: 'PostgreSQL Relational Invariants',
    desc: 'Core ledgers enforce strict database-level check constraints, foreign keys, and unique indexes that physically reject invalid mathematical operations even if an upstream API attempts them.',
  },
  {
    icon: FileCheck,
    title: 'Cryptographic Audit Trails',
    desc: 'Every intake file, parsed payload, deterministic rule evaluation, and human reviewer decision is hashed and permanently logged with immutable timestamps for compliance audits.',
  },
  {
    icon: ShieldCheck,
    title: 'One-Click Human Exception Routing',
    desc: 'When variances occur (math error, unrecognized fee, out-of-stock item), processing pauses automatically. The exception is routed to designated personnel with exact visual diffs.',
  },
];

export default function SecurityPage() {
  return (
    <div className="py-12 md:py-16 space-y-16">
      <div className="max-w-6xl mx-auto px-6 space-y-4">
        <span className="eyebrow">Enterprise Reliability Architecture</span>
        <h1 className="headline text-4xl sm:text-5xl text-text-primary">
          Security, Isolation & Data Integrity
        </h1>
        <p className="text-base text-text-muted max-w-2xl leading-relaxed">
          The number one reason enterprise CFOs and operations leaders reject AI automation is fear of ledger corruption. Here is how my systems physically prevent bad data from reaching your books.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROTOCOLS.map((proto) => {
          const Icon = proto.icon;
          return (
            <div
              key={proto.title}
              className="rounded-2xl bg-bg-secondary/70 border border-border-color p-8 space-y-4"
            >
              <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border-color flex items-center justify-center text-accent-gold">
                <Icon className="w-5 h-5" />
              </div>
              <h2 className="headline text-xl text-text-primary">{proto.title}</h2>
              <p className="text-xs text-text-muted leading-relaxed">{proto.desc}</p>
            </div>
          );
        })}
      </div>

      <FinalCta />
    </div>
  );
}
