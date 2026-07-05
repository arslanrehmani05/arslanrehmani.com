// app/tools/audit/page.tsx
'use client';

import { useState } from 'react';

export default function AuditPage() {
  const [answers, setAnswers] = useState({
    teamSize: '',
    reportingHours: '',
    disconnectedTools: '',
    excelInventory: 'no',
    performanceCompilation: '',
    supportKb: 'no',
    onboardingTime: '',
    socialMediaManual: 'yes',
    reconcillationMethod: '',
    biggestTimeSink: '',
  });

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [report, setReport] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, email }),
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
            Diagnostic Tool
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary leading-tight">
            AI Readiness Audit
          </h1>
          <p className="text-base text-text-muted">
            Complete the 10 operational parameters below to map manual processes and receive an automated efficiency report.
          </p>
        </div>

        {/* Audit Form or Report Display */}
        <div className="bg-bg-secondary border border-border-color p-8 rounded-3xl">
          {status === 'success' && report ? (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center pb-6 border-b border-border-color">
                <span className="text-xs font-semibold tracking-widest uppercase text-accent-gold block mb-2">
                  Analysis Complete
                </span>
                <span className="text-6xl font-black text-accent-gold tracking-tighter block">
                  {report.score}/100
                </span>
                <span className="text-sm font-semibold text-text-primary uppercase tracking-wider block mt-2">
                  Efficiency Rating
                </span>
                <p className="text-sm text-text-muted max-w-md mx-auto mt-4 leading-relaxed">
                  {report.summary}
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-bg-primary/50 border border-border-color p-6 rounded-2xl text-center">
                  <span className="text-3xl font-black text-accent-gold block">
                    {report.metrics?.hoursWastedPerYear} hrs
                  </span>
                  <span className="text-xs text-text-primary font-bold uppercase tracking-wider block mt-1">
                    Wasted Yearly
                  </span>
                  <span className="text-[10px] text-text-subtle block">
                    On manual spreadsheet updates
                  </span>
                </div>
                <div className="bg-bg-primary/50 border border-border-color p-6 rounded-2xl text-center">
                  <span className="text-3xl font-black text-accent-gold block">
                    {report.metrics?.potentialSavings}
                  </span>
                  <span className="text-xs text-text-primary font-bold uppercase tracking-wider block mt-1">
                    Potential Savings
                  </span>
                  <span className="text-[10px] text-text-subtle block">
                    Estimated annual labor saved
                  </span>
                </div>
              </div>

              {/* Identified Bottlenecks */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-accent-gold uppercase tracking-widest">
                  Identified Bottlenecks
                </h4>
                <ul className="space-y-2">
                  {report.bottlenecks?.map((bottleneck: string, idx: number) => (
                    <li key={idx} className="text-sm text-text-muted flex items-start gap-2.5 leading-relaxed">
                      <span className="text-accent-gold mt-1">•</span>
                      <span>{bottleneck}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Strategic Recommendations */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-accent-gold uppercase tracking-widest">
                  Strategic Action Plan
                </h4>
                <ol className="space-y-3">
                  {report.recommendations?.map((rec: string, idx: number) => (
                    <li key={idx} className="text-sm text-text-muted flex items-start gap-3 bg-bg-primary/30 p-4 rounded-xl border border-border-color/50 leading-relaxed">
                      <span className="font-bold text-accent-gold text-base">{idx + 1}.</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ol>
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
                  Run Audit Again
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Question 1: Team Size */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  1. Current team size handling operations
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 4"
                  value={answers.teamSize}
                  onChange={(e) => setAnswers({ ...answers, teamSize: e.target.value })}
                  className="bg-bg-primary border border-border-color text-text-primary text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-accent-gold transition-gold"
                  style={{ minHeight: '44px' }}
                />
              </div>

              {/* Question 2: Reporting Hours */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  2. Hours per week spent on manual reporting
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 15"
                  value={answers.reportingHours}
                  onChange={(e) => setAnswers({ ...answers, reportingHours: e.target.value })}
                  className="bg-bg-primary border border-border-color text-text-primary text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-accent-gold transition-gold"
                  style={{ minHeight: '44px' }}
                />
              </div>

              {/* Question 3: Disconnected Tools */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  3. Number of disconnected tools/dashboards currently in use
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 6"
                  value={answers.disconnectedTools}
                  onChange={(e) => setAnswers({ ...answers, disconnectedTools: e.target.value })}
                  className="bg-bg-primary border border-border-color text-text-primary text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-accent-gold transition-gold"
                  style={{ minHeight: '44px' }}
                />
              </div>

              {/* Question 4: Spreadsheets Inventory */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  4. Is inventory or production scheduling tracked in spreadsheets?
                </label>
                <select
                  value={answers.excelInventory}
                  onChange={(e) => setAnswers({ ...answers, excelInventory: e.target.value })}
                  className="bg-bg-primary border border-border-color text-text-primary text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-accent-gold transition-gold"
                  style={{ minHeight: '44px' }}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Question 5: Performance Data */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  5. How is daily performance data compiled?
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Copy-pasted from multiple dashboards into Excel"
                  value={answers.performanceCompilation}
                  onChange={(e) => setAnswers({ ...answers, performanceCompilation: e.target.value })}
                  className="bg-bg-primary border border-border-color text-text-primary text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-accent-gold transition-gold"
                  style={{ minHeight: '44px' }}
                />
              </div>

              {/* Question 6: Support KB */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  6. Does your customer support team use a shared knowledge base?
                </label>
                <select
                  value={answers.supportKb}
                  onChange={(e) => setAnswers({ ...answers, supportKb: e.target.value })}
                  className="bg-bg-primary border border-border-color text-text-primary text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-accent-gold transition-gold"
                  style={{ minHeight: '44px' }}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Question 7: Staff Onboarding */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  7. Average onboarding time for new operational staff
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2 weeks"
                  value={answers.onboardingTime}
                  onChange={(e) => setAnswers({ ...answers, onboardingTime: e.target.value })}
                  className="bg-bg-primary border border-border-color text-text-primary text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-accent-gold transition-gold"
                  style={{ minHeight: '44px' }}
                />
              </div>

              {/* Question 8: Social Media posting */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  8. Is social media posting and community monitoring manual?
                </label>
                <select
                  value={answers.socialMediaManual}
                  onChange={(e) => setAnswers({ ...answers, socialMediaManual: e.target.value })}
                  className="bg-bg-primary border border-border-color text-text-primary text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-accent-gold transition-gold"
                  style={{ minHeight: '44px' }}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Question 9: Reconciliation Method */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  9. How is financial reconciliation done?
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Manual matching of invoice sheets with bank statements"
                  value={answers.reconcillationMethod}
                  onChange={(e) => setAnswers({ ...answers, reconcillationMethod: e.target.value })}
                  className="bg-bg-primary border border-border-color text-text-primary text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-accent-gold transition-gold"
                  style={{ minHeight: '44px' }}
                />
              </div>

              {/* Question 10: Biggest operational time sink */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  10. What is your biggest operational time sink?
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Resolving discrepancies between delivery receipts and orders"
                  value={answers.biggestTimeSink}
                  onChange={(e) => setAnswers({ ...answers, biggestTimeSink: e.target.value })}
                  className="bg-bg-primary border border-border-color text-text-primary text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-accent-gold transition-gold"
                  style={{ minHeight: '44px' }}
                />
              </div>

              {/* Lead Email for Delivery */}
              <div className="flex flex-col gap-2 pt-6 border-t border-border-color/60">
                <label htmlFor="lead-email" className="text-xs font-bold text-accent-gold uppercase tracking-wider">
                  Submit email to receive custom report
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
                  {status === 'loading' ? 'Generating Report...' : 'Submit Audit Details'}
                </button>
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm font-medium text-center">
                  ✕ An error occurred. Please verify your fields and try again.
                </p>
              )}

            </form>
          )}
        </div>

      </div>
    </main>
  );
}
