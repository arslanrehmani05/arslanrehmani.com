// components/final-cta.tsx
import Link from 'next/link';
import { ArrowRight, Mail, Calendar, ShieldCheck } from 'lucide-react';

export default function FinalCta() {
  return (
    <section className="py-24 md:py-32 bg-bg-secondary/60 border-t border-border-color">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-primary border border-border-color text-xs font-mono text-text-muted">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>No sales pressure &bull; You speak directly with the engineer</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-tight">
          Ready to replace manual spreadsheets with an audited system?
        </h2>

        <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl mx-auto">
          Book a 20-minute discovery call. We will review your current spreadsheets, map the exact operational drag, and discuss whether a custom system or data audit makes commercial sense.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/contact"
            className="btn-primary !px-8 !py-4 !text-base font-semibold flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a 20-minute discovery call</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="mailto:contact@arslanrehmani.com"
            className="btn-ghost !px-8 !py-4 !text-base font-medium flex items-center justify-center gap-2 text-text-primary hover:border-text-primary/40 w-full sm:w-auto font-mono text-sm"
          >
            <Mail className="w-4 h-4" />
            <span>contact@arslanrehmani.com</span>
          </a>
        </div>

        <div className="text-xs font-mono text-text-subtle pt-4">
          Response promise: within 24 hours on business days &bull; Scoped after audit &bull; Full client code ownership
        </div>
      </div>
    </section>
  );
}
