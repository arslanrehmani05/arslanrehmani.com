// components/how-i-work.tsx
import { Search, FileText, Code2, CheckCheck, ShieldCheck } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery',
    description: 'A 20-minute operational review where we map how data moves through your business today: which spreadsheets exist, who touches them, and where numbers go missing.',
    outcome: 'Written bottleneck map with identified failure points.',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Written Scope',
    description: 'Before writing a line of code, we agree in writing on the exact workflows, user permissions, calculations, and acceptance criteria.',
    outcome: 'Fixed scope and deliverables with zero ambiguous hours or surprise bills.',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Staged Build',
    description: 'The system is built in weekly milestones against real, sanitized sample data in an isolated staging environment. You click through working software every Friday.',
    outcome: 'Functional, visible software progress each week.',
  },
  {
    number: '04',
    icon: CheckCheck,
    title: 'Review & Rehearsal',
    description: 'We run dry runs against historical transactions. We test that numbers reconcile to the cent, that non-admin roles cannot view restricted data, and that staff know exactly where to click.',
    outcome: '100% reconciliation pass against past accounting close.',
  },
  {
    number: '05',
    icon: ShieldCheck,
    title: 'Handover & Care',
    description: 'All repository code, cloud account credentials, and database keys are transferred directly to your organization. Scheduled monthly restore drills keep the system recoverable.',
    outcome: 'Full client ownership, zero vendor lock-in.',
  },
];

export default function HowIWork() {
  return (
    <section className="py-24 md:py-32 border-b border-border-color bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl space-y-3 mb-16">
          <div className="text-xs uppercase font-mono tracking-wider text-text-subtle">
            Methodology &bull; How I Work
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Five disciplined steps from messy spreadsheets to a verified system.
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            I don&apos;t build open-ended prototypes. Every engagement follows a fixed path from written scope to audited handover.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="p-6 rounded-2xl bg-bg-secondary/40 border border-border-color flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-accent-gold font-bold">
                      Step {step.number}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-bg-primary border border-border-color flex items-center justify-center text-text-primary">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-text-primary">
                    {step.title}
                  </h3>

                  <p className="text-xs text-text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border-color/60">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-text-subtle">
                    Deliverable
                  </div>
                  <div className="text-xs text-text-primary font-medium mt-0.5">
                    {step.outcome}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
