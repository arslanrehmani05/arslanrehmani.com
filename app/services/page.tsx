import Link from 'next/link';
import { ArrowRight, Check, ShieldCheck, Database, FileSearch, Bot, Clock, AlertTriangle, Layers, Lock, Cpu } from 'lucide-react';
import FinalCta from '@/components/final-cta';

export const metadata = {
  title: 'Engagement Models & Systems Architecture | Arslan Rehmani',
  description: 'Milestone-gated custom software builds, operational diagnostics, and autonomous agent infrastructure for high-throughput enterprises.',
};

const ENGAGEMENTS = [
  {
    id: 'data-audit',
    name: 'Operational Data & Architecture Audit',
    timeline: '1-Week Intensive Sprint',
    scopeModel: 'Fixed-Scope Discovery Sprint',
    badge: 'Diagnostic Sprint',
    desc: 'Exhaustive forensic inspection of your operational bottlenecks, spreadsheet lineage, data fragmentation, and uncalculated operational leakage.',
    deliverables: [
      'Comprehensive data lineage & fragmentation topology map',
      'Production database schema & ERD architecture blueprint',
      'Quantified annual financial leakage & reconciliation overhead report',
      'Working proof-of-concept prototype built on your sanitized data',
      'Executive presentation with prioritized build roadmap & ROI projection',
    ],
    idealFor: 'Businesses losing 15+ weekly hours to spreadsheet reconciliation before committing to a full platform build.',
    cta: 'Initiate Architecture Audit',
  },
  {
    id: 'systems-build',
    name: 'Custom Operational System Build',
    timeline: '6 to 12 Weeks (Phased Milestones)',
    scopeModel: 'Milestone-Gated Contract',
    badge: 'Core Production Platform',
    featured: true,
    desc: 'Bespoke operational platform replacing fragmented spreadsheets and off-the-shelf software with a deterministic, single-source-of-truth system.',
    deliverables: [
      'Custom production web application (Next.js, TypeScript, PostgreSQL / Supabase)',
      'Deterministic staging pipeline with mathematical quarantine gates',
      'Role-based access control (RBAC) & human-in-the-loop exception queues',
      'Complete historical data migration with Zero Ledger Error Guarantee',
      'Full deployment to client-owned cloud infrastructure (no vendor lock-in)',
      '30 days post-launch hypercare, executive documentation & staff training',
    ],
    idealFor: 'High-throughput businesses ($3M–$100M+ volume) requiring customized workflow logic that packaged SaaS cannot accommodate.',
    cta: 'Scope Custom System Build',
  },
  {
    id: 'agent-addon',
    name: 'Autonomous Agent & Execution Layer',
    timeline: '2 to 4 Weeks Deployment',
    scopeModel: 'Value-Based Automation Module',
    badge: 'Agentic Infrastructure',
    desc: 'Specialized autonomous AI workers layered directly over your relational database to automate data extraction, invoice reconciliation, and floor audits.',
    deliverables: [
      'Schema-bound autonomous agents with strict tool calling contracts',
      'Quarantine engine: deterministic code evaluates 100% of LLM outputs',
      'Automated morning executive intelligence briefings & discrepancy alerts',
      'Multi-source document parsers (PDFs, shipping manifests, mill test reports)',
      'Complete audit trail of agent reasoning, inputs, outputs, and timestamps',
    ],
    idealFor: 'Organizations with established operational data ready to eliminate manual document processing and cross-system data entry.',
    cta: 'Deploy Agentic Layer',
  },
  {
    id: 'care-plan',
    name: 'Forward-Deployed Systems Retainer',
    timeline: 'Quarterly / Annual Partnership',
    scopeModel: 'Dedicated Advisory & Telemetry',
    badge: 'Ongoing Reliability',
    desc: 'Direct institutional partnership serving as your fractional Principal Systems Architect for continuous evolution, security audits, and agent maintenance.',
    deliverables: [
      'Monthly disaster recovery drills & verified backup restoration tests',
      'Continuous feature iterations, agent rule tuning & model upgrades',
      'Access privilege reviews, dependency vulnerability patching & performance tuning',
      'Weekly automated executive briefing & operational telemetry reports',
      'Guaranteed 24-hour SLA with direct engineering access to Arslan Rehmani',
    ],
    idealFor: 'Businesses treating operational software as an active competitive advantage that requires proactive engineering leadership.',
    cta: 'Apply for Retainer',
  },
];

