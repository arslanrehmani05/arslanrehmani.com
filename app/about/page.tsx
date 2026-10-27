// app/about/page.tsx
import Link from 'next/link';
import { ShieldCheck, Clock, Award, CheckCircle2, ArrowRight, Database, Cpu } from 'lucide-react';
import { getPlaceholdersList, isCredentialVerified } from '@/lib/facts';

export const metadata = {
  title: 'About Arslan Rehmani | Custom Projects & Operational Systems Builder',
  description:
    'Background in accounting training, factory floor software implementation, and building custom operational systems with deterministic agentic improvements.',
};

export default function AboutPage() {
  const placeholders = getPlaceholdersList();
  const isEdProficientVerified = isCredentialVerified('cred-ed-proficient');

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Availability Notice — zero mention of physical location or address */}
        <div className="p-4 rounded-2xl bg-bg-secondary/60 border border-border-color flex flex-wrap items-center gap-3 text-xs text-text-muted">
          <span className="inline-flex items-center gap-1.5 text-text-primary font-medium">
            <Database className="w-3.5 h-3.5 text-accent-gold" />
            <span>Custom Operational Systems &bull; Agentic Automation Over Production Software</span>
          </span>
          <span className="text-border-color">&bull;</span>
          <span>Working overlap: {placeholders.OVERLAP_WINDOWS}</span>
          <span className="text-border-color">&bull;</span>
          <span>On-site visits: {placeholders.VISIT_POLICY}</span>
        </div>

        {/* Header Block */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono text-text-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Background &bull; Engineering Philosophy</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-text-primary">
            I build custom operational projects—and engineer agentic improvements over them.
          </h1>
          <p className="text-lg sm:text-xl text-text-muted leading-relaxed">
            I am an engineer with accounting training. I build systems for owner-operators who are tired of manual work and cannot afford data that doesn&apos;t reconcile.
          </p>
        </div>

        {/* The Specific Story — zero physical address or location mentions */}
        <section className="space-y-6 text-base sm:text-lg text-text-muted leading-relaxed">
          <div className="p-6 sm:p-8 rounded-3xl bg-bg-secondary/30 border border-border-color space-y-4 text-text-primary">
            <h2 className="text-xl font-bold text-text-primary">
              The Paper Registers of a 27-Loom Weaving Mill
            </h2>
            <p className="text-text-muted leading-relaxed text-sm sm:text-base">
              My introduction to operational software didn&apos;t happen in an abstract tech incubator—it happened standing on the loud, humid weaving floor of a commercial textile mill.
            </p>
            <p className="text-text-muted leading-relaxed text-sm sm:text-base">
              The mill had 27 industrial looms running day and night. Everything was tracked on physical, grease-stained paper registers. Shift supervisors wrote meterage numbers with ballpoint pens. Clerks transferred those numbers into multi-user Excel files on shared hard drives. Every Friday evening, two accountants sat down with calculators to reconcile yarn consumed against greige fabric produced.
            </p>
            <p className="text-text-muted leading-relaxed text-sm sm:text-base">
              The numbers never matched. Someone had inevitably overwritten a cell formula, transposed a lot number, or miscalculated piece-rate wages. The cost wasn&apos;t theoretical: it was hundreds of thousands of dollars in untracked yarn drift and days of lost clerical time.
            </p>
            <p className="text-text-muted leading-relaxed text-sm sm:text-base">
              I built TextileMode ERP to solve that exact operational problem. We didn&apos;t deploy an off-the-shelf chatbot or generic SaaS. We built a custom relational ERP from scratch that modeled their physical looms and double-entry accounting. Then, we layered agentic intelligence over it—automated shift briefings, yarn shortfall alerts, and variance detection. It has now been running continuously in production with real financial data for over 10 months.
            </p>
          </div>
        </section>

        {/* How I Think */}
        <section className="space-y-6">
          <h2 className="text-xs font-mono uppercase tracking-wider text-text-subtle">
            How I Think &bull; Engineering Principles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-bg-secondary/40 border border-border-color space-y-3">
              <div className="text-accent-gold font-mono text-xs uppercase font-bold">
                Principle 01
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Build the custom system first. Layer agents on top.
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                An AI agent without a solid database is just a hallucination waiting to corrupt your books. We build custom operational systems from scratch—relational schemas, strict constraints, and role-based permissions—and engineer agentic workflows over that robust foundation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-bg-secondary/40 border border-border-color space-y-3">
              <div className="text-accent-gold font-mono text-xs uppercase font-bold">
                Principle 02
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Data must reconcile to the cent.
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                If an operational system cannot produce a trial balance where debits equal credits to the exact penny, it is not operational software. I design every schema with strict relational integrity constraints and double-entry accounting mechanics.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-bg-secondary/40 border border-border-color space-y-3">
              <div className="text-accent-gold font-mono text-xs uppercase font-bold">
                Principle 03
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Floor reality beats abstract software theory.
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Software must work for the supervisor in work gloves on a dusty factory floor, not just an executive on a pristine laptop. If the interface is awkward to use during a shift change, workers will revert to paper logs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-bg-secondary/40 border border-border-color space-y-3">
              <div className="text-accent-gold font-mono text-xs uppercase font-bold">
                Principle 04
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Zero vendor lock-in. Full client ownership.
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                You own your git repository, your database encryption keys, and your cloud hosting accounts. I work via scoped IAM developer accounts so you can inspect, audit, or transfer the code anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Working Hours & Communication Norms */}
        <section className="p-8 rounded-3xl bg-bg-secondary/40 border border-border-color space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent-gold font-bold">
            <Clock className="w-4 h-4" />
            <span>Working Norms &amp; Communication Commitments</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-text-muted">
            <div className="space-y-2">
              <div className="text-text-primary font-bold">
                Reply Time Commitment:
              </div>
              <p className="text-xs leading-relaxed">
                I reply within <strong>24 hours on business days</strong>. No account managers or ticketing layers; you communicate directly with the engineer building your system.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-text-primary font-bold">
                Weekly Friday Milestone Updates:
              </div>
              <p className="text-xs leading-relaxed">
                Every Friday by 17:00, you receive a concise written report with a working staging demo link, completed milestone deliverables, and any blockers for the upcoming week.
              </p>
            </div>
          </div>
        </section>

        {/* Credentials (Truth Gate Verified) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-text-subtle">
              Verified Credentials &amp; Training
            </h2>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Truth Gate Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-bg-primary border border-border-color space-y-2">
              <div className="text-xs font-mono text-accent-gold font-bold">Computer Science</div>
              <div className="text-base font-bold text-text-primary">Harvard CS50 Verified</div>
              <p className="text-xs text-text-muted">
                Rigorous foundations in C, Python, SQL, algorithms, and memory management.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-bg-primary border border-border-color space-y-2">
              <div className="text-xs font-mono text-accent-gold font-bold">Systems Engineering</div>
              <div className="text-base font-bold text-text-primary">FDE Systems Engineering</div>
              <p className="text-xs text-text-muted">
                Production architecture in Forward Deployed Engineering and deterministic agent pipelines.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-bg-primary border border-border-color space-y-2">
              <div className="text-xs font-mono text-accent-gold font-bold">Financial Engineering</div>
              <div className="text-base font-bold text-text-primary">Double-Entry Ledger Architecture</div>
              <p className="text-xs text-text-muted">
                Mathematical balance assertions, transactional journals, and auditable reconciliations.
              </p>
            </div>
          </div>

          {/* Conditional rendering of Ed Donner credential: strictly hidden if unverified */}
          {isEdProficientVerified && (
            <div className="p-4 rounded-xl bg-bg-primary border border-border-color text-xs text-text-muted">
              Verified Directory Listing: Ed Donner Proficient AI Engineer
            </div>
          )}
        </section>

        {/* CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-bg-secondary border border-border-color flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-text-primary">
              Want to discuss your operations?
            </h3>
            <p className="text-sm text-text-muted">
              Book a 20-minute discovery call to discuss the custom system you need.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-primary !px-6 !py-3 !text-sm whitespace-nowrap flex items-center gap-2"
          >
            <span>Book a 20-minute discovery call</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
