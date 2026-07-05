// app/tools/calculator/page.tsx
'use client';

import { useState } from 'react';

export default function CalculatorPage() {
  const [headcount, setHeadcount] = useState('');
  const [manualHours, setManualHours] = useState('');
  const [averageSalary, setAverageSalary] = useState('');
  const [email, setEmail] = useState('');

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [report, setReport] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          headcount: parseFloat(headcount),
          manualHours: parseFloat(manualHours),
          averageSalary: parseFloat(averageSalary),
          email,
        }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setReport(resData.report);
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-bg-primary pt-36 pb-20">
      <div className="max-w-3xl mx-auto px-6 w-full">
        
        {/* Header */}
        <div className="flex flex-col gap-4 mb-12 text-left">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent-gold">
            Financial Analysis
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary leading-tight">
            Automation ROI Calculator
          </h1>
          <p className="text-base text-text-muted">
            Determine the direct financial return of automating manual administrative loops within your organization.
          </p>
        </div>

        {/* Form or Calculation Output */}
        <div className="bg-bg-secondary border border-border-color p-8 rounded-3xl">
          {status === 'success' && report ? (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center pb-6 border-b border-border-color">
                <span className="text-xs font-semibold tracking-widest uppercase text-accent-gold block mb-2">
                  Projected Return
                </span>
                <span className="text-5xl md:text-6xl font-black text-accent-gold tracking-tighter block">
                  ${report.annualSavings?.toLocaleString()}
                </span>
                <span className="text-sm font-semibold text-text-primary uppercase tracking-wider block mt-2">
                  Net Annual Savings
                </span>
              </div>

              {/* Financial comparison cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-bg-primary/50 border border-border-color p-6 rounded-2xl">
                  <span className="text-xs text-text-subtle font-bold uppercase tracking-wider block mb-1">
                    Current Cost
                  </span>
                  <span className="text-2xl font-bold text-text-primary">
                    ${report.currentAnnualCost?.toLocaleString()}/yr
                  </span>
                  <p className="text-xs text-text-muted mt-2 leading-relaxed">
                    Based on manual hours wasted across affected headcount.
                  </p>
                </div>
                <div className="bg-bg-primary/50 border border-border-color p-6 rounded-2xl">
                  <span className="text-xs text-text-subtle font-bold uppercase tracking-wider block mb-1">
                    Automated Cost
                  </span>
                  <span className="text-2xl font-bold text-accent-gold">
                    ${report.automatedAnnualCost?.toLocaleString()}/yr
                  </span>
                  <p className="text-xs text-text-muted mt-2 leading-relaxed">
                    Includes systems subscription overhead and maintenance.
                  </p>
                </div>
              </div>

              {/* Return Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-border-color/60">
                <div className="text-center">
                  <span className="text-2xl font-bold text-accent-gold block">
                    {report.paybackPeriod}
                  </span>
                  <span className="text-[10px] text-text-primary font-bold uppercase tracking-widest block mt-1">
                    Payback Period
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-accent-gold block">
                    {report.roiPercent}%
                  </span>
                  <span className="text-[10px] text-text-primary font-bold uppercase tracking-widest block mt-1">
                    Year 1 ROI
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-accent-gold block">
                    ${report.devInvestment?.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-text-primary font-bold uppercase tracking-widest block mt-1">
                    Setup Investment
                  </span>
                </div>
              </div>

              <div className="text-center pt-6 border-t border-border-color">
                <button
                  onClick={() => {
                    setStatus('idle');
                    setReport(null);
                  }}
                  className="bg-accent-gold hover:bg-accent-gold-hover text-bg-primary font-bold text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-gold"
                  style={{ minHeight: '44px' }}
                >
                  Calculate Again
                </button>
              </div>

            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Headcount */}
              <div className="flex flex-col gap-2">
                <label htmlFor="headcount" className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  Affected Headcount (Number of people doing this workflow)
                </label>
                <input
                  type="number"
                  id="headcount"
                  required
                  min="1"
                  placeholder="e.g. 3"
                  value={headcount}
                  onChange={(e) => setHeadcount(e.target.value)}
                  className="bg-bg-primary border border-border-color text-text-primary text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-accent-gold transition-gold"
                  style={{ minHeight: '44px' }}
                />
              </div>

              {/* Manual Hours */}
              <div className="flex flex-col gap-2">
                <label htmlFor="manualHours" className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  Manual Hours Wasted Per Person Per Week
                </label>
                <input
                  type="number"
                  id="manualHours"
                  required
                  min="1"
                  placeholder="e.g. 10"
                  value={manualHours}
                  onChange={(e) => setManualHours(e.target.value)}
                  className="bg-bg-primary border border-border-color text-text-primary text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-accent-gold transition-gold"
                  style={{ minHeight: '44px' }}
                />
              </div>

              {/* Average Salary */}
              <div className="flex flex-col gap-2">
                <label htmlFor="averageSalary" className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  Average Annual Salary Per Person ($)
                </label>
                <input
                  type="number"
                  id="averageSalary"
                  required
                  min="5000"
                  placeholder="e.g. 60000"
                  value={averageSalary}
                  onChange={(e) => setAverageSalary(e.target.value)}
                  className="bg-bg-primary border border-border-color text-text-primary text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-accent-gold transition-gold"
                  style={{ minHeight: '44px' }}
                />
              </div>

              {/* Email Delivery Capture */}
              <div className="flex flex-col gap-2 pt-6 border-t border-border-color/60">
                <label htmlFor="lead-email" className="text-xs font-bold text-accent-gold uppercase tracking-wider">
                  Submit email to calculate calculations
                </label>
                <input
                  type="email"
                  id="lead-email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-bg-primary border border-border-color text-text-primary text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-accent-gold transition-gold"
                  style={{ minHeight: '44px' }}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-accent-gold hover:bg-accent-gold-hover text-bg-primary font-bold text-sm tracking-wide uppercase py-4 rounded-full transition-gold disabled:opacity-50"
                  style={{ minHeight: '44px' }}
                >
                  {status === 'loading' ? 'Calculating...' : 'Calculate ROI'}
                </button>
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm font-medium text-center">
                  ✕ An error occurred. Please verify your entries and try again.
                </p>
              )}

            </form>
          )}
        </div>

      </div>
    </main>
  );
}
