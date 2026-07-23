// components/about-section.tsx
import Image from 'next/image';

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/arslanrehmani' },
  { label: 'GitHub', href: 'https://github.com/arslanrehmani05' },
  { label: 'X', href: 'https://x.com/arslanrehmani' },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-bg-primary py-20 md:py-32 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-11 gap-12 lg:gap-16 items-center">
        {/* Left — 55% */}
        <div className="lg:col-span-6">
          <span className="block text-xs font-semibold tracking-[0.2em] uppercase text-accent-gold mb-4">
            The Person
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-text-primary leading-tight">
            Arslan Rehmani. I build the systems, not slideware.
          </h2>
          <p className="text-base md:text-lg text-text-muted leading-relaxed mt-6">
            I build production software for real businesses. The first system I built
            replaced five employees at a textile manufacturer and has run its daily
            operations for over ten months. The second runs a client&apos;s ecommerce
            brand across five sales channels. Everything on this site is live and testable —
            because claims are cheap and working software is not.
          </p>

          <div className="flex gap-6 mt-8">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-gold hover:text-accent-gold-hover hover:underline underline-offset-4 text-sm font-semibold transition-colors duration-200"
                style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right — 45% */}
        <div className="lg:col-span-5">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-bg-secondary border border-border-color ring-1 ring-border-gold">
            <Image
              src="/headshot.png"
              alt="Arslan Rehmani"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
