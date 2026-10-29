'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import PipelineMiniDemo from '@/components/pipeline-mini-demo';

const fluidSpring = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 32,
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      <div className="max-w-6xl mx-auto px-6 space-y-14">
        {/* Hero Narrative Block */}
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-text-muted">
            <span className="w-2 h-2 rounded-full bg-accent-gold" />
            <span className="uppercase tracking-wider">Autonomous Systems Architect · Production Agentic AI</span>
          </div>

          <h1 className="headline text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-text-primary leading-[1.08]">
            Autonomous agents engineered for mission-critical operations.
          </h1>

          <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl">
            Rooted in years of industrial software engineering, I design and deploy multi-agent architectures that run complex back-office operations—reconciling invoices, balancing inventories, and resolving logistics disputes with mathematical certainty and zero ledger corruption.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <motion.div whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="btn-primary !px-7 !py-3.5 !text-sm font-semibold flex items-center gap-3 group cursor-pointer"
              >
                <span>Book a 20-min architectural audit</span>
                <span className="btn-arrow-badge w-6 h-6">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </span>
              </Link>
            </motion.div>

            <motion.div whileTap={{ scale: 0.97 }}>
              <Link
                href="/agents"
                className="btn-ghost !px-6 !py-3.5 !text-sm font-medium flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Agent Architectures</span>
                <ArrowRight className="w-4 h-4 text-text-muted" />
              </Link>
            </motion.div>
          </div>

          {/* Verification Metrics Bar */}
          <div className="pt-6 border-t border-border-color/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-text-subtle uppercase text-[10px] block">Production Verification</span>
              <span className="text-sm font-bold text-text-primary">Textile Mill Operating</span>
            </div>
            <div>
              <span className="text-text-subtle uppercase text-[10px] block">Ledger Integrity</span>
              <span className="text-sm font-bold text-emerald-400">0.00% Corrupt Rows</span>
            </div>
            <div>
              <span className="text-text-subtle uppercase text-[10px] block">Safety Protocol</span>
              <span className="text-sm font-bold text-text-primary">Deterministic + HITL</span>
            </div>
            <div>
              <span className="text-text-subtle uppercase text-[10px] block">Execution Model</span>
              <span className="text-sm font-bold text-accent-gold">Multi-Agent Sprints</span>
            </div>
          </div>
        </div>

        {/* Flagship Interactive Instrument: Pipeline Demo */}
        <div className="w-full">
          <PipelineMiniDemo />
        </div>
      </div>
    </section>
  );
}
