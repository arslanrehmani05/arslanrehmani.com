// components/pipeline-mini-demo.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  HelpCircle,
  Lock,
  Layers,
} from 'lucide-react';

interface Scenario {
  id: string;
  name: string;
  type: string;
  summary: string;
  stages: {
    num: number;
    title: string;
    stageName: string;
    badge: string;
    desc: string;
    statusText: string;
    statusColor: string;
    detail: string;
    actionRequired?: string;
    actionDoneText?: string;
  }[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'invoice-variance',
    name: 'Supplier Invoice ($350 Math Error)',
    type: 'Accounts Payable',
    summary: 'Supplier PDF invoice claims $15,200.00, but extracted item lines sum to $14,850.00 ($350 missing).',
    stages: [
      {
        num: 1,
        title: '01. Raw Document Ingestion',
        stageName: 'Ingestion',
        badge: 'Incoming PDF: Apex_Loom_Parts_8841.pdf',
        desc: 'Document received via automated email webhook. Model extracts claimed total of $15,200.00 and 4 line items.',
        statusText: 'Extracted & Proposing to Staging',
        statusColor: 'text-text-muted',
        detail: 'INPUT: Apex_Loom_Parts_8841.pdf · Claimed Header: $15,200.00',
      },
      {
        num: 2,
        title: '02. Isolated Safety Staging',
        stageName: 'Isolated Staging',
        badge: 'Uncommitted Table (Zero Production Access)',
        desc: 'Records are stored in a quarantined staging buffer. The system has zero permission to write to your live accounting ledger.',
        statusText: 'Buffer Insert Complete',
        statusColor: 'text-text-primary',
        detail: 'BUFFER: stg_invoice_8841 · 4 items parsed · Write permission: READ-ONLY',
      },
      {
        num: 3,
        title: '03. Deterministic Rule Gate',
        stageName: 'Rule Verification',
        badge: 'Automated Math Verification Check',
        desc: 'Strict code computes: SUM(line_items) = $14,850.00. This does NOT match the invoice header ($15,200.00). Mathematical variance of $350.00 detected.',
        statusText: 'GATE BLOCKED: $350 Math Variance Detected',
        statusColor: 'text-amber-400 font-bold',
        detail: 'CHECK FAILED: lines_sum ($14,850.00) != claimed_total ($15,200.00) · Aborting commit',
      },
      {
        num: 4,
        title: '04. One-Click Human Review Queue',
        stageName: 'Human Review',
        badge: 'Exception Quarantined for Staff Signoff',
        desc: 'Instead of silently corrupting your financials, the invoice is routed to your Accounts Payable lead with the exact $350 discrepancy highlighted.',
        statusText: 'Awaiting Human Approval',
        statusColor: 'text-amber-400',
        detail: 'QUEUE: Assigned to Accounts Payable · Action: Request $350 Vendor Credit Note',
        actionRequired: 'Request $350 Vendor Credit Note & Approve',
        actionDoneText: 'Action Logged: Credit Note Requested & Invoice Approved',
      },
      {
        num: 5,
        title: '05. Protected Ledger & Audit Record',
        stageName: 'Audit & Commit',
        badge: 'Production Protected (0 Corrupt Rows)',
        desc: 'Your core accounting software remains 100% reconciled to the cent. A permanent audit log records the input file, model output, and human approval.',
        statusText: 'Books Clean & Reconciled to Cent',
        statusColor: 'text-emerald-400 font-bold',
        detail: 'AUDIT LOG: sha256:8f92a...c014 · Production status: 0 corrupt rows committed',
      },
    ],
  },
  {
    id: 'carrier-overcharge',
    name: '3PL Carrier Manifest ($730 Overcharge)',
    type: 'Logistics Audit',
    summary: 'Freight carrier invoice charges $4,850.00 for 120 dispatches. Automated rate audit flags $730 in unauthorized surcharges.',
    stages: [
      {
        num: 1,
        title: '01. Raw Document Ingestion',
        stageName: 'Ingestion',
        badge: 'Incoming EDI / Manifest: Carrier_Invoice_402.csv',
        desc: 'Carrier submits weekly bulk shipping invoice claiming $4,850.00 across 120 customer parcel dispatches.',
        statusText: 'Manifest Parsed to Staging',
        statusColor: 'text-text-muted',
        detail: 'INPUT: Carrier_Invoice_402.csv · 120 package tracking records ingested',
      },
      {
        num: 2,
        title: '02. Isolated Safety Staging',
        stageName: 'Isolated Staging',
        badge: 'Quarantine Sandbox',
        desc: 'All 120 line items are staged in an isolated audit queue before any payment authorization is triggered.',
        statusText: 'Sandbox Staged',
        statusColor: 'text-text-primary',
        detail: 'BUFFER: stg_carrier_manifest_402 · Pre-payment verification active',
      },
      {
        num: 3,
        title: '03. Deterministic Rule Gate',
        stageName: 'Rule Verification',
        badge: 'Rate Card & Scale Weight Engine',
        desc: 'The rule engine compares carrier invoiced weights against warehouse scale logs and contract rate cards. Contract total: $4,120.00. Surcharge overcharge: $730.00.',
        statusText: 'GATE BLOCKED: $730 Rate Card Overcharge',
        statusColor: 'text-amber-400 font-bold',
        detail: 'OVERCHARGE DETECTED: 18 packages charged for oversized DIM weight without scale proof',
      },
      {
        num: 4,
        title: '04. One-Click Human Review Queue',
        stageName: 'Human Review',
        badge: 'Carrier Dispute Queue',
        desc: 'The payment is paused. An automated dispute packet with scale photos and tracking IDs is compiled for the logistics manager to review with one click.',
        statusText: 'Dispute Packet Ready',
        statusColor: 'text-amber-400',
        detail: 'DISPUTE: Formatted carrier dispute ready with package scale timestamps',
        actionRequired: 'Submit Dispute to Carrier & Pay Verified $4,120.00',
        actionDoneText: 'Dispute Submitted & Verified Amount Approved',
      },
      {
        num: 5,
        title: '05. Protected Ledger & Audit Record',
        stageName: 'Audit & Commit',
        badge: '$730 Margin Saved',
        desc: 'Only the verified $4,120.00 is authorized. Your business saves $730.00 in silent leakage, and shipping cost per order reconciles accurately.',
        statusText: 'Fulfillment Costs Reconciled',
        statusColor: 'text-emerald-400 font-bold',
        detail: 'RESULT: $730.00 billing leakage prevented · Ledger reconciled to cent',
      },
    ],
  },
  {
    id: 'clean-order',
    name: 'Clean Wholesale Order (100% Valid)',
    type: 'B2B Sales Order',
    summary: 'Customer PO for $32,400.00 matches contract price tiers, inventory allocations, and credit limits.',
    stages: [
      {
        num: 1,
        title: '01. Raw Document Ingestion',
        stageName: 'Ingestion',
        badge: 'Customer Purchase Order: PO-9912.pdf',
        desc: 'Wholesale customer emails purchase order for 2,000 units. System extracts SKU numbers, price tiers, and delivery terms.',
        statusText: 'Extracted to Staging',
        statusColor: 'text-text-muted',
        detail: 'INPUT: PO-9912.pdf (Account: Northland Retailers) · Value: $32,400.00',
      },
      {
        num: 2,
        title: '02. Isolated Safety Staging',
        stageName: 'Isolated Staging',
        badge: 'Staging Buffer',
        desc: 'Order lines are staged in temporary memory to verify inventory stock availability and customer credit rating.',
        statusText: 'Verification Staged',
        statusColor: 'text-text-primary',
        detail: 'BUFFER: stg_po_9912 · Validating customer credit & inventory allocation',
      },
      {
        num: 3,
        title: '03. Deterministic Rule Gate',
        stageName: 'Rule Verification',
        badge: 'All Rules Passed (100% Match)',
        desc: 'Automated verification confirms: Customer credit approved, inventory reserved in warehouse, and contract tier prices match 100%.',
        statusText: 'GATE PASSED: All Invariants Valid',
        statusColor: 'text-emerald-400 font-bold',
        detail: 'ALL CHECKS PASSED: Inventory available (2,000 units) · Credit rating: A+ · Pricing match: 100%',
      },
      {
        num: 4,
        title: '04. Fast-Track Auto Approval',
        stageName: 'Review Bypass',
        badge: 'Automated Processing (Zero Manual Work)',
        desc: 'Because all mathematical and operational rules passed 100%, the system bypasses human review and sends order directly to warehouse dispatch.',
        statusText: 'Dispatched to Fulfillment',
        statusColor: 'text-emerald-400',
        detail: 'DISPATCH: Pick list generated for Warehouse Bay 4 · Customer confirmation emailed',
      },
      {
        num: 5,
        title: '05. Production System Updated',
        stageName: 'Audit & Commit',
        badge: 'Order Created in Under 3 Seconds',
        desc: 'Inventory balances update in real-time, sales ledger reflects the transaction, and fulfillment team begins packing with zero manual data entry.',
        statusText: 'Order Committed Automatically',
        statusColor: 'text-emerald-400 font-bold',
        detail: 'LEDGER: Sales order #SO-4819 active · 0 manual keystrokes required',
      },
    ],
  },
];

