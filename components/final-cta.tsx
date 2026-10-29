'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Clock, Check } from 'lucide-react';

export default function FinalCta() {
  return (
    <section className="py-20 px-6 border-t border-border-color bg-bg-secondary/40">
      <div className="max-w-4xl mx-auto rounded-3xl bg-bg-primary border border-border-color p-8 sm:p-14 text-center space-y-8 relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="eyebrow justify-center">Take The Next Step</span>
          <h2 className="headline text-3xl sm:text-4xl text-text-primary">
            Ready to eliminate your highest-drag manual bottleneck?
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            Book a 20-minute operational discovery call. We will review your current spreadsheet or software bottlenecks, map an isolated architecture blueprint, and establish your ROI.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.div whileTap={{ scale: 0.97 }}>
            <Link
              href="/contact"
              className="btn-primary !px-8 !py-4 !text-sm font-semibold flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>Book a 20-minute discovery call</span>
              <span className="btn-arrow-badge w-6 h-6">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </span>
            </Link>
          </motion.div>

          <motion.div whileTap={{ scale: 0.97 }}>
            <Link
              href="/tools"
              className="btn-ghost !px-7 !py-4 !text-sm font-medium flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Interactive Tools</span>
              <ArrowRight className="w-4 h-4 text-text-muted" />
            </Link>
          </motion.div>
        </div>

        <div className="pt-6 border-t border-border-color/60 flex flex-wrap items-center justify-center gap-6 text-xs text-text-subtle font-mono">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Zero sales pressure</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Direct conversation with the engineer</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Actionable architecture takeaway</span>
          </div>
        </div>
      </div>
    </section>
  );
}
