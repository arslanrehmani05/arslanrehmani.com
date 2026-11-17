import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { headlineStats } from '@/lib/content';

export default function Hero() {
  return (
    <section className="pt-16 pb-20 md:pt-28 md:pb-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <span className="eyebrow mb-6">Operational systems and AI agents</span>

          <h1 className="headline text-4xl sm:text-5xl md:text-6xl leading-[1.06]">
            I build systems that replace manual work.{' '}
            <span className="text-text-muted">Permanently.</span>
          </h1>

          <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl mt-6">
            Custom software and AI agents for manufacturers, ecommerce brands and finance teams.
            The reporting, reconciliation and data entry your people do by hand, done by a system
            that runs every day.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-10">
            <Link href="/work" className="btn-primary !px-7 !py-3.5 gap-2">
              <span>See the work</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-ghost !px-7 !py-3.5">
              Start a conversation
            </Link>
          </div>
        </div>

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 mt-16 pt-10 border-t border-border-color">
          {headlineStats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse justify-end">
              <dt className="text-sm text-text-muted mt-2 leading-snug">{stat.label}</dt>
              <dd className="text-3xl md:text-4xl font-semibold tracking-tight text-text-primary">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="text-xs text-text-subtle mt-6">
          Figures from one engagement: a textile manufacturer.{' '}
          <Link href="/work/textile-mode" className="underline underline-offset-4 hover:text-text-primary transition-colors">
            Read the case study
          </Link>
        </p>
      </div>
    </section>
  );
}
