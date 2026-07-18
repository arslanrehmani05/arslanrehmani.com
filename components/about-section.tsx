// components/about-section.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section id="about" className="bg-bg-primary py-36 border-b border-border-color">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Text Bio (7 columns on desktop) */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent-gold">
              The Person
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary leading-tight">
              I came from finance. Now I automate the work I used to do by hand.
            </h2>
            <div className="space-y-4 text-base text-text-muted leading-relaxed font-normal">
              <p>
                I&apos;m Arslan Rehmani, 27, based in Karachi. I started in finance — audits, reporting, the manual grind of moving numbers between systems — and taught myself to build software because I was tired of watching businesses pay people to be middleware.
              </p>
              <p>
                I built TextileMode ERP, which has run a 27-loom manufacturer&apos;s operations for over 10 months, and the operational stack behind my own brand, Belhide. Through Vanthrope, I build the same class of system for businesses that want their operations to run on software instead of overtime.
              </p>
            </div>
          </div>

          {/* Right Column: Headshot and Social Links (5 columns on desktop) */}
          <div className="lg:col-span-5 flex flex-col items-center gap-6">
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-3xl p-1 border border-accent-gold bg-bg-secondary overflow-hidden">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/headshot.png"
                  alt="Arslan Rehmani portrait"
                  fill
                  sizes="(max-width: 768px) 256px, 288px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Social Icons Link row */}
            <div className="flex gap-6 mt-2">
              <Link
                href="https://x.com/arslanrehmani"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold uppercase tracking-wider text-accent-gold hover:text-accent-gold-hover transition-gold"
                style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              >
                X (Twitter)
              </Link>
              <Link
                href="https://linkedin.com/in/arslanrehmani"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold uppercase tracking-wider text-accent-gold hover:text-accent-gold-hover transition-gold"
                style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              >
                LinkedIn
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
