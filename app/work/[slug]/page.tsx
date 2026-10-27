// app/work/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink, ShieldCheck, CheckCircle2, AlertTriangle, Layers, Clock } from 'lucide-react';
import { getCaseStudyBySlug, getCaseStudies } from '@/sanity/lib/client';
import ArchitectureDiagram from '@/components/architecture-diagram';

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const caseStudy = await getCaseStudyBySlug(params.slug);
  if (!caseStudy) return {};

  const title = `${caseStudy.title} Case Study | Arslan Rehmani`;
  const description = `Operational system build for ${caseStudy.client}: ${caseStudy.solution}`;
  const canonical = `https://arslanrehmani.com/work/${caseStudy.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Arslan Rehmani',
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
  const project = await getCaseStudyBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${project.title} — Operational Case Study`,
    description: project.solution,
    author: {
      '@type': 'Person',
      name: 'Arslan Rehmani',
      url: 'https://arslanrehmani.com',
      jobTitle: 'Operational Data Systems Engineer',
    },
    about: {
      '@type': 'Thing',
      name: project.industry,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://arslanrehmani.com/work/${project.slug}`,
    },
  };

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Navigation Back */}
        <div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-text-primary transition-colors py-1 px-3 rounded-lg bg-bg-secondary border border-border-color"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Case Studies</span>
          </Link>
        </div>

        {/* Header Block */}
        <div className="space-y-6 border-b border-border-color pb-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono text-text-muted">
              <span>{project.industry}</span>
              <span>&bull;</span>
              <span>Timeline: {project.timeline}</span>
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-secondary border border-border-color text-xs font-mono text-text-primary hover:border-text-primary/40 transition-colors"
              >
                <span>Live production deployment</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.12]">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-text-muted leading-relaxed">
            {project.solution}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="text-xs font-mono px-2.5 py-1 rounded bg-bg-secondary border border-border-color text-text-subtle"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* 1. Client Context */}
        <section className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-text-subtle">
            01. Client Context
          </h2>
          <div className="p-6 rounded-2xl bg-bg-secondary/40 border border-border-color text-base text-text-muted leading-relaxed">
            {project.clientContext}
          </div>
        </section>

        {/* 2. The Problem in Client's Words */}
        <section className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-text-subtle">
            02. The Problem in the Client&apos;s Words
          </h2>
          <blockquote className="p-6 sm:p-8 rounded-2xl bg-bg-secondary border-l-4 border-l-accent-gold border border-border-color text-base sm:text-lg text-text-primary italic leading-relaxed">
            {project.problemInClientWords}
          </blockquote>
        </section>

        {/* 3. Operational Constraints */}
        <section className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-text-subtle">
            03. Constraints &amp; Realities
          </h2>
          <ul className="space-y-3">
            {project.constraints.map((c) => (
              <li
                key={c}
                className="p-4 rounded-xl bg-bg-secondary/30 border border-border-color text-sm text-text-muted flex items-start gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold mt-2 shrink-0" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 4. Solution & Architecture Diagram */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-text-subtle">
              04. Solution &amp; Architecture Blueprint
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              Data flow showing intake, deterministic validation barriers, and permanent double-entry audit logging:
            </p>
          </div>
          <ArchitectureDiagram type={project.architectureDiagramSvg} />
        </section>

        {/* 5. Data & Security Design */}
        <section className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-text-subtle">
            05. Data &amp; Security Design
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-bg-secondary/40 border border-border-color space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-accent-gold font-bold">
                Access Rules (RLS)
              </span>
              <p className="text-xs text-text-muted leading-relaxed">
                {project.dataAndSecurityDesign.accessRules}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-bg-secondary/40 border border-border-color space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-accent-gold font-bold">
                Audit Trail
              </span>
              <p className="text-xs text-text-muted leading-relaxed">
                {project.dataAndSecurityDesign.auditRules}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-bg-secondary/40 border border-border-color space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-accent-gold font-bold">
                Staging &amp; Validation
              </span>
              <p className="text-xs text-text-muted leading-relaxed">
                {project.dataAndSecurityDesign.stagingAndValidation}
              </p>
            </div>
          </div>
        </section>

        {/* 6. Measured Results (Verified per Truth Gate) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-text-subtle">
              06. Measured Results (Truth Gate Verified)
            </h2>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Backed by facts.json
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.resultsDetailed.map((res) => (
              <div
                key={res.metric}
                className="p-6 rounded-2xl bg-bg-primary border border-border-color space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-text-primary">
                    {res.value}
                  </div>
                  <div className="text-xs font-bold text-text-primary mt-1">
                    {res.metric}
                  </div>
                </div>
                <div className="pt-3 border-t border-border-color/60 space-y-1">
                  <p className="text-[11px] text-text-muted leading-tight">
                    {res.howMeasured}
                  </p>
                  <p className="text-[10px] font-mono text-text-subtle">
                    Period: {res.period}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. What Went Wrong & What I Changed */}
        <section className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-text-subtle">
            07. What Went Wrong &amp; What I Changed
          </h2>
          <div className="p-6 rounded-2xl bg-bg-secondary/40 border border-border-color space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Candid Engineering Retrospective</span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              {project.whatWentWrong}
            </p>
          </div>
        </section>

        {/* 8. Client Quote (Rendered ONLY if verified; otherwise omitted per Truth Gate) */}
        {project.clientQuote && (
          <section className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-text-subtle">
              08. Client Quote (Signed Permission Verified)
            </h2>
            <blockquote className="p-6 rounded-2xl bg-bg-secondary border border-border-color text-base text-text-primary italic">
              &ldquo;{project.clientQuote}&rdquo;
            </blockquote>
          </section>
        )}

        {/* 9. What I'd Do Differently */}
        <section className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-text-subtle">
            09. What I&apos;d Do Differently
          </h2>
          <div className="p-6 rounded-2xl bg-bg-secondary/20 border border-border-color text-sm text-text-muted leading-relaxed">
            {project.whatIdDoDifferently}
          </div>
        </section>

        {/* 10. Bottom CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-bg-secondary border border-border-color flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-text-primary">
              Need a system engineered to this standard?
            </h3>
            <p className="text-sm text-text-muted">
              Book a 20-minute discovery call to review your operational bottlenecks.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-primary !px-6 !py-3 !text-sm whitespace-nowrap flex items-center gap-2"
          >
            <span>Book a 20-minute discovery call</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
