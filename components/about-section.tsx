// components/about-section.tsx
import Image from 'next/image';

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/arslanrehmani' },
  { label: 'GitHub', href: 'https://github.com/arslanrehmani05' },
  { label: 'X', href: 'https://x.com/arslanrehmani' },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-bg-primary py-12 md:py-16 scroll-mt-16 border-t border-border-color">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 pb-8 border-b border-border-color">
          {/* Small, compact circular portrait */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 border-2 border-border-gold shadow-xl shadow-black/60 bg-bg-secondary ring-4 ring-accent-gold/10">
            <Image
              src="/headshot.jpg"
              alt="Arslan Rehmani"
              width={112}
              height={112}
              className="object-cover object-top w-full h-full"
            />
          </div>

          <div>
            <span className="eyebrow mb-2">About</span>
            <h2 className="headline text-2xl md:text-3xl text-text-primary">
              Arslan Rehmani
            </h2>
            <p className="text-sm font-medium text-accent-gold mt-1">
              Operational AI Systems Builder
            </p>
          </div>
        </div>

        <div className="pt-8">
          <h3 className="headline text-xl md:text-2xl text-text-primary leading-snug">
            I build the systems, not <span className="italic text-accent-gold">slideware.</span>
          </h3>
          <p className="text-base text-text-muted leading-relaxed mt-4 max-w-2xl">
            I build production software for real businesses. The first system I built
            replaced five employees at a textile manufacturer and has run its daily
            operations for over ten months. The second runs a client&apos;s ecommerce
            brand across five sales channels. Everything on this site is live and testable —
            because claims are cheap and working software is not.
          </p>

          <div className="flex items-center gap-6 mt-8">
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
      </div>
    </section>
  );
}
