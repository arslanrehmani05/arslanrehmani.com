import Link from 'next/link';
import { Factory, ShoppingCart, Truck, Briefcase, ArrowRight } from 'lucide-react';
import FinalCta from '@/components/final-cta';

export const metadata = {
  title: 'Industries & High-Ticket Sectors | Arslan Rehmani',
  description: 'Operational systems playbooks for Manufacturing, Multi-Channel Ecommerce, Logistics & 3PL, and Professional Services.',
};

const INDUSTRIES = [
  {
    icon: Factory,
    title: 'Manufacturing & Industrial Mills',
    headline: 'Replacing paper floor tickets, yarn variance, and clerical accounting floors.',
    playbook: 'Weaving/spinning machine integration, isolated dock weighbridge intake staging, automated chemical lot recipe calculations, and real-time ledger synchronization.',
    metrics: 'Average $40k–$90k annual manual overhead eliminated per plant.',
  },
  {
    icon: ShoppingCart,
    title: 'Multi-Channel Ecommerce Brands',
    headline: 'Automating high-frequency order routing, inventory sync, and returns inspection.',
    playbook: 'Bi-directional synchronization between Shopify, Amazon Seller Central, and ERP warehouses. Autonomous return label scanning and condition inspection agents.',
    metrics: 'Eliminates overselling stockouts and cuts customer inquiry volume by 65%.',
  },
  {
    icon: Truck,
    title: 'Logistics, Freight & 3PL Operators',
    headline: 'Deterministic rate auditing, automated bill-of-lading parsing, and carrier dispute packets.',
    playbook: 'Automated invoice parsing matching scale weights against contract dimensional rate cards. One-click dispute packet compilation for unauthorized carrier surcharges.',
    metrics: 'Recovers 4% to 9% of total freight expenditure in leaked billing errors.',
  },
  {
    icon: Briefcase,
    title: 'B2B & High-Volume Professional Services',
    headline: 'Automated deliverable QA, AR collection pipelines, and client status transparency.',
    playbook: 'Custom client self-service status portals, automated timesheet-to-invoice reconciliation, and autonomous payment follow-up agents.',
    metrics: 'Reduces DSO (Days Sales Outstanding) by 18 days and recovers 12+ weekly staff hours.',
  },
];

export default function IndustriesPage() {
  return (
    <div className="py-12 md:py-16 space-y-16">
      <div className="max-w-6xl mx-auto px-6 space-y-4">
        <span className="eyebrow">Sector Playbooks</span>
        <h1 className="headline text-4xl sm:text-5xl text-text-primary">
          Engineered for High-Stakes Operations
        </h1>
        <p className="text-base text-text-muted max-w-2xl leading-relaxed">
          Operational software must reflect the exact economic realities of each industry. Here is how I structure systems across our four core focus areas.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {INDUSTRIES.map((ind) => {
          const Icon = ind.icon;
          return (
            <div
              key={ind.title}
              className="rounded-2xl bg-bg-secondary/70 border border-border-color p-8 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-bg-primary border border-border-color flex items-center justify-center text-accent-gold">
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="headline text-2xl text-text-primary">{ind.title}</h2>
                <p className="text-sm font-medium text-text-muted">{ind.headline}</p>
                <div className="p-4 rounded-xl bg-bg-primary border border-border-color space-y-2 text-xs">
                  <span className="font-mono text-accent-gold uppercase font-semibold block">System Playbook:</span>
                  <p className="text-text-muted leading-relaxed">{ind.playbook}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border-color text-xs font-mono text-emerald-400 font-semibold">
                {ind.metrics}
              </div>
            </div>
          );
        })}
      </div>

      <FinalCta />
    </div>
  );
}
