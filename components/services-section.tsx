// components/services-section.tsx
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ServicesSection() {
  const services = [
    {
      title: 'Operational Audit',
      description: 'We audit your existing manual procedures, map data pipelines, and output a detailed automation roadmap with precise ROI projections.',
      href: '/tools#audit',
    },
    {
      title: 'AI Agent Systems',
      description: 'We design, build, and deploy production-grade database-backed software systems and custom AI agents that execute human-level operational tasks.',
      href: '/#contact',
    },
    {
      title: 'Ongoing Optimisation',
      description: 'We monitor execution accuracy, optimize model prompts, scale systems with your operations, and refine APIs for constant cost reduction.',
      href: '/#contact',
    },
  ];

  return (
    <section id="services" className="bg-bg-primary py-36 border-b border-border-color">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16 text-left max-w-3xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent-gold">
            The Work
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary leading-tight">
            From operational diagnosis to deployed AI systems.
          </h2>
          <p className="text-base text-text-muted mt-2 max-w-xl font-normal leading-relaxed">
            We map manual workflows, identify structural inefficiencies, and deploy secure custom AI systems that run 24/7. No vaporware, no theory—just production-grade software that drives margins.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <Link
              key={idx}
              href={service.href}
              className="group bg-bg-secondary border border-border-color p-8 rounded-3xl flex flex-col justify-between min-h-[280px] transition-gold hover:border-accent-gold/50 hover:translate-y-[-4px]"
            >
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-gold transition-gold">
                  {service.title}
                </h3>
                <p className="text-text-muted text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-accent-gold font-bold text-sm tracking-wide uppercase mt-6 group-hover:text-accent-gold-hover transition-gold">
                Learn More 
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
