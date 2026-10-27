// app/services/page.tsx
import Link from 'next/link';
import { ArrowRight, Check, ShieldCheck, FileSearch, Database, Bot, Clock, AlertCircle } from 'lucide-react';
import { getPlaceholdersList } from '@/lib/facts';

export const metadata = {
  title: 'Services & Engagements | Arslan Rehmani',
  description:
    'Four structured, fixed-scope operational software offers: Data Audit, Systems Build, Deterministic Agent Add-on, and Ongoing Care Plan.',
};

export default function ServicesPage() {
  const placeholders = getPlaceholdersList();

  const services = [
    {
      id: 'data-audit',
      icon: FileSearch,
      title: 'Data Audit',
      badge: 'One-Week Fixed Engagement',
      directAnswer:
        'A one-week technical diagnosis for owner-operators and finance leads whose businesses run on multiple spreadsheets or paper logs. It delivers a full inventory of your data sources, an audit of current formula and reconcile errors, a proposed relational schema, and a clickable prototype running on your sanitized sample data.',
      timeline: 'About 1 week',
      price: '$2,500 fixed fee (1 week)',
      deliverables: [
        'Complete inventory of every spreadsheet, register, and manual data touchpoint',
        'Issues list highlighting silent formula errors, currency drift, and reconciliation gaps',
        'Proposed relational database schema (PostgreSQL) with normalization and RLS plan',
        'Working clickable prototype running on a sanitized slice of your actual company data',
        'Written implementation roadmap with milestone timelines and fixed build budget',
      ],
      whoItIsFor: 'Firms doing $2M–$50M in revenue that know their spreadsheets are breaking, but want an exact technical plan and prototype before committing to a full system build.',
    },
    {
      id: 'systems-build',
      icon: Database,
      title: 'Systems Build',
      badge: 'Core Operational Replacement',
      directAnswer:
        'A full-cycle custom engineering engagement that permanently replaces brittle spreadsheets and paper registers with an audited, multi-user web application backed by PostgreSQL. Scope, milestones, and automated acceptance tests are agreed in writing upfront, so your operational data reconciles to the cent without scope creep.',
      timeline: '4 to 8 weeks staged build',
      price: 'Fixed scope & milestone-based (Scoped after data audit)',
      deliverables: [
        'Full production system tailored to your exact manufacturing or ecommerce floor reality',
        'PostgreSQL database with strict constraints and Row-Level Security on every table',
        'Mobile and tablet-optimized interfaces built for quick, error-resistant floor entry',
        'Automated double-entry journals, analytical reports, and real-time reconciliation views',
        'Full deployment, staff onboarding sessions, and parallel-run testing until 100% reconciled',
        'Complete transfer of source code, cloud billing accounts, and encryption keys',
      ],
      whoItIsFor: 'Manufacturing plants, ecommerce brands, and multi-entity operators whose volume has outgrown Excel and who require audited, recoverable operational software.',
    },
    {
      id: 'agent-addon',
      icon: Bot,
      title: 'Deterministic Agent Add-on',
      badge: 'Failsafe AI Pipeline',
      directAnswer:
        'An architectural layer for companies that want AI speed without risking database corruption. The AI model extracts data into an isolated staging table, while strict deterministic code validates types, mathematical sums, duplicates, and tax IDs before committing. Unmatched or anomalous rows route to a human review queue with zero dirty data in production.',
      timeline: '2 to 3 weeks add-on module',
      price: 'From $3,500 fixed scope (includes staging schema & human review queue)',
      deliverables: [
        'Structured ingestion engine for incoming PDF invoices, packing lists, and emails',
        'Isolated staging table schema with zero direct production write permissions',
        'Deterministic validation engine checking math equality (sum == total), dates, and foreign keys',
        'Interactive exception review queue where human operators review and approve flagged rows',
        'Permanent audit log capturing input file hash, model token prompt, and validation result',
      ],
      whoItIsFor: 'Operations processing 200+ monthly supplier invoices, shipping manifests, or custom order requests by hand who want automation without hallucinated accounting errors.',
    },
    {
      id: 'care-plan',
      icon: ShieldCheck,
      title: 'Care & Disaster Recovery Plan',
      badge: 'Ongoing Operational Assurance',
      directAnswer:
        'A monthly engineering service that guarantees your operational system remains secure, audited, and recoverable. It includes monthly automated backup restore drills, access privilege reviews, framework and dependency security updates, and a dedicated bank of development hours for small operational adjustments.',
      timeline: 'Monthly recurring engagement',
      price: 'From $750/month (includes quarterly restore drill & 24h SLA)',
      deliverables: [
        'Monthly backup restore drills: we restore your database to an isolated environment and test reconciliation',
        'Access privilege audit: quarterly review ensuring inactive employees have zero database access',
        'Security & patch updates for Next.js, Node, PostgreSQL extensions, and third-party APIs',
        'Up to agreed hours each month for small workflow tweaks, report adjustments, and new export views',
        'Direct emergency engineering communication channel with guaranteed 24-hour response on business days',
      ],
      whoItIsFor: 'Businesses running critical daily operations on custom software who cannot afford unmonitored dependencies or unverified backup routines.',
    },
  ];

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto space-y-20">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono text-text-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>The Four Offers &bull; Fixed Scope &amp; Deliverables</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-text-primary">
            Engineering Engagements Designed Around Your Operational Reality.
          </h1>
          <p className="text-lg text-text-muted leading-relaxed">
            I don&apos;t bill open-ended hourly retainers. Every offer below has a fixed scope, documented deliverables, and agreed acceptance tests.
          </p>
        </div>

        {/* Offers Detailed List */}
        <div className="space-y-16">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <section
                key={svc.id}
                id={svc.id}
                className="p-8 sm:p-12 rounded-3xl bg-bg-secondary/40 border border-border-color space-y-8 scroll-mt-24"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-color/60 pb-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border-color flex items-center justify-center text-text-primary">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-text-subtle">Offer 0{idx + 1}</span>
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                        {svc.title}
                      </h2>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-accent-gold uppercase tracking-wider px-3 py-1 rounded-full bg-bg-primary border border-border-color">
                    {svc.badge}
                  </span>
                </div>

                {/* Direct 40-60 word Answer Box */}
                <div className="p-6 rounded-2xl bg-bg-primary border border-border-color space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-text-subtle">
                    What is this and who is it for?
                  </div>
                  <p className="text-sm sm:text-base text-text-primary leading-relaxed font-medium">
                    {svc.directAnswer}
                  </p>
                </div>

                {/* Scope & Deliverables */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8 space-y-4">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-text-subtle">
                      Exact Deliverables Included:
                    </h3>
                    <ul className="space-y-2.5">
                      {svc.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-text-muted">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-4 p-6 rounded-2xl bg-bg-primary border border-border-color space-y-5 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div>
                        <div className="text-[11px] font-mono text-text-subtle">Timeline</div>
                        <div className="text-base font-bold font-mono text-text-primary">{svc.timeline}</div>
                      </div>

                      <div>
                        <div className="text-[11px] font-mono text-text-subtle">Pricing Structure</div>
                        <div className="text-sm font-medium text-accent-gold">{svc.price}</div>
                      </div>

                      <div>
                        <div className="text-[11px] font-mono text-text-subtle">Ideal Fit</div>
                        <div className="text-xs text-text-muted leading-snug">{svc.whoItIsFor}</div>
                      </div>
                    </div>

                    <Link
                      href="/contact"
                      className="btn-primary !py-2.5 !text-xs w-full text-center flex items-center justify-center gap-2 uppercase tracking-wider font-semibold"
                    >
                      <span>Inquire about {svc.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-bg-secondary border border-border-color flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left max-w-xl">
            <h3 className="text-2xl font-bold text-text-primary">
              Not sure whether you need an Audit or a Build?
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Book a 20-minute discovery call. We will examine your current spreadsheet setup, assess whether a custom system is justified, and give you an honest recommendation.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-primary !px-8 !py-4 !text-sm whitespace-nowrap flex items-center gap-2"
          >
            <span>Book a 20-minute discovery call</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
