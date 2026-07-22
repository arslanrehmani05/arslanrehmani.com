// components/cta-section.tsx
import Link from 'next/link';

export default function CtaSection() {
  return (
    <section
      className="bg-bg-primary py-20 md:py-32"
      style={{
        backgroundImage:
          'radial-gradient(circle at center, rgba(201,168,76,0.06) 0%, transparent 70%)',
      }}
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-text-primary leading-tight">
          If your operations have inefficiency worth eliminating, let&apos;s talk.
        </h2>
        <p className="text-base md:text-lg text-text-muted leading-relaxed mt-4">
          Every engagement starts with understanding your operation. No commitment
          until the diagnosis is done.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-accent-gold hover:bg-accent-gold-hover text-black font-semibold px-8 py-4 rounded-full transition-colors duration-200"
            style={{ minHeight: '44px' }}
          >
            Start the conversation
          </Link>
          <a
            href="https://vanthrope.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-gold hover:text-accent-gold-hover hover:underline underline-offset-4 font-semibold transition-colors duration-200"
            style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
          >
            Learn about Vanthrope →
          </a>
        </div>
      </div>
    </section>
  );
}
