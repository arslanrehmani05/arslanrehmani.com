import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { caseStudies } from '@/lib/content';

export default function FeaturedWork({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section className="py-20 md:py-28 border-t border-border-color">
      <div className="max-w-6xl mx-auto px-6">
        {showHeader && (
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div className="max-w-2xl">
              <span className="eyebrow mb-4">Case studies</span>
              <h2 className="headline text-3xl sm:text-4xl">Systems running real businesses today.</h2>
            </div>
            <Link
              href="/work"
              className="text-sm text-text-muted hover:text-text-primary transition-colors inline-flex items-center gap-2 shrink-0"
            >
              <span>All case studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              href={`/work/${cs.slug}`}
              className="group rounded-2xl bg-bg-secondary border border-border-color hover:border-border-gold transition-colors p-6 md:p-8 flex flex-col"
            >
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-text-subtle">
                <span>{cs.sector}</span>
                <span>{cs.client}</span>
              </div>

              <h3 className="headline text-2xl mt-5">{cs.title}</h3>
              <p className="text-sm md:text-base text-text-muted leading-relaxed mt-4 flex-grow">{cs.summary}</p>

              <dl className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-border-color">
                {cs.results.slice(0, 2).map((r) => (
                  <div key={r.label} className="flex flex-col-reverse justify-end">
                    <dt className="text-xs text-text-muted mt-1 leading-snug">{r.label}</dt>
                    <dd className="text-2xl font-semibold text-text-primary">{r.value}</dd>
                  </div>
                ))}
              </dl>

              <span className="inline-flex items-center gap-2 text-sm text-text-primary mt-8">
                <span>Read the case study</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
