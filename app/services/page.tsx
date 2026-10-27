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
      title: 'Operational Data Audit',
      badge: 'One-Week Fixed Engagement',
      directAnswer:
        'A one-week operational diagnosis for owner-operators, finance controllers, and operations leads whose businesses run on multiple spreadsheets or disconnected tools. It delivers a complete map of where data gets lost, an audit of hidden calculation errors, a clean blueprint for your custom system, and a clickable prototype running on your actual sample data.',
      timeline: 'About 1 week',
      price: '$2,500 fixed fee (1 week)',
      deliverables: [
        'Complete inventory of every spreadsheet, software tool, and manual data touchpoint',
        'Detailed issue report exposing silent calculation errors, currency drift, and reconciliation leaks',
        'Clean data architecture blueprint showing how all your company data connects without duplicates',
        'Working clickable prototype running on a sanitized slice of your actual company data',
        'Written implementation roadmap with milestone timelines and a guaranteed fixed build budget',
      ],
      whoItIsFor: 'Firms doing $1M–$50M in revenue (e-commerce, manufacturing, wholesale, or services) that know their spreadsheets and disconnected tools are breaking, but want an exact plan and prototype before building.',
    },
    {
      id: 'systems-build',
      icon: Database,
      title: 'Custom Operational System Build',
      badge: 'Core Operational Replacement',
      directAnswer:
        'A full-cycle custom software build that permanently replaces brittle spreadsheets, siloed tools, and manual data transcription with an audited, multi-user web application built specifically for your team. Scope, milestones, and acceptance tests are agreed in writing upfront, so your operational data reconciles to the cent without scope creep.',
      timeline: '4 to 8 weeks staged build',
      price: 'Fixed scope & milestone-based (Scoped after data audit)',
      deliverables: [
        'Full production system tailored to your exact operational workflow (multi-channel e-commerce fulfillment, plant floor production, or wholesale distribution)',
        'Private, enterprise-grade database where team members only see what they have permission to see',
        'Fast, mobile and desktop-friendly screens built for error-free daily entry by your staff',
        'Automated double-entry ledgers, analytical reports, and real-time reconciliation dashboards',
        'Full deployment, staff onboarding sessions, and parallel-run testing until 100% reconciled',
        'Complete transfer of 100% source code, cloud billing accounts, and administrative keys',
      ],
      whoItIsFor: 'Growing e-commerce brands, manufacturing plants, wholesale distributors, and multi-entity operators whose volume has outgrown Excel and who need an audited, reliable system.',
    },
    {
      id: 'agent-addon',
      icon: Bot,
      title: 'Safe AI Automation Pipeline',
      badge: 'Failsafe AI Pipeline',
      directAnswer:
        'An automated operational pipeline for companies that want AI speed without risking database errors or corrupted records. The AI extracts data from incoming documents at high speed, while strict verification checks automatically confirm math, duplicates, and tax IDs before anything touches your real records. Unclear items route to a simple one-click human review queue.',
      timeline: '2 to 3 weeks add-on module',
      price: 'From $3,500 fixed scope (includes safety staging & review queue)',
      deliverables: [
        'Automated ingestion engine for incoming PDF invoices, shipping manifests, purchase orders, and emails',
        'Isolated safety net: AI extracts data, but cannot write to real records without passing strict accuracy rules',
        'Automated math verification: line items, taxes, totals, and duplicates must balance 100% before saving',
        'Interactive exception review queue where your team can review and approve flagged items in seconds',
        'Permanent audit log capturing input file records, AI extraction steps, and approval timestamps',
      ],
      whoItIsFor: 'Operations processing 200+ monthly supplier invoices, shipping manifests, or custom customer orders by hand who want automation without hallucinated accounting errors.',
    },
    {
      id: 'care-plan',
      icon: ShieldCheck,
      title: 'Care & Disaster Recovery Plan',
      badge: 'Ongoing Operational Assurance',
      directAnswer:
        'A monthly engineering service that guarantees your operational system remains fast, secure, and recoverable. It includes monthly automated backup restore drills, access privilege reviews, framework and dependency security updates, and a dedicated bank of development hours for ongoing workflow adjustments.',
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
      <div className="max-w-5xl mx-auto space-y-16">
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

        {/* Commercial Qualification & Standards Banner (Anti-Cheap / CFO Gate) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-bg-secondary/70 border border-border-color space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-color/60 pb-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent-gold font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Commercial Standards &amp; Client Fit</span>
            </div>
            <span className="text-xs font-mono text-text-subtle">
              Full Software Ownership &bull; Zero Vendor Lock-in
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="space-y-1">
              <div className="font-semibold text-text-primary">Minimum Volume Threshold</div>
              <p className="text-xs text-text-muted leading-relaxed">
                Designed for businesses with $1M–$50M in annual transaction volume or teams losing 20+ hours weekly to manual data reconciliation.
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-text-primary">100% Client Ownership</div>
              <p className="text-xs text-text-muted leading-relaxed">
                You own 100% of the software, database, and cloud setup. No monthly per-seat hostage fees, no proprietary vendor lock-in.
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-text-primary">Guaranteed Mathematical Accuracy</div>
              <p className="text-xs text-text-muted leading-relaxed">
                Every calculation, tax rule, and inventory movement is verified by strict code. AI delivers speed; deterministic checks guarantee the truth.
              </p>
            </div>
          </div>
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
                      className="btn-primary !pl-5 !pr-1.5 !py-1.5 !text-xs w-full text-center flex items-center justify-center gap-2 uppercase tracking-wider font-semibold group"
                    >
                      <span>Inquire about {svc.title}</span>
                      <span className="btn-arrow-badge w-6 h-6">
                        <ArrowRight className="w-3 h-3 text-white" />
                      </span>
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
