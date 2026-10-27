// app/tools/readiness/page.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  CheckSquare,
  AlertTriangle,
  Printer,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';

interface RubricItem {
  id: string;
  category: 'fragility' | 'scale' | 'security' | 'velocity';
  label: string;
  description: string;
  weight: number; // 1 to 3
  remediation: string;
}

const RUBRIC_CRITERIA: RubricItem[] = [
  {
    id: 'crit-1',
    category: 'scale',
    label: 'Multiple concurrent editors in a single workbook',
    description: 'More than 2 people regularly edit the same spreadsheet simultaneously, causing overwrite conflicts or file locks.',
    weight: 3,
    remediation: 'Implement a transactional database (PostgreSQL) with row-level locks and optimistic concurrency.',
  },
  {
    id: 'crit-2',
    category: 'fragility',
    label: 'Fragile cross-workbook formulas (VLOOKUP / IMPORTRANGE)',
    description: 'Workbooks depend on formulas referencing external sheets, network paths, or local file drives that break when files are moved.',
    weight: 3,
    remediation: 'Replace cell-level cross-references with relational foreign keys and SQL indexed joins.',
  },
  {
    id: 'crit-3',
    category: 'security',
    label: 'No role-based permissions (all-or-nothing file access)',
    description: 'Anyone with sheet access can view sensitive employee wage data, wholesale cost markups, or banking references.',
    weight: 3,
    remediation: 'Deploy Role-Based Access Control (RBAC) and Row-Level Security (RLS) so staff only see their authorized operational records.',
  },
  {
    id: 'crit-4',
    category: 'fragility',
    label: 'No immutable audit log of modifications',
    description: 'When a cell value changes or a line is deleted, there is no append-only audit trail recording who changed it, when, and the prior value.',
    weight: 2,
    remediation: 'Attach an append-only audit trigger table capturing timestamp, actor ID, old state, and new state.',
  },
  {
    id: 'crit-5',
    category: 'velocity',
    label: 'Slow month-end close (> 3 business days)',
    description: 'Closing financial or inventory books takes more than 3 business days due to manual copy-paste reconciliations and error hunting.',
    weight: 2,
    remediation: 'Automate daily staging and balance validation so month-end is reduced to a verification sign-off.',
  },
  {
    id: 'crit-6',
    category: 'fragility',
    label: 'Key person risk (workbook understood by only one person)',
    description: 'The sheet was built by a specific employee who holds the logic in their head; if they are sick or leave, operations freeze.',
    weight: 3,
    remediation: 'Extract embedded business rules into version-controlled, documented TypeScript / SQL modules with integration tests.',
  },
  {
    id: 'crit-7',
    category: 'scale',
    label: 'Workbook sluggishness or row limits (> 20,000 rows)',
    description: 'File takes noticeable seconds to open, recalculate, or save, and crashes occasionally when computing summary statistics.',
    weight: 2,
    remediation: 'Migrate to a relational engine capable of handling millions of rows with sub-10ms query times.',
  },
  {
    id: 'crit-8',
    category: 'security',
    label: 'Sensitive files stored on local laptops or unmanaged drives',
    description: 'Operational sheets are emailed as attachments, downloaded to local laptops, or stored on personal Dropbox accounts.',
    weight: 2,
    remediation: 'Host data exclusively on cloud infrastructure with encrypted storage at rest (AES-256) and TLS 1.3 in transit.',
  },
  {
    id: 'crit-9',
    category: 'fragility',
    label: 'Lack of input validation (free-text entry in numerical fields)',
    description: 'Dates entered in inconsistent formats (DD/MM vs MM/DD), negative numbers in quantity fields, or typos in customer names.',
    weight: 2,
    remediation: 'Enforce database CHECK constraints, ENUM types, and schema validations at the UI input level.',
  },
  {
    id: 'crit-10',
    category: 'security',
    label: 'No automated daily backup with verifiable recovery',
    description: 'Backups rely on Google Drive version history or manual "Save As Copy_v2.xlsx"; no restore test has ever been executed.',
    weight: 3,
    remediation: 'Configure automated Point-in-Time Recovery (PITR) with automated daily snapshot verification drills.',
  },
  {
    id: 'crit-11',
    category: 'velocity',
    label: 'Manual re-entry between disconnected software tools',
    description: 'Staff manually copy order numbers, tracking IDs, or invoice totals from email/e-commerce into the accounting sheet.',
    weight: 2,
    remediation: 'Build authenticated webhook ingestion pipelines that stream external transactions directly into a staging queue.',
  },
  {
    id: 'crit-12',
    category: 'fragility',
    label: 'Unchecked circular dependencies or broken `#REF!` errors',
    description: 'The spreadsheet contains dormant `#REF!` or `#VALUE!` errors that have been ignored or patched with hardcoded overrides.',
    weight: 2,
    remediation: 'Conduct a formal schema and inventory audit to purge circular logic before systematic migration.',
  },
];

