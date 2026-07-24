// app/tools/calculator/page.tsx
'use client';

import { useMemo, useState } from 'react';
import { calculateRoi, COST_BRACKET_LABELS, CostBracket } from '@/lib/calculators/roi';

const inputClasses =
  'w-full bg-bg-secondary border border-border-color rounded-xl px-4 py-3 text-text-primary focus:border-accent-gold focus:outline-none transition-colors duration-200';

const INDUSTRY_OPTIONS: { value: string; label: string }[] = [
  { value: 'ecommerce', label: 'Ecommerce' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'professional_services', label: 'Professional Services' },
  { value: 'logistics', label: 'Logistics' },
  { value: 'retail', label: 'Retail' },
  { value: 'other', label: 'Other' },
];

export default function CalculatorPage() {
  const [teamMembers, setTeamMembers] = useState('3');
  const [hoursPerWeek, setHoursPerWeek] = useState('10');
  const [costBracket, setCostBracket] = useState<CostBracket>('60_80k');

  const [showGate, setShowGate] = useState(false);
  const [industry, setIndustry] = useState('ecommerce');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const results = useMemo(() => {
    const tm = parseFloat(teamMembers);
    const hpw = parseFloat(hoursPerWeek);
    if (!Number.isFinite(tm) || tm < 1 || !Number.isFinite(hpw) || hpw < 0) {
      return null;
    }
    return calculateRoi({ teamMembers: tm, hoursPerWeek: hpw, costBracket });
  }, [teamMembers, hoursPerWeek, costBracket]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!results) return;
    setStatus('loading');

    try {
      const response = await fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamMembers: parseFloat(teamMembers),
          hoursPerWeek: parseFloat(hoursPerWeek),
          costBracket,
          industry,
          email,
        }),
      });

      if (!response.ok) {
        setStatus('error');
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'roi-calculator-report.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <main className="bg-bg-primary">
      <div className="max-w-3xl mx-auto px-6 pt-36 pb-20 w-full">
        <span className="eyebrow mb-5">Insights</span>
        <h1 className="headline text-3xl md:text-5xl leading-[1.1]">ROI Calculator</h1>
        <p className="text-base text-text-muted leading-relaxed mt-4">
          Team size, hours, and pay range in — the annual cost of your manual workflow, and what
          automating it would save, out.
        </p>

        <div className="bg-bg-secondary border border-border-color p-8 rounded-2xl mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="teamMembers" className="text-sm text-text-muted">
                Team members on manual work
              </label>
              <input
                type="number"
                id="teamMembers"
                min="1"
                step="1"
                value={teamMembers}
                onChange={(e) => setTeamMembers(e.target.value)}
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="hoursPerWeek" className="text-sm text-text-muted">
                Hours/week per person
              </label>
              <input
                type="number"
                id="hoursPerWeek"
                min="0"
                step="1"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(e.target.value)}
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="costBracket" className="text-sm text-text-muted">
                Cost bracket
              </label>
              <select
                id="costBracket"
                value={costBracket}
                onChange={(e) => setCostBracket(e.target.value as CostBracket)}
                className={inputClasses}
              >
                {Object.entries(COST_BRACKET_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {results ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 pt-8 border-t border-border-color">
              <div>
                <span className="block text-xs text-text-subtle uppercase tracking-wider mb-1">
                  Current annual cost
                </span>
                <span className="font-serif text-2xl text-text-primary">
                  ${results.currentAnnualCost.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="block text-xs text-text-subtle uppercase tracking-wider mb-1">
                  Projected cost after automation
                </span>
                <span className="font-serif text-2xl text-text-primary">
                  ${results.automatedAnnualCost.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="block text-xs text-text-subtle uppercase tracking-wider mb-1">
                  Annual savings
                </span>
                <span className="font-serif text-3xl text-accent-gold">
                  ${results.annualSavings.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="block text-xs text-text-subtle uppercase tracking-wider mb-1">
                  Payback period
                </span>
                <span className="font-serif text-2xl text-text-primary">
                  {results.paybackPeriodMonths > 0 ? `${results.paybackPeriodMonths} months` : '—'}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-text-subtle mt-10 pt-8 border-t border-border-color">
              Enter a team size of at least 1 and a valid hours/week to see your numbers.
            </p>
          )}

          {results && !showGate && status !== 'success' && (
            <div className="mt-8">
              <button onClick={() => setShowGate(true)} className="btn-primary">
                Get my PDF breakdown
              </button>
            </div>
          )}

          {results && showGate && status !== 'success' && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-8 pt-8 border-t border-border-color">
              <div className="flex flex-col gap-2">
                <label htmlFor="industry" className="text-sm text-text-muted">
                  Industry
                </label>
                <select
                  id="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className={inputClasses}
                >
                  {INDUSTRY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm text-text-muted">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClasses}
                />
              </div>

              <button type="submit" disabled={status === 'loading'} className="btn-primary disabled:opacity-50">
                {status === 'loading' ? 'Generating' : 'Download my PDF breakdown'}
              </button>

              {status === 'error' && (
                <p className="text-sm text-text-muted text-center">
                  Something went wrong generating your PDF. Try again.
                </p>
              )}
            </form>
          )}

          {status === 'success' && (
            <div className="mt-8 pt-8 border-t border-border-color text-center">
              <p className="text-base text-text-primary">Downloaded — want to talk this through?</p>
              <a href="/contact" className="link-gold mt-3 inline-flex">
                Get in touch →
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