const fluidSpring = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 32,
  mass: 1,
};

export default function PipelineMiniDemo() {
  const [selectedScenarioId, setSelectedScenarioId] = useState('invoice-variance');
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [actionCompleted, setActionCompleted] = useState(false);

  const scenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];
  const stages = scenario.stages;

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= stages.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlaying, stages.length]);

  const handleScenarioChange = (id: string) => {
    setSelectedScenarioId(id);
    setCurrentStep(0);
    setIsPlaying(false);
    setActionCompleted(false);
  };

  const handleNext = () => {
    setIsPlaying(false);
    if (currentStep < stages.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    setIsPlaying(false);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStage = stages[currentStep];

  return (
    <div className="w-full rounded-2xl bg-bg-secondary/80 border border-border-color p-6 sm:p-8 space-y-6 backdrop-blur-md">
      {/* Interactive Tool Banner & Instructions */}
      <div className="space-y-4 border-b border-border-color/60 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Layers className="w-4 h-4 text-accent-gold" />
            <span className="text-sm font-semibold text-text-primary tracking-tight">
              The Deterministic Staging Pipeline
            </span>
          </div>

          <span className="text-xs font-mono text-text-muted">
            Live Architecture Instrument
          </span>
        </div>

        {/* User Instructions */}
        <div className="p-4 rounded-xl bg-bg-primary border border-border-color flex items-start gap-3 text-xs text-text-muted leading-relaxed">
          <HelpCircle className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
          <div>
            <strong className="text-text-primary">How to use this tool:</strong> Operational systems must never write directly to your core books or inventory. Select a test scenario below, then step through the 5-stage pipeline to see how mathematical guardrails catch anomalies in quarantined staging before reaching production.
          </div>
        </div>

        {/* Scenario Selection Tabs */}
        <div className="pt-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-text-subtle mb-2.5">
            Select an Operational Scenario:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {SCENARIOS.map((sc) => {
              const isSelected = selectedScenarioId === sc.id;
              return (
                <motion.button
                  key={sc.id}
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleScenarioChange(sc.id)}
                  className={`relative p-3.5 rounded-xl text-left border transition-colors text-xs flex flex-col justify-between overflow-hidden ${
                    isSelected
                      ? 'border-accent-gold text-text-primary bg-bg-primary shadow-sm'
                      : 'border-border-color/60 bg-bg-primary/40 text-text-muted hover:text-text-primary hover:border-text-primary/30'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="active-scenario-indicator"
                      transition={fluidSpring}
                      className="absolute inset-0 rounded-xl ring-1 ring-accent-gold/40 pointer-events-none"
                    />
                  )}
                  <div className="font-semibold relative z-10">{sc.name}</div>
                  <div className="text-[10px] text-text-subtle font-mono mt-1 relative z-10">{sc.type}</div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pipeline Navigation Steps with Fluid Gliding Rail Indicator */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-text-subtle uppercase tracking-wider">
            Pipeline Progression · Stage {currentStep + 1} of {stages.length}
          </span>

          <div className="flex items-center gap-1.5">
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="px-2.5 py-1 rounded bg-bg-primary border border-border-color text-[11px] text-text-muted hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back</span>
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-2.5 py-1 rounded bg-bg-primary border border-border-color text-[11px] text-text-primary hover:border-accent-gold flex items-center gap-1.5 transition-colors font-medium"
            >
              {isPlaying ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
              <span>{isPlaying ? 'Pause' : 'Auto-Run'}</span>
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={currentStep === stages.length - 1}
              className="px-2.5 py-1 rounded bg-bg-primary border border-border-color text-[11px] text-text-muted hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
            >
              <span>Next</span>
              <ArrowRight className="w-3 h-3" />
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                setCurrentStep(0);
                setIsPlaying(false);
                setActionCompleted(false);
              }}
              className="p-1 rounded bg-bg-primary border border-border-color text-text-muted hover:text-text-primary transition-colors ml-1"
              title="Restart from Step 1"
            >
              <RotateCcw className="w-3 h-3" />
            </motion.button>
          </div>
        </div>

        {/* Step buttons with shared spring indicator */}
        <div className="grid grid-cols-5 gap-2 relative">
          {stages.map((stg, idx) => {
            const isActive = currentStep === idx;
            const isPassed = idx < currentStep;
            return (
              <motion.button
                key={stg.num}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setCurrentStep(idx);
                  setIsPlaying(false);
                }}
                className={`relative p-2.5 rounded-xl text-left border transition-colors text-xs font-mono flex flex-col justify-between overflow-hidden ${
                  isActive
                    ? 'border-accent-gold text-text-primary bg-bg-primary shadow-sm'
                    : isPassed
                    ? 'border-emerald-500/40 text-text-muted bg-bg-primary/70'
                    : 'border-border-color/50 text-text-subtle bg-bg-primary/30 hover:text-text-muted'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-step-rail"
                    transition={fluidSpring}
                    className="absolute inset-0 rounded-xl ring-1 ring-accent-gold/40 bg-accent-gold/5 pointer-events-none"
                  />
                )}
                <div className="flex items-center justify-between relative z-10">
                  <span className="font-bold">0{stg.num}</span>
                  {isPassed ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  ) : isActive ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                  ) : null}
                </div>
                <span className="text-[10px] truncate mt-1 relative z-10">{stg.stageName}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Live Stage Display Box */}
      <div className="p-6 rounded-2xl bg-bg-primary border border-border-color space-y-5 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${scenario.id}-${currentStep}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={fluidSpring}
            className="space-y-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-color/60 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="text-base font-bold text-text-primary font-mono">
                  {currentStage.title}
                </span>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-bg-secondary border border-border-color text-accent-gold">
                  {currentStage.badge}
                </span>
              </div>

              <div className={`text-xs font-mono ${currentStage.statusColor} flex items-center gap-1.5`}>
                {currentStep === 2 && scenario.id !== 'clean-order' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                ) : currentStep === 4 || (currentStep >= 2 && scenario.id === 'clean-order') ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-accent-gold" />
                )}
                <span>{currentStage.statusText}</span>
              </div>
            </div>

            <p className="text-sm text-text-muted leading-relaxed">
              {currentStage.desc}
            </p>

            {/* Interactive Human Action on Step 04 */}
            {currentStep === 3 && currentStage.actionRequired && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={fluidSpring}
                className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 space-y-3"
              >
                <div className="flex items-center justify-between gap-2 text-xs font-mono text-amber-400">
                  <span className="font-semibold uppercase tracking-wider">Human Decision Required:</span>
                  <span>1 Quarantined Exception</span>
                </div>
                <p className="text-xs text-text-muted">
                  Because the deterministic math check caught an anomaly, the pipeline halted write operations. As operations lead, you confirm the resolution:
                </p>
                {actionCompleted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={fluidSpring}
                    className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-xs font-mono text-emerald-400 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{currentStage.actionDoneText}</span>
                  </motion.div>
                ) : (
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setActionCompleted(true);
                      handleNext();
                    }}
                    className="btn-primary !px-4 !py-2 !text-xs font-semibold flex items-center gap-2 group cursor-pointer"
                  >
                    <span>{currentStage.actionRequired}</span>
                    <span className="btn-arrow-badge w-5 h-5">
                      <ArrowRight className="w-3 h-3 text-white" />
                    </span>
                  </motion.button>
                )}
              </motion.div>
            )}

            <div className="p-3 rounded-xl bg-[#0d0d0f] border border-border-color/80 font-mono text-[11px] text-text-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="truncate">{currentStage.detail}</span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1.5 shrink-0 font-medium">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>Deterministic Gate Active</span>
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
