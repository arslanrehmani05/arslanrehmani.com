import type { Metadata } from 'next';
import FeaturedWork from '@/components/featured-work';
import FinalCta from '@/components/final-cta';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Case studies: a 27-loom textile manufacturer run on one system, and a multi-channel ecommerce brand run from one operating screen.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <div>
      <section className="pt-16 md:pt-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="eyebrow mb-4">Case studies</span>
            <h1 className="headline text-4xl sm:text-5xl">Systems running real businesses today.</h1>
            <p className="text-base md:text-lg text-text-muted leading-relaxed mt-6">
              Each of these is in daily use on a client’s live data. The numbers are the client’s,
              and I walk through the systems themselves on a call.
            </p>
          </div>
        </div>
      </section>

      <div className="[&>section]:border-t-0 [&>section]:pt-12 md:[&>section]:pt-16">
        <FeaturedWork showHeader={false} />
      </div>

      <FinalCta />
    </div>
  );
}
