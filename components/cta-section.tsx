// components/cta-section.tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
  return (
    <section
      className="relative bg-bg-primary py-16 md:py-24 overflow-hidden border-t border-border-color"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(26, 26, 46, 0.6) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <span className="eyebrow mb-4 justify-center">Get Started</span>
        <h2 className="headline text-3xl sm:text-4xl md:text-5xl leading-[1.1] text-text-primary">
          If your operations have inefficiency worth eliminating,{' '}
          <span className="italic">let&apos;s talk.</span>
        </h2>
        <p className="text-base md:text-lg text-text-muted leading-relaxed mt-6 max-w-xl mx-auto">
          Every engagement starts with understanding your operation. No commitment
          until the diagnosis is done.
        </p>

        <div className="flex justify-center mt-10">
          <Link
            href="/contact"
            className="btn-primary !pl-7 !pr-2.5 !py-2.5 flex items-center gap-3 group"
          >
            <span>Start the conversation</span>
            <span className="w-8 h-8 rounded-full bg-[#111113] text-[#f0f0f2] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
