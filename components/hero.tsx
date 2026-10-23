// components/hero.tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const stats = [
  { value: '5', label: 'Roles replaced' },
  { value: '40+', label: 'Hrs/wk manual saved' },
  { value: '27', label: 'Weaving looms live' },
  { value: '10+', label: 'Months in production' },
];

export default function Hero() {
  return (
    <section className="relative bg-bg-primary overflow-hidden">
      {/* LeftClick atmospheric ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[750px] w-full max-w-[1200px] rounded-full blur-3xl opacity-75"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(26, 26, 46, 0.7) 0%, rgba(17, 17, 19, 0) 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-24 text-center animate-fade-in">
        <span className="eyebrow mb-4 justify-center">Operational AI Systems</span>

        <h1 className="headline text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.05] mt-2 max-w-3xl mx-auto">
          I build systems that replace manual work.{' '}
          <span className="italic text-text-primary">Permanently.</span>
        </h1>

        <p className="text-base md:text-lg text-text-muted leading-relaxed max-w-2xl mx-auto mt-6">
          Custom operational software for manufacturing companies and ecommerce
          brands — fewer people doing repetitive work, lower operating costs, same
          or better output.
        </p>

        {/* LeftClick 4-metric proof row right in the hero */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto mt-10 pt-8 border-t border-border-color">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="block text-2xl sm:text-3xl font-medium tracking-tight text-text-primary">
                {stat.value}
              </span>
              <span className="block text-xs text-text-muted mt-1 leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* LeftClick signature pill CTA with nested circular arrow badge */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link
            href="#proof"
            className="btn-primary !pl-6 !pr-2 !py-2 flex items-center gap-3 group"
          >
            <span>See the work</span>
            <span className="w-8 h-8 rounded-full bg-[#111113] text-[#f0f0f2] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
          <Link href="/contact" className="btn-ghost !px-6 !py-3 !text-sm">
            Start a conversation
          </Link>
        </div>

        <p className="text-xs text-text-subtle mt-10 tracking-wide">
          Arslan Rehmani <span className="text-text-subtle/60">·</span> Operational AI Systems
        </p>
      </div>
    </section>
  );
}
