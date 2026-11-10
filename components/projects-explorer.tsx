// components/projects-explorer.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { BUSINESS_EMAILS } from '@/lib/emails';

export type DeploymentCategory = 'all' | 'case-studies' | 'platforms' | 'swarms' | 'runtimes';

export interface Deployment {
  id: string;
  category: DeploymentCategory;
  categoryLabel: string;
  title: string;
  tagline: string;
  badge?: string;
  clientContext?: string;
  problem: string;
  solution: string;
  results: { metric: string; label: string }[];
  techStack: string[];
  liveUrl?: string;
  displayUrl?: string;
  ctaText?: string;
  auditTrail: string;
  isPrimary?: boolean;
}

const deployments: Deployment[] = [
  // 1. Case Studies
  {
    id: 'textilemode-erp',
    category: 'case-studies',
    categoryLabel: 'Production Case Study',
    title: 'TextileMode ERP & Financial Suite',
    tagline: 'Industrial manufacturing ERP & accounting engine running live operations for a 27-loom mill.',
    badge: 'Enterprise Production',
    clientContext: 'Production Textile Manufacturer (27 Looms · PKR 3 Crore / $107k Monthly Volume)',
    problem:
      'Plant operations, yarn balancing, loom efficiency, and financial books were tracked across paper and fragmented spreadsheets by a 10-person back-office staff. Both owners spent 8+ hours daily reconciling disputes.',
    solution:
      'Engineered a unified 5-module ERP and accounting suite on Postgres with Row-Level Security, automated yarn consumption reconciliation, floor scheduling, and 11 analytical audit reports.',
    results: [
      { metric: '10 → 1', label: 'Back-office staff cut to 1 clerk' },
      { metric: '1–2 Days', label: 'Month-end balances across 4 departments' },
      { metric: '18 Mos', label: 'Continuous live production uptime' },
      { metric: '8h → 2h', label: "Owner's daily operational drag reduced" },
    ],
    techStack: ['PostgreSQL', 'Next.js 14 App Router', 'TypeScript', 'Row-Level Security', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://erp.textilemode.com',
    displayUrl: 'erp.textilemode.com',
    ctaText: 'Inspect Live Application',
    auditTrail: 'Deterministic Ledger & Audit Logs',
    isPrimary: true,
  },
  {
    id: 'belhide-operational-stack',
    category: 'case-studies',
    categoryLabel: 'Production Case Study',
    title: 'Belhide Multi-Channel Operational Stack',
    tagline: 'Autonomous operations and intelligence command center unifying multi-market ecommerce channels.',
    badge: 'Client Engagement',
    clientContext: 'International Leather Goods Brand (Shopify US/UK, Amazon Seller, Google Ecosystem)',
    problem:
      'Sales channels, Amazon inventory velocity, organic Search Console queries, and fulfillment metrics were completely siloed. Founders spent 2 hours every morning manually assembling status spreadsheets.',
    solution:
      'Built a centralized operational intelligence engine that pulls live channel webhooks into a Postgres store and generates automated daily executive AI briefings with anomaly detection.',
    results: [
      { metric: '5', label: 'Disparate sales & analytics channels unified' },
      { metric: 'Daily', label: 'Autonomous AI morning briefings delivered' },
      { metric: '100%', label: 'Automated inventory sync & SEO audit feeds' },
      { metric: 'Zero', label: 'Manual spreadsheet compilation' },
    ],
    techStack: ['Next.js', 'PostgreSQL', 'Claude API', 'Shopify API', 'Amazon SP-API', 'Search Console API'],
    liveUrl: 'https://erp.belhide.com',
    displayUrl: 'erp.belhide.com',
    ctaText: 'Inspect Live Application',
    auditTrail: 'Server-Side API Verification',
    isPrimary: true,
  },

  // 2. Live Platforms & ERPs
  {
    id: 'loomworks',
    category: 'platforms',
    categoryLabel: 'Engineered Platform',
    title: 'LoomWorks',
    tagline: 'Public operational platform based on TextileMode’s unified manufacturing & financial architecture.',
    badge: 'Live Platform',
    problem:
      'Industrial manufacturers need enterprise-grade ERPs with production tracking and yarn accounting without multi-million dollar SAP implementation bloat.',
    solution:
      'Turnkey manufacturing ERP featuring loom scheduling, yarn inventory ledger, automated payroll calculation, and daily operational digests.',
    results: [
      { metric: '27', label: 'Looms synchronized in real-time' },
      { metric: '5', label: 'Operational modules included' },
      { metric: '11', label: 'Automated analytical reports' },
      { metric: '< 200ms', label: 'Database query response time' },
    ],
    techStack: ['PostgreSQL', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Supabase Auth'],
    liveUrl: 'https://erp.textilemode.com',
    displayUrl: 'loomworks.arslanrehmani.com',
    ctaText: 'Launch LoomWorks Platform',
    auditTrail: 'Postgres ACID Compliance',
  },
  {
    id: 'brandpilot',
    category: 'platforms',
    categoryLabel: 'Engineered Platform',
    title: 'BrandPilot',
    tagline: 'High-end ecommerce command center delivering cross-platform inventory, revenue, and automated AI briefings.',
    badge: 'Live Platform',
    problem:
      'Brand operators lose margin due to uncoordinated stockouts across Amazon FBA and Shopify storefronts, combined with delayed ad spend attribution.',
    solution:
      'All-in-one command dashboard that normalizes orders, calculates real-time SKU contribution margin, and issues proactive operational action alerts.',
    results: [
      { metric: 'Multi-SKU', label: 'Unified inventory visibility' },
      { metric: 'Real-Time', label: 'Channel margin calculation' },
      { metric: 'Automated', label: 'Morning executive status digest' },
      { metric: 'Instant', label: 'Discrepancy and refund alerts' },
    ],
    techStack: ['Next.js 14', 'PostgreSQL', 'Tailwind CSS', 'Claude API', 'Vercel Edge'],
    liveUrl: 'https://erp.belhide.com',
    displayUrl: 'brandpilot.arslanrehmani.com',
    ctaText: 'Launch BrandPilot Platform',
    auditTrail: 'Channel Webhook Audit Logs',
  },
  {
    id: 'marketlens',
    category: 'platforms',
    categoryLabel: 'Engineered Platform',
    title: 'MarketLens Terminal',
    tagline: 'Financial market workstation with live streaming data and "Warren" — an autonomous equity analyst agent.',
    badge: 'Live Workstation',
    problem:
      'Retail investors and analysts are overwhelmed by raw SEC filings and complex terminal interfaces like Bloomberg without conversational reasoning.',
    solution:
      'Interactive financial workstation combining real-time candlestick charts, portfolio P&L tracking, and an embedded autonomous equity analyst that inspects balance sheets on demand.',
    results: [
      { metric: 'Real-Time', label: 'Streaming equity & market data' },
      { metric: 'Natural Lang', label: 'Financial ratio & balance sheet querying' },
      { metric: '100%', label: 'Deterministic source document citations' },
      { metric: 'Zero', label: 'Hallucinatory financial calculation' },
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Groq / Gemini APIs', 'Financial Modeling Prep API'],
    liveUrl: 'https://marketlens.arslanrehmani.com',
    displayUrl: 'marketlens.arslanrehmani.com',
    ctaText: 'Open MarketLens Terminal',
    auditTrail: 'SEC Filing Citation Grounding',
  },
  {
    id: 'legality-ai',
    category: 'platforms',
    categoryLabel: 'Engineered Platform',
    title: 'Legality AI Workstation',
    tagline: 'Autonomous legal document and commercial agreement drafting platform with human verification gates.',
    badge: 'Live SaaS Tool',
    problem:
      'Standard consulting agreements, NDAs, and commercial contracts consume costly attorney hours and delay deal velocity.',
    solution:
      'Self-service legal workstation where agents synthesize airtight, jurisdiction-tailored agreements from structured parameters, complete with human review checkpoints and instant PDF generation.',
    results: [
      { metric: 'Minutes', label: 'Drafting time from contract spec' },
      { metric: 'PDF-Lib', label: 'Automated client-ready document export' },
      { metric: 'Guarded', label: 'Mandatory human approval on binding clauses' },
      { metric: 'Auditable', label: 'Versioned clause diffs and revisions' },
    ],
    techStack: ['Next.js', 'TypeScript', 'PDF-Lib', 'Groq SDK', 'Tailwind CSS'],
    liveUrl: 'https://legality.arslanrehmani.com',
    displayUrl: 'legality.arslanrehmani.com',
    ctaText: 'Launch Legality AI',
    auditTrail: 'Clause-by-Clause Verification',
  },

  // 3. Multi-Agent Swarms & MCP
  {
    id: 'autonomous-trading-floor',
    category: 'swarms',
    categoryLabel: 'Multi-Agent MCP Swarm',
    title: 'Autonomous Trading Floor',
    tagline: 'Four autonomous trader agents executing over 6 MCP servers and 44 tools with full decision auditing.',
    badge: '6 MCP Servers · 44 Tools',
    problem:
      'Autonomous systems fail in complex market environments without strict architectural tool sandboxes, persistent memory, and risk guardrails.',
    solution:
      'Engineered a complete multi-agent trading floor where 4 specialized agents (Momentum, Value, Risk, and Execution) communicate over Model Context Protocol, querying 44 discrete tools before executing simulated trades.',
    results: [
      { metric: '4', label: 'Autonomous agents collaborating in real time' },
      { metric: '6', label: 'Isolated Model Context Protocol (MCP) servers' },
      { metric: '44', label: 'Programmatic API tools registered and guarded' },
      { metric: '100%', label: 'Traceable rationale logging per trade decision' },
    ],
    techStack: ['Python', 'LangGraph', 'Model Context Protocol (MCP)', 'Claude Agent SDK', 'Docker Sandboxes'],
    auditTrail: 'Full MCP Tool Call Traceability',
  },
  {
    id: 'sdr-outbound-swarm',
    category: 'swarms',
    categoryLabel: 'Multi-Agent Swarm',
    title: 'Autonomous Outbound SDR Swarm',
    tagline: 'Multi-agent prospect research, competitive draft synthesis, and calibrated sales outreach system.',
    badge: 'Multi-Agent Competition',
    problem:
      'Generic AI sales outreach sends tone-deaf spam that damages brand reputation and triggers email deliverability penalties.',
    solution:
      'Multi-agent pipeline where Researcher Agent scrapes company filings, two Writer Agents synthesize competing email angles, a Critic Agent scores against rigorous conversion rubrics, and Guardrail Agent checks compliance before queuing.',
    results: [
      { metric: 'Multi-Agent', label: 'Iterative drafting & self-critique cycle' },
      { metric: 'Guardrails', label: 'Prompt injection & tone drift filtering' },
      { metric: 'Hyper-Specific', label: 'Company-level pain point synthesis' },
      { metric: 'Automated', label: 'Queue management with human sign-off' },
    ],
    techStack: ['Python', 'CrewAI', 'OpenAI Agents SDK', 'Langfuse', 'FastAPI'],
    auditTrail: 'Pre-Send Compliance Evaluation',
  },
  {
    id: 'deep-research-engine',
    category: 'swarms',
    categoryLabel: 'Multi-Agent Swarm',
    title: 'Deep Research Multi-Agent Engine',
    tagline: 'Recursive multi-source research pipeline delivering comprehensive, verified intelligence briefs.',
    badge: 'Recursive Search',
    problem:
      'Single-shot LLMs produce shallow, generic overviews that miss nuanced market data and lack verifiable citations.',
    solution:
      'Autonomous research team featuring a Planner Agent that breaks hypotheses into sub-queries, parallel Search Swarms that recursively scrape deep web documents, and a Synthesis Agent that formats executive reports.',
    results: [
      { metric: 'Multi-Turn', label: 'Recursive search depth and query expansion' },
      { metric: '100%', label: 'Attributed URL & document citations' },
      { metric: 'Parallel', label: 'Concurrent sub-query execution swarms' },
      { metric: 'Structured', label: 'Executive PDF/Markdown brief generation' },
    ],
    techStack: ['Python', 'LangGraph', 'Tavily API', 'Claude 3.5 Sonnet', 'Agentic RAG'],
    auditTrail: 'Source Citation Cross-Verification',
  },
  {
    id: 'stock-picker-agent',
    category: 'swarms',
    categoryLabel: 'Multi-Agent Swarm',
    title: 'Autonomous Equity Discovery Swarm',
    tagline: 'CrewAI-powered financial screening swarm analyzing fundamental indicators and balance sheet anomalies.',
    badge: 'CrewAI Multi-Agent',
    problem:
      'Screening thousands of public equities against strict value investing criteria requires hours of manual spreadsheet sorting.',
    solution:
      'Collaborative agent crew where a Screener Agent filters financial metrics, a Fundamentals Agent evaluates debt/equity ratios, and an Investment Committee Agent debates valuation margin of safety.',
    results: [
      { metric: '3-Agent', label: 'Collaborative CrewAI consensus engine' },
      { metric: 'Fundamental', label: 'Balance sheet and cash flow scrutiny' },
      { metric: 'Automated', label: 'Weekly investment memo synthesis' },
      { metric: 'Zero', label: 'Speculative sentiment bias' },
    ],
    techStack: ['Python', 'CrewAI', 'Financial APIs', 'Pandas', 'Pydantic'],
    auditTrail: 'Deterministic Balance Sheet Checks',
  },
  {
    id: 'ai-engineering-team',
    category: 'swarms',
    categoryLabel: 'Containerized Swarm',
    title: 'AI Engineering Team in Docker',
    tagline: 'Four-agent software engineering squad collaborating in isolated containers to design, build, and test software.',
    badge: 'Docker Sandboxed',
    problem:
      'Unconstrained coding agents pollute host machines, break dependency chains, and produce unverified software that crashes upon execution.',
    solution:
      'Containerized development pipeline with Lead Architect, Backend Developer, Frontend Developer, and QA Test Engineer agents collaborating inside isolated Docker environments to build and self-test modules from Jira specs.',
    results: [
      { metric: '4-Agent', label: 'Architect, Backend, Frontend, and QA squad' },
      { metric: 'Docker', label: 'Hardened container sandbox isolation' },
      { metric: 'Automated', label: 'Unit testing and lint verification loops' },
      { metric: 'Git-Native', label: 'Automated branch creation & PR generation' },
    ],
    techStack: ['Python', 'CrewAI', 'Docker API', 'Git Integration', 'Pytest'],
    auditTrail: 'Automated Test Suite Assertion Gate',
  },
  {
    id: 'enterprise-agent-swarm',
    category: 'swarms',
    categoryLabel: 'Enterprise Swarm',
    title: 'Enterprise Agent Swarm on AWS Bedrock',
    tagline: 'FDE Capstone: Production-grade swarm with durable state, crash recovery, and Langfuse observability.',
    badge: 'AWS Bedrock AgentCore',
    problem:
      'Enterprise agents fail in production when runtime state crashes, long-horizon tasks drift, or untrusted inputs trigger prompt injections.',
    solution:
      'Architected on AWS Bedrock AgentCore Runtime with persistent checkpointed state in LangGraph, automated crash recovery, enterprise context layer, and real-time observability in Langfuse.',
    results: [
      { metric: 'Durable', label: 'Checkpointed state with crash resumption' },
      { metric: 'Langfuse', label: 'Token cost, latency, and drift evals' },
      { metric: 'Guardrails', label: 'Protected against prompt injection attacks' },
      { metric: 'Enterprise', label: 'Context layer and human-in-the-loop gates' },
    ],
    techStack: ['AWS Bedrock', 'AgentCore', 'LangGraph', 'Langfuse', 'Python', 'Enterprise Gateways'],
    auditTrail: 'Full Langfuse Observability & Evals',
  },

  // 4. Autonomous Tools & Runtimes
  {
    id: 'browser-operator-sidekick',
    category: 'runtimes',
    categoryLabel: 'Autonomous Runtime',
    title: 'Browser Operator ("Sidekick")',
    tagline: 'LangGraph autonomous agent that navigates non-API legacy enterprise portals like a human operator.',
    badge: 'LangGraph Automation',
    problem:
      'Thousands of critical enterprise workflows are trapped inside legacy web portals, supplier portals, and government sites that offer no programmatic APIs.',
    solution:
      'Autonomous browser operator built with LangGraph that securely logs in, parses dynamic DOM elements, executes complex multi-step forms, and self-checks post-action state before completion.',
    results: [
      { metric: 'Non-API', label: 'Automates legacy web applications & portals' },
      { metric: 'Self-Checking', label: 'Visual & DOM state validation loops' },
      { metric: 'Session-Safe', label: 'Credential encryption and sandboxing' },
      { metric: 'Crash-Resilient', label: 'State machine checkpointing' },
    ],
    techStack: ['Python', 'LangGraph', 'Playwright', 'Vision Models', 'Pydantic'],
    auditTrail: 'Visual DOM Screenshot Verification',
  },
  {
    id: 'runtime-agent-factory',
    category: 'runtimes',
    categoryLabel: 'Autonomous Runtime',
    title: 'Dynamic Agent Factory',
    tagline: 'AutoGen-powered meta-agent that writes, registers, and orchestrates new specialist agents on the fly.',
    badge: 'AutoGen Meta-Agent',
    problem:
      'Static agent configurations cannot anticipate unforeseen multi-step enterprise tasks requiring bespoke toolsets.',
    solution:
      'Meta-agent architecture that dynamically analyzes complex business requests, defines custom system prompts, compiles new tool interfaces, and instantiates autonomous agents at runtime.',
    results: [
      { metric: 'Runtime', label: 'Dynamic agent compilation and execution' },
      { metric: 'Self-Assembling', label: 'Automated tool assignment based on task' },
      { metric: 'AutoGen', label: 'Inter-agent conversational communication' },
      { metric: 'Isolated', label: 'Ephemeral execution sandboxes' },
    ],
    techStack: ['Python', 'Microsoft AutoGen', 'Docker', 'FastAPI'],
    auditTrail: 'Dynamic Schema & Prompt Verification',
  },
  {
    id: 'career-digital-twin',
    category: 'runtimes',
    categoryLabel: 'Autonomous Runtime',
    title: 'Career Digital Twin Architecture',
    tagline: 'Conversational agent architecture grounded on verified project documentation, schemas, and engineering methodology.',
    badge: 'Autonomous Architecture',
    problem:
      'Static resumes and portfolios fail to answer nuanced architectural questions from prospective CEOs and CTOs.',
    solution:
      'RAG-powered conversational twin design equipped with indexed documentation of verified project builds, database schemas, and engineering philosophy, with autonomous lead qualification.',
    results: [
      { metric: 'Deterministic', label: 'Strict Truth Gate with zero hallucination policy' },
      { metric: 'RAG-Backed', label: 'Grounded exclusively on verified project data' },
      { metric: 'Lead Routing', label: 'Structured inbound lead qualification schema' },
      { metric: 'Sandboxed', label: 'Isolated execution with audit logging' },
    ],
    techStack: ['TypeScript', 'Vector Embeddings', 'Supabase', 'Python / LangChain'],
    auditTrail: 'RAG Grounding & Retrieval Verification',
  },
  {
    id: 'conversational-kanban',
    category: 'runtimes',
    categoryLabel: 'Autonomous Runtime',
    title: 'Conversational Operations Kanban',
    tagline: 'Natural language project board workstation that translates conversational commands into operational state.',
    badge: 'Natural Language Ops',
    problem:
      'Project management tools become bureaucratic overhead as team members spend excessive time updating status tickets and tracking dependencies.',
    solution:
      'Interactive Kanban workstation where operators manage sprints through chat. The agent updates task states, checks dependency blockers, and synthesizes daily standup digests.',
    results: [
      { metric: 'Natural Lang', label: 'Task creation, assignment, and status updates' },
      { metric: 'Automated', label: 'Dependency tracking and blocker detection' },
      { metric: 'Digests', label: 'One-click executive sprint summaries' },
      { metric: 'Zero-Click', label: 'Board maintenance via conversational commands' },
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'AI Agent Gateway'],
    auditTrail: 'State Transition Mutation Logs',
  },
  {
    id: 'cmu-agent-harness',
    category: 'runtimes',
    categoryLabel: 'Autonomous Runtime',
    title: 'Deterministic Agent Harness (CMU 11-768)',
    tagline: 'Framework-free custom agent loop with constrained decoding, sandboxed execution, and drift evals.',
    badge: 'CMU Graduate Architecture',
    problem:
      'High-level agent wrappers (like LangChain or CrewAI) obscure execution state, leak memory, and fail silently during multi-turn drift.',
    solution:
      'Engineered from scratch: custom cyclic ReAct execution loop, constrained decoding enforcing exact schema compliance, hardened sandboxed execution, and systematic benchmark rallies to catch drift.',
    results: [
      { metric: 'Zero-Wrapper', label: 'Custom deterministic execution loop' },
      { metric: 'Schema-Strict', label: 'Constrained grammar decoding (XGrammar)' },
      { metric: 'Benchmarked', label: 'Multi-turn task drift evaluation suite' },
      { metric: 'Sandboxed', label: 'Hardened runtime container isolation' },
    ],
    techStack: ['Python', 'PyTorch', 'Constrained Decoding', 'Docker', 'Evals Suites'],
    auditTrail: 'Benchmark Rally & Drift Validation',
  },
];

const categoryTabs: { key: DeploymentCategory; label: string; count: number }[] = [
  { key: 'all', label: 'All Systems', count: deployments.length },
  { key: 'case-studies', label: 'Client Case Studies', count: 2 },
  { key: 'platforms', label: 'Live Platforms & ERPs', count: 4 },
  { key: 'swarms', label: 'Multi-Agent Swarms & MCP', count: 6 },
  { key: 'runtimes', label: 'Autonomous Tools & Runtimes', count: 5 },
];

export default function ProjectsExplorer() {
  const [activeTab, setActiveTab] = useState<DeploymentCategory>('all');

  const filteredDeployments =
    activeTab === 'all'
      ? deployments
      : deployments.filter((d) => d.category === activeTab);

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-12 p-1.5 bg-bg-secondary border border-border-color rounded-2xl w-fit">
        {categoryTabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                isActive
                  ? 'bg-accent-gold text-black shadow-lg shadow-accent-gold/20'
                  : 'text-text-muted hover:text-text-primary hover:bg-bg-surface'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[11px] font-mono px-2 py-0.5 rounded-md ${
                  isActive
                    ? 'bg-black/20 text-black font-bold'
                    : 'bg-bg-primary text-text-subtle border border-border-color'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Systems Grid */}
      <div className="space-y-12 mb-24">
        {filteredDeployments.map((deployment) => (
          <div
            key={deployment.id}
            id={deployment.id}
            className={`bg-bg-secondary border rounded-2xl p-6 md:p-10 transition-colors duration-200 ${
              deployment.isPrimary
                ? 'border-border-gold/80 shadow-2xl shadow-accent-gold/5'
                : 'border-border-color hover:border-border-gold'
            }`}
          >
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-border-color">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <span className="text-xs font-bold text-accent-gold uppercase tracking-wider">
                    {deployment.categoryLabel}
                  </span>
                  {deployment.badge && (
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-accent-gold-dim border border-border-gold text-accent-gold font-semibold">
                      {deployment.badge}
                    </span>
                  )}
                  <span className="text-[11px] font-mono text-text-subtle flex items-center gap-1 border border-border-color/60 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3 text-accent-gold" />
                    {deployment.auditTrail}
                  </span>
                </div>

                <h2 className="headline text-2xl md:text-3xl text-text-primary">
                  {deployment.title}
                </h2>

                <p className="text-sm text-text-muted mt-2 max-w-2xl leading-relaxed">
                  {deployment.tagline}
                </p>

                {deployment.clientContext && (
                  <p className="text-xs text-text-subtle mt-2 font-mono">
                    Context: {deployment.clientContext}
                  </p>
                )}
              </div>

              {deployment.liveUrl && (
                <a
                  href={deployment.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary !px-5 !py-2.5 !text-xs shrink-0 flex items-center gap-2 self-start lg:self-center"
                >
                  <span>{deployment.ctaText || 'Inspect Live System'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Problem & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-bg-primary/70 border border-border-color/80 rounded-xl p-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-text-subtle block mb-1.5">
                  Operational Drag / Problem
                </span>
                <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                  {deployment.problem}
                </p>
              </div>

              <div className="bg-bg-primary/70 border border-border-color/80 rounded-xl p-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-accent-gold block mb-1.5">
                  Engineered System / Solution
                </span>
                <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                  {deployment.solution}
                </p>
              </div>
            </div>

            {/* Empirical Results */}
            <div className="my-6">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-text-subtle block mb-3">
                Verified Outcomes &amp; Architectural Metrics:
              </span>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {deployment.results.map((res) => (
                  <div
                    key={res.label}
                    className="bg-bg-primary border border-border-color rounded-xl p-4"
                  >
                    <span className="text-xl md:text-2xl font-black font-sans text-accent-gold block">
                      {res.metric}
                    </span>
                    <span className="text-xs font-medium text-text-primary mt-1 block">
                      {res.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="pt-4 border-t border-border-color/60 flex flex-wrap items-center gap-2">
              <span className="text-xs text-text-subtle mr-2 font-mono">Architecture:</span>
              {deployment.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono text-text-muted bg-bg-primary border border-border-color px-2.5 py-1 rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Discussion CTA */}
      <div className="bg-bg-secondary border border-border-color rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <span className="eyebrow mb-2">System Architecture</span>
          <h3 className="headline text-2xl md:text-3xl text-text-primary">
            Need an autonomous system or custom ERP for your operations?
          </h3>
          <p className="text-sm text-text-muted mt-2 max-w-xl">
            Direct architecture review and diagnostic scoping with Arslan Rehmani at{' '}
            <span className="font-mono text-accent-gold">{BUSINESS_EMAILS.projects.email}</span>.
          </p>
        </div>
        <Link href="/contact" className="btn-primary !text-sm shrink-0">
          Book Architecture Review
        </Link>
      </div>
    </div>
  );
}
