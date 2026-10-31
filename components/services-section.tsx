// components/services-section.tsx
import Link from 'next/link';

const services = [
  {
    title: 'Finance & operations systems',
    body: 'ERPs, finance suites, costing, inventory, reporting. Role-based access and row-level security as standard.',
  },
  {
    title: 'Agents inside those systems',
    body: 'Agents that reconcile, classify, research, draft, chase and report. Each one ships with an eval suite and an audit log, and needs human approval for anything that moves money.',
  },
  {
    title: 'Operational diagnosis',
    body: 'A fixed-fee map of where your manual hours go and what they cost. The report is yours either way.',
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-bg-primary py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        <span className="eyebrow mb-5">The Work</span>
        <h2 className="headline text-3xl md:text-[2.75rem] leading-[1.1]">
          Systems first. Agents inside.
        </h2>
        <p className="text-base md:text-lg text-text-muted leading-relaxed max-w-2xl mt-6 mb-12">
          I start where the money moves: your ledger, stock and orders. I build one
          Postgres source of truth with proper access control. Then I add agents
          that do the repetitive work and pass judgement calls to a person.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-bg-secondary border border-border-color hover:border-border-gold rounded-2xl p-6 md:p-8 flex flex-col transition-colors duration-200"
            >
              <h3 className="text-lg md:text-xl font-bold text-text-primary">
                {service.title}
              </h3>
              <p className="text-base text-text-muted leading-relaxed mt-3 flex-grow">
                {service.body}
              </p>
              <Link
                href="/contact"
                className="text-accent-gold hover:text-accent-gold-hover hover:underline underline-offset-4 text-sm font-semibold mt-6 transition-colors duration-200"
                style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              >
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
