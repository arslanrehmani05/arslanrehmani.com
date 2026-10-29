import Link from 'next/link';
import { ArrowRight, Code, Database, Brain, Cpu, CheckCircle2 } from 'lucide-react';
import FinalCta from '@/components/final-cta';

export const metadata = {
  title: 'About Arslan Rehmani | Forward-Deployed Systems Builder',
  description: 'The engineer who replaced an entire textile mill accounting floor with custom software and deterministic agentic systems.',
};

export default function AboutPage() {
  return (
    <div className="py-12 md:py-16 space-y-16">
      <div className="max-w-4xl mx-auto px-6 space-y-6">
        <span className="eyebrow">The Engineering Story</span>
        <h1 className="headline text-4xl sm:text-5xl text-text-primary leading-[1.1]">
          I build software because spreadsheets were never meant to run a business.
        </h1>
        <p className="text-lg text-text-muted leading-relaxed">
          I started coding in 9th grade. Last year, I was tasked at my job at a high-volume textile mill to &ldquo;fix the spreadsheets.&rdquo; I knew that spreadsheets could never solve real operational bottlenecks—so I quietly built the software myself.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 space-y-12 text-sm text-text-muted leading-relaxed">
        {/* Narrative Chapter 1 */}
        <div className="space-y-4">
          <h2 className="headline text-2xl text-text-primary">
            01. The Textile Mode Turning Point
          </h2>
          <p>
            The mill was drowning in disconnected paper tickets and Excel spreadsheets across yarn intake, loom scheduling, dyeing lots, and accounting reconciliation. When they asked for better spreadsheets, I delivered the sheets—but without telling anyone, I built custom software solving a single department.
          </p>
          <p>
            When leadership saw the software eliminate variances in real time, they gave me the green light to build out the full system. In the months that followed, the custom software automated the entire administrative and accounting workflow so thoroughly that the mill was able to transition off their clerical data entry staff entirely, running with zero ledger errors.
          </p>
        </div>

        {/* Narrative Chapter 2: Relentless Technical Foundation */}
        <div className="space-y-4">
          <h2 className="headline text-2xl text-text-primary">
            02. Relentless Technical Rigor
          </h2>
          <p>
            Seeing what real software could achieve on a factory floor ignited an obsessive drive to master every layer of computational systems:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <li className="p-4 rounded-xl bg-bg-secondary/70 border border-border-color space-y-1">
              <span className="font-semibold text-text-primary block">Harvard CS50 Curriculum</span>
              <span className="text-xs text-text-subtle">Completed all 12 CS50 tracks covering algorithms, C memory management, SQL, and systems.</span>
            </li>
            <li className="p-4 rounded-xl bg-bg-secondary/70 border border-border-color space-y-1">
              <span className="font-semibold text-text-primary block">Full-Stack Foundations</span>
              <span className="text-xs text-text-subtle">Dr. Angela Yu&apos;s comprehensive Python and Web Development bootcamps.</span>
            </li>
            <li className="p-4 rounded-xl bg-bg-secondary/70 border border-border-color space-y-1">
              <span className="font-semibold text-text-primary block">Database Architecture</span>
              <span className="text-xs text-text-subtle">Deep specialization in PostgreSQL, Supabase real-time schemas, relational constraints, and ACID transactions.</span>
            </li>
            <li className="p-4 rounded-xl bg-bg-secondary/70 border border-border-color space-y-1">
              <span className="font-semibold text-text-primary block">Agentic Systems Mastery</span>
              <span className="text-xs text-text-subtle">All 7 Ed Donner engineering tracks and Carnegie Mellon University (CMU) AI Agents architecture under Prof. Graham Neubig.</span>
            </li>
          </ul>
        </div>

        {/* Narrative Chapter 3: Today's Mission */}
        <div className="space-y-4">
          <h2 className="headline text-2xl text-text-primary">
            03. Forward-Deployed Systems Architecture
          </h2>
          <p>
            Today, I operate as an independent systems builder for high-stakes businesses across manufacturing, multi-channel commerce, freight logistics, and professional services.
          </p>
          <p>
            I embed directly with operators, dissect their highest-drag bottleneck, and build deterministic software and autonomous agents that free capital, eliminate human error, and run reliably in production.
          </p>
        </div>
      </div>

      <FinalCta />
    </div>
  );
}
