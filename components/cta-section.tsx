// components/cta-section.tsx
import Link from 'next/link';

export default function CtaSection() {
  return (
    <section 
      id="contact-cta" 
      className="py-36 border-b border-border-color flex flex-col items-center justify-center text-center px-6 relative"
      style={{
        background: 'radial-gradient(circle, rgba(201, 168, 76, 0.03) 0%, #0A0A0A 100%)'
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-text-primary leading-tight max-w-3xl">
          If your operations have inefficiency worth eliminating, let&apos;s talk.
        </h2>
        
        <p className="text-lg md:text-xl text-text-muted max-w-xl font-normal leading-relaxed opacity-60">
          Book a technical audit session. We will map your bottlenecks and outline exactly what custom software will save your firm annually.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 w-full sm:w-auto">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-accent-gold hover:bg-accent-gold-hover text-bg-primary text-base font-bold px-8 py-4 rounded-full transition-gold shadow-lg shadow-accent-gold/10 w-full sm:w-auto"
            style={{ minHeight: '44px' }}
          >
            Start the conversation
          </Link>
          <a
            href="https://vanthrope.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-base font-semibold text-text-primary hover:text-accent-gold transition-gold py-2 px-1"
            style={{ minHeight: '44px' }}
          >
            Learn about Vanthrope →
          </a>
        </div>

      </div>
    </section>
  );
}
