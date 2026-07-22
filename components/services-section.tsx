// components/services-section.tsx
import Link from 'next/link';

const services = [
  {
    title: 'Operational Audit',
    body: 'I map your workflows, identify where manual work costs you most, and deliver a prioritised implementation plan. You know exactly what to build and why — before anything gets built.',
  },
  {
    title: 'Custom Systems',
    body: 'ERPs, dashboards, intelligent agents, and operational platforms — designed around how your business runs and deployed to infrastructure you control.',
  },
  {
    title: 'Ongoing Evolution',
    body: 'Businesses change. I maintain, improve, and extend the systems I build as yours does.',
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-bg-primary py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <span className="block text-xs font-semibold tracking-[0.2em] uppercase text-accent-gold mb-4">
          The Work
        </span>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-text-primary leading-tight">
          From operational diagnosis to deployed systems.
        </h2>
        <p className="text-base md:text-lg text-text-muted leading-relaxed max-w-2xl mt-6 mb-12">
          I start by understanding how your business actually operates — not how
          software assumes it should. Every system is built around your workflows,
          your data, and your team.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-bg-secondary border border-border-color rounded-2xl p-6 md:p-8 flex flex-col"
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
