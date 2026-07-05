// app/work/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCaseStudyBySlug, getCaseStudies } from '@/sanity/lib/client';

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const caseStudy = await getCaseStudyBySlug(params.slug);
  if (!caseStudy) return {};
  return {
    title: `${caseStudy.title} Case Study | Arslan Rehmani`,
    description: `Learn how we automated operations for ${caseStudy.client}: ${caseStudy.solution}`,
  };
}

export default async function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
  const project = await getCaseStudyBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex flex-col min-h-screen bg-bg-primary pt-36 pb-20">
      <div className="max-w-4xl mx-auto px-6 w-full">
        
        {/* Back Link */}
        <Link
          href="/work"
          className="text-xs font-bold text-accent-gold hover:text-accent-gold-hover uppercase tracking-widest mb-8 inline-flex items-center"
          style={{ minHeight: '44px' }}
        >
          ← Back to work
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-4 mb-12 text-left border-b border-border-color/60 pb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent-gold">
            {project.industry} Case Study
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary leading-tight">
            {project.title}
          </h1>
          <p className="text-lg text-text-muted">
            Client: <span className="text-text-primary font-semibold">{project.client}</span>
          </p>
        </div>

        {/* Results Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 bg-bg-secondary border border-border-color p-8 rounded-3xl">
          {project.results.map((result, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <span className="text-xs font-bold text-accent-gold uppercase tracking-wider">
                {result.metric}
              </span>
              <span className="text-3xl font-black text-text-primary">
                {result.value}
              </span>
              <span className="text-sm text-text-muted">
                {result.label}
              </span>
            </div>
          ))}
        </div>

        {/* Breakdown Content */}
        <div className="space-y-12 text-base text-text-muted leading-relaxed font-normal">
          
          {/* Section: The Challenge */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-text-primary">
              The Challenge
            </h2>
            <p>{project.problem}</p>
          </div>

          {/* Section: The System */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-text-primary">
              The Automated System
            </h2>
            <p>{project.solution}</p>
          </div>

          {/* Section: Architecture note */}
          {project.architectureNote && (
            <div className="bg-bg-secondary/40 border border-border-color p-8 rounded-3xl space-y-4">
              <h3 className="text-lg font-bold text-accent-gold uppercase tracking-wider">
                System Architecture
              </h3>
              <p className="text-sm font-mono leading-relaxed bg-bg-primary/50 p-6 rounded-2xl border border-border-color/50">
                {project.architectureNote}
              </p>
            </div>
          )}

          {/* Tool Badge Row */}
          {project.tools && (
            <div className="pt-6 border-t border-border-color/60">
              <h4 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-4">
                Technologies Deployed
              </h4>
              <div className="flex flex-wrap gap-3">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="bg-bg-secondary border border-border-color text-text-primary text-xs font-semibold px-4 py-2 rounded-full"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA Banner */}
          <div className="pt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-accent-gold hover:bg-accent-gold-hover text-bg-primary font-bold text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-gold"
              style={{ minHeight: '44px' }}
            >
              Discuss a similar deployment
            </Link>
          </div>

        </div>

      </div>
    </main>
  );
}
