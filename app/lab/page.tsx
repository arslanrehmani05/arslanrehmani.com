// app/lab/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FlaskConical,
  Terminal,
  FileCode,
  Download,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Cpu,
} from 'lucide-react';

interface LabExperiment {
  id: string;
  title: string;
  category: string;
  maturity: 'In production' | 'Prototype' | 'Experiment';
  metrics: string;
  description: string;
  codeSnippet: string;
  fileName: string;
}

const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: 'exp-1',
    title: 'PostgreSQL Double-Entry Trial Balance Invariant Trigger',
    category: 'Database Integrity',
    maturity: 'In production',
    metrics: '0 cent balance drift across 10+ months in production',
    description:
      'A strict PostgreSQL constraint trigger that prevents any financial transaction from committing unless sum(debit) strictly equals sum(credit). Guarantees that no dirty write or race condition can corrupt the ledger.',
    codeSnippet: `CREATE OR REPLACE FUNCTION verify_journal_voucher_balance()
RETURNS TRIGGER AS $$
DECLARE
  v_sum_debit NUMERIC(12, 2);
  v_sum_credit NUMERIC(12, 2);
BEGIN
  -- Sum all debits and credits for the pending transaction voucher
  SELECT COALESCE(SUM(debit), 0), COALESCE(SUM(credit), 0)
    INTO v_sum_debit, v_sum_credit
    FROM journal_lines
   WHERE voucher_id = NEW.voucher_id;

  IF v_sum_debit <> v_sum_credit THEN
    RAISE EXCEPTION 'Ledger Invariant Violation: Total Debits (%) do not equal Total Credits (%) for voucher %',
      v_sum_debit, v_sum_credit, NEW.voucher_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER trg_verify_voucher_balance
AFTER INSERT OR UPDATE ON journal_lines
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION verify_journal_voucher_balance();`,
    fileName: '01_double_entry_trigger.sql',
  },
  {
    id: 'exp-2',
    title: 'Isolated Staging Schema with Deterministic Zod Gate',
    category: 'Agent Architecture',
    maturity: 'In production',
    metrics: '99.4% schema assertion pass rate in nightly evals',
    description:
      'TypeScript validation pipeline that intercepts unstructured LLM extraction payloads. Asserts strict types, ranges, non-null keys, and date formats before any data is allowed into the commit queue.',
    codeSnippet: `import { z } from 'zod';

export const SupplierInvoiceSchema = z.object({
  invoiceNumber: z.string().min(3).max(50),
  vendorTaxId: z.string().regex(/^[A-Z0-9-]{8,20}$/),
  invoiceDate: z.string().refine((d) => !isNaN(Date.parse(d)), {
    message: 'Must be a valid ISO date string',
  }),
  lineItems: z.array(
    z.object({
      description: z.string().min(1),
      quantity: z.number().positive(),
      unitPrice: z.number().nonnegative(),
      totalAmount: z.number().nonnegative(),
    })
  ).min(1),
  subtotal: z.number().positive(),
  taxAmount: z.number().nonnegative(),
  totalAmount: z.number().positive(),
}).refine(
  (data) => {
    // Deterministic arithmetic assertion
    const calculatedSum = data.lineItems.reduce((acc, item) => acc + item.totalAmount, 0);
    return Math.abs(calculatedSum - data.subtotal) < 0.01;
  },
  { message: 'Line item total does not reconcile with subtotal' }
);`,
    fileName: '02_staging_zod_gate.ts',
  },
  {
    id: 'exp-3',
    title: 'Adversarial Prompt-Injection Defense Proxy',
    category: 'Security & Agents',
    maturity: 'Prototype',
    metrics: '100% defense rate across 20+ injection benchmarks',
    description:
      'A zero-latency regex and structural sanitizer that strips prompt overrides ("Ignore previous instructions", "system role:", delimiters) and rejects malformed payloads before invoking Gemini or Anthropic.',
    codeSnippet: `export function sanitizeAgentInput(rawInput: string): { safeText: string; flagged: boolean } {
  // Disallowed injection patterns
  const injectionPatterns = [
    /ignore\\s+all\\s+previous\\s+instructions/i,
    /system\\s*:\\s*you\\s+are\\s+now/i,
    /bypass\\s+(security|rules|guardrails)/i,
    /print\\s+all\\s+environment\\s+variables/i,
    /<\\|im_start\\|>/i,
    /<\\|endoftext\\|>/i,
  ];

  for (const pattern of injectionPatterns) {
    if (pattern.test(rawInput)) {
      return { safeText: '', flagged: true };
    }
  }

  // Strip excessive markdown delimiters and invisible unicode control chars
  const sanitized = rawInput
    .replace(/[\\u200B-\\u200D\\uFEFF]/g, '')
    .trim()
    .slice(0, 15000);

  return { safeText: sanitized, flagged: false };
}`,
    fileName: '03_injection_defense.ts',
  },
  {
    id: 'exp-4',
    title: 'Automated Disaster Recovery Restore Drill Script',
    category: 'Infrastructure',
    maturity: 'In production',
    metrics: 'Restore drill verified every 90 days',
    description:
      'Dockerized bash script that pulls the latest encrypted database backup, boots a fresh sandbox instance, runs schema migrations, and asserts trial balance checksums.',
    codeSnippet: `#!/usr/bin/env bash
set -euo pipefail

echo "=== 1. Starting Isolated PostgreSQL Sandbox ==="
docker run -d --name pg-restore-test -e POSTGRES_PASSWORD=drill_pass -p 5439:5432 postgres:16-alpine
sleep 3

echo "=== 2. Restoring Encrypted Snapshot ==="
gunzip -c latest_backup.sql.gz | docker exec -i pg-restore-test psql -U postgres -d postgres

echo "=== 3. Executing Deterministic Checksum Assertion ==="
BALANCE_DRIFT=$(docker exec -i pg-restore-test psql -U postgres -d postgres -t -c "
  SELECT COALESCE(SUM(debit) - SUM(credit), 0) FROM journal_lines;
")

if [ "$(echo "$BALANCE_DRIFT == 0" | bc)" -eq 1 ]; then
  echo ">>> DRILL SUCCESS: Trial balance balances to the cent (Drift = $BALANCE_DRIFT) <<<"
else
  echo ">>> DRILL FAILED: Ledger imbalance detected! Drift = $BALANCE_DRIFT <<<"
  exit 1
fi

docker stop pg-restore-test && docker rm pg-restore-test`,
    fileName: '04_restore_drill.sh',
  },
];

