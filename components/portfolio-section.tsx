// components/portfolio-section.tsx
import { ReactNode } from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

type Product = {
  tag: string;
  name: string;
  description: string;
  proof?: ReactNode;
  href?: string;
  cta?: string;
  badge?: string;
};

const Gold = ({ children }: { children: ReactNode }) => (
  <span className="text-accent-gold font-bold">{children}</span>
);

const flagshipSystems: Product[] = [
  {
    tag: 'Manufacturing · Operations & Finance',
    name: 'TextileMode ERP',
    description:
      'A complete manufacturing ERP and finance suite on Postgres — production floor scheduling for 27 looms, yarn inventory reconciliation, accounting across 4 departments, and automated operational briefs.',
    proof: (
      <>
        Back office reduced from <Gold>10</Gold> staff to <Gold>1 clerk</Gold>.
        Month-end balances done in <Gold>1–2 days</Gold>. Running live for{' '}
        <Gold>18 months</Gold> on real operational data at a <Gold>$107k/mo</Gold> mill.
      </>
    ),
    href: 'https://erp.textilemode.com',
    cta: 'Open TextileMode ERP →',
    badge: 'Production System',
  },
  {
    tag: 'Ecommerce · Operations & Intelligence',
    name: 'Belhide Operational Stack',
    description:
      'An ecommerce operations hub connecting Shopify, Amazon, Search Console, and Analytics into a single source of truth with automated daily AI executive briefings.',
    proof: (
      <>
        Unified operations for a live multi-market brand. Eliminated manual spreadsheet
        compilation with daily autonomous AI status and inventory alerts.
      </>
    ),
    href: 'https://erp.belhide.com',
    cta: 'Open Belhide Stack →',
    badge: 'Client Engagement',
  },
  {
    tag: 'Legal · Document Agents',
    name: 'Legality AI',
    description:
      'A contract generation workstation where AI agents draft commercial agreements and consulting contracts from structured parameters, followed by human review and instant PDF export.',
    proof: (
      <>
        Cuts drafting overhead from hours to minutes while keeping human sign-off on every
        binding clause.
      </>
    ),
    href: 'https://legality.arslanrehmani.com',
    cta: 'Open Legality AI →',
    badge: 'Live SaaS Tool',
  },
  {
    tag: 'Finance · Analyst Agent',
    name: 'MarketLens',
    description:
      'An AI-powered market terminal with real-time charting, portfolio tracking, and "Warren" — an autonomous equity analyst that interrogates live financial statements in plain English.',
    proof: (
      <>
        Combines deterministic real-time market data streams with agentic financial ratio
        reasoning.
      </>
    ),
    href: 'https://marketlens.arslanrehmani.com',
    cta: 'Open MarketLens →',
    badge: 'Live Platform',
  },
];

const agentDeployments: Product[] = [
  {
    tag: 'Multi-Agent · 6 MCP Servers',
    name: 'Autonomous Trading Floor',
    description:
      'Four autonomous trader agents with distinct strategies executing over 6 MCP servers and 44 tools on live market data, logging every decision and risk rationale.',
    badge: 'Multi-Agent MCP',
  },
  {
    tag: 'Sales · Outbound Swarm',
    name: 'Sales Development Agent Team',
    description:
      'A multi-agent team that analyzes target companies, generates competing email drafts, critiques quality, and sends calibrated outreach within strict guardrails.',
    badge: 'Agent Swarm',
  },
  {
    tag: 'Research · Multi-Turn Agent',
    name: 'Deep Research Agent System',
    description:
      'A multi-agent pipeline with a planner, recursive web-search swarms, and a technical writer agent delivering structured, sourced intelligence briefs directly to your inbox.',
    badge: 'Deep Research',
  },
  {
    tag: 'Software · Containerized Agents',
    name: 'AI Engineering Team in Docker',
    description:
      'A 4-agent team (Lead, Backend, Frontend, and Test) collaborating inside sandboxed Docker containers to design, build, and test software modules from written specifications.',
    badge: 'Docker Sandbox',
  },
  {
    tag: 'Automation · Browser Agent',
    name: 'Browser Operator ("Sidekick")',
    description:
      'A LangGraph agent driving a real browser to interact with non-API enterprise web portals — authenticating, completing multi-step workflows, and verifying state.',
    badge: 'LangGraph',
  },
  {
    tag: 'Meta-Agent · Dynamic Synthesis',
    name: 'Runtime Agent Factory',
    description:
      'An AutoGen-powered meta-agent that writes, registers, and orchestrates new specialized sub-agents dynamically to solve complex business requests.',
    badge: 'AutoGen',
  },
  {
    tag: 'Client-Facing · Conversational',
    name: 'Career Digital Twin',
    description:
      'A conversational agent trained on my verified project architectures, methodology, and tech stack to answer prospective client questions and route qualified leads.',
    badge: 'Interactive Agent',
  },
  {
    tag: 'Operations · Natural Language',
    name: 'Conversational Kanban',
    description:
      'An operational Kanban board you can talk to. Translates plain-English requests into prioritized backlog tasks, dependency updates, and daily operational digests.',
    badge: 'Ops Agent',
  },
  {
    tag: 'Enterprise · AgentCore & Evals',
    name: 'Enterprise Agent Swarm',
    description:
      'Production-grade agent architecture on AWS Bedrock AgentCore with durable state, crash recovery, Langfuse evals, and enterprise context layers.',
    badge: 'AWS Bedrock',
  },
];

