import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-20 md:py-28 border-t border-border-color">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
        <div className="md:col-span-4">
          <div className="relative aspect-square w-full max-w-[280px] rounded-2xl overflow-hidden border border-border-color bg-bg-secondary">
            <Image
              src="/headshot.jpg"
              alt="Arslan Rehmani"
              fill
              sizes="(max-width: 768px) 280px, 320px"
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="md:col-span-8">
          <span className="eyebrow mb-4">About</span>
          <h2 className="headline text-3xl sm:text-4xl">Arslan Rehmani</h2>
          <p className="text-base md:text-lg text-text-muted leading-relaxed mt-6 max-w-2xl">
            I learned operations and finance inside a manufacturing business before I wrote its
            software. That is why I start with how your business runs and what it costs, and only
            then decide what to build.
          </p>
          <p className="text-base md:text-lg text-text-muted leading-relaxed mt-4 max-w-2xl">
            The first system I built replaced five back-office roles at a textile manufacturer and
            has run its daily operations for more than ten months.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm text-text-primary hover:text-text-muted transition-colors mt-8 min-h-[44px]"
          >
            <span>More about how I work</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
