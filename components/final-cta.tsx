import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FinalCta() {
  return (
    <section className="py-20 md:py-28 border-t border-border-color">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="headline text-3xl sm:text-4xl">
          If manual work is costing your business, let’s talk.
        </h2>
        <p className="text-base md:text-lg text-text-muted leading-relaxed mt-5">
          Every engagement starts with understanding your operation. No commitment until the
          diagnosis is done.
        </p>
        <div className="mt-10 flex justify-center">
          <Link href="/contact" className="btn-primary !px-8 !py-4 gap-2">
            <span>Start a conversation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
