import type { Metadata } from 'next';
import Link from 'next/link';
import { Bot, ShieldCheck, CheckCircle2, ArrowRight, Layers, Cpu, Database, Eye, Terminal, Sparkles, Scale, Lock } from 'lucide-react';
import AgentsTopology from '@/components/agents-topology';
import FinalCta from '@/components/final-cta';

export const metadata: Metadata = {
  title: 'Autonomous Multi-Agent Architectures | Arslan Rehmani',
  description: 'Production-grade multi-agent systems for high-stakes enterprise operations. Engineered with deterministic state machines, isolated staging buffers, and zero ledger risk.',
  openGraph: {
    title: 'Autonomous Multi-Agent Architectures | Arslan Rehmani',
    description: 'Production-grade multi-agent systems for high-stakes enterprise operations. Engineered with deterministic state machines, isolated staging buffers, and zero ledger risk.',
    type: 'website',
  },
};

interface AgentSpec {
  id: string;
  title: string;
  sector: string;
  role: string;
  trigger: string;
  reasoning: string;
  invariant: string;
  economicImpact: string;
  stack: string;
}

const AGENT_SPECIFICATIONS: AgentSpec[] = [
  {
    id: 'accounts-payable',
    title: 'Autonomous Accounts Payable & 3-Way Reconciliation Agent',
    sector: 'Manufacturing & Distribution',
    role: 'Automated Supplier Invoice Ingestion, Line-Item Audit, and Ledger Staging',
    trigger: 'Inbound supplier invoice email webhook or PDF upload to secure staging bucket.',
    reasoning: 'Performs OCR and table extraction on multi-page invoices. Cross-references line items against ERP Purchase Orders (POs) and receiving warehouse goods receipt notes (GRNs).',
    invariant: 'Σ(line_items) + computed_tax == total_claimed && PO_remaining_balance >= invoice_amount. Zero variance tolerated without human signoff.',
    economicImpact: '80–85% reduction in manual AP accounting hours; completely eliminates double-payment and vendor billing creep.',
    stack: 'Next.js + Postgres Isolated Staging + Deterministic Math Engine',
  },
  {
    id: 'freight-dispute',
    title: 'Freight Rate & Carrier Dispute Recovery Agent',
    sector: 'Logistics, Wholesale & 3PL',
    role: 'Carrier Manifest Audit, Rate Card Re-Calculation, and Claim Generation',
    trigger: 'Weekly carrier EDI 210 / CSV billing manifest drop or SFTP synchronization.',
    reasoning: 'Re-evaluates every shipped consignment against contractual rate cards, warehouse certified scale logs, and dimensional weight benchmarks. Detects unauthorized accessorial surcharges.',
    invariant: 'Billed rate must strictly match contract rate card zone matrix + certified scale weight within 0.5% tolerance.',
    economicImpact: 'Recovers 4% to 9% of gross annual freight spend directly to company bottom line.',
    stack: 'EDI 210/214 Ingestion Pipeline + Custom Tariffs Rule Engine',
  },
  {
    id: 'inventory-allocation',
    title: 'Multi-Channel Stock Balancing & Replenishment Agent',
    sector: 'E-commerce & Multi-Warehouse Retail',
    role: 'Velocity Tracking, Safety Stock Calculation, and Autonomous PO Drafting',
    trigger: 'Real-time sales velocity event streams (Shopify, Amazon SP-API, B2B wholesale orders).',
    reasoning: 'Models lead-time volatility and seasonality across SKUs. Dynamically adjusts safety stock thresholds and drafts vendor purchase orders before critical stockouts trigger.',
    invariant: 'Drafted PO commitment cannot violate working capital reserve ceiling or vendor Minimum Order Quantity (MOQ).',
    economicImpact: 'Eliminates high-margin stockout revenue loss while preventing excess working capital lockup.',
    stack: 'Supabase Real-Time Subscriptions + Deterministic Invariant Check',
  },
  {
    id: 'executive-briefing',
    title: 'Autonomous Operational Synthesis & Anomaly Agent',
    sector: 'Enterprise Operations & C-Suite',
    role: 'Cross-Departmental Data Synthesis, Cash Flow Forecast, and Anomaly Detection',
    trigger: 'Scheduled cron execution at 06:00 AM daily across all corporate data repositories.',
    reasoning: 'Queries read-replica databases across ERP, CRM, banking APIs, and production floor logs. Synthesizes an unvarnished 2-minute executive brief highlighting margin leaks and anomalies.',
    invariant: 'Every cited metric is 100% grounded in verified SQL execution; zero speculative extrapolations.',
    stack: 'Read-Only Replicated Postgres + Strict JSON Output Validation',
    economicImpact: 'Saves 10+ hours per week of manual executive reporting and provides same-day visibility into operational drag.',
  },
];

