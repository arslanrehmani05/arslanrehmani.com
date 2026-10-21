// components/hero.tsx
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-bg-primary overflow-hidden">
      {/* Ambient light source — a single soft gold glow, upper right. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[680px] w-[680px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(201,168,76,0.10) 0%, rgba(201,168,76,0.03) 40%, transparent 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 pt-10 pb-16 md:pt-14 md:pb-20 animate-fade-in">
        <span className="eyebrow mb-4">Operational AI Systems</span>

        <h1 className="headline text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.04] mt-2">
          I build systems that replace manual work.{' '}
          <span className="italic text-accent-gold">Permanently.</span>
        </h1>

        <p className="text-base md:text-xl text-text-muted leading-relaxed max-w-2xl mt-8">
          Custom operational software for manufacturing companies and ecommerce
          brands — fewer people doing repetitive work, lower operating costs, same
          or better output.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link href="#proof" className="btn-primary">
            See the work
          </Link>
          <Link href="/contact" className="btn-ghost">
            Start a conversation
          </Link>
        </div>

        <p className="text-sm text-text-subtle mt-10 tracking-wide">
          Arslan Rehmani <span className="text-text-subtle/60">·</span> Operational AI Systems
        </p>
      </div>
    </section>
  );
}
