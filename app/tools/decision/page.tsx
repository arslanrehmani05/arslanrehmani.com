// app/tools/decision/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  GitFork,
  Printer,
  ShieldCheck,
  CheckCircle2,
  AlertOctagon,
  ArrowRight,
  Code,
  Cpu,
  Bot,
  RotateCcw,
} from 'lucide-react';

interface QuestionNode {
  id: string;
  question: string;
  subtext: string;
  options: {
    label: string;
    description: string;
    next: string | 'RECOMMENDATION';
    recType?: 'script' | 'cron' | 'workflow' | 'agent_staged';
  }[];
}

const DECISION_TREE: Record<string, QuestionNode> = {
  start: {
    id: 'start',
    question: 'What format does your input data arrive in?',
    subtext: 'Consider the raw source data where your operational workflow starts.',
    options: [
      {
        label: 'Strictly structured (CSV, JSON, SQL database, REST API)',
        description: 'Predictable columns, known schema, zero free-form prose.',
        next: 'step_structured',
      },
      {
        label: 'Semi-structured or unstructured (PDF invoices, email text, photos, WhatsApp messages)',
        description: 'Varying layouts, scanned text, free-form customer instructions.',
        next: 'step_unstructured',
      },
    ],
  },
  step_structured: {
    id: 'step_structured',
    question: 'Do the business rules require probabilistic interpretation?',
    subtext: 'Does processing require subjective judgment, sentiment, or semantic search, or are they clear deterministic rules (e.g., if total > $1000 flag for manager)?',
    options: [
      {
        label: '100% deterministic rules (if-then, math formulas, status codes)',
        description: 'No guessing or semantic interpretation is needed.',
        next: 'RECOMMENDATION',
        recType: 'script',
      },
      {
        label: 'Complex pattern matching with slight semantic fuzziness',
        description: 'Matching supplier names with slight typos or classifying free-text memo fields.',
        next: 'step_frequency',
      },
    ],
  },
  step_frequency: {
    id: 'step_frequency',
    question: 'How frequently does this workflow execute?',
    subtext: 'Execution volume directly impacts operational cost and failure recovery.',
    options: [
      {
        label: 'Scheduled batch runs (e.g. daily at 2am or hourly)',
        description: 'Batch process running on a predictable cron interval.',
        next: 'RECOMMENDATION',
        recType: 'cron',
      },
      {
        label: 'Real-time event driven or interactive webhook triggers',
        description: 'Must respond immediately as incoming requests land.',
        next: 'step_error_tolerance',
      },
    ],
  },
  step_unstructured: {
    id: 'step_unstructured',
    question: 'What is your tolerance for hallucinations and non-deterministic errors?',
    subtext: 'Can a wrong extraction cause direct financial or legal damage if committed to production?',
    options: [
      {
        label: 'Zero tolerance: Financial ledger, banking records, compliance',
        description: 'Every row must balance to the cent; errors carry direct liabilities.',
        next: 'step_human_review',
      },
      {
        label: 'Moderate tolerance: Internal drafts, categorization tags, research memos',
        description: 'Minor inconsistencies are tolerable or easily spotted by staff.',
        next: 'RECOMMENDATION',
        recType: 'workflow',
      },
    ],
  },
  step_human_review: {
    id: 'step_human_review',
    question: 'Is a human available in the loop to review flagged edge cases?',
    subtext: 'An agent should never commit unvalidated rows straight to a production database.',
    options: [
      {
        label: 'Yes: Staff can review an exception queue with highlighted variances',
        description: 'Deterministic code validates the draft; anomalies route to human approval.',
        next: 'RECOMMENDATION',
        recType: 'agent_staged',
      },
      {
        label: 'No: Desired fully autonomous write access with no oversight',
        description: 'Direct model output written to live accounting ledger without human review.',
        next: 'RECOMMENDATION',
        recType: 'script', // Dangerous to use autonomous agent here!
      },
    ],
  },
  step_error_tolerance: {
    id: 'step_error_tolerance',
    question: 'Can deterministic fuzzy matching (Levenshtein distance, regex) solve 95% of cases?',
    subtext: 'Fuzzy string matching algorithms run in 2 milliseconds with zero API costs.',
    options: [
      {
        label: 'Yes, standard fuzzy distance or regex dictionaries suffice',
        description: 'Predictable candidate lists (e.g. known vendor list).',
        next: 'RECOMMENDATION',
        recType: 'script',
      },
      {
        label: 'No, requires reasoning over open-ended contextual context',
        description: 'Understanding nuance, multi-language remarks, or complex stipulations.',
        next: 'RECOMMENDATION',
        recType: 'agent_staged',
      },
    ],
  },
};

