'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Network, ShieldCheck, CheckCircle2, ArrowRight, Layers, Cpu, Database, Eye } from 'lucide-react';

interface TopologyNode {
  id: string;
  step: string;
  role: string;
  title: string;
  agentType: 'probabilistic' | 'deterministic' | 'hybrid';
  action: string;
  output: string;
  invariant: string;
  tools: string[];
}

const TOPOLOGY_NODES: TopologyNode[] = [
  {
    id: 'ingest',
    step: 'Stage 01',
    role: 'Event Listener & Ingestion Agent',
    title: 'Perception & Schema Normalization',
    agentType: 'probabilistic',
    action: 'Watches external event webhooks (supplier emails, inbound PDFs, carrier EDI 210 feeds, ERP webhooks). Synthesizes and normalizes unstructured input into strict typed schemas.',
    output: 'Strongly-typed JSON candidate payload with extraction confidence intervals.',
    invariant: 'Required schema keys present; no unparseable structural fields.',
    tools: ['Multimodal LLM Parser', 'MIME Stream Listener', 'JSON Schema Guard'],
  },
  {
    id: 'supervisor',
    step: 'Stage 02',
    role: 'Supervisor & Task Router',
    title: 'Multi-Agent Task Decomposition',
    agentType: 'hybrid',
    action: 'Evaluates the incoming payload against active business context. Spawns specialized worker agents (e.g. Rate Card Auditor, PO Matcher, Inventory Allocator) with least-privilege tool access.',
    output: 'Directed Acyclic Graph (DAG) of isolated tasks executed in parallel or strict sequence.',
    invariant: 'Execution timeout bounded; idempotent task UUIDs enforced.',
    tools: ['Task Orchestrator', 'Vector Context Memory', 'Session State Store'],
  },
  {
    id: 'invariant',
    step: 'Stage 03',
    role: 'Deterministic Invariant Gate',
    title: 'Mathematical & Business Invariant Verification',
    agentType: 'deterministic',
    action: 'Hard-coded execution engine verifies all mathematical computations, checksums, and business logic. Probabilistic models are strictly prohibited from evaluating arithmetic.',
    output: 'Boolean pass/fail verification token with explicit cryptographic audit trail.',
    invariant: 'Line items sum matches total to 0.00 decimal; PO reference valid in ERP.',
    tools: ['Pure TypeScript Rule Engine', 'SQL Read Replica', 'Cryptographic Hasher'],
  },
  {
    id: 'staging',
    step: 'Stage 04',
    role: 'Quarantine Staging & HITL Queue',
    title: 'Controlled State Mutation',
    agentType: 'deterministic',
    action: 'All approved candidate records pre-populate uncommitted staging tables. Records passing 100% of invariants commit automatically; discrepancies route to an executive 1-click review queue.',
    output: 'ACID-compliant write to production ledger, or human resolution notification.',
    invariant: 'Zero direct unverified writes to production database tables.',
    tools: ['PostgreSQL Transaction Pool', 'Webhook Dispatcher', 'Slack / Web UI Queue'],
  },
];

export default function AgentsTopology() {
  const [activeNodeId, setActiveNodeId] = useState<string>('ingest');
  const activeNode = TOPOLOGY_NODES.find((n) => n.id === activeNodeId) || TOPOLOGY_NODES[0];

  return (
    <div className="rounded-3xl bg-bg-secondary/60 border border-border-color p-6 sm:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border-color/60 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono text-accent-gold uppercase tracking-wider">
            <Network className="w-3.5 h-3.5" />
            <span>Multi-Agent Orchestration Topology</span>
          </div>
          <h3 className="headline text-2xl text-text-primary">
            How Autonomous Agents Execute Without Risk
          </h3>
          <p className="text-sm text-text-muted max-w-xl">
            A clear mental model of how perception, reasoning, and deterministic execution coordinate safely in high-stakes enterprise systems.
          </p>
        </div>

        <div className="text-xs font-mono text-text-subtle flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Interactive Topology Explorer</span>
        </div>
      </div>

      {/* Stage Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {TOPOLOGY_NODES.map((node) => {
          const isActive = node.id === activeNodeId;
          return (
            <button
              key={node.id}
              onClick={() => setActiveNodeId(node.id)}
              className={`p-4 rounded-xl text-left transition-all duration-200 cursor-pointer border ${
                isActive
                  ? 'bg-bg-primary border-accent-gold shadow-sm'
                  : 'bg-bg-primary/40 border-border-color hover:border-border-color/90 hover:bg-bg-primary/80'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-text-subtle mb-1">
                <span>{node.step}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                    node.agentType === 'deterministic'
                      ? 'text-emerald-400 bg-emerald-950/40'
                      : node.agentType === 'probabilistic'
                      ? 'text-accent-gold bg-amber-950/40'
                      : 'text-sky-400 bg-sky-950/40'
                  }`}
                >
                  {node.agentType}
                </span>
              </div>
              <div className="text-xs font-semibold text-text-primary truncate">{node.role}</div>
            </button>
          );
        })}
      </div>

      {/* Active Node Detail Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl bg-bg-primary border border-border-color p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-color/60 pb-4">
            <div>
              <span className="text-xs font-mono text-accent-gold font-medium block">
                {activeNode.step} · {activeNode.role}
              </span>
              <h4 className="text-lg sm:text-xl font-semibold text-text-primary mt-0.5">
                {activeNode.title}
              </h4>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-text-subtle">Engine Class:</span>
              <span className="text-text-primary uppercase font-bold tracking-wider">
                {activeNode.agentType}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-text-subtle uppercase block">Core Operation</span>
                <p className="text-sm text-text-muted leading-relaxed">{activeNode.action}</p>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-mono text-text-subtle uppercase block">Normalized Output</span>
                <p className="text-xs font-mono text-text-primary bg-bg-secondary/60 p-3 rounded-lg border border-border-color">
                  {activeNode.output}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-emerald-400 uppercase font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Mathematical Invariant Enforced</span>
                </span>
                <div className="text-xs text-text-muted bg-emerald-950/20 border border-emerald-900/40 p-3 rounded-lg">
                  {activeNode.invariant}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-mono text-text-subtle uppercase block">Tool Execution Sandbox</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeNode.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-bg-secondary border border-border-color text-text-muted"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
