// app/enterprise/page.tsx
import Link from 'next/link';
import {
  ShieldCheck,
  FileCheck,
  FileText,
  Lock,
  Server,
  Download,
  ArrowRight,
  Database,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Key,
} from 'lucide-react';
import { getPlaceholdersList } from '@/lib/facts';

export const metadata = {
  title: 'Enterprise Pack & Security Dossier | Arslan Rehmani',
  description:
    'Security questionnaire answers, subprocessor list, Data Processing Agreement (DPA) terms, incident response SLA, and architecture specs for enterprise procurement leads.',
};

const SECURITY_QUESTIONNAIRE_ITEMS = [
  {
    question: 'Where is customer data hosted and stored?',
    answer:
      'All databases and application instances are hosted directly inside the client-owned cloud account (AWS, Google Cloud, or Supabase). No customer operational data ever resides on multi-tenant SaaS servers owned by Arslan.',
  },
  {
    question: 'How is data encrypted in transit and at rest?',
    answer:
      'All network traffic enforces TLS 1.3 encryption in transit with strict HSTS headers. Storage volumes, database disks, and backups are encrypted at rest using industry-standard AES-256 keys.',
  },
  {
    question: 'How are database permissions and access controls enforced?',
    answer:
      'PostgreSQL Row-Level Security (RLS) and Role-Based Access Control (RBAC) are enforced at the database layer. Database superuser keys are never bundled into client applications; web clients query via strictly scoped roles.',
  },
  {
    question: 'What is the backup frequency and disaster recovery SLA?',
    answer:
      'Point-in-Time Recovery (PITR) is configured with continuous Write-Ahead Log (WAL) archiving, enabling recovery to any second. Full restoration drills are executed quarterly to verify balance integrity.',
  },
  {
    question: 'Are AI models trained on client data?',
    answer:
      'Never. AI agents use enterprise API tiers (Google Cloud Vertex AI / Anthropic Enterprise) with explicit zero-retention contracts. Client prompts and documents are never used for model training or retained in shared caches.',
  },
  {
    question: 'What is the incident response protocol?',
    answer:
      'Critical operational outages (P1) trigger direct developer response within 4 hours. Security vulnerabilities are patched within 24 hours of notification with post-mortem documentation.',
  },
];

const SUBPROCESSOR_LIST = [
  {
    name: 'Google Cloud Platform (GCP)',
    role: 'Server compute, Vertex AI model API, Cloud SQL (optional)',
    location: 'United States / European Union (Client-Selected Region)',
    compliance: 'SOC 2 Type II, ISO 27001, HIPAA, GDPR',
  },
  {
    name: 'Anthropic PBC',
    role: 'LLM reasoning API (Claude 3.5 Sonnet / Haiku)',
    location: 'United States (Zero data retention enterprise tier)',
    compliance: 'SOC 2 Type II, HIPAA, GDPR',
  },
  {
    name: 'Supabase / AWS RDS',
    role: 'Managed PostgreSQL, authentication, and WAL archiving',
    location: 'Client-selected AWS region (us-east-1, eu-west-1, etc.)',
    compliance: 'SOC 2 Type II, ISO 27001, GDPR',
  },
  {
    name: 'Vercel Inc.',
    role: 'Edge application delivery and serverless compute',
    location: 'Global Edge Network (Encrypted payload proxy)',
    compliance: 'SOC 2 Type II, ISO 27001, GDPR',
  },
];

