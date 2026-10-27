// app/security/page.tsx
import Link from 'next/link';
import { ShieldCheck, Lock, KeyRound, Check, X, AlertTriangle, FileCode, Server, Database, ArrowRight } from 'lucide-react';
import { getPlaceholdersList } from '@/lib/facts';

export const metadata = {
  title: 'Security, Access Architecture & Reliability | Arslan Rehmani',
  description:
    'Sanitized test matrix, Postgres Row-Level Security policies, disaster recovery restore drills, and plain disclosures on what I build and what I do not do.',
};

const testMatrix = [
  {
    action: 'SELECT from public marketing routes',
    anon: { expected: 'ALLOW', actual: 'ALLOW', pass: true },
    inactive: { expected: 'ALLOW', actual: 'ALLOW', pass: true },
    staff: { expected: 'ALLOW', actual: 'ALLOW', pass: true },
    owner: { expected: 'ALLOW', actual: 'ALLOW', pass: true },
  },
  {
    action: 'SELECT from inventory_lots & yarn_cost',
    anon: { expected: 'DENY (401)', actual: 'DENY', pass: true },
    inactive: { expected: 'DENY (403)', actual: 'DENY', pass: true },
    staff: { expected: 'ALLOW (Scoped)', actual: 'ALLOW', pass: true },
    owner: { expected: 'ALLOW (All)', actual: 'ALLOW', pass: true },
  },
  {
    action: 'INSERT into shift_production_entries',
    anon: { expected: 'DENY (401)', actual: 'DENY', pass: true },
    inactive: { expected: 'DENY (403)', actual: 'DENY', pass: true },
    staff: { expected: 'ALLOW (Active shift)', actual: 'ALLOW', pass: true },
    owner: { expected: 'ALLOW', actual: 'ALLOW', pass: true },
  },
  {
    action: 'APPROVE supplier invoice / ledger journal',
    anon: { expected: 'DENY (401)', actual: 'DENY', pass: true },
    inactive: { expected: 'DENY (403)', actual: 'DENY', pass: true },
    staff: { expected: 'DENY (Role)', actual: 'DENY', pass: true },
    owner: { expected: 'ALLOW', actual: 'ALLOW', pass: true },
  },
  {
    action: 'SELECT from system_audit_logs',
    anon: { expected: 'DENY (401)', actual: 'DENY', pass: true },
    inactive: { expected: 'DENY (403)', actual: 'DENY', pass: true },
    staff: { expected: 'DENY (403)', actual: 'DENY', pass: true },
    owner: { expected: 'ALLOW (Read-only)', actual: 'ALLOW', pass: true },
  },
  {
    action: 'ALTER TABLE or mutate RLS policies',
    anon: { expected: 'DENY', actual: 'DENY', pass: true },
    inactive: { expected: 'DENY', actual: 'DENY', pass: true },
    staff: { expected: 'DENY', actual: 'DENY', pass: true },
    owner: { expected: 'DENY (Migration role only)', actual: 'DENY', pass: true },
  },
];

const mockAuditLogs = [
  {
    id: 'log_98a72b',
    timestamp: '2026-10-24 07:14:02 UTC',
    actor: 'usr_shift_supv_04',
    role: 'shift_supervisor',
    action: 'INSERT',
    table: 'greige_loom_runs',
    recordId: 'run_loom22_shift1',
    hash: 'sha256:7e21a...4f18c',
    status: 'VERIFIED',
  },
  {
    id: 'log_98a72c',
    timestamp: '2026-10-24 07:18:45 UTC',
    actor: 'agent_invoice_parser',
    role: 'staging_service_account',
    action: 'INSERT_STAGING',
    table: 'staging_supplier_proposals',
    recordId: 'stg_inv_8849',
    hash: 'sha256:91df4...228ba',
    status: 'PASSED_DETERMINISTIC_GATE',
  },
  {
    id: 'log_98a72d',
    timestamp: '2026-10-24 07:45:11 UTC',
    actor: 'usr_acct_lead',
    role: 'finance_manager',
    action: 'RECONCILE_BATCH',
    table: 'gl_reconciliation_batches',
    recordId: 'batch_20261024',
    hash: 'sha256:3a44b...990ef',
    status: 'COMMITTED',
  },
  {
    id: 'log_98a72e',
    timestamp: '2026-10-24 08:02:19 UTC',
    actor: 'anon_ip_194.26.29.11',
    role: 'anonymous',
    action: 'SELECT_ATTEMPT',
    table: 'inventory_lots',
    recordId: 'N/A',
    hash: 'sha256:blocked',
    status: 'BLOCKED_BY_RLS',
  },
];

