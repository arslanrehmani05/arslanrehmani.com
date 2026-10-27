// components/pipeline-mini-demo.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, ArrowRight, Play, RotateCcw } from 'lucide-react';

interface PipelineStep {
  step: number;
  name: string;
  subtext: string;
  status: 'pending' | 'processing' | 'caught' | 'passed';
  log: string;
}

export default function PipelineMiniDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // 20-second loop through the 5 stages
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev >= 4 ? 0 : prev + 1));
    }, 4000); // 4s per stage = 20s total loop

    return () => clearInterval(interval);
  }, [isPlaying]);

  const stages = [
    {
      num: 1,
      title: '01. Raw Intake',
      badge: 'Synthetic Supplier Invoice #8841',
      desc: 'Invoice claims total $15,200.00. Item lines sum to $14,850.00.',
      statusText: 'Proposing Candidate to Staging',
      statusColor: 'text-text-muted',
      detail: 'INPUT: raw_invoice_8841.pdf (Vendor: Apex Loom Parts)',
    },
    {
      num: 2,
      title: '02. Isolated Staging',
      badge: 'Uncommitted Proposals Table',
      desc: 'Model extracts 4 line items into staging_supplier_proposals. Zero direct write access to ledger.',
      statusText: 'Candidate Parsed (Staged)',
      statusColor: 'text-text-primary',
      detail: 'STAGING INSERT: id=stg_8841, lines=4, claimed_total=15200.00',
    },
    {
      num: 3,
      title: '03. Deterministic Gate',
      badge: 'Python / SQL Rule Engine',
      desc: 'Mathematical assertion check: SUM(items) = $14,850.00 != $15,200.00 ($350 math variance detected).',
      statusText: 'GATE FAILED: Mathematical Variance',
      statusColor: 'text-amber-400 font-bold',
      detail: 'ASSERT ERROR: items_sum (14850.00) != header_total (15200.00)',
    },
    {
      num: 4,
      title: '04. Human Review Queue',
      badge: 'Exception Quarantined',
      desc: 'Production database write is immediately aborted. Ticket routed to Accounts Payable lead with exact $350 discrepancy highlighted.',
      statusText: 'Quarantined for Human Signoff',
      statusColor: 'text-amber-400',
      detail: 'QUEUE: Assigned to usr_acct_lead &bull; Action required: Vendor Credit Note',
    },
    {
      num: 5,
      title: '05. Immutable Audit Log',
      badge: '0 Dirty Rows Committed',
      desc: 'Quarantine action cryptographically hashed (SHA-256) and logged. Core production ledger remains 100% clean and reconciled.',
      statusText: 'Ledger Clean & Reconciled to Cent',
      statusColor: 'text-emerald-400 font-bold',
      detail: 'AUDIT HASH: sha256:8f92a...c014 &bull; Production status: 0 corrupt rows',
    },
  ];

  return (
    <div className="w-full rounded-3xl bg-bg-secondary/70 border border-border-color p-6 sm:p-8 space-y-6">
      {/* Top Banner with Strict No-Deception Disclosure */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-color/60 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-text-primary font-bold">The Deterministic Staging Pipeline</span>
          <span className="text-text-subtle">&bull;</span>
          <span className="text-[11px] text-amber-400/90 font-medium">
            Demo with synthetic data
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-text-subtle">
          <span>20s Automated Loop</span>
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="hover:text-text-primary transition-colors flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-bg-primary border border-border-color"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            type="button"
            onClick={() => setCurrentStep(0)}
            className="hover:text-text-primary transition-colors text-[11px] p-1 rounded bg-bg-primary border border-border-color"
            title="Restart demo"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Progress Track */}
      <div className="grid grid-cols-5 gap-2">
        {stages.map((stg, idx) => (
          <button
            key={stg.num}
            type="button"
            onClick={() => {
              setCurrentStep(idx);
              setIsPlaying(false);
            }}
            className={`p-2.5 rounded-xl text-left border transition-all text-xs font-mono flex flex-col justify-between ${
              currentStep === idx
                ? 'bg-bg-primary border-accent-gold text-text-primary shadow-sm'
                : 'bg-bg-primary/40 border-border-color/60 text-text-subtle hover:text-text-muted'
            }`}
          >
            <span className="font-bold">Step 0{stg.num}</span>
            <span className="text-[10px] truncate">{stg.title.split('. ')[1]}</span>
          </button>
        ))}
      </div>

      {/* Live Stage Display Box */}
      <div className="p-6 rounded-2xl bg-bg-primary border border-border-color space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-text-primary font-mono">
              {stages[currentStep].title}
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-bg-secondary border border-border-color text-text-muted">
              {stages[currentStep].badge}
            </span>
          </div>

          <div className={`text-xs font-mono ${stages[currentStep].statusColor} flex items-center gap-1.5`}>
            {currentStep >= 2 ? (
              currentStep === 4 ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              )
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-ping" />
            )}
            <span>{stages[currentStep].statusText}</span>
          </div>
        </div>

        <p className="text-sm text-text-muted leading-relaxed">
          {stages[currentStep].desc}
        </p>

        {/* Terminal log snippet */}
        <div className="p-3 rounded-xl bg-[#0d0d0f] border border-border-color/80 font-mono text-[11px] text-text-subtle flex items-center justify-between">
          <span>{stages[currentStep].detail}</span>
          <span className="text-[10px] text-emerald-400">Deterministic check</span>
        </div>
      </div>
    </div>
  );
}