const QUALIFICATIONS = [
  {
    category: 'Ideal Operational Profile',
    points: [
      'Established operating companies ($3M to $100M+ annual revenue or high transaction volume).',
      'Heavy reliance on manual spreadsheets, fragmented SaaS tools, or disconnected legacy software.',
      'Active physical, logistical, or multi-channel operations (manufacturing, wholesale, freight, industrial, services).',
      'Leadership committed to establishing a clean, deterministic single source of truth.',
      'Availability of an operational owner who can walk through physical workflows and business rules.',
    ],
  },
  {
    category: 'Disqualified / Poor Fit',
    points: [
      'Pre-revenue startups seeking speculative pitch-deck prototypes or consumer chat applications.',
      'Organizations seeking commodity hourly staffing, body shopping, or junior ticket-takers.',
      'Projects seeking generic generative AI chatbots without deterministic math gates or relational grounding.',
      'Teams unwilling to grant access to domain experts or physical operational artifacts.',
      'Anyone prioritizing quick surface hacks over mathematical ledger integrity and data governance.',
    ],
  },
];

const GUARANTEES = [
  {
    icon: ShieldCheck,
    title: 'Zero Ledger Error Guarantee',
    desc: 'Financial and inventory figures are never processed through probabilistic AI without deterministic math gates. If an automated reconciliation pipeline produces an arithmetic discrepancy, we fix the lineage at our cost.',
  },
  {
    icon: Layers,
    title: 'Milestone-Gated Acceptance',
    desc: 'Commercial risk is shared fairly. Project payments are tied to explicit technical milestones and acceptance criteria validated against live staging data before commercial sign-off.',
  },
  {
    icon: Lock,
    title: '100% Client-Owned IP & Infrastructure',
    desc: 'You own every line of TypeScript, SQL schema, migration script, and container configuration. Everything deploys directly into your own cloud accounts with zero vendor lock-in.',
  },
];

