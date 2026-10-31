// components/about-section.tsx
import Image from 'next/image';

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/arslanrehmani' },
  { label: 'GitHub', href: 'https://github.com/arslanrehmani05' },
  { label: 'X', href: 'https://x.com/arslanrehmani' },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-bg-primary py-14 md:py-20 scroll-mt-16 border-t border-border-color">
      <div className="max-w-3xl mx-auto px-6 text-center">
        {/* Centered Circular Portrait & Identity */}
        <div className="flex flex-col items-center pb-8 border-b border-border-color">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shrink-0 border border-white/20 shadow-2xl shadow-black/60 bg-bg-secondary ring-2 ring-white/10 mb-5">
            <Image
              src="/headshot.jpg"
              alt="Arslan Rehmani"
              width={128}
              height={128}
              priority
              className="object-cover object-top w-full h-full"
            />
          </div>

          <span className="eyebrow mb-2 justify-center">About</span>
          <h2 className="headline text-3xl md:text-4xl text-text-primary">
            Arslan Rehmani
          </h2>
          <p className="text-sm md:text-base font-medium text-text-muted mt-1.5">
            Autonomous Systems Architect · Production Agentic AI
          </p>
        </div>

        {/* Centered Copy & Links */}
        <div className="pt-8 max-w-2xl mx-auto">
          <h3 className="headline text-xl md:text-2xl text-text-primary leading-snug">
            Systems over slideware. <span className="italic text-accent-gold">Code over claims.</span>
          </h3>
          <p className="text-base text-text-muted leading-relaxed mt-4">
            I engineer production software and autonomous agent systems for real businesses. The first system I built took a 10-person back office down to a single clerk at a textile manufacturer running 27 looms and turning over PKR 3 crore (~$107k) a month, live for 18 months. The second runs a client&apos;s multi-channel ecommerce operations. Everything on this site is live and testable — because claims are cheap and working software is not.
          </p>

          <div className="flex items-center justify-center gap-6 mt-8">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary hover:text-accent-gold text-sm font-medium transition-colors"
                style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              >
                {social.label} →
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
