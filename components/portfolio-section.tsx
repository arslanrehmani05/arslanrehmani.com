// components/portfolio-section.tsx
import Link from 'next/link';
import { getCaseStudies } from '@/sanity/lib/client';

export default async function PortfolioSection() {
  const caseStudies = await getCaseStudies();

  return (
    <section id="portfolio" className="bg-bg-primary py-36 border-b border-border-color">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16 text-left max-w-3xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent-gold">
            The Proof
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary leading-tight">
            Real systems. Real results.
          </h2>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {caseStudies.map((project, idx) => {
            const isLarge = idx === 0;
            return (
              <div
                key={project.slug}
                className={`${
                  isLarge ? 'lg:col-span-7' : 'lg:col-span-5'
                } bg-bg-secondary border border-border-color p-8 md:p-10 rounded-3xl flex flex-col justify-between transition-gold hover:border-accent-gold/40`}
              >
                <div>
                  {/* Industry tag */}
                  <span className="inline-block text-xs font-bold text-accent-gold uppercase tracking-wider mb-6">
                    {project.industry}
                  </span>
                  
                  <h3 className="text-2xl md:text-3xl font-black text-text-primary mb-4 leading-snug">
                    {project.title}
                  </h3>
                  
                  <div className="space-y-4 mb-8">
                    <p className="text-sm text-text-muted leading-relaxed">
                      <strong className="text-text-primary font-semibold">Problem:</strong> {project.problem}
                    </p>
                    <p className="text-sm text-text-muted leading-relaxed">
                      <strong className="text-text-primary font-semibold">Solution:</strong> {project.solution}
                    </p>
                  </div>
                </div>

                {/* Results Metrics */}
                <div className="flex flex-col sm:flex-row gap-6 border-t border-border-color/60 pt-8 mt-6">
                  {project.results.map((result, rIdx) => (
                    <div key={rIdx} className="flex-1 flex flex-col gap-1">
                      <span className="text-3xl font-black text-accent-gold tracking-tight">
                        {result.value}
                      </span>
                      <span className="text-xs font-medium text-text-primary uppercase tracking-wider">
                        {result.metric}
                      </span>
                      <span className="text-[11px] text-text-subtle">
                        {result.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Link */}
                <div className="mt-8 pt-4">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-accent-gold hover:text-accent-gold-hover transition-gold"
                    style={{ minHeight: '44px' }}
                  >
                    Read Case Study →
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="text-center mt-12">
          <p className="text-xs text-text-subtle font-medium tracking-wide">
            More case studies added as projects complete.
          </p>
        </div>

      </div>
    </section>
  );
}
