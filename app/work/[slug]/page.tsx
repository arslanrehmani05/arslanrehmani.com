import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import FinalCta from '@/components/final-cta';
import { caseStudies, getCaseStudy } from '@/lib/content';

interface PageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const cs = getCaseStudy(params.slug);
  if (!cs) return {};
  return {
    title: `${cs.client}: ${cs.title}`,
    description: cs.summary,
    alternates: { canonical: `/work/${cs.slug}` },
  };
}

export default function CaseStudyPage({ params }: PageProps) {
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();

  return (
    <div>
      <article className="pt-12 md:pt-20 pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All case studies</span>
          </Link>

          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono uppercase tracking-wider text-text-subtle">
              <span>{cs.sector}</span>
              <span aria-hidden="true">·</span>
              <span>{cs.client}</span>
            </div>
            <h1 className="headline text-3xl sm:text-5xl mt-5">{cs.title}</h1>
            <p className="text-base md:text-lg text-text-muted leading-relaxed mt-6">{cs.summary}</p>
          </div>

          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 items-start p-6 md:p-8 rounded-2xl bg-bg-secondary border border-border-color">
            {cs.results.map((r) => (
              <div key={r.label} className="flex flex-col-reverse justify-end">
                <dt className="text-xs text-text-muted mt-2 leading-snug">{r.label}</dt>
                <dd className="text-2xl md:text-3xl font-semibold text-text-primary">{r.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 space-y-12">
            <section>
              <h2 className="headline text-xl md:text-2xl">The situation</h2>
              <p className="text-base text-text-muted leading-relaxed mt-4">{cs.situation}</p>
            </section>

            <section>
              <h2 className="headline text-xl md:text-2xl">What was going wrong</h2>
              <ul className="mt-4 space-y-3">
                {cs.problems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-text-muted leading-relaxed">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-text-subtle shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="headline text-xl md:text-2xl">What I built</h2>
              <ul className="mt-4 space-y-3">
                {cs.built.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-text-muted leading-relaxed">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-text-primary shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <p className="text-sm text-text-subtle leading-relaxed pt-8 border-t border-border-color">
              {cs.access}
            </p>
          </div>
        </div>
      </article>

      <FinalCta />
    </div>
  );
}
