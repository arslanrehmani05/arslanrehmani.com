// components/diagnostics/roi-calculator.tsx
'use client';

import { useState, useMemo } from 'react';
import { calculateRoi, CostBracket, COST_BRACKET_LABELS } from '@/lib/calculators/roi';
import { INDUSTRY_CONTEXTS, IndustryType } from '@/lib/calculators/industry-context';
import { Download, RefreshCw, Calculator, ShieldCheck, Check } from 'lucide-react';

export default function DiagnosticsRoiCalculator() {
  const [teamMembers, setTeamMembers] = useState(3);
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  const [costBracket, setCostBracket] = useState<CostBracket>('60_80k');
  const [industry, setIndustry] = useState<IndustryType>('manufacturing');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Live pure calculation updates on slider drag
  const results = useMemo(() => {
    return calculateRoi({ teamMembers, hoursPerWeek, costBracket });
  }, [teamMembers, hoursPerWeek, costBracket]);

  const handleDownloadPdf = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamMembers,
          hoursPerWeek,
          costBracket,
          industry,
          email: email.trim(),
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ROI-Operational-Breakdown-${industry}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setDownloadSuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-bg-secondary border border-border-color rounded-2xl p-8 md:p-12 space-y-10">
      {/* Header */}
      <div>
        <span className="eyebrow mb-2">Interactive Utility</span>
        <h2 className="headline text-2xl md:text-4xl text-text-primary">
          Operational ROI & Savings Calculator
        </h2>
        <p className="text-sm text-text-muted mt-2">
          Adjust the sliders below to calculate your current annual manual cost, projected post-automation savings, and estimated payback period in real time.
        </p>
      </div>

      {/* Live Pre-Calculated Animating Example Card (Non-Form Payoff) */}
      <div className="bg-bg-primary border border-border-gold/40 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <p className="text-xs text-text-muted leading-relaxed">
            <strong className="text-text-primary">Live Calculated Benchmark:</strong> A team of {teamMembers} people spending {hoursPerWeek} hrs/week on manual work currently loses <span className="text-accent-gold font-bold font-sans">${results.currentAnnualCost.toLocaleString()} / year</span>.
          </p>
        </div>
        <span className="text-xs font-mono text-accent-gold font-bold shrink-0">
          Payback: ~{results.paybackPeriodMonths} Months
        </span>
      </div>

      {/* Interactive Slider & Card Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Slider 1: Team Members */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-semibold text-text-primary">
              <label htmlFor="roi-team-slider">Team members doing manual updates:</label>
              <span className="text-lg font-bold text-accent-gold font-sans">{teamMembers} people</span>
            </div>
            <input
              id="roi-team-slider"
              type="range"
              min={1}
              max={20}
              step={1}
              value={teamMembers}
              onChange={(e) => setTeamMembers(Number(e.target.value))}
              className="w-full h-2 bg-bg-primary rounded-lg appearance-none cursor-pointer accent-accent-gold"
            />
          </div>

          {/* Slider 2: Hours per Week */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-semibold text-text-primary">
              <label htmlFor="roi-hours-slider">Hours per week spent per person:</label>
              <span className="text-lg font-bold text-accent-gold font-sans">{hoursPerWeek} hrs/week</span>
            </div>
            <input
              id="roi-hours-slider"
              type="range"
              min={1}
              max={40}
              step={1}
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="w-full h-2 bg-bg-primary rounded-lg appearance-none cursor-pointer accent-accent-gold"
            />
          </div>

          {/* Visual Cards: Salary Cost Bracket */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-text-primary block">
              Average Team Compensation Bracket:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {(Object.keys(COST_BRACKET_LABELS) as CostBracket[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCostBracket(key)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    costBracket === key
                      ? 'bg-accent-gold-dim border-border-gold text-accent-gold font-bold'
                      : 'bg-bg-primary border-border-color text-text-muted hover:border-border-gold'
                  }`}
                >
                  <span className="text-xs block font-mono">{COST_BRACKET_LABELS[key]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Display (5 cols) */}
        <div className="lg:col-span-5 bg-bg-primary border border-border-color rounded-xl p-6 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs font-mono text-text-subtle uppercase block mb-1">
              Live Projected Savings
            </span>
            <span className="text-4xl font-black font-sans text-accent-gold block">
              ${results.annualSavings.toLocaleString()}
            </span>
            <span className="text-xs text-text-muted mt-1 block">
              Estimated annual overhead eliminated
            </span>
          </div>

          <div className="space-y-3 pt-4 border-t border-border-color text-xs text-text-muted">
            <div className="flex justify-between">
              <span>Current Annual Cost:</span>
              <span className="font-mono text-text-primary font-bold">${results.currentAnnualCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Post-Automation Cost:</span>
              <span className="font-mono text-text-primary font-bold">${results.automatedAnnualCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Hourly Rate:</span>
              <span className="font-mono text-text-primary">${results.hourlyRate}/hr</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border-color/60 text-accent-gold font-bold">
              <span>Payback Period:</span>
              <span className="font-mono">~{results.paybackPeriodMonths} Months</span>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Download Gate Section */}
      <div className="pt-8 border-t border-border-color max-w-2xl">
        <h3 className="text-base font-bold text-text-primary mb-2">
          Get Your Industry PDF Breakdown
        </h3>
        <p className="text-xs text-text-muted mb-4">
          Select your industry to generate an executive PDF breakdown with sector-specific commentary and automation targets.
        </p>

        {downloadSuccess ? (
          <div className="p-4 bg-accent-gold-dim border border-border-gold rounded-xl flex items-center gap-3 text-xs text-accent-gold">
            <Check className="w-5 h-5 shrink-0" />
            <span>PDF Downloaded successfully. Want to discuss implementing these savings? <a href="/contact" className="underline font-bold">Book a call →</a></span>
          </div>
        ) : (
          <form onSubmit={handleDownloadPdf} className="flex flex-col sm:flex-row gap-3">
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value as IndustryType)}
              className="bg-bg-primary border border-border-color rounded-xl px-3.5 py-3 text-xs text-text-primary focus:border-accent-gold focus:outline-none"
            >
              {(Object.keys(INDUSTRY_CONTEXTS) as IndustryType[]).map((indKey) => (
                <option key={indKey} value={indKey}>
                  {INDUSTRY_CONTEXTS[indKey].label}
                </option>
              ))}
            </select>

            <input
              type="email"
              required
              placeholder="work.email@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-bg-primary border border-border-color rounded-xl px-4 py-3 text-xs text-text-primary focus:border-accent-gold focus:outline-none"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary !px-6 !py-3 !text-xs shrink-0 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? 'Generating...' : 'Download PDF'}
              <Download className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