export default function SpreadsheetReadinessCheckPage() {
  const [selectedCriteria, setSelectedCriteria] = useState<Record<string, boolean>>({
    'crit-1': true,
    'crit-2': true,
    'crit-6': true,
    'crit-9': true,
  });
  const [showFormula, setShowFormula] = useState<boolean>(true);

  const toggleCriterion = (id: string) => {
    setSelectedCriteria((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const selectAll = () => {
    const all: Record<string, boolean> = {};
    RUBRIC_CRITERIA.forEach((c) => (all[c.id] = true));
    setSelectedCriteria(all);
  };

  const clearAll = () => {
    setSelectedCriteria({});
  };

  // Scoring analysis
  const scoreReport = useMemo(() => {
    const totalMaxWeight = RUBRIC_CRITERIA.reduce((acc, c) => acc + c.weight, 0); // 29
    let currentWeight = 0;
    const flaggedItems: RubricItem[] = [];

    RUBRIC_CRITERIA.forEach((c) => {
      if (selectedCriteria[c.id]) {
        currentWeight += c.weight;
        flaggedItems.push(c);
      }
    });

    // Risk percentage: 0% (healthy) to 100% (critical operational breaking point)
    const riskPercentage = Math.round((currentWeight / totalMaxWeight) * 100);

    // Prioritize remediation: weight 3 first, then weight 2
    flaggedItems.sort((a, b) => b.weight - a.weight);

    let readinessStatus: { label: string; tone: string; summary: string } = {
      label: 'Stable Spreadsheet Operation',
      tone: 'text-emerald-400',
      summary: 'Your current operational workbooks carry low systemic risk. Keep formulas clean; migration is not yet urgent.',
    };

    if (riskPercentage >= 65) {
      readinessStatus = {
        label: 'Critical Breaking Point — Immediate System Build Needed',
        tone: 'text-rose-400',
        summary: 'Your operations have outgrown spreadsheets. Continued reliance risks catastrophic data loss, silent balance corruption, or key-person paralysis.',
      };
    } else if (riskPercentage >= 35) {
      readinessStatus = {
        label: 'High Fragility — Staged Database Migration Recommended',
        tone: 'text-amber-400',
        summary: 'Multiple high-risk vectors detected (formula fragility, missing audit trails, or access risks). A fixed-scope Data Audit should precede any software build.',
      };
    }

    return {
      currentWeight,
      totalMaxWeight,
      riskPercentage,
      flaggedCount: flaggedItems.length,
      flaggedItems,
      readinessStatus,
    };
  }, [selectedCriteria]);

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
            <span className="text-text-primary">Spreadsheet-to-System Readiness Check</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono text-emerald-400 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>12-Point Transparent Scoring Rubric &bull; Weights Fully Visible</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
                Spreadsheet-to-System Readiness Check
              </h1>
            </div>

            <div className="flex items-center gap-2 print:hidden">
              <button
                type="button"
                onClick={clearAll}
                className="btn-ghost !px-4 !py-2 !text-xs font-mono"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={selectAll}
                className="btn-ghost !px-4 !py-2 !text-xs font-mono"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-primary !px-4 !py-2 !text-xs font-mono flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Export PDF</span>
              </button>
            </div>
          </div>

          <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-3xl">
            Spreadsheets are phenomenal for prototyping, but lethal for operations when they outgrow their design. Select every symptom currently true for your business. The rubric computes your structural fragility score and tells you exactly what to fix first.
          </p>
        </div>

        {/* Two Columns: Checklist & Scoring Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Checklist Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2">
              <h2 className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                Operational Vulnerability Checklist (12 Criteria)
              </h2>
              <span className="text-xs font-mono text-text-subtle">
                {scoreReport.flaggedCount} of {RUBRIC_CRITERIA.length} checked
              </span>
            </div>

            <div className="space-y-3">
              {RUBRIC_CRITERIA.map((criterion) => {
                const isChecked = !!selectedCriteria[criterion.id];
                return (
                  <div
                    key={criterion.id}
                    onClick={() => toggleCriterion(criterion.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer select-none ${
                      isChecked
                        ? 'bg-bg-secondary border-border-gold shadow-sm'
                        : 'bg-bg-secondary/40 border-border-color hover:border-border-color/80'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                          isChecked
                            ? 'bg-accent-gold border-accent-gold text-bg-primary'
                            : 'border-border-color bg-bg-primary'
                        }`}
                      >
                        {isChecked && <CheckSquare className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-text-primary">
                            {criterion.label}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-primary border border-border-color text-text-muted shrink-0">
                            Weight: {criterion.weight}x
                          </span>
                        </div>
                        <p className="text-xs text-text-muted leading-relaxed">
                          {criterion.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Formula Card */}
            <div className="rounded-2xl bg-bg-secondary border border-border-color p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  Transparent Scoring Rubric
                </span>
                <button
                  type="button"
                  onClick={() => setShowFormula(!showFormula)}
                  className="text-xs font-mono text-text-muted hover:text-text-primary flex items-center gap-1"
                >
                  <span>{showFormula ? 'Hide Formula' : 'Show Formula'}</span>
                  {showFormula ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {showFormula && (
                <div className="p-4 rounded-xl bg-bg-primary border border-border-color text-xs font-mono text-text-muted space-y-1">
                  <div>Risk Score % = (Σ Selected_Weights / Total_Weights) × 100</div>
                  <div>Weight 3: Existential operational threats (concurrency overwrite, zero backups, secret key leakage).</div>
                  <div>Weight 2: Severe velocity drag (sluggish sheets, manual re-entry, input typos).</div>
                  <div className="text-[11px] text-text-subtle pt-1 border-t border-border-color">
                    Status: Deterministic estimate based on production migration patterns across manufacturing & e-commerce.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-24 rounded-2xl bg-bg-secondary border border-border-color p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono text-text-muted uppercase">Diagnostic Assessment</span>
                <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                  Spreadsheet Fragility Index
                </h3>
              </div>

              {/* Progress Bar & Score */}
              <div className="space-y-3 p-5 rounded-2xl bg-bg-primary border border-border-color">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-mono text-text-subtle">Systemic Risk Score:</span>
                  <span className={`text-3xl font-bold font-mono ${scoreReport.readinessStatus.tone}`}>
                    {scoreReport.riskPercentage}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-bg-secondary overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      scoreReport.riskPercentage >= 65
                        ? 'bg-rose-500'
                        : scoreReport.riskPercentage >= 35
                        ? 'bg-amber-400'
                        : 'bg-emerald-400'
                    }`}
                    style={{ width: `${scoreReport.riskPercentage}%` }}
                  />
                </div>
                <div className="text-xs font-medium text-text-primary pt-1">
                  {scoreReport.readinessStatus.label}
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  {scoreReport.readinessStatus.summary}
                </p>
              </div>

              {/* Remediation Priorities */}
              {scoreReport.flaggedItems.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-text-primary font-semibold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span>What To Fix First (Priority Order)</span>
                  </h4>
                  <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {scoreReport.flaggedItems.slice(0, 4).map((item, idx) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl bg-bg-primary/70 border border-border-color space-y-1 text-xs"
                      >
                        <div className="font-semibold text-text-primary flex items-center justify-between">
                          <span>{idx + 1}. {item.label}</span>
                          <span className="text-[10px] font-mono text-amber-400">P{4 - item.weight}</span>
                        </div>
                        <p className="text-[11px] text-text-muted leading-relaxed">
                          <strong className="text-text-subtle">Fix:</strong> {item.remediation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Conversion CTA */}
              <div className="pt-2">
                <Link
                  href="/services#data-audit"
                  className="btn-primary w-full !py-3 !text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Commission a 1-Week Data Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] text-text-subtle text-center block mt-2 font-mono">
                  Fixed scope &bull; Source inventory &bull; Working prototype
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
