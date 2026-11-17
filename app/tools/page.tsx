import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import DiagnosticsRoiCalculator from '@/components/diagnostics/roi-calculator';
import OperationalScan from '@/components/operational-scan';
import PipelineMiniDemo from '@/components/pipeline-mini-demo';
import FinalCta from '@/components/final-cta';

export const metadata: Metadata = {
  title: 'Tools',
  description:
    'Free tools to measure what manual work costs your business: an operational scan, a cost calculator and quick self-checks.',
  alternates: { canonical: '/tools' },
};

const tools = [
  {
    href: '/tools/calculator',
    name: 'Manual-work cost calculator',
    body: 'Put a yearly figure on the hours your team spends on manual work and fixing its errors.',
  },
  {
    href: '/tools/readiness',
    name: 'Spreadsheet readiness check',
    body: 'Twelve questions that show whether a spreadsheet has outgrown itself.',
  },
  {
    href: '/tools/process-mapper',
    name: 'Process mapper',
    body: 'Describe one workflow and see where the manual steps and handoffs are.',
  },
  {
    href: '/tools/reconciliation',
    name: 'Reconciliation gap checker',
    body: 'Compare two sets of records and find the lines that do not match.',
  },
  {
    href: '/tools/scanner',
    name: 'Data quality scanner',
    body: 'Paste a CSV and find the blanks, duplicates and bad dates before they reach your books.',
  },
  {
    href: '/tools/decision',
    name: 'Agent or workflow?',
    body: 'A short decision tree: does this task need an AI agent, or a simple rule?',
  },
  {
    href: '/tools/cost-estimator',
    name: 'Agent cost estimator',
    body: 'Estimate what an AI agent costs to run at your volume.',
  },
  {
    href: '/tools/access-audit',
    name: 'Access and backup self-audit',
    body: 'A checklist for who can see your data and whether you could restore it.',
  },
];

export default function ToolsPage() {
  return (
    <div>
      <section className="pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="eyebrow mb-4">Tools</span>
            <h1 className="headline text-4xl sm:text-5xl">Measure the problem before you pay to fix it.</h1>
            <p className="text-base md:text-lg text-text-muted leading-relaxed mt-6">
              Free tools that put a number on manual work. Use them on your own business, with your
              own figures.
            </p>
          </div>
        </div>
      </section>

      <OperationalScan />

      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-10">
            <h2 className="headline text-3xl sm:text-4xl">What is manual work costing you each year?</h2>
          </div>
          <DiagnosticsRoiCalculator />
        </div>
      </section>

      <section className="py-20 md:py-28 border-t border-border-color">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow mb-4">Self-checks</span>
            <h2 className="headline text-3xl sm:text-4xl">Quick checks you can run yourself.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-2xl bg-bg-secondary border border-border-color hover:border-border-gold transition-colors p-6 flex flex-col"
              >
                <h3 className="text-base font-medium text-text-primary">{tool.name}</h3>
                <p className="text-sm text-text-muted leading-relaxed mt-3 flex-grow">{tool.body}</p>
                <span className="inline-flex items-center gap-2 text-sm text-text-primary mt-6">
                  <span>Open</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 border-t border-border-color">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-10">
            <span className="eyebrow mb-4">How an agent is kept safe</span>
            <h2 className="headline text-3xl sm:text-4xl">Nothing an AI reads reaches your books unchecked.</h2>
            <p className="text-base text-text-muted leading-relaxed mt-4">
              Step through what happens to one document, from the moment it arrives to the moment
              it is recorded.
            </p>
          </div>
          <PipelineMiniDemo />
        </div>
      </section>

      <FinalCta />
    </div>
  );
}