export default function ServicesPage() {
  return (
    <div className="py-12 md:py-20 space-y-24 bg-bg-primary text-text-primary">
      {/* Hero Header */}
      <div className="max-w-6xl mx-auto px-6 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono uppercase tracking-wider text-accent-gold">
          <Cpu className="w-3.5 h-3.5" />
          <span>Institutional Architecture Engagements</span>
        </div>
        <h1 className="headline text-4xl sm:text-5xl lg:text-6xl text-text-primary max-w-4xl tracking-tight leading-[1.1]">
          Engineered for Quantifiable Operational ROI
        </h1>
        <p className="text-base sm:text-lg text-text-muted max-w-3xl leading-relaxed">
          No vague hourly billing. No junior contractor markups. Every engagement is structured around fixed outcomes, deterministic milestone gates, and measurable balance-sheet impact.
        </p>
      </div>

      {/* Why We Do Not Publish Fixed Rate Cards Section */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-3xl bg-bg-secondary border border-border-color p-8 sm:p-12 space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono text-accent-gold uppercase tracking-wider block">Commercial Philosophy</span>
            <h2 className="headline text-2xl sm:text-3xl text-text-primary">
              Why We Do Not Publish Freelance Rate Cards
            </h2>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              In operational engineering, public price menus are a disservice to both mid-market and enterprise businesses. A company processing $2M with 10 monthly shipments and an enterprise processing $60M across 4 manufacturing plants may share the same conceptual pain point—reconciliation delays—yet their engineering requirements differ by orders of magnitude.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-border-color text-xs sm:text-sm">
            <div className="space-y-2">
              <span className="font-mono text-text-primary font-semibold block text-sm">1. Data Volume & Concurrency</span>
              <p className="text-text-muted leading-relaxed">
                Single-user local workflows require different fault-tolerance, database indexing, and failover redundancy than multi-facility concurrency handling thousands of daily state mutations.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-text-primary font-semibold block text-sm">2. Regulatory & Integration Surface</span>
              <p className="text-text-muted leading-relaxed">
                Connecting into modern REST APIs is vastly simpler than integrating air-gapped industrial machinery, multi-subsidiary general ledgers, or custom ERP protocols.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-text-primary font-semibold block text-sm">3. Value-Gated Scoping</span>
              <p className="text-text-muted leading-relaxed">
                Engagements are structured so that the investment is a modest fraction of the quantified annual leakage eliminated, targeting full capital recovery within 90 to 180 days.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The 4 Engagement Models */}
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        <div className="space-y-3">
          <span className="eyebrow">Engagement Structures</span>
          <h2 className="headline text-3xl sm:text-4xl text-text-primary">
            Four Ways We Partner With Operations
          </h2>
          <p className="text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
            From focused one-week diagnostic sprints to end-to-end custom platform builds and ongoing architectural leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ENGAGEMENTS.map((tier) => (
            <div
              key={tier.id}
              id={tier.id}
              className={`rounded-3xl border p-8 sm:p-10 flex flex-col justify-between space-y-8 relative scroll-mt-24 transition-all ${
                tier.featured
                  ? 'bg-bg-secondary border-accent-gold shadow-2xl ring-1 ring-accent-gold/30'
                  : 'bg-bg-secondary/70 border-border-color hover:border-border-color/80'
              }`}
            >
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-bg-primary border border-border-color text-accent-gold font-semibold">
                    {tier.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-text-subtle">
                    <Clock className="w-3.5 h-3.5 text-text-subtle" />
                    <span>{tier.timeline}</span>
                  </div>
                </div>

                <div>
                  <h3 className="headline text-2xl sm:text-3xl text-text-primary">
                    {tier.name}
                  </h3>
                  <div className="text-xs font-mono text-text-muted mt-2">
                    Scope Model: <span className="text-accent-gold font-medium">{tier.scopeModel}</span>
                  </div>
                </div>

                <p className="text-sm text-text-muted leading-relaxed">
                  {tier.desc}
                </p>

                <div className="p-4 rounded-2xl bg-bg-primary/70 border border-border-color space-y-1.5 text-xs">
                  <span className="font-mono text-text-subtle uppercase block text-[10px] tracking-wider">
                    Primary Operational Objective:
                  </span>
                  <p className="text-text-primary leading-relaxed font-medium">
                    {tier.idealFor}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-border-color text-xs sm:text-sm">
                  <span className="font-mono text-text-subtle uppercase block text-[11px] tracking-wider">
                    Included Architectural Deliverables:
                  </span>
                  <div className="space-y-2.5">
                    {tier.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-text-muted">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border-color">
                <Link
                  href={`/contact?service=${tier.id}`}
                  className={`w-full text-center py-3.5 px-6 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                    tier.featured
                      ? 'bg-accent-gold text-bg-primary hover:bg-accent-gold-hover shadow-lg font-bold'
                      : 'bg-bg-primary border border-border-color text-text-primary hover:border-accent-gold hover:text-accent-gold'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Commercial Qualification Matrix */}
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        <div className="space-y-3">
          <span className="eyebrow">Client Qualification</span>
          <h2 className="headline text-3xl sm:text-4xl text-text-primary">
            Qualification & Operating Criteria
          </h2>
          <p className="text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
            Because engagements involve deep direct engineering access, we intentionally cap client intake to preserve mathematical rigor and delivery velocity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {QUALIFICATIONS.map((col, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 sm:p-10 border ${
                idx === 0
                  ? 'bg-bg-secondary border-border-color'
                  : 'bg-bg-secondary/40 border-border-color/60'
              }`}
            >
              <h3 className="headline text-xl text-text-primary mb-6 flex items-center gap-2">
                {idx === 0 ? (
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                )}
                <span>{col.category}</span>
              </h3>
              <ul className="space-y-4 text-xs sm:text-sm text-text-muted">
                {col.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-text-subtle mt-2 shrink-0" />
                    <span className="leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Institutional Guarantees */}
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        <div className="space-y-3">
          <span className="eyebrow">Institutional Standards</span>
          <h2 className="headline text-3xl sm:text-4xl text-text-primary">
            Three Non-Negotiable Guarantees
          </h2>
          <p className="text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
            Every engagement is backed by contractual and technical safeguards that remove downside risk for your finance and operations teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GUARANTEES.map((g, idx) => {
            const Icon = g.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl bg-bg-secondary border border-border-color p-8 space-y-4"
              >
                <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border-color flex items-center justify-center text-accent-gold">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="headline text-lg text-text-primary font-bold">
                  {g.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {g.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <FinalCta />
    </div>
  );
}