const ENGINEERING_AXIOMS = [
  {
    axiom: 'Axiom I',
    title: 'Determinism Over Probabilistic Arithmetic',
    description: 'Language models excel at perception, schema normalization, and contextual comprehension. They are never permitted to calculate sums, verify ledger balances, or determine financial commits. Mathematical verification is always handled by pure code.',
  },
  {
    axiom: 'Axiom II',
    title: 'Quarantined State Mutations',
    description: 'Autonomous agents never hold direct write credentials to production database ledgers. Every proposed record lands in an isolated staging buffer where it must pass all invariant tests before being committed.',
  },
  {
    axiom: 'Axiom III',
    title: 'Complete Execution Traceability',
    description: 'Every agent step—from incoming trigger payload to tool call parameters, reasoning trace, invariant evaluation, and state mutation—is recorded in an immutable, cryptographically hashed audit log.',
  },
  {
    axiom: 'Axiom IV',
    title: 'Graceful Human Escalation',
    description: 'When an edge anomaly or invoice variance exceeds tolerance thresholds, the system does not guess. It gracefully routes the transaction to a 1-click human exception queue with the precise delta highlighted.',
  },
];

export default function AgentsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Autonomous Multi-Agent Architectures',
    provider: {
      '@type': 'Person',
      name: 'Arslan Rehmani',
      jobTitle: 'Autonomous Systems Architect',
      url: 'https://arslanrehmani.com',
    },
    description: 'Design and deployment of deterministic multi-agent architectures for enterprise operations.',
    serviceType: 'Autonomous AI Engineering',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Autonomous Operational Agent Systems',
      itemListElement: AGENT_SPECIFICATIONS.map((agent) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: agent.title,
          description: agent.role,
        },
      })),
    },
  };

  return (
    <div className="py-12 md:py-20 space-y-20">
      {/* Machine-readable JSON-LD Schema for LLMs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Narrative: Calm, High-Status Authority */}
      <div className="max-w-6xl mx-auto px-6 space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-accent-gold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-accent-gold" />
          <span>Autonomous Multi-Agent Systems Architecture</span>
        </div>

        <h1 className="headline text-4xl sm:text-5xl md:text-6xl text-text-primary max-w-4xl leading-[1.08]">
          Clarity in Autonomous Execution.
        </h1>

        <p className="text-base sm:text-lg text-text-muted max-w-3xl leading-relaxed">
          Enterprise operations cannot rely on guesswork. High-performing autonomous agents do not replace business logic—they orchestrate it. By pairing modern foundation models for perception and reasoning with deterministic state machines and isolated staging buffers, we run critical back-office loops with mathematical certainty.
        </p>
      </div>

      {/* The Core Principles (The Mental Model that eliminates market confusion) */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-bg-secondary/60 border border-border-color p-8 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border-color flex items-center justify-center text-accent-gold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="headline text-xl text-text-primary">The Dual-Engine Standard</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              We separate perception from execution. Probabilistic models parse messy PDFs, complex contracts, and ambiguous communications. Deterministic code evaluates all sums, business rules, and database invariants.
            </p>
          </div>

          <div className="rounded-2xl bg-bg-secondary/60 border border-border-color p-8 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border-color flex items-center justify-center text-accent-gold">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="headline text-xl text-text-primary">Isolated Staging Buffers</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Autonomous agents never hold direct write access to your production ledger or ERP. Every proposed state mutation lands in a quarantined staging buffer until all invariant tests are mathematically satisfied.
            </p>
          </div>

          <div className="rounded-2xl bg-bg-secondary/60 border border-border-color p-8 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border-color flex items-center justify-center text-accent-gold">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="headline text-xl text-text-primary">Controlled Exception Queues</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Clean, valid transactions commit automatically at machine speed. Edge variances or threshold breaches route to an intuitive 1-click human review queue with the anomaly highlighted.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Multi-Agent Orchestration Topology Explorer */}
      <section className="max-w-6xl mx-auto px-6">
        <AgentsTopology />
      </section>

      {/* Production Agent Specifications */}
      <section className="max-w-6xl mx-auto px-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border-color pb-6">
          <div>
            <span className="eyebrow mb-2">Production Architectures</span>
            <h2 className="headline text-3xl sm:text-4xl text-text-primary">
              Engineered Agent Specifications
            </h2>
          </div>
          <span className="text-xs font-mono text-text-subtle">
            Verified across manufacturing, logistics & B2B operations
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {AGENT_SPECIFICATIONS.map((agent) => (
            <div
              key={agent.id}
              className="rounded-2xl bg-bg-secondary/70 border border-border-color p-8 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-accent-gold uppercase tracking-wider font-semibold">
                    {agent.sector}
                  </span>
                  <span className="text-text-subtle font-mono text-[11px]">Production Standard</span>
                </div>

                <h3 className="headline text-xl text-text-primary leading-snug">
                  {agent.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  {agent.role}
                </p>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="p-3.5 rounded-xl bg-bg-primary border border-border-color space-y-1">
                    <span className="font-mono text-text-subtle uppercase text-[10px] block">Trigger Vector</span>
                    <p className="text-text-muted text-xs">{agent.trigger}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-bg-primary border border-border-color space-y-1">
                    <span className="font-mono text-text-subtle uppercase text-[10px] block">Cognitive & Execution Logic</span>
                    <p className="text-text-muted text-xs">{agent.reasoning}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-1">
                    <span className="font-mono text-emerald-400 uppercase text-[10px] font-semibold block flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Mathematical Invariant Enforced</span>
                    </span>
                    <p className="text-emerald-300/90 text-xs font-mono">{agent.invariant}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-bg-primary border border-border-color space-y-1">
                    <span className="font-mono text-accent-gold uppercase text-[10px] font-semibold block">Economic Impact</span>
                    <p className="text-text-primary text-xs font-medium">{agent.economicImpact}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border-color text-[11px] font-mono text-text-subtle flex items-center justify-between">
                <span>Stack: {agent.stack}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Axioms: The Non-Negotiables */}
      <section className="max-w-6xl mx-auto px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="eyebrow justify-center">Architectural Discipline</span>
          <h2 className="headline text-3xl sm:text-4xl text-text-primary">
            The Engineering Axioms
          </h2>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
            The immutable principles that ensure autonomous agents strengthen operational resilience rather than introduce systemic volatility.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {ENGINEERING_AXIOMS.map((item) => (
            <div
              key={item.axiom}
              className="p-6 rounded-2xl bg-bg-secondary/50 border border-border-color space-y-3"
            >
              <span className="text-xs font-mono text-accent-gold font-semibold uppercase tracking-wider block">
                {item.axiom}
              </span>
              <h3 className="text-base font-semibold text-text-primary">{item.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <FinalCta />
    </div>
  );
}
