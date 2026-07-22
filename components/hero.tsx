// components/hero.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6 min-h-[85vh] py-20 md:py-32 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
        {/* Left column — 60% */}
        <div className="lg:col-span-3 animate-fade-in">
          <span className="block text-xs font-semibold tracking-[0.2em] uppercase text-accent-gold mb-4">
            Operational AI Systems
          </span>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-primary leading-[1.05]">
            I build systems that replace manual work. Permanently.
          </h1>

          <p className="text-base md:text-lg text-text-muted leading-relaxed max-w-xl mt-6">
            Custom operational software for manufacturing companies and ecommerce
            brands — fewer people doing repetitive work, lower operating costs, same
            or better output.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              href="#proof"
              className="inline-flex items-center justify-center bg-accent-gold hover:bg-accent-gold-hover text-black font-semibold px-8 py-4 rounded-full transition-colors duration-200"
              style={{ minHeight: '44px' }}
            >
              See the work
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-border-color text-text-primary hover:border-accent-gold hover:text-accent-gold font-semibold px-8 py-4 rounded-full transition-colors duration-200"
              style={{ minHeight: '44px' }}
            >
              Start a conversation
            </Link>
          </div>

          <p className="text-sm text-text-subtle mt-8">
            Arslan Rehmani — Founder, Vanthrope
          </p>
        </div>

        {/* Right column — 40% */}
        <div className="lg:col-span-2">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-bg-secondary border border-border-color ring-1 ring-border-gold">
            <Image
              src="/headshot.png"
              alt="Arslan Rehmani"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
