// app/services/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock, Cpu, FileText, Layers, Wrench } from 'lucide-react';
import { BUSINESS_EMAILS } from '@/lib/emails';

export const metadata: Metadata = {
  title: 'Services | Arslan Rehmani — Operational AI Systems',
  description: 'Custom operational software, ERP builds, workflow automation, and operational audits for SMB manufacturing and ecommerce.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Services | Arslan Rehmani — Operational AI Systems',
    description: 'Operational audits, custom ERP development, and ongoing system evolution for manufacturing and ecommerce operations.',
    url: 'https://arslanrehmani.com/services',
    siteName: 'Arslan Rehmani',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services | Arslan Rehmani',
    description: 'Operational audits and custom ERP systems for SMBs.',
  },
};

const serviceOfferings = [
  {
    step: '01',
    title: 'Operational Audit & System Blueprint',
    subtitle: 'Diagnostic Phase',
    description: 'A structured deep-dive into your existing workflows, manual data transfers, and operational bottlenecks. We calculate exact financial drag and map a technical implementation blueprint before a single line of code is written.',
    deliverables: [
      'Comprehensive workflow friction audit report',
      'Exact weekly financial drag and hours-saved projections',
      'Full technical architecture & database schema blueprint',
      'Fixed-price implementation quote',
    ],
    timeline: '1 to 2 Weeks',
    emailTarget: BUSINESS_EMAILS.business.email,
  },
  {
    step: '02',
    title: 'Custom ERP & Operational Systems',
    subtitle: 'Production Software Build',
    description: 'Bespoke web applications, internal production portals, inventory systems, and analytical management control panels engineered strictly around how your business operates — such as TextileMode ERP.',
    deliverables: [
      'Production Next.js / TypeScript Web Application',
      'Role-based access control (RBAC) & security',
      'Real-time financial and operational reporting dashboards',
      'Deployment to client-owned cloud infrastructure',
    ],
    timeline: '4 to 8 Weeks',
    emailTarget: BUSINESS_EMAILS.projects.email,
  },
  {
    step: '03',
    title: 'AI Pipelines & Channel Integration',
    subtitle: 'Automation & Briefings',
    description: 'Integration of multi-channel platforms (Shopify, Amazon, ERPs, CRMs) paired with server-side AI execution engines to deliver automated daily executive briefings, anomaly alerts, and channel synchronization.',
    deliverables: [
      'Multi-channel API synchronization pipelines',
      'Server-side Claude / LLM automated daily briefings',
      'Search Console & Analytics performance aggregators',
      'Automated error handling and fallback monitoring',
    ],
    timeline: '2 to 4 Weeks',
    emailTarget: BUSINESS_EMAILS.projects.email,
  },
  {
    step: '04',
    title: 'Ongoing Maintenance & System Evolution',
    subtitle: 'Long-Term Support',
    description: 'As your business scales, new operational requirements arise. Retained support ensures your custom software stays updated, secure, and expanded with new modules as needed.',
    deliverables: [
      'Guaranteed uptime & error monitoring SLA',
      'Monthly feature iterations & database optimizations',
      'New module additions as operational needs expand',
      'Priority direct developer support',
    ],
    timeline: 'Retainer / Monthly',
    emailTarget: BUSINESS_EMAILS.business.email,
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-bg-primary min-h-screen py-16 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Hero */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow mb-4">Capabilities & Engagements</span>
          <h1 className="headline text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            From operational diagnosis to{' '}
            <span className="italic text-accent-gold">deployed systems.</span>
          </h1>
          <p className="text-base md:text-lg text-text-muted leading-relaxed mt-6">
            Every engagement starts by understanding how your business actually operates — not forcing generic SaaS templates. Software is engineered around your workflows, deployed to your infrastructure, and maintained for continuous performance.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-12 mb-24">
          {serviceOfferings.map((service) => (
            <div
              key={service.title}
              className="bg-bg-secondary border border-border-color hover:border-border-gold rounded-2xl p-8 md:p-12 transition-colors duration-200"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4">
                  <span className="text-accent-gold font-mono text-xs font-bold block mb-2">
                    {service.step} / {service.subtitle}
                  </span>
                  <h2 className="headline text-2xl md:text-3xl text-text-primary">
                    {service.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-4 text-xs text-text-subtle font-mono">
                    <Clock className="w-3.5 h-3.5 text-accent-gold" />
                    <span>Typical Timeline: {service.timeline}</span>
                  </div>
                </div>

                <div className="lg:col-span-8 flex flex-col justify-between h-full">
                  <div>
                    <p className="text-base text-text-muted leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <h3 className="text-xs font-semibold uppercase tracking-wider text-text-primary mb-3">
                      Key Deliverables:
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-text-muted">
                          <CheckCircle2 className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-border-color/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <span className="text-xs text-text-subtle">
                      Inquire via:{' '}
                      <a href={`mailto:${service.emailTarget}`} className="font-mono text-accent-gold hover:underline">
                        {service.emailTarget}
                      </a>
                    </span>
                    <Link
                      href={`/contact`}
                      className="btn-primary !px-5 !py-2.5 !text-xs shrink-0 flex items-center gap-1.5"
                    >
                      Book Discussion
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Flow */}
        <div className="bg-bg-secondary border border-border-color rounded-2xl p-8 md:p-12 mb-24">
          <span className="eyebrow mb-3">Engagement Process</span>
          <h2 className="headline text-2xl md:text-3xl text-text-primary mb-10">
            How an engagement works.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="border-l-2 border-accent-gold pl-4 py-1">
              <span className="text-xs font-bold text-accent-gold uppercase font-mono">Phase 1</span>
              <h3 className="text-base font-bold text-text-primary mt-1">Discovery Call</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                30-minute review of your current manual bottlenecks and software objectives.
              </p>
            </div>

            <div className="border-l-2 border-border-color pl-4 py-1">
              <span className="text-xs font-bold text-text-subtle uppercase font-mono">Phase 2</span>
              <h3 className="text-base font-bold text-text-primary mt-1">Workflow Audit</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                Detailed mapping of data flows, users, inputs, outputs, and financial ROI.
              </p>
            </div>

            <div className="border-l-2 border-border-color pl-4 py-1">
              <span className="text-xs font-bold text-text-subtle uppercase font-mono">Phase 3</span>
              <h3 className="text-base font-bold text-text-primary mt-1">Software Build</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                Rapid iterative engineering of custom ERP modules and automation engines.
              </p>
            </div>

            <div className="border-l-2 border-border-color pl-4 py-1">
              <span className="text-xs font-bold text-text-subtle uppercase font-mono">Phase 4</span>
              <h3 className="text-base font-bold text-text-primary mt-1">Deployment & Handover</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                Deployment to client cloud infrastructure with team training and operational handoff.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Callout */}
        <div className="bg-bg-secondary border border-border-color rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="eyebrow mb-2">Start an Inquiry</span>
            <h3 className="headline text-2xl md:text-3xl text-text-primary">
              Ready to eliminate manual operational drag?
            </h3>
            <p className="text-sm text-text-muted mt-2 max-w-xl">
              Write directly to <span className="font-mono text-accent-gold">{BUSINESS_EMAILS.business.email}</span> or request an operational audit.
            </p>
          </div>
          <Link href="/contact" className="btn-primary !text-sm shrink-0">
            Start a Conversation
          </Link>
        </div>
      </div>
    </main>
  );
}
