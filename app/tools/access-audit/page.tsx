// app/tools/access-audit/page.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Lock,
  Printer,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Database,
} from 'lucide-react';

interface AuditItem {
  id: string;
  category: 'rls' | 'keys' | 'backup' | 'network' | 'audit';
  title: string;
  description: string;
  sqlCheck?: string;
  remediation: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
}

const AUDIT_ITEMS: AuditItem[] = [
  {
    id: 'sec-1',
    category: 'rls',
    title: 'Row Level Security (RLS) enabled on all public schema tables',
    description: 'If RLS is disabled, anyone with an anon API key can query or mutate rows via REST endpoints.',
    sqlCheck: "SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND rowsecurity = false;",
    remediation: 'ALTER TABLE public.<table_name> ENABLE ROW LEVEL SECURITY;',
    severity: 'CRITICAL',
  },
  {
    id: 'sec-2',
    category: 'keys',
    title: 'Service role / admin key NEVER exposed in client bundle',
    description: 'Ensure SUPABASE_SERVICE_ROLE_KEY or database superuser credentials do not have NEXT_PUBLIC_ prefixes.',
    remediation: 'Inspect your client environment variables. Service keys must only be accessed in server-side routes or background workers.',
    severity: 'CRITICAL',
  },
  {
    id: 'sec-3',
    category: 'backup',
    title: 'Point-In-Time Recovery (PITR) enabled & active',
    description: 'Standard nightly dumps lose up to 24 hours of operational journals. PITR enables restoration to any second.',
    remediation: 'Enable continuous Write-Ahead Log (WAL) archiving via cloud provider or pgBackRest.',
    severity: 'HIGH',
  },
  {
    id: 'sec-4',
    category: 'backup',
    title: 'Database restore drill verified within the last 90 days',
    description: 'An untested backup is not a backup. You must prove the restore snapshot can boot and pass table balance checks.',
    remediation: 'Schedule a quarterly drill: restore latest snapshot into an isolated sandbox and verify checksums.',
    severity: 'HIGH',
  },
  {
    id: 'sec-5',
    category: 'audit',
    title: 'Immutable append-only audit trail on financial / inventory mutations',
    description: 'Every UPDATE and DELETE on accounting, order, or stock ledgers must record the actor, timestamp, and previous state.',
    sqlCheck: 'SELECT event_id FROM audit_log LIMIT 1;',
    remediation: 'Attach an un-droppable PostgreSQL BEFORE/AFTER trigger writing to an append-only audit_logs table.',
    severity: 'HIGH',
  },
  {
    id: 'sec-6',
    category: 'network',
    title: 'SSL/TLS enforced on all incoming database connections',
    description: 'Unencrypted database connections expose passwords and sensitive business data to network sniffing.',
    sqlCheck: 'SHOW ssl;',
    remediation: 'Set sslmode=require or verify-full in your connection strings.',
    severity: 'MEDIUM',
  },
  {
    id: 'sec-7',
    category: 'keys',
    title: 'Least-privilege connection pooling (separate web vs worker roles)',
    description: 'Client API routes should connect using a restricted role; migrations and maintenance should use a separate DDL role.',
    remediation: 'Create distinct database roles with GRANT SELECT, INSERT, UPDATE on specific tables only.',
    severity: 'MEDIUM',
  },
  {
    id: 'sec-8',
    category: 'rls',
    title: 'Explicit policy test suite for tenant isolation',
    description: 'Automated tests verifying User A cannot query Organization B rows, even if they forge HTTP headers.',
    remediation: 'Write unit tests in pgTAP or integration tests executing queries under different user JWTs.',
    severity: 'HIGH',
  },
];

