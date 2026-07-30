// components/diagnostics/operational-audit.tsx
'use client';

import { useState } from 'react';
import { CheckCircle2, Clock, ShieldCheck, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';

const auditQuestions = [
  {
    id: 'teamSize',
    title: 'How many employees manage manual operational updates daily?',
    options: ['1 - 2 people', '3 - 5 people', '6 - 15 people', '16+ people'],
  },
  {
    id: 'reportingHours',
    title: 'Hours per week spent compiling reports or manual spreadsheets:',
    options: ['Under 5 hrs/wk', '5 - 15 hrs/wk', '15 - 30 hrs/wk', '30+ hrs/wk'],
  },
  {
    id: 'disconnectedTools',
    title: 'How many disconnected software tools are used across operations?',
    options: ['1 - 2 tools', '3 - 5 tools', '6 - 9 tools', '10+ tools'],
  },
  {
    id: 'excelInventory',
    title: 'Is inventory or stock tracked in Excel / Google Sheets?',
    options: ['Yes, primary system', 'Partially in spreadsheets', 'No, custom ERP/database'],
  },
  {
    id: 'biggestTimeSink',
    title: 'What is your single biggest operational time sink?',
    options: ['Double Data Entry', 'Reconciling Sales & Stock', 'Customer Status Updates', 'Production Scheduling'],
  },
];

export default function DiagnosticsOperationalAudit() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [report, setReport] = useState<any>(null);

  const handleSelectOption = (qId: string, val: string) => {
    const nextAnswers = { ...answers, [qId]: val };
    setAnswers(nextAnswers);

    if (currentIdx < auditQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handleRunAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, email: email.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.report) {
        setReport(data.report);
        setStatus('success');
      }
    } catch {
      setStatus('idle');
    }
  };

  return (
    <div className="bg-bg-secondary border border-border-color rounded-2xl p-8 md:p-12 space-y-8">
      {/* Header */}
      <div>
        <span className="eyebrow mb-2">90-Second Fast Audit</span>
        <h2 className="headline text-2xl md:text-4xl text-text-primary">
          Operational Readiness Diagnostic
        </h2>
        <p className="text-sm text-text-muted mt-2">
          Answer 5 quick questions — get your instant Efficiency Score and AI bottleneck analysis.
        </p>
      </div>

      {status === 'success' && report ? (
        <div className="bg-bg-primary border border-border-color rounded-xl p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-color">
            <div>
              <span className="text-xs font-mono text-accent-gold uppercase">Diagnostic Summary</span>
              <h3 className="headline text-2xl text-text-primary mt-1">Audit Score: {report.score} / 100</h3>
            </div>
            <span className="text-sm font-bold text-accent-gold font-mono bg-accent-gold-dim border border-border-gold px-4 py-2 rounded-xl">
              Potential Savings: {report.metrics?.potentialSavings || '$25,000+'}
            </span>
          </div>

          <p className="text-sm text-text-muted leading-relaxed">{report.summary}</p>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">Identified Bottlenecks:</h4>
            {report.bottlenecks?.map((b: string) => (
              <div key={b} className="flex items-start gap-2 text-xs text-text-muted">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{b}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-4 border-t border-border-color">
            <h4 className="text-xs font-bold uppercase tracking-wider text-accent-gold">High-Impact Recommendations:</h4>
            {report.recommendations?.map((r: string) => (
              <div key={r} className="flex items-start gap-2 text-xs text-text-primary">
                <CheckCircle2 className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                <span>{r}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6 max-w-2xl">
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between items-center text-xs font-mono text-text-subtle mb-2">
              <span>Question {currentIdx + 1} of 5</span>
              <span>{Math.round(((currentIdx + 1) / 5) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-bg-primary rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-accent-gold h-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <h3 className="headline text-xl text-text-primary">
            {auditQuestions[currentIdx].title}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {auditQuestions[currentIdx].options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelectOption(auditQuestions[currentIdx].id, opt)}
                className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all ${
                  answers[auditQuestions[currentIdx].id] === opt
                    ? 'bg-accent-gold-dim border-border-gold text-accent-gold font-bold'
                    : 'bg-bg-primary border-border-color text-text-muted hover:border-border-gold'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* If all 5 answered, show email prompt */}
          {Object.keys(answers).length >= 5 && (
            <form onSubmit={handleRunAudit} className="pt-6 border-t border-border-color flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Enter work email for instant report"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-bg-primary border border-border-color rounded-xl px-4 py-3 text-xs text-text-primary focus:border-accent-gold focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary !px-6 !py-3 !text-xs shrink-0 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'loading' ? 'Analyzing...' : 'Generate Audit Report'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
