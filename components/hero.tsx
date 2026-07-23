// components/hero.tsx
import Image from 'next/image';
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

      <div className="relative max-w-6xl mx-auto px-6 min-h-[88vh] py-24 md:py-32 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">
        {/* Left column — 60% */}
        <div className="lg:col-span-3 animate-fade-in">
          <span className="eyebrow mb-6">Operational AI Systems</span>

          <h1 className="headline text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.02] mt-2">
            I build systems that replace manual work.{' '}
            <span className="italic text-accent-gold">Permanently.</span>
          </h1>

          <p className="text-base md:text-lg text-text-muted leading-relaxed max-w-xl mt-8">
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
            Arslan Rehmani <span className="text-text-subtle/60">·</span> Operational
            AI Systems
          </p>
        </div>

        {/* Right column — 40% */}
        <div className="lg:col-span-2">
          <div className="relative">
            {/* Portrait glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-[2rem] blur-2xl"
              style={{
                background:
                  'radial-gradient(circle at 50% 40%, rgba(201,168,76,0.14) 0%, transparent 65%)',
              }}
            />
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-bg-secondary border border-border-gold shadow-2xl shadow-black/60">
              <Image
                src="/headshot.jpg"
                alt="Arslan Rehmani"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              {/* Bottom scrim — grounds the warm photo into the dark field. */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(10,10,10,0.55) 0%, transparent 38%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
