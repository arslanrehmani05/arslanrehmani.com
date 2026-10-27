// app/tools/calculator/page.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calculator,
  Printer,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

export default function ManualWorkCostCalculatorPage() {
  // Visitor inputs (no invented defaults or hidden multipliers)
  const [teamMembers, setTeamMembers] = useState<number>(3);
  const [hoursPerWeekPerPerson, setHoursPerWeekPerPerson] = useState<number>(10);
  const [hourlyLoadedRate, setHourlyLoadedRate] = useState<number>(35); // fully loaded: salary, payroll tax, benefits
  const [weeksPerYear, setWeeksPerYear] = useState<number>(50); // typical working weeks
  const [errorRatePercent, setErrorRatePercent] = useState<number>(3); // percentage of transactions with manual entry slip
  const [transactionsPerWeek, setTransactionsPerWeek] = useState<number>(200);
  const [avgRemediationCost, setAvgRemediationCost] = useState<number>(75); // time & cost to find, fix, and reconcile an error
  const [showFormula, setShowFormula] = useState<boolean>(true);

  // Reset to neutral defaults
  const resetDefaults = () => {
    setTeamMembers(3);
    setHoursPerWeekPerPerson(10);
    setHourlyLoadedRate(35);
    setWeeksPerYear(50);
    setErrorRatePercent(3);
    setTransactionsPerWeek(200);
    setAvgRemediationCost(75);
  };

  // Calculations
  const metrics = useMemo(() => {
    const totalWeeklyHours = teamMembers * hoursPerWeekPerPerson;
    const totalAnnualHours = totalWeeklyHours * weeksPerYear;
    const directLaborCost = totalAnnualHours * hourlyLoadedRate;

    // Errors
    const annualTransactions = transactionsPerWeek * weeksPerYear;
    const annualErrors = (annualTransactions * errorRatePercent) / 100;
    const annualRemediationCost = annualErrors * avgRemediationCost;

    const totalAnnualCost = directLaborCost + annualRemediationCost;

    // Conservative sensitivity ranges (±15% to avoid false precision)
    const lowRange = Math.round(totalAnnualCost * 0.85);
    const highRange = Math.round(totalAnnualCost * 1.15);

    return {
      totalWeeklyHours,
      totalAnnualHours,
      directLaborCost,
      annualTransactions,
      annualErrors: Math.round(annualErrors),
      annualRemediationCost,
      totalAnnualCost,
      lowRange,
      highRange,
    };
  }, [
    teamMembers,
    hoursPerWeekPerPerson,
    hourlyLoadedRate,
    weeksPerYear,
    errorRatePercent,
    transactionsPerWeek,
    avgRemediationCost,
  ]);

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-24 px-6 print:bg-white print:text-black print:p-0">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Navigation & Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted print:hidden">
            <Link href="/tools" className="hover:text-text-primary transition-colors">
              Tools Suite
            </Link>
            <span>/</span>
            <span className="text-text-primary">Manual-Work Cost Calculator</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono text-emerald-400 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Invented Benchmarks &bull; Calculated From Your Inputs Only</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
                Manual-Work Cost Calculator
              </h1>
            </div>

            <div className="flex items-center gap-2 print:hidden">
              <button
                type="button"
                onClick={resetDefaults}
                className="btn-ghost !px-4 !py-2 !text-xs font-mono flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-primary !px-4 !py-2 !text-xs font-mono flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Export PDF</span>
              </button>
            </div>
          </div>

          <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-3xl">
            Evaluate the real annual drag of clerical spreadsheet transcription, manual reconciliations, and copy-paste workflows. Outputs are expressed as honest statistical ranges rather than deceptive single-cent precision.
          </p>
        </div>

        {/* Two Columns: Inputs & Output Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl bg-bg-secondary border border-border-color p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-border-color">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
                  1. Labor & Time Inputs
                </h2>
                <span className="text-xs font-mono text-text-subtle">Adjust sliders or inputs</span>
              </div>

              {/* Input: Team Members */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="text-text-muted font-medium">Team members performing manual data work:</label>
                  <span className="font-mono text-text-primary font-bold">{teamMembers} people</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={teamMembers}
                  onChange={(e) => setTeamMembers(parseInt(e.target.value))}
                  className="w-full accent-accent-gold cursor-pointer"
                />
              </div>

              {/* Input: Hours per Week */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="text-text-muted font-medium">Clerical / transcription hours per person per week:</label>
                  <span className="font-mono text-text-primary font-bold">{hoursPerWeekPerPerson} hrs/wk</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={hoursPerWeekPerPerson}
                  onChange={(e) => setHoursPerWeekPerPerson(parseInt(e.target.value))}
                  className="w-full accent-accent-gold cursor-pointer"
                />
                <span className="text-[11px] text-text-subtle block">
                  Total team time: {metrics.totalWeeklyHours} hours/week spent on non-automated data tasks.
                </span>
              </div>

              {/* Input: Loaded Hourly Rate */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="text-text-muted font-medium">Fully loaded hourly compensation rate ($):</label>
                  <span className="font-mono text-text-primary font-bold">${hourlyLoadedRate}/hr</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="120"
                  step="5"
                  value={hourlyLoadedRate}
                  onChange={(e) => setHourlyLoadedRate(parseInt(e.target.value))}
                  className="w-full accent-accent-gold cursor-pointer"
                />
                <span className="text-[11px] text-text-subtle block">
                  Include base wage, payroll taxes, benefits, and hardware overhead (typically 1.25x base salary).
                </span>
              </div>

              {/* Input: Working Weeks per Year */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="text-text-muted font-medium">Operating weeks per year:</label>
                  <span className="font-mono text-text-primary font-bold">{weeksPerYear} weeks</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="52"
                  step="1"
                  value={weeksPerYear}
                  onChange={(e) => setWeeksPerYear(parseInt(e.target.value))}
                  className="w-full accent-accent-gold cursor-pointer"
                />
              </div>
            </div>

            {/* Error & Remediation Card */}
            <div className="rounded-2xl bg-bg-secondary border border-border-color p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-border-color">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
                  2. Error Risk & Remediation Costs
                </h2>
                <span className="text-xs font-mono text-text-subtle">Human slip variance</span>
              </div>

              {/* Input: Transactions Per Week */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="text-text-muted font-medium">Weekly transactions / rows handled manually:</label>
                  <span className="font-mono text-text-primary font-bold">{transactionsPerWeek} items</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="2000"
                  step="10"
                  value={transactionsPerWeek}
                  onChange={(e) => setTransactionsPerWeek(parseInt(e.target.value))}
                  className="w-full accent-accent-gold cursor-pointer"
                />
              </div>

              {/* Input: Error Rate % */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="text-text-muted font-medium">Estimated clerical error rate (%):</label>
                  <span className="font-mono text-text-primary font-bold">{errorRatePercent}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="10.0"
                  step="0.5"
                  value={errorRatePercent}
                  onChange={(e) => setErrorRatePercent(parseFloat(e.target.value))}
                  className="w-full accent-accent-gold cursor-pointer"
                />
                <span className="text-[11px] text-text-subtle block">
                  Industry literature (Panko, Univ. of Hawaii) estimates 1%–5% cell error rate in unvalidated workbooks.
                </span>
              </div>

              {/* Input: Cost Per Error Remediation */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="text-text-muted font-medium">Cost to identify, trace, and correct an error ($):</label>
                  <span className="font-mono text-text-primary font-bold">${avgRemediationCost}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="5"
                  value={avgRemediationCost}
                  onChange={(e) => setAvgRemediationCost(parseInt(e.target.value))}
                  className="w-full accent-accent-gold cursor-pointer"
                />
                <span className="text-[11px] text-text-subtle block">
                  Includes supervisor time, customer inquiries, credit notes, and ledger restatement hours.
                </span>
              </div>
            </div>

            {/* Formula & Assumptions Disclosure */}
            <div className="rounded-2xl bg-bg-secondary border border-border-color p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  Transparent Formula & Assumptions
                </span>
                <button
                  type="button"
                  onClick={() => setShowFormula(!showFormula)}
                  className="text-xs font-mono text-text-muted hover:text-text-primary flex items-center gap-1"
                >
                  <span>{showFormula ? 'Hide Formula' : 'Show Formula'}</span>
                  {showFormula ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {showFormula && (
                <div className="p-4 rounded-xl bg-bg-primary border border-border-color text-xs font-mono text-text-muted space-y-2">
                  <div className="text-text-primary font-semibold">Underlying Mathematical Model:</div>
                  <div>Direct Labor = (Team × Hours/Wk × Weeks) × Loaded_Rate</div>
                  <div>Remediation Cost = (Transactions/Wk × Weeks × Error_Rate) × Remediation_Rate</div>
                  <div>Estimated Total = Direct Labor + Remediation Cost</div>
                  <div>Sensitivity Range = Total × [0.85 .. 1.15] (reflecting ±15% operational uncertainty)</div>
                  <div className="text-[11px] text-text-subtle pt-1 border-t border-border-color">
                    As of: October 2026. No hidden assumptions or artificial inflation multipliers.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Output Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-24 rounded-2xl bg-bg-secondary border border-border-color p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Annual Operational Drag Estimate</span>
                </div>
                <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                  Estimated Annual Cost
                </h3>
              </div>

              {/* Range Display */}
              <div className="p-6 rounded-2xl bg-bg-primary border border-border-color space-y-2">
                <div className="text-xs font-mono text-text-subtle uppercase">Range (±15% variance):</div>
                <div className="text-3xl sm:text-4xl font-bold font-mono text-text-primary">
                  ${metrics.lowRange.toLocaleString()} – ${metrics.highRange.toLocaleString()}
                </div>
                <div className="text-xs font-mono text-emerald-400">
                  Midpoint estimate: ${Math.round(metrics.totalAnnualCost).toLocaleString()} / year
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-3 pt-2 text-xs font-mono">
                <div className="flex justify-between py-2 border-b border-border-color">
                  <span className="text-text-muted">Total Manual Time:</span>
                  <span className="text-text-primary font-semibold">{metrics.totalAnnualHours} hrs / yr</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-color">
                  <span className="text-text-muted">Direct Labor Expenditure:</span>
                  <span className="text-text-primary font-semibold">${Math.round(metrics.directLaborCost).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-color">
                  <span className="text-text-muted">Expected Annual Errors:</span>
                  <span className="text-amber-400 font-semibold">{metrics.annualErrors} incidents</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-color">
                  <span className="text-text-muted">Error Remediation Drag:</span>
                  <span className="text-amber-400 font-semibold">${Math.round(metrics.annualRemediationCost).toLocaleString()}</span>
                </div>
              </div>

              {/* Context Note */}
              <div className="p-4 rounded-xl bg-bg-primary/60 border border-border-color text-xs text-text-muted leading-relaxed">
                <strong className="text-text-primary block mb-1">What this represents:</strong>
                This is not just lost money; it is operational latency. Every hour spent cross-referencing paper logs or copy-pasting numbers between spreadsheets is an hour delayed in shipping orders, invoicing clients, or closing the monthly books.
              </div>

              {/* Conversion CTA */}
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="btn-primary w-full !py-3 !text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Book a 20-minute discovery call</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] text-text-subtle text-center block mt-2 font-mono">
                  No pitch decks &bull; Direct conversation with Arslan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
