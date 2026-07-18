// app/work/page.tsx
import Link from 'next/link';
import { getCaseStudies } from '@/sanity/lib/client';

export const metadata = {
  title: 'Case Studies | Arslan Rehmani',
  description: 'Case studies of AI operational systems in production — problems, solutions, and audited numbers.',
};

export default async function WorkIndexPage() {
  const caseStudies = await getCaseStudies();

  return (
    <main className="flex flex-col min-h-screen bg-bg-primary pt-36 pb-20">
      <div className="max-w-6xl mx-auto px-6 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16 text-left max-w-2xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent-gold">
            The Proof
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary leading-tight">
            Case Studies
          </h1>
          <p className="text-base text-text-muted leading-relaxed">
            Each of these is a system a business runs on today, at a URL you can visit. Problem, what I built, and the numbers — no rounded figures, no projections.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((project) => (
            <div
              key={project.slug}
              className="bg-bg-secondary border border-border-color p-8 rounded-3xl flex flex-col justify-between transition-gold hover:border-accent-gold/40"
            >
              <div>
                <span className="inline-block text-[11px] font-bold text-accent-gold uppercase tracking-wider mb-6">
                  {project.industry}
                </span>
                
                <h2 className="text-2xl font-black text-text-primary mb-4 leading-tight">
                  {project.title}
                </h2>
                
                <div className="space-y-4 mb-6">
                  <p className="text-sm text-text-muted">
                    <strong className="text-text-primary">Problem:</strong> {project.problem}
                  </p>
                  <p className="text-sm text-text-muted">
                    <strong className="text-text-primary">Solution:</strong> {project.solution}
                  </p>
                </div>
              </div>

              <div>
                {/* Results Metrics */}
                <div className="grid grid-cols-2 gap-4 border-t border-border-color/60 pt-6 mt-6 mb-6">
                  {project.results.map((result, rIdx) => (
                    <div key={rIdx} className="flex flex-col gap-1">
                      <span className="text-xl font-bold text-accent-gold">
                        {result.value}
                      </span>
                      <span className="text-[10px] text-text-primary font-semibold uppercase tracking-wider">
                        {result.metric}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-accent-gold hover:text-accent-gold-hover transition-gold"
                    style={{ minHeight: '44px' }}
                  >
                    Read the case study →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
