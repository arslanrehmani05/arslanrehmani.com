import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import FinalCta from '@/components/final-cta';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Three ways to work together: an operational audit, a custom system build, and ongoing care for the systems I build.',
  alternates: { canonical: '/services' },
};

// The ids below are linked from the tools pages. Do not rename them.
const services = [
  {
    id: 'data-audit',
    name: 'Operational audit',
    lead: 'Know exactly what to build, and why, before anything gets built.',
    body: 'I map your workflows, find where manual work costs you most, and put a number on it.',
    youGet: [
      'A map of how work and data move through the business today.',
      'The manual steps ranked by what they cost you.',
      'A prioritised plan: what to build first and what to leave alone.',
    ],
  },
  {
    id: 'systems-build',
    name: 'Custom system build',
    lead: 'One system built around how your business runs.',
    body: 'ERPs, dashboards, AI agents and operational platforms, designed around your workflows and your data. Agents handle the routine work; your people approve what matters.',
    youGet: [
      'Scope agreed in writing before the build starts.',
      'Working software you can use at each stage, not a reveal at the end.',
      'A system deployed to infrastructure you control.',
    ],
  },
  {
    id: 'care-plan',
    name: 'Ongoing care',
    lead: 'A system that keeps up with the business.',
    body: 'Businesses change. I maintain, improve and extend the systems I build as yours does.',
    youGet: [
      'Maintenance and fixes from the person who built it.',
      'New reports, workflows and agents as needs change.',
      'A direct line to me, with no account manager in between.',
    ],
  },
];

const principles = [
  {
    title: 'The business comes first',
    body: 'I start with how your operation runs and what it costs. The software follows from that.',
  },
  {
    title: 'You own what I build',
    body: 'The system runs on infrastructure you control, and it stays with you.',
  },
  {
    title: 'People stay in charge of what matters',
    body: 'Agents take the repetitive work. Decisions about money, customers and exceptions go to a person.',
  },
];

export default function ServicesPage() {
  return (
    <div>
      <section className="pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <span className="eyebrow mb-4">Services</span>
            <h1 className="headline text-4xl sm:text-5xl">From operational diagnosis to deployed systems.</h1>
            <p className="text-base md:text-lg text-text-muted leading-relaxed mt-6">
              I start by understanding how your business operates, not how software assumes it
              should. Every system is built around your workflows, your data and your team.
            </p>
          </div>

          <div className="space-y-6">
            {services.map((service, idx) => (
              <div
                key={service.id}
                id={service.id}
                className="rounded-2xl bg-bg-secondary border border-border-color p-6 md:p-10 scroll-mt-24 grid grid-cols-1 md:grid-cols-12 gap-8"
              >
                <div className="md:col-span-6">
                  <span className="text-xs font-mono text-text-subtle">0{idx + 1}</span>
                  <h2 className="headline text-2xl md:text-3xl mt-3">{service.name}</h2>
                  <p className="text-base text-text-primary mt-4">{service.lead}</p>
                  <p className="text-sm md:text-base text-text-muted leading-relaxed mt-3">{service.body}</p>
                  <Link
                    href={`/contact?service=${service.id}`}
                    className="inline-flex items-center gap-2 text-sm text-text-primary hover:text-text-muted transition-colors mt-6 min-h-[44px]"
                  >
                    <span>Talk about this</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="md:col-span-6 md:border-l md:border-border-color md:pl-8">
                  <span className="text-xs font-mono uppercase tracking-wider text-text-subtle">What you get</span>
                  <ul className="mt-4 space-y-3">
                    {service.youGet.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm md:text-base text-text-muted leading-relaxed">
                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-text-primary shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 border-t border-border-color">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow mb-4">How I work</span>
            <h2 className="headline text-3xl sm:text-4xl">What stays the same on every engagement.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((p) => (
              <div key={p.title} className="rounded-2xl bg-bg-secondary border border-border-color p-6 md:p-8">
                <h3 className="text-lg font-medium text-text-primary">{p.title}</h3>
                <p className="text-sm md:text-base text-text-muted leading-relaxed mt-3">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </div>
  );
}