export default function PortfolioSection() {
  return (
    <section id="proof" className="bg-bg-primary py-12 md:py-16 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <span className="eyebrow mb-5">Engineered Systems · Agent Architectures</span>
        <h2 className="headline text-3xl md:text-[2.75rem] leading-[1.1]">
          Live systems. Verified outcomes.{' '}
          <span className="italic text-accent-gold">Zero toy demos.</span>
        </h2>
        <p className="text-base md:text-lg text-text-muted leading-relaxed max-w-2xl mt-6 mb-16">
          Every deployment is full-stack production software and autonomous agents engineered
          for real operations. Hardened on Postgres, evaluated with strict benchmarks, and
          inspectable in real time.
        </p>

        {/* Section 1: Flagship Production Systems */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-gold">
              01 · Flagship Production Systems & Client Platforms
            </span>
            <div className="h-px flex-1 bg-border-color" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {flagshipSystems.map((product) => (
              <div
                key={product.name}
                className="bg-bg-secondary border border-border-color hover:border-border-gold rounded-2xl p-6 md:p-8 flex flex-col transition-colors duration-200"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs uppercase tracking-widest text-accent-gold bg-accent-gold-dim px-3 py-1 rounded-full w-fit">
                    {product.tag}
                  </span>
                  {product.badge && (
                    <span className="text-xs font-mono text-text-subtle">
                      {product.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-xl md:text-2xl font-medium text-text-primary mt-4">
                  {product.name}
                </h3>

                <p className="text-base text-text-muted leading-relaxed mt-3 flex-grow">
                  {product.description}
                </p>

                {product.proof && (
                  <div className="text-sm text-text-muted leading-relaxed mt-4 pt-4 border-t border-border-color/60">
                    {product.proof}
                  </div>
                )}

                {product.href && product.cta && (
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-gold hover:text-accent-gold-hover hover:underline underline-offset-4 text-sm font-semibold mt-6 transition-colors duration-200 inline-flex items-center gap-1.5"
                    style={{ minHeight: '44px' }}
                  >
                    {product.cta}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Autonomous Agents & Multi-Agent Swarms */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-gold">
              02 · Autonomous Agents & Multi-Agent Deployments
            </span>
            <div className="h-px flex-1 bg-border-color" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agentDeployments.map((agent) => (
              <div
                key={agent.name}
                className="bg-bg-secondary border border-border-color hover:border-border-gold rounded-2xl p-6 flex flex-col transition-colors duration-200"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs uppercase tracking-wider text-accent-gold font-medium truncate">
                    {agent.tag}
                  </span>
                  {agent.badge && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-bg-surface text-text-subtle border border-border-color shrink-0">
                      {agent.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-lg font-medium text-text-primary mt-3">
                  {agent.name}
                </h3>

                <p className="text-sm text-text-muted leading-relaxed mt-2 flex-grow">
                  {agent.description}
                </p>

                <div className="mt-4 pt-4 border-t border-border-color/40 flex items-center justify-between text-xs text-text-subtle">
                  <span className="inline-flex items-center gap-1 text-accent-gold">
                    <ShieldCheck className="w-3.5 h-3.5" /> Evals & Audit Trail
                  </span>
                  <span>Sandboxed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-sm text-text-subtle max-w-2xl mt-12">
          The production systems behind LoomWorks (TextileMode) and BrandPilot (Belhide)
          run on live business data. All agent architectures and live systems are
          demonstrated live on calls.
        </p>
      </div>
    </section>
  );
}
