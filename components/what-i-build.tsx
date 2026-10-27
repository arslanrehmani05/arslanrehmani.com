// components/what-i-build.tsx
import Link from 'next/link';
import { ArrowRight, FileSearch, Database, Bot, ShieldCheck } from 'lucide-react';

const offers = [
  {
    id: 'data-audit',
    icon: FileSearch,
    tag: 'One-Week Fixed Engagement',
    title: 'Data Audit',
    oneLiner: 'Source inventory, issues list, proposed schema, and a working prototype on your real sample data.',
    timeline: 'About 1 week',
    pricingNote: 'Fixed price &bull; Scoped upfront',
    link: '/services#data-audit',
  },
  {
    id: 'systems-build',
    icon: Database,
    tag: 'Core Custom Projects',
    title: 'Custom Projects & Systems Build',
    oneLiner: 'Custom ERPs, inventory portals, and operational platforms designed from scratch around your exact workflows, permanently replacing fragile spreadsheets.',
    timeline: '4 to 8 weeks',
    pricingNote: 'Milestone-based &bull; Zero creep',
    link: '/services#systems-build',
  },
  {
    id: 'agent-addon',
    icon: Bot,
    tag: 'Agentic Layer Over Custom Systems',
    title: 'Agentic Improvements Layer',
    oneLiner: 'We layer intelligent agentic workflows directly over your custom system—automated reconciliation, daily briefings, and document extraction with deterministic validation.',
    timeline: '2 to 3 weeks add-on',
    pricingNote: 'Exceptions route to human queue',
    link: '/services#agent-addon',
  },
  {
    id: 'care-plan',
    icon: ShieldCheck,
    tag: 'Ongoing Reliability',
    title: 'Care & Maintenance Plan',
    oneLiner: 'Monthly backup verification drills, access privilege reviews, dependency updates, and small operational changes up to agreed hours.',
    timeline: 'Monthly recurring',
    pricingNote: 'Guaranteed 24h response time',
    link: '/services#care-plan',
  },
];

export default function WhatIBuild() {
  return (
    <section className="py-24 md:py-32 border-b border-border-color bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="text-xs uppercase font-mono tracking-wider text-text-subtle">
            What I Build &bull; Custom Projects with Agentic Automation
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            We build custom operational software—and engineer agentic improvements over that foundation.
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            I don&apos;t build fragile AI wrappers or generic chatbots. Every project begins with a custom relational system built to reflect your physical floor reality, with high-leverage agentic layers engineered directly on top.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <div
                key={offer.id}
                className="p-8 rounded-3xl bg-bg-secondary/50 border border-border-color hover:border-text-primary/30 transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border-color flex items-center justify-center text-text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-text-subtle uppercase tracking-wider px-2.5 py-1 rounded-full bg-bg-primary border border-border-color">
                      {offer.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-text-primary group-hover:text-accent-gold transition-colors">
                    {offer.title}
                  </h3>

                  <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                    {offer.oneLiner}
                  </p>
                </div>

                <div className="pt-4 border-t border-border-color/60 flex items-center justify-between">
                  <div className="text-xs font-mono text-text-subtle">
                    <span className="text-text-primary font-medium">{offer.timeline}</span> &bull; {offer.pricingNote}
                  </div>
                  <Link
                    href={offer.link}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-text-primary hover:text-accent-gold transition-colors"
                  >
                    <span>View details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
