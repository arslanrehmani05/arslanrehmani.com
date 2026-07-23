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
        <h2 className="headline text-3xl md:text-5xl leading-[1.1]">
          If your operations have inefficiency worth eliminating,{' '}
          <span className="italic text-accent-gold">let&apos;s talk.</span>
        </h2>
        <p className="text-base md:text-lg text-text-muted leading-relaxed mt-6 max-w-xl mx-auto">
          Every engagement starts with understanding your operation. No commitment
          until the diagnosis is done.
        </p>

        <div className="flex justify-center mt-10">
          <Link href="/contact" className="btn-primary">
            Start the conversation
          </Link>
        </div>
      </div>
    </section>
  );
}