export default function AccessAuditPage() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'sec-1': true,
    'sec-2': true,
    'sec-6': true,
  });
  const [copied, setCopied] = useState<boolean>(false);
  const [showFormula, setShowFormula] = useState<boolean>(true);

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const selectAll = () => {
    const all: Record<string, boolean> = {};
    AUDIT_ITEMS.forEach((item) => (all[item.id] = true));
    setCheckedItems(all);
  };

  const clearAll = () => {
    setCheckedItems({});
  };

  const auditReport = useMemo(() => {
    const total = AUDIT_ITEMS.length;
    const passed = AUDIT_ITEMS.filter((i) => checkedItems[i.id]).length;
    const failedItems = AUDIT_ITEMS.filter((i) => !checkedItems[i.id]);
    const scorePercent = Math.round((passed / total) * 100);

    let statusText = 'Critical Vulnerabilities Detected';
    let statusColor = 'text-rose-400';

    if (scorePercent === 100) {
      statusText = 'Rigorous Hardened Posture';
      statusColor = 'text-emerald-400';
    } else if (scorePercent >= 70) {
      statusText = 'Moderate Posture — Gaps in Backups / Audit';
      statusColor = 'text-amber-400';
    }

    return {
      total,
      passed,
      failed: total - passed,
      scorePercent,
      failedItems,
      statusText,
      statusColor,
    };
  }, [checkedItems]);

  const generateReportText = () => {
    const lines = [
      `=====================================================`,
      `POSTGRES / SUPABASE SECURITY & BACKUP AUDIT REPORT`,
      `Generated: ${new Date().toISOString()}`,
      `Security Score: ${auditReport.scorePercent}% (${auditReport.passed}/${auditReport.total} checks passed)`,
      `Status: ${auditReport.statusText}`,
      `=====================================================`,
      ``,
      `PASSED CONTROLS:`,
      ...AUDIT_ITEMS.filter((i) => checkedItems[i.id]).map((i) => ` [PASS] [${i.severity}] ${i.title}`),
      ``,
      `FAILED / UNCHECKED CONTROLS:`,
      ...auditReport.failedItems.map(
        (i) => ` [FAIL] [${i.severity}] ${i.title}\n        Remediation: ${i.remediation}`
      ),
      ``,
      `=====================================================`,
      `Audited via arslanrehmani.com/tools/access-audit`,
    ];
    return lines.join('\n');
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(generateReportText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <span className="text-text-primary">Access & Backup Self-Audit</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono text-emerald-400 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Postgres & Supabase Security Checklist &bull; Copy-Paste Report</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
                Access & Backup Self-Audit
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
                <span>Print / PDF</span>
              </button>
            </div>
          </div>

          <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-3xl">
            A self-audit checklist based on real PostgreSQL defense-in-depth principles. Check off the security controls currently verified in your database to generate an instant, copy-paste posture report and SQL remediation queries.
          </p>
        </div>

        {/* Two Columns: Checklist & Posture Report */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2">
              <h2 className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                Database Defense Checklist ({AUDIT_ITEMS.length} Controls)
              </h2>
              <span className="text-xs font-mono text-text-subtle">
                {auditReport.passed} verified
              </span>
            </div>

            <div className="space-y-3">
              {AUDIT_ITEMS.map((item) => {
                const isPassed = !!checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer select-none ${
                      isPassed
                        ? 'bg-bg-secondary border-border-gold shadow-sm'
                        : 'bg-bg-secondary/40 border-border-color hover:border-border-color/80'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                          isPassed
                            ? 'bg-accent-gold border-accent-gold text-bg-primary'
                            : 'border-border-color bg-bg-primary'
                        }`}
                      >
                        {isPassed && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-text-primary">
                            {item.title}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded border shrink-0 uppercase ${
                              item.severity === 'CRITICAL'
                                ? 'bg-rose-950/40 border-rose-800/40 text-rose-400'
                                : item.severity === 'HIGH'
                                ? 'bg-amber-950/40 border-amber-800/40 text-amber-400'
                                : 'bg-bg-primary border-border-color text-text-subtle'
                            }`}
                          >
                            {item.severity}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted leading-relaxed">
                          {item.description}
                        </p>
                        {item.sqlCheck && (
                          <div className="mt-2 p-2 rounded bg-bg-primary border border-border-color font-mono text-[11px] text-text-subtle overflow-x-auto">
                            <code>{item.sqlCheck}</code>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Formula Block */}
            <div className="rounded-2xl bg-bg-secondary border border-border-color p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  Audit Criteria & Sources
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
                  <div>• Standards: CIS PostgreSQL Benchmark & Supabase Hardening Guide (v2026).</div>
                  <div>• Critical Rule: Any table exposed in the public schema without RLS or an explicit denial policy is an automatic data breach hazard.</div>
                  <div className="text-[11px] text-text-subtle pt-1 border-t border-border-color">
                    Status: Static architectural evaluation tool. No remote DB credentials requested or accepted.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-24 rounded-2xl bg-bg-secondary border border-border-color p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono text-text-muted uppercase">Posture Assessment</span>
                <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                  Database Security Index
                </h3>
              </div>

              {/* Score Display */}
              <div className="p-5 rounded-2xl bg-bg-primary border border-border-color space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-mono text-text-subtle">Compliance Score:</span>
                  <span className={`text-3xl font-bold font-mono ${auditReport.statusColor}`}>
                    {auditReport.scorePercent}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-bg-secondary overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      auditReport.scorePercent === 100
                        ? 'bg-emerald-400'
                        : auditReport.scorePercent >= 70
                        ? 'bg-amber-400'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${auditReport.scorePercent}%` }}
                  />
                </div>
                <div className="text-xs font-medium text-text-primary">
                  {auditReport.statusText}
                </div>
              </div>

              {/* Copy-Paste Report Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-text-muted">
                  <span>Exportable Audit Summary:</span>
                  <button
                    type="button"
                    onClick={handleCopyReport}
                    className="text-xs font-mono text-accent-gold hover:underline flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-bg-primary border border-border-color text-[11px] font-mono text-text-subtle h-48 overflow-y-auto whitespace-pre-wrap leading-tight">
                  {generateReportText()}
                </pre>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <Link
                  href="/services#care-plan"
                  className="btn-primary w-full !py-3 !text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Inquire About Care & Drills</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] text-text-subtle text-center block mt-2 font-mono">
                  Monthly restore drills &bull; Continuous access auditing
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
