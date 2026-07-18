// components/services-section.tsx
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ServicesSection() {
  const services = [
    {
      title: 'Operational Audit',
      description: 'I go through your actual workflows — who touches what, how often, and why — and hand you a roadmap: which processes can be automated, in what order, and what each is costing you today.',
      href: '/tools#audit',
    },
    {
      title: 'System Build',
      description: 'I design, build, and deploy the system: database-backed software with AI agents doing the operational work your staff does manually. Not a prototype — a production system your business runs on.',
      href: '/#contact',
    },
    {
      title: 'Ongoing Optimisation',
      description: 'Deployed systems get measured, not abandoned. I monitor accuracy, extend coverage as your operation grows, and keep driving the running cost down.',
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
            From diagnosis to a deployed system that runs without you.
          </h2>
          <p className="text-base text-text-muted mt-2 max-w-xl font-normal leading-relaxed">
            I map where your operation leaks hours and money, then build the software that closes the leak — production-grade, running daily, measured in hours saved and roles removed.
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
