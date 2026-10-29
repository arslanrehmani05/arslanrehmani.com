'use client';

import DiagnosticsRoiCalculator from '@/components/diagnostics/roi-calculator';
import PipelineMiniDemo from '@/components/pipeline-mini-demo';
import OperationalScan from '@/components/operational-scan';
import FinalCta from '@/components/final-cta';

export default function ToolsPage() {
  return (
    <div className="py-12 md:py-16 space-y-16">
      <div className="max-w-6xl mx-auto px-6 space-y-4">
        <span className="eyebrow">Interactive Diagnostic Suite</span>
        <h1 className="headline text-4xl sm:text-5xl text-text-primary">
          Software & Automation Diagnostic Tools
        </h1>
        <p className="text-base text-text-muted max-w-2xl leading-relaxed">
          Before writing a single line of production code, evaluate your systems through live, deterministic calculation models.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 space-y-16">
        <div className="space-y-6">
          <div className="border-b border-border-color pb-3">
            <h2 className="headline text-2xl text-text-primary">01. The Deterministic Staging Pipeline</h2>
            <p className="text-xs text-text-muted mt-1">Interactive demonstration of isolated buffering and rule gate verification.</p>
          </div>
          <PipelineMiniDemo />
        </div>

        <div className="space-y-6">
          <div className="border-b border-border-color pb-3">
            <h2 className="headline text-2xl text-text-primary">02. Operational ROI & Savings Calculator</h2>
            <p className="text-xs text-text-muted mt-1">Calculate annual spreadsheet overhead and automated system payback.</p>
          </div>
          <DiagnosticsRoiCalculator />
        </div>
      </div>

      <OperationalScan />
      <FinalCta />
    </div>
  );
}