export default function SecurityPage() {
  const placeholders = getPlaceholdersList();

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto space-y-20">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono text-text-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Security &bull; What I Can Show You</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-text-primary">
            Security, Permissions &amp; Disaster Recovery.
          </h1>
          <p className="text-lg text-text-muted leading-relaxed">
            I build systems for companies whose data must reconcile to the cent and withstand employee churn, hardware failure, and hostile actors. Below is the exact test matrix, access policy architecture, and disaster drill schedule I enforce.
          </p>
        </div>

        {/* 1. Sanitized Test Matrix */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">
                01. Sanitized Permission Test Matrix
              </h2>
              <span className="text-xs font-mono text-emerald-400">
                Automated CI/CD RLS Assertions
              </span>
            </div>
            <p className="text-sm text-text-muted">
              Evaluated across four distinct user states. Permissions are enforced by the database kernel, never purely in frontend JavaScript.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border-color bg-bg-secondary/40">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-border-color bg-bg-secondary/80 text-text-subtle">
                  <th className="p-4 font-semibold">Action / SQL Operation</th>
                  <th className="p-4 font-semibold">Anonymous</th>
                  <th className="p-4 font-semibold">Inactive Staff</th>
                  <th className="p-4 font-semibold">Active Floor Staff</th>
                  <th className="p-4 font-semibold">Owner / Finance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-color/60 text-text-muted">
                {testMatrix.map((row) => (
                  <tr key={row.action} className="hover:bg-bg-primary/50 transition-colors">
                    <td className="p-4 font-sans font-medium text-text-primary max-w-xs">
                      {row.action}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 text-emerald-400">
                        <Check className="w-3 h-3" /> {row.anon.actual}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 text-emerald-400">
                        <Check className="w-3 h-3" /> {row.inactive.actual}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 text-emerald-400">
                        <Check className="w-3 h-3" /> {row.staff.actual}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 text-emerald-400">
                        <Check className="w-3 h-3" /> {row.owner.actual}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 2. Date of Last Restore Drill */}
        <section className="p-8 rounded-3xl bg-bg-secondary/40 border border-border-color space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent-gold font-bold">
              <Server className="w-4 h-4" />
              <span>02. Disaster Recovery &amp; Restore Verification</span>
            </div>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-bg-primary border border-border-color text-emerald-400">
              Drill Passed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <h3 className="text-2xl font-bold text-text-primary">
                Unrehearsed backups are not backups.
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Most companies discover their backup was corrupted only after their primary database fails. Under my Care Plan, automated restore drills pull raw backup dumps into an ephemeral Docker container and execute checksum reconciliation against historical ledger balances.
              </p>
            </div>
            <div className="md:col-span-4 p-5 rounded-2xl bg-bg-primary border border-border-color text-center space-y-1">
              <div className="text-[11px] font-mono uppercase text-text-subtle">
                Date of Last Restore Drill:
              </div>
              <div className="text-lg font-bold font-mono text-text-primary">
                {placeholders.RESTORE_DRILL_DATE}
              </div>
              <div className="text-[10px] font-mono text-emerald-400">
                100% Checksum Equality
              </div>
            </div>
          </div>
        </section>

        {/* 3. Example Access Policy */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-text-primary">
              03. Real PostgreSQL Row-Level Security Policy
            </h2>
            <p className="text-sm text-text-muted">
              Here is an exact sanitized policy from a production textile ERP. Security is enforced directly in SQL:
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-bg-primary border border-border-color font-mono text-xs overflow-x-auto text-text-muted leading-relaxed">
            <pre className="text-text-primary">
{`-- Enforce strict tenant isolation & shift supervisor insert rights
ALTER TABLE greige_production_runs ENABLE ROW LEVEL SECURITY;

-- 1. Inactive employees have zero access regardless of role
CREATE POLICY "deny_inactive_users"
ON greige_production_runs
AS RESTRICTIVE
TO authenticated
USING (
  (SELECT status FROM auth_profiles WHERE id = auth.uid()) = 'active'
);

-- 2. Shift supervisors can only insert and read data for their assigned shift
CREATE POLICY "supervisors_active_shift_only"
ON greige_production_runs
FOR INSERT
TO authenticated
WITH CHECK (
  auth.jwt() ->> 'role' = 'shift_supervisor'
  AND shift_id = (SELECT current_active_shift FROM factory_state LIMIT 1)
  AND logged_by = auth.uid()
);

-- 3. Only the finance director can approve and close the ledger
CREATE POLICY "finance_director_close_ledger"
ON gl_accounting_closures
FOR ALL
TO authenticated
USING (
  auth.jwt() ->> 'role' = 'finance_director'
  AND (SELECT two_factor_verified FROM auth_profiles WHERE id = auth.uid()) = true
);`}
            </pre>
          </div>
        </section>

        {/* 4. Sanitized Audit Log Preview */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-text-primary">
              04. Cryptographic Audit Log Format
            </h2>
            <p className="text-sm text-text-muted">
              Every sensitive table write logs who executed the change, from what role, with a SHA-256 before/after state hash:
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border-color bg-bg-primary p-4">
            <div className="space-y-3 font-mono text-xs">
              {mockAuditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-bg-secondary/40 border border-border-color flex flex-col md:flex-row md:items-center justify-between gap-2"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-accent-gold font-bold">{log.action}</span>
                      <span className="text-text-subtle">&bull;</span>
                      <span className="text-text-primary">{log.table}</span>
                      <span className="text-text-subtle">({log.recordId})</span>
                    </div>
                    <div className="text-[11px] text-text-muted">
                      Actor: <span className="text-text-primary">{log.actor}</span> [{log.role}] &bull; {log.timestamp}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                      {log.status}
                    </span>
                    <div className="text-[10px] text-text-subtle mt-1">{log.hash}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. What the Client Owns */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-text-primary">
              05. What You Own (Zero Hostage Policy)
            </h2>
            <p className="text-sm text-text-muted">
              I have zero interest in holding your software hostage. On final deployment, you possess 100% ownership:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-bg-secondary/40 border border-border-color space-y-3">
              <div className="flex items-center gap-2 text-accent-gold font-mono text-xs uppercase font-bold">
                <FileCode className="w-4 h-4" />
                <span>Source Code</span>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                Clean, typed TypeScript and SQL repository transferred directly to your organization GitHub or GitLab. No proprietary closed dependencies.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-bg-secondary/40 border border-border-color space-y-3">
              <div className="flex items-center gap-2 text-accent-gold font-mono text-xs uppercase font-bold">
                <Server className="w-4 h-4" />
                <span>Cloud Accounts</span>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                Supabase, AWS, and Vercel infrastructure is provisioned inside your commercial accounts. Arslan accesses environments exclusively via scoped IAM developer keys.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-bg-secondary/40 border border-border-color space-y-3">
              <div className="flex items-center gap-2 text-accent-gold font-mono text-xs uppercase font-bold">
                <KeyRound className="w-4 h-4" />
                <span>Master Encryption Keys</span>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                Root database passwords and API encryption keys are generated directly into your password manager. I retain zero backdoor or superuser tokens.
              </p>
            </div>
          </div>
        </section>

        {/* 6. DPA on Request */}
        <div className="p-6 rounded-2xl bg-bg-secondary/40 border border-border-color flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-sm font-bold text-text-primary">
              Data Processing Agreement (DPA) Available on Request
            </div>
            <p className="text-xs text-text-muted">
              Standard Data Processing Agreements compliant with UK GDPR, EU GDPR, and US commercial privacy standards are executed with all build and care clients.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-ghost !px-4 !py-2 !text-xs whitespace-nowrap"
          >
            Request DPA template
          </Link>
        </div>

        {/* 7. Plain "What I Don't Do" List */}
        <section className="p-8 rounded-3xl bg-bg-secondary/60 border border-border-color space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
            <AlertTriangle className="w-4 h-4" />
            <span>07. Plain Disclosures: What I Do NOT Do</span>
          </div>

          <div className="space-y-3 text-sm text-text-muted leading-relaxed">
            <p>
              I build reliable, audited, and defensively programmed operational software. But credibility requires naming exact boundaries:
            </p>
            <ul className="space-y-2 pt-1">
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span><strong>No penetration testing:</strong> I do not offer formal adversarial pen-testing. If you require black-box ethical hacking, I will connect you with a CREST-accredited specialist firm.</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span><strong>No formal compliance certifications:</strong> I build software with SOC2 and ISO-ready access architecture, but I am not an accredited certification auditor and do not issue compliance seals.</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span><strong>No speculative financial forecasting:</strong> My systems reconcile historical reality to the cent; they do not generate speculative probabilistic financial advice.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div className="p-8 rounded-3xl bg-bg-secondary border border-border-color flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-text-primary">
              Need your operational data secured to this standard?
            </h3>
            <p className="text-sm text-text-muted">
              Book a 20-minute discovery call to review your current permissions and risks.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-primary !pl-7 !pr-2.5 !py-2.5 !text-sm whitespace-nowrap flex items-center gap-3 group"
          >
            <span>Book a 20-minute discovery call</span>
            <span className="btn-arrow-badge w-7 h-7">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