const RECOMMENDATIONS = {
  script: {
    title: 'Do NOT Use an AI Agent. Write a Deterministic Script / Function.',
    icon: Code,
    tone: 'border-emerald-500/40 text-emerald-400',
    summary:
      'Your problem has structured inputs and deterministic business rules. Using an LLM or AI agent here introduces latency, hallucination risks, and recurring API costs for zero benefit.',
    stack: 'TypeScript / Node.js or Python with strict Zod / Pydantic schema validation.',
    cost: '$0 recurring API token spend. Near-instant execution (< 50ms).',
    whenNotToUse: 'Do not deploy an agent when deterministic code can do the job reliably.',
  },
  cron: {
    title: 'Use a Scheduled Background Cron Job with Deterministic Handlers.',
    icon: Cpu,
    tone: 'border-sky-500/40 text-sky-400',
    summary:
      'A scheduled background job running on a server or serverless queue is the industry standard for batch reconciliations and syncs. It runs predictively with idempotency keys.',
    stack: 'PostgreSQL pg_cron / Node worker with BullMQ and transactional rollback.',
    cost: 'Included in baseline server compute. Predictable fixed cost.',
    whenNotToUse: 'Avoid AI overhead when timing and transactions follow clear calendars.',
  },
  workflow: {
    title: 'Use a Rule-Based Workflow Engine with Schema Gates.',
    icon: GitFork,
    tone: 'border-amber-500/40 text-amber-400',
    summary:
      'Your operations benefit from a multi-step state machine with clear conditional branches. Keep the core logic deterministic, and only call external APIs for isolated transformations.',
    stack: 'Deterministic state machine (XState or Temporal) with schema validation steps.',
    cost: 'Negligible compute; robust failure recovery.',
    whenNotToUse: 'Avoid unconstrained agentic loops when states and transitions are finite.',
  },
  agent_staged: {
    title: 'Valid Use Case: Isolated Staged Agent with Deterministic Guardrails.',
    icon: Bot,
    tone: 'border-accent-gold/40 text-text-primary',
    summary:
      'Your inputs are unstructured, but your operations require high integrity. The ONLY safe architecture is an Isolated Staging Pipeline: the agent extracts into staging tables; deterministic code checks types, balances, and totals; and human staff approve exceptions before commit.',
    stack: 'LLM Extraction → Deterministic Zod/SQL Validation Gate → Human Review Queue → Commit.',
    cost: '~$0.005 – $0.02 per processed document + human approval oversight.',
    whenNotToUse: 'Never give the agent direct SQL WRITE permissions to master production tables.',
  },
};