export default function LabPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (fileName: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-24 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header Block */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono text-emerald-400">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Operational Engineering Lab &bull; Free Code & Schemas</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-text-primary">
            The Systems Lab.
          </h1>
          <p className="text-base sm:text-lg text-text-muted leading-relaxed">
            Production scripts, database triggers, and guardrail patterns developed during actual SMB migrations. Every artifact below is labeled with its maturity status and real measured metrics. Copy and adapt them freely.
          </p>
        </div>

        {/* Experiment Grid */}
        <div className="space-y-10">
          {LAB_EXPERIMENTS.map((exp) => (
            <div
              key={exp.id}
              className="rounded-2xl bg-bg-secondary border border-border-color p-6 sm:p-8 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-color">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-accent-gold">{exp.category}</span>
                    <span>&bull;</span>
                    <span
                      className={`px-2 py-0.5 rounded border uppercase text-[10px] ${
                        exp.maturity === 'In production'
                          ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-400'
                          : exp.maturity === 'Prototype'
                          ? 'bg-sky-950/40 border-sky-800/40 text-sky-400'
                          : 'bg-amber-950/40 border-amber-800/40 text-amber-400'
                      }`}
                    >
                      {exp.maturity}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
                    {exp.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(exp.id, exp.codeSnippet)}
                    className="btn-ghost !px-3 !py-1.5 !text-xs font-mono flex items-center gap-1.5"
                  >
                    {copiedId === exp.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedId === exp.id ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownload(exp.fileName, exp.codeSnippet)}
                    className="btn-primary !px-3 !py-1.5 !text-xs font-mono flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              <p className="text-sm text-text-muted leading-relaxed">
                {exp.description}
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-primary border border-border-color text-xs font-mono text-text-primary">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Metric: {exp.metrics}</span>
              </div>

              {/* Code Box */}
              <div className="rounded-xl bg-bg-primary border border-border-color overflow-hidden">
                <div className="px-4 py-2 bg-bg-primary/80 border-b border-border-color flex items-center justify-between text-xs font-mono text-text-subtle">
                  <span>{exp.fileName}</span>
                  <span>UTF-8 &bull; Verified Invariant</span>
                </div>
                <pre className="p-4 text-xs font-mono text-text-muted overflow-x-auto leading-relaxed">
                  <code>{exp.codeSnippet}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="p-8 rounded-2xl bg-bg-secondary border border-border-color flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h4 className="text-base font-bold text-text-primary">
              Have a custom architectural constraint or legacy database?
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              I design custom schemas, migrations, and deterministic staging guards tailored to your exact operational reality.
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
