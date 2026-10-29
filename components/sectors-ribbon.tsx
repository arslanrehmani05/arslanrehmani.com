import Link from 'next/link';
import { ArrowRight, Factory, ShoppingCart, Truck, Briefcase } from 'lucide-react';

const SECTORS = [
  {
    icon: Factory,
    title: 'SMB Industrial & Manufacturing',
    desc: 'Shop-floor tracking, yarn/material batching, dyeing yields, and production ERPs.',
  },
  {
    icon: ShoppingCart,
    title: 'Multi-Channel Commerce',
    desc: 'Shopify, Amazon, inventory stock synchronization, and autonomous returns inspection.',
  },
  {
    icon: Truck,
    title: 'Logistics & 3PL Supply Chain',
    desc: 'Automated carrier manifest rate auditing, accessorial fee disputes, and dispatch tracking.',
  },
  {
    icon: Briefcase,
    title: 'High-Volume Professional Services',
    desc: 'Automated client deliverables, AR billing reconciliation, and capacity pipelines.',
  },
];

export default function SectorsRibbon() {
  return (
    <section className="border-y border-border-color bg-bg-secondary/30 py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="eyebrow mb-2">High-Stakes Operating Environments</span>
            <h2 className="headline text-2xl sm:text-3xl text-text-primary">
              Engineered for cash-flow critical industries.
            </h2>
          </div>
          <Link href="/industries" className="text-xs font-mono text-accent-gold flex items-center gap-1.5 hover:underline">
            <span>Explore sector playbooks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SECTORS.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.title}
                className="p-6 rounded-2xl bg-bg-primary border border-border-color space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-bg-secondary border border-border-color flex items-center justify-center text-accent-gold">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-text-primary">{sec.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{sec.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
