// components/hero.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-screen bg-bg-primary flex flex-col justify-center pt-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full py-16">
        
        {/* Left Side: 55% Text (approx 7 columns in 12-grid) */}
        <div className="lg:col-span-7 flex flex-col justify-center items-start text-left gap-8 animate-fade-in">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent-gold">
            AI Systems Consultant
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-text-primary leading-tight">
            I build AI systems that replace manual operations.
          </h1>
          <p className="text-lg md:text-xl text-text-muted max-w-xl font-normal leading-relaxed">
            Fewer people. Lower costs. Same output. For businesses serious about efficiency.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <Link
              href="#portfolio"
              className="inline-flex items-center justify-center bg-accent-gold hover:bg-accent-gold-hover text-bg-primary text-base font-bold px-8 py-4 rounded-full transition-gold shadow-lg shadow-accent-gold/10"
              style={{ minHeight: '44px' }}
            >
              See the work
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-border-color hover:border-accent-gold text-text-primary text-base font-semibold px-8 py-4 rounded-full transition-gold"
              style={{ minHeight: '44px' }}
            >
              Work with me
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <span className="text-xs font-medium text-accent-gold uppercase tracking-wider relative inline-block pb-0.5 max-w-max">
              Founder, Vanthrope
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent-gold"></span>
            </span>
          </div>
        </div>

        {/* Right Side: 45% Image (approx 5 columns in 12-grid) */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full p-1.5 border border-accent-gold/40 bg-bg-secondary flex justify-center items-center overflow-hidden">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src="/headshot.png"
                alt="Arslan Rehmani - AI Systems Consultant"
                fill
                priority
                sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Thin horizontal gold separator */}
      <div className="w-full h-[1px] bg-accent-gold/20 absolute bottom-0 left-0"></div>
    </section>
  );
}