export default function EnterprisePackPage() {
  const placeholders = getPlaceholdersList();
  const insuranceStatus =
    placeholders.INSURANCE_STATUS ||
    placeholders['{{INSURANCE_STATUS}}'] ||
    'Commercial general & cyber liability coverage active; COI available upon request';

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-24 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header Block */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Procurement & Security Dossier</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-text-primary">
            Enterprise Pack.
          </h1>
          <p className="text-base sm:text-lg text-text-muted leading-relaxed">
            Everything your CTO, legal counsel, or procurement committee needs to review before signing a contract: architecture diagrams, security questionnaire answers, subprocessor disclosures, and data ownership terms.
          </p>
        </div>

        {/* Ownership & Autonomy Guarantee */}
        <div className="rounded-2xl bg-bg-secondary border border-border-color p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border-color flex items-center justify-center text-accent-gold">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-text-primary">
                100% Client Ownership & Zero Vendor Lock-in
              </h2>
              <p className="text-xs text-text-muted">
                How I structure every engagement to ensure you are never held hostage
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-4 rounded-xl bg-bg-primary border border-border-color space-y-1">
              <strong className="text-text-primary font-mono block">1. Your Cloud Account</strong>
              <p className="text-text-muted leading-relaxed">
                All code, databases, and APIs are deployed directly inside your AWS, GCP, or Supabase organization. You hold the root keys; I work via scoped IAM credentials.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-bg-primary border border-border-color space-y-1">
              <strong className="text-text-primary font-mono block">2. Standard Open Tech</strong>
              <p className="text-text-muted leading-relaxed">
                Written in standard PostgreSQL, TypeScript, and Next.js. No proprietary runtime, no closed-source SDKs, and no custom dependencies that lock you to me.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-bg-primary border border-border-color space-y-1">
              <strong className="text-text-primary font-mono block">3. Complete Handover</strong>
              <p className="text-text-muted leading-relaxed">
                Full documentation, schema migration scripts, seed files, and automated test suites are committed to your private GitHub repository on final signoff.
              </p>
            </div>
          </div>
        </div>

        {/* Security Questionnaire Answers (SOC 2 / ISO 27001 Mapping) */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">
              Security Questionnaire Standard Responses
            </h2>
            <p className="text-xs text-text-muted mt-1">
              Direct, transparent answers to typical vendor security and privacy assessment forms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SECURITY_QUESTIONNAIRE_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-bg-secondary border border-border-color space-y-2.5"
              >
                <div className="text-xs font-mono text-accent-gold uppercase tracking-wider font-semibold">
                  Q{idx + 1}: {item.question}
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Subprocessor Disclosure List */}
        <div className="rounded-2xl bg-bg-secondary border border-border-color overflow-hidden">
          <div className="p-6 border-b border-border-color">
            <h3 className="text-base font-bold text-text-primary">
              Approved Subprocessor & Infrastructure List
            </h3>
            <p className="text-xs text-text-muted mt-0.5">
              Third-party enterprise providers leveraged for compute, storage, and zero-retention AI inference
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-border-color bg-bg-primary/50 text-text-muted">
                  <th className="py-3 px-4 font-semibold">Provider</th>
                  <th className="py-3 px-4 font-semibold">Operational Role</th>
                  <th className="py-3 px-4 font-semibold">Data Center Region</th>
                  <th className="py-3 px-4 font-semibold">Security Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-color">
                {SUBPROCESSOR_LIST.map((sp) => (
                  <tr key={sp.name} className="hover:bg-bg-primary/30 transition-colors">
                    <td className="py-3 px-4 text-text-primary font-semibold whitespace-nowrap">
                      {sp.name}
                    </td>
                    <td className="py-3 px-4 text-text-muted">{sp.role}</td>
                    <td className="py-3 px-4 text-text-subtle">{sp.location}</td>
                    <td className="py-3 px-4 text-emerald-400 whitespace-nowrap">{sp.compliance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Policies & Legal Specs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Incident Response Policy */}
          <div className="p-6 rounded-2xl bg-bg-secondary border border-border-color space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
              <Clock className="w-4 h-4" />
              <span>Incident Response SLA</span>
            </div>
            <h4 className="text-sm font-bold text-text-primary">P1 & P2 Incident Triage</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              &bull; Severity 1 (Outage): &lt; 4 hours response SLA.<br />
              &bull; Severity 2 (Degraded): &lt; 24 hours response SLA.<br />
              &bull; Direct engineer escalation with post-incident Root Cause Analysis (RCA).
            </p>
          </div>

          {/* Backup & Recovery Policy */}
          <div className="p-6 rounded-2xl bg-bg-secondary border border-border-color space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
              <Database className="w-4 h-4" />
              <span>Backup & Recovery</span>
            </div>
            <h4 className="text-sm font-bold text-text-primary">Point-in-Time Recovery</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              &bull; Continuous Write-Ahead Log (WAL) archiving.<br />
              &bull; RPO (Recovery Point Objective): &lt; 5 minutes.<br />
              &bull; RTO (Recovery Time Objective): &lt; 2 hours to fresh sandbox.<br />
              &bull; Quarterly restore drill with automated checksum verification.
            </p>
          </div>

          {/* Insurance & Contracting Terms */}
          <div className="p-6 rounded-2xl bg-bg-secondary border border-border-color space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
              <FileText className="w-4 h-4" />
              <span>Insurance & Terms</span>
            </div>
            <h4 className="text-sm font-bold text-text-primary">Contractual Terms</h4>
            <div className="text-xs text-text-muted leading-relaxed space-y-1">
              <div>Insurance Status: <span className="font-mono text-amber-300">{insuranceStatus}</span></div>
              <div>Standard DPA (Data Processing Agreement) provided on request.</div>
              <div>Mutual NDA executed before receiving sample operational files.</div>
            </div>
          </div>
        </div>

        {/* Procurement CTA Box */}
        <div className="p-8 rounded-2xl bg-bg-secondary border border-border-color flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h4 className="text-base font-bold text-text-primary">
              Ready to begin procurement review or request a DPA?
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Book a 20-minute discovery call to discuss your organization&apos;s security requirements, compliance checklists, or custom SOW milestones.
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