export default function AgentDecisionToolPage() {
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [history, setHistory] = useState<string[]>([]);
  const [recommendationKey, setRecommendationKey] = useState<
    'script' | 'cron' | 'workflow' | 'agent_staged' | null
  >(null);

  const handleSelectOption = (next: string, recType?: 'script' | 'cron' | 'workflow' | 'agent_staged') => {
    if (next === 'RECOMMENDATION' && recType) {
      setRecommendationKey(recType);
    } else {
      setHistory((prev) => [...prev, currentNodeId]);
      setCurrentNodeId(next);
    }
  };

  const handleReset = () => {
    setCurrentNodeId('start');
    setHistory([]);
    setRecommendationKey(null);
  };

  const currentNode = DECISION_TREE[currentNodeId];
  const activeRec = recommendationKey ? RECOMMENDATIONS[recommendationKey] : null;

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-24 px-6 print:bg-white print:text-black print:p-0">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Navigation & Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted print:hidden">
            <Link href="/tools" className="hover:text-text-primary transition-colors">
              Tools Suite
            </Link>
            <span>/</span>
            <span className="text-text-primary">Agent-or-Workflow Decision Tool</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono text-emerald-400 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Honest Engineering Filter &bull; Zero AI Hype</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
                Agent-or-Workflow Decision Tool
              </h1>
            </div>

            <div className="flex items-center gap-2 print:hidden">
              <button
                type="button"
                onClick={handleReset}
                className="btn-ghost !px-4 !py-2 !text-xs font-mono flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Start Over</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-primary !px-4 !py-2 !text-xs font-mono flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>
            </div>
          </div>

          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            Most operational problems do not need an AI agent. An agent is slower, more expensive, and non-deterministic. This decision tree tells you frankly whether your problem calls for a simple 50-line deterministic script, a cron job, or a guarded agent pipeline.
          </p>
        </div>

        {/* Interactive Tree Step */}
        {!activeRec ? (
          <div className="rounded-2xl bg-bg-secondary border border-border-color p-6 sm:p-10 space-y-8 animate-in fade-in duration-200">
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-accent-gold">
                Step {history.length + 1}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
                {currentNode.question}
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                {currentNode.subtext}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-2">
              {currentNode.options.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(opt.next, opt.recType)}
                  className="p-6 rounded-2xl bg-bg-primary border border-border-color hover:border-border-gold transition-all text-left space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-text-primary group-hover:text-accent-gold transition-colors">
                      {opt.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-text-subtle group-hover:text-text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {opt.description}
                  </p>
                </button>
              ))}
            </div>

            {history.length > 0 && (
              <div className="pt-4 border-t border-border-color flex justify-start">
                <button
                  type="button"
                  onClick={() => {
                    const prevHistory = [...history];
                    const last = prevHistory.pop();
                    setHistory(prevHistory);
                    setCurrentNodeId(last || 'start');
                  }}
                  className="text-xs font-mono text-text-muted hover:text-text-primary transition-colors"
                >
                  &larr; Back to previous question
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Recommendation Output Card */
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className={`p-8 sm:p-10 rounded-2xl bg-bg-secondary border ${activeRec.tone} space-y-6`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-bg-primary border border-border-color flex items-center justify-center text-text-primary">
                  <activeRec.icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                    Architectural Verdict
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
                    {activeRec.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-text-primary leading-relaxed">
                {activeRec.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border-color text-xs font-mono">
                <div className="p-4 rounded-xl bg-bg-primary border border-border-color space-y-1">
                  <span className="text-text-subtle uppercase">Recommended Implementation:</span>
                  <div className="text-text-primary font-semibold">{activeRec.stack}</div>
                </div>

                <div className="p-4 rounded-xl bg-bg-primary border border-border-color space-y-1">
                  <span className="text-text-subtle uppercase">Cost & Latency Profile:</span>
                  <div className="text-text-primary font-semibold">{activeRec.cost}</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-300 flex items-start gap-2.5">
                <AlertOctagon className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong>When NOT to use an agent: </strong>
                  <span>{activeRec.whenNotToUse}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-ghost !px-5 !py-2.5 !text-xs font-mono w-full sm:w-auto"
                >
                  Test Another Workflow
                </button>

                <Link
                  href="/contact"
                  className="btn-primary !px-5 !py-2.5 !text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 w-full sm:w-auto"
                >
                  <span>Discuss Implementation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Educational Reference Block: When NOT to Use Agents */}
        <div className="rounded-2xl bg-bg-secondary border border-border-color p-6 sm:p-8 space-y-4">
          <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
            Production Rulebook: When NOT to Use an AI Agent
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-bg-primary border border-border-color space-y-1.5">
              <strong className="text-text-primary block font-mono">1. Reconciliations & Math</strong>
              <p className="text-text-muted leading-relaxed">
                LLMs predict next tokens probabilistically. They cannot sum floating-point numbers or calculate tax reliably. Use deterministic SQL or TypeScript for all math.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-bg-primary border border-border-color space-y-1.5">
              <strong className="text-text-primary block font-mono">2. Direct DB Write Access</strong>
              <p className="text-text-muted leading-relaxed">
                Never allow an agent to write directly to a production database. Always buffer output into an isolated staging schema with strict CHECK constraints.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-bg-primary border border-border-color space-y-1.5">
              <strong className="text-text-primary block font-mono">3. Known Column Mappings</strong>
              <p className="text-text-muted leading-relaxed">
                If the input source provides predictable JSON or CSV headers, an agent is an expensive gimmick. Write an automated ingestion script that costs $0/month.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
