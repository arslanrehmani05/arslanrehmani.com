// app/tools/process-mapper/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Network,
  Printer,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  RotateCcw,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function OperationalProcessMapperPage() {
  // Five operational pipeline inputs
  const [sources, setSources] = useState<string>('Paper registers, supplier email PDFs, bank statement CSVs');
  const [transforms, setTransforms] = useState<string>('Clerical copy-paste, manual VLOOKUP, calculator summing');
  const [approvals, setApprovals] = useState<string>('Verbal okays, WhatsApp messages, paper manager initials');
  const [storage, setStorage] = useState<string>('Multiple desktop Excel files, personal Google Drive folders');
  const [outputs, setOutputs] = useState<string>('Customer invoices, month-end P&L, payroll checks');
  const [showFormula, setShowFormula] = useState<boolean>(true);

  const resetToSample = () => {
    setSources('Paper registers, supplier email PDFs, bank statement CSVs');
    setTransforms('Clerical copy-paste, manual VLOOKUP, calculator summing');
    setApprovals('Verbal okays, WhatsApp messages, paper manager initials');
    setStorage('Multiple desktop Excel files, personal Google Drive folders');
    setOutputs('Customer invoices, month-end P&L, payroll checks');
  };

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-24 px-6 print:bg-white print:text-black print:p-0">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Navigation & Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted print:hidden">
            <Link href="/tools" className="hover:text-text-primary transition-colors">
              Tools Suite
            </Link>
            <span>/</span>
            <span className="text-text-primary">Operational Process Mapper</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono text-emerald-400 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Deterministic Architecture Visualizer &bull; Zero Data Lock-in</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
                Operational Process Mapper
              </h1>
            </div>

            <div className="flex items-center gap-2 print:hidden">
              <button
                type="button"
                onClick={resetToSample}
                className="btn-ghost !px-4 !py-2 !text-xs font-mono flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Load Sample</span>
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

          <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-3xl">
            Input the 5 components of your current workflow (Sources, Transforms, Approvals, Storage, Outputs). The tool compiles a comparative architectural diagram showing your current manual bottleneck vs. a proposed hardened staging pipeline.
          </p>
        </div>

        {/* Inputs Grid */}
        <div className="rounded-2xl bg-bg-secondary border border-border-color p-6 sm:p-8 space-y-6 print:hidden">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-text-primary pb-2 border-b border-border-color">
            Define Your Operational Flow (5 Parameters)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1.5">
              <label className="text-text-muted font-medium font-mono uppercase">
                1. Data Sources (Intake)
              </label>
              <input
                type="text"
                value={sources}
                onChange={(e) => setSources(e.target.value)}
                className="w-full rounded-xl bg-bg-primary border border-border-color p-3 text-text-primary font-mono"
              />
              <span className="text-[11px] text-text-subtle">e.g. Paper tallies, supplier invoices, POS exports</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-text-muted font-medium font-mono uppercase">
                2. Current Transformations (Processing)
              </label>
              <input
                type="text"
                value={transforms}
                onChange={(e) => setTransforms(e.target.value)}
                className="w-full rounded-xl bg-bg-primary border border-border-color p-3 text-text-primary font-mono"
              />
              <span className="text-[11px] text-text-subtle">e.g. Copy-pasting, manual calculator math, VLOOKUP</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-text-muted font-medium font-mono uppercase">
                3. Human Approvals / Sign-offs
              </label>
              <input
                type="text"
                value={approvals}
                onChange={(e) => setApprovals(e.target.value)}
                className="w-full rounded-xl bg-bg-primary border border-border-color p-3 text-text-primary font-mono"
              />
              <span className="text-[11px] text-text-subtle">e.g. Verbal okay, paper stamp, email forward</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-text-muted font-medium font-mono uppercase">
                4. Primary Storage / Records
              </label>
              <input
                type="text"
                value={storage}
                onChange={(e) => setStorage(e.target.value)}
                className="w-full rounded-xl bg-bg-primary border border-border-color p-3 text-text-primary font-mono"
              />
              <span className="text-[11px] text-text-subtle">e.g. Shared network drive, local Excel, Google Sheets</span>
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-text-muted font-medium font-mono uppercase">
                5. Deliverables / Outputs
              </label>
              <input
                type="text"
                value={outputs}
                onChange={(e) => setOutputs(e.target.value)}
                className="w-full rounded-xl bg-bg-primary border border-border-color p-3 text-text-primary font-mono"
              />
              <span className="text-[11px] text-text-subtle">e.g. Bank wire orders, month-end ledger close, piece-rate wages</span>
            </div>
          </div>
        </div>

        {/* Visual Comparison: Current Fragile Flow vs Proposed Hardened Architecture */}
        <div className="space-y-8">
          {/* 1. Current State Diagram */}
          <div className="rounded-2xl bg-bg-secondary border border-rose-950/40 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-rose-400 font-semibold">
                  Status Quo Diagnosis
                </span>
                <h3 className="text-lg font-bold text-text-primary">
                  Current Manual Workflow (High Latency & Fragility)
                </h3>
              </div>
              <span className="text-xs font-mono px-2 py-1 rounded bg-rose-950/50 border border-rose-800/40 text-rose-300">
                Unchecked Failure Risk
              </span>
            </div>

            {/* SVG Visualizer: Current */}
            <div className="p-4 rounded-xl bg-bg-primary border border-border-color overflow-x-auto">
              <svg viewBox="0 0 880 150" className="w-full min-w-[750px] h-36 font-mono text-xs">
                {/* Defs */}
                <defs>
                  <marker id="arrow-rose" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#f43f5e" />
                  </marker>
                </defs>

                {/* Node 1: Sources */}
                <rect x="20" y="30" width="160" height="90" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                <text x="100" y="55" fill="#f43f5e" textAnchor="middle" fontWeight="bold">1. Intake</text>
                <text x="100" y="78" fill="#a1a1aa" textAnchor="middle" fontSize="10">{sources.slice(0, 24)}</text>
                <text x="100" y="94" fill="#71717a" textAnchor="middle" fontSize="9">Disconnected formats</text>

                <line x1="180" y1="75" x2="235" y2="75" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow-rose)" />

                {/* Node 2: Manual Transforms */}
                <rect x="240" y="30" width="160" height="90" rx="8" fill="#18181b" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="320" y="55" fill="#f43f5e" textAnchor="middle" fontWeight="bold">2. Manual Work</text>
                <text x="320" y="78" fill="#a1a1aa" textAnchor="middle" fontSize="10">{transforms.slice(0, 24)}</text>
                <text x="320" y="94" fill="#fb7185" textAnchor="middle" fontSize="9">Typo & formula drift hazard</text>

                <line x1="400" y1="75" x2="455" y2="75" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow-rose)" />

                {/* Node 3: Storage */}
                <rect x="460" y="30" width="160" height="90" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                <text x="540" y="55" fill="#f43f5e" textAnchor="middle" fontWeight="bold">3. Unsecured Storage</text>
                <text x="540" y="78" fill="#a1a1aa" textAnchor="middle" fontSize="10">{storage.slice(0, 24)}</text>
                <text x="540" y="94" fill="#71717a" textAnchor="middle" fontSize="9">Zero audit trail & RLS</text>

                <line x1="620" y1="75" x2="675" y2="75" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow-rose)" />

                {/* Node 4: Outputs */}
                <rect x="680" y="30" width="160" height="90" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                <text x="760" y="55" fill="#f43f5e" textAnchor="middle" fontWeight="bold">4. Final Output</text>
                <text x="760" y="78" fill="#a1a1aa" textAnchor="middle" fontSize="10">{outputs.slice(0, 24)}</text>
                <text x="760" y="94" fill="#71717a" textAnchor="middle" fontSize="9">Delayed by 3-5 days</text>
              </svg>
            </div>
          </div>

          {/* 2. Proposed Hardened Staged Architecture */}
          <div className="rounded-2xl bg-bg-secondary border border-emerald-950/40 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-emerald-400 font-semibold">
                  Hardened Target Architecture
                </span>
                <h3 className="text-lg font-bold text-text-primary">
                  Staged Pipeline with Deterministic Validation & Human Queue
                </h3>
              </div>
              <span className="text-xs font-mono px-2 py-1 rounded bg-emerald-950/50 border border-emerald-800/40 text-emerald-300">
                Zero Silent Corruption
              </span>
            </div>

            {/* SVG Visualizer: Hardened Target */}
            <div className="p-4 rounded-xl bg-bg-primary border border-border-color overflow-x-auto">
              <svg viewBox="0 0 880 150" className="w-full min-w-[750px] h-36 font-mono text-xs">
                {/* Defs */}
                <defs>
                  <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#34d399" />
                  </marker>
                </defs>

                {/* Stage 1: Ingestion Buffer */}
                <rect x="15" y="30" width="150" height="90" rx="8" fill="#111113" stroke="#34d399" strokeWidth="1.5" />
                <text x="90" y="55" fill="#34d399" textAnchor="middle" fontWeight="bold">1. Ingestion Buffer</text>
                <text x="90" y="76" fill="#f0f0f2" textAnchor="middle" fontSize="10">Webhooks & OCR</text>
                <text x="90" y="92" fill="#71717a" textAnchor="middle" fontSize="9">Raw payload logged</text>

                <line x1="165" y1="75" x2="205" y2="75" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow-emerald)" />

                {/* Stage 2: Staging Schema */}
                <rect x="210" y="30" width="150" height="90" rx="8" fill="#111113" stroke="#34d399" strokeWidth="1.5" />
                <text x="285" y="55" fill="#34d399" textAnchor="middle" fontWeight="bold">2. Isolated Staging</text>
                <text x="285" y="76" fill="#f0f0f2" textAnchor="middle" fontSize="10">Postgres staging.*</text>
                <text x="285" y="92" fill="#71717a" textAnchor="middle" fontSize="9">No prod writes</text>

                <line x1="360" y1="75" x2="400" y2="75" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow-emerald)" />

                {/* Stage 3: Deterministic Gate */}
                <rect x="405" y="30" width="150" height="90" rx="8" fill="#111113" stroke="#fbbf24" strokeWidth="1.5" />
                <text x="480" y="55" fill="#fbbf24" textAnchor="middle" fontWeight="bold">3. Rule Validation</text>
                <text x="480" y="76" fill="#f0f0f2" textAnchor="middle" fontSize="10">Types & Math Gate</text>
                <text x="480" y="92" fill="#fbbf24" textAnchor="middle" fontSize="9">Anomalies &rarr; Queue</text>

                <line x1="555" y1="75" x2="595" y2="75" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow-emerald)" />

                {/* Stage 4: Human Review & Signoff */}
                <rect x="600" y="30" width="120" height="90" rx="8" fill="#111113" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="660" y="55" fill="#38bdf8" textAnchor="middle" fontWeight="bold">4. Review</text>
                <text x="660" y="76" fill="#f0f0f2" textAnchor="middle" fontSize="10">Exception UI</text>
                <text x="660" y="92" fill="#71717a" textAnchor="middle" fontSize="9">Staff 1-click ok</text>

                <line x1="720" y1="75" x2="745" y2="75" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow-emerald)" />

                {/* Stage 5: Master Commit & Audit */}
                <rect x="750" y="30" width="120" height="90" rx="8" fill="#111113" stroke="#34d399" strokeWidth="1.5" />
                <text x="810" y="55" fill="#34d399" textAnchor="middle" fontWeight="bold">5. Commit</text>
                <text x="810" y="76" fill="#f0f0f2" textAnchor="middle" fontSize="10">Public Ledger</text>
                <text x="810" y="92" fill="#34d399" textAnchor="middle" fontSize="9">Immutable Hash</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Formula & Architectural Guarantee */}
        <div className="rounded-2xl bg-bg-secondary border border-border-color p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-primary uppercase tracking-wider">
              Architecture Principles
            </span>
            <button
              type="button"
              onClick={() => setShowFormula(!showFormula)}
              className="text-xs font-mono text-text-muted hover:text-text-primary flex items-center gap-1"
            >
              <span>{showFormula ? 'Hide Details' : 'Show Details'}</span>
              {showFormula ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showFormula && (
            <div className="p-4 rounded-xl bg-bg-primary border border-border-color text-xs font-mono text-text-muted space-y-1">
              <div>• Deterministic Invariant: Master financial tables are NEVER exposed to unvalidated writes.</div>
              <div>• Fail-Safe Staging: Incoming records rest in staging schemas until mathematical assertions pass.</div>
              <div>• Human In The Loop: Edge cases route cleanly to human triage queues with differences highlighted.</div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-bg-secondary border border-border-color flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 print:hidden">
          <div className="space-y-1 max-w-xl">
            <h4 className="text-base font-bold text-text-primary">
              Ready to replace fragile spreadsheet handoffs with this architecture?
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              We start with a fixed-scope Data Audit to inventory sources, map schemas, and deliver a working prototype on your real operational data.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-primary !px-6 !py-3 !text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 whitespace-nowrap"
          >
            <span>Book a 20-minute discovery call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
