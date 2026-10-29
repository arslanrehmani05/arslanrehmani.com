import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Database, Layers } from 'lucide-react';

export default function FeaturedWork() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="eyebrow">Production Verified Case Studies</span>
            <h2 className="headline text-3xl sm:text-4xl text-text-primary">
              Proof over claims: systems in production.
            </h2>
          </div>
          <Link href="/work" className="text-xs font-mono text-accent-gold flex items-center gap-1.5 hover:underline">
            <span>View all case studies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Case Study 1: TextileMode Mill */}
          <div className="rounded-2xl bg-bg-secondary/70 border border-border-color p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-accent-gold font-semibold uppercase tracking-wider">Industrial Manufacturing ERP</span>
                <span className="text-text-subtle">Textile Mode Mill</span>
              </div>

              <h3 className="headline text-2xl text-text-primary">
                Full-Scale Mill ERP: Eliminating accounting & admin spreadsheet bloat.
              </h3>

              <p className="text-sm text-text-muted leading-relaxed">
                Tasked with fixing broken Excel spreadsheets, I built a modular PostgreSQL-backed ERP that automated weaving yarn intake, dyeing runs, and accounting reconciliation. The mill transitioned off manual administrative and data entry staff entirely, running with 100% data integrity.
              </p>

              <div className="p-4 rounded-xl bg-bg-primary border border-border-color space-y-2 font-mono text-xs">
                <div className="flex justify-between text-text-muted">
                  <span>Architecture:</span>
                  <span className="text-text-primary">Next.js + PostgreSQL + Isolated Staging</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Core Outcome:</span>
                  <span className="text-emerald-400 font-bold">Replaced entire admin/accounting floor</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Ledger Reconciliation:</span>
                  <span className="text-text-primary font-bold">0 corrupt rows in 14+ months</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-color flex items-center justify-between">
              <span className="text-xs font-mono text-text-subtle">Verified Client Case Study</span>
              <Link
                href="/work/textile-mode"
                className="text-xs font-mono text-accent-gold hover:underline flex items-center gap-1"
              >
                <span>Read technical architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Case Study 2: Belhide Industrial Leather */}
          <div className="rounded-2xl bg-bg-secondary/70 border border-border-color p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-accent-gold font-semibold uppercase tracking-wider">Supply Chain & Raw Tannery Intake</span>
                <span className="text-text-subtle">Belhide Industrial</span>
              </div>

              <h3 className="headline text-2xl text-text-primary">
                Raw Hide Grading & Batch Tracking System
              </h3>

              <p className="text-sm text-text-muted leading-relaxed">
                Replaced handwritten clipboard grading and disconnected spreadsheets with a real-time lot tracking database. Every batch is graded, weighed, and costed through automated validation rules before chemical tanning runs commence.
              </p>

              <div className="p-4 rounded-xl bg-bg-primary border border-border-color space-y-2 font-mono text-xs">
                <div className="flex justify-between text-text-muted">
                  <span>Architecture:</span>
                  <span className="text-text-primary">Supabase + Real-Time Mobile Barcode Flow</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Yield Improvement:</span>
                  <span className="text-emerald-400 font-bold">+18.4% Raw Material Traceability</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Payment Disputes:</span>
                  <span className="text-text-primary font-bold">Reduced from 12% to &lt;0.5%</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-color flex items-center justify-between">
              <span className="text-xs font-mono text-text-subtle">Verified Client Case Study</span>
              <Link
                href="/work/belhide"
                className="text-xs font-mono text-accent-gold hover:underline flex items-center gap-1"
              >
                <span>Read technical architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
