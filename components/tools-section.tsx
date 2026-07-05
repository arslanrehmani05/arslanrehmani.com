// components/tools-section.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ToolsSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'tools-section-notify' }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMessage(resData.error || 'Failed to submit email.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('A network error occurred. Please try again.');
    }
  };

  const tools = [
    {
      title: 'AI Readiness Audit',
      description: 'Find manual bottlenecks and operations suitable for automation. Receive a customized operational report.',
      badge: 'Coming Soon',
      href: '/tools/audit',
    },
    {
      title: 'Automation ROI Calculator',
      description: 'Calculate the annual cost of your current manual workflow versus the automated equivalent.',
      badge: 'Coming Soon',
      href: '/tools/calculator',
    },
  ];

  return (
    <section id="tools" className="bg-bg-primary py-36 border-b border-border-color">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16 text-left max-w-3xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent-gold">
            Free Tools
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary leading-tight">
            Analyse your operational efficiency. Free.
          </h2>
        </div>

        {/* Tools Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {tools.map((tool, idx) => (
            <div
              key={idx}
              className="bg-bg-secondary border border-accent-gold p-8 rounded-3xl flex flex-col justify-between min-h-[260px] relative overflow-hidden"
            >
              {/* Coming Soon Gold Badge */}
              <div className="absolute top-6 right-6 bg-accent-gold/10 border border-accent-gold text-accent-gold text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                {tool.badge}
              </div>

              <div className="max-w-[80%]">
                <h3 className="text-2xl font-black text-text-primary mb-4">
                  {tool.title}
                </h3>
                <p className="text-text-muted text-base leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {/* Temporary Link during development so you can access the page if needed */}
              <div className="mt-8 pt-4">
                <Link
                  href={tool.href}
                  className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-accent-gold hover:text-accent-gold-hover transition-gold"
                  style={{ minHeight: '44px' }}
                >
                  Preview Tool Setup →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Email Capture Form Box */}
        <div className="bg-bg-secondary border border-border-color p-8 md:p-12 rounded-3xl max-w-3xl mx-auto text-center">
          <h4 className="text-xl font-bold text-text-primary mb-3">
            Get notified when new tools launch
          </h4>
          <p className="text-sm text-text-muted mb-8 max-w-lg mx-auto">
            Input your email below. We write tool releases directly to our database and notify you immediately on rollout.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-stretch justify-center max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-grow bg-bg-primary border border-border-color text-text-primary text-sm px-5 py-4 rounded-full focus:outline-none focus:border-accent-gold transition-gold"
              style={{ minHeight: '44px' }}
              disabled={status === 'loading' || status === 'success'}
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="bg-accent-gold hover:bg-accent-gold-hover text-bg-primary font-bold text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-gold disabled:opacity-50"
              style={{ minHeight: '44px' }}
            >
              {status === 'loading' ? 'Submitting...' : 'Notify me'}
            </button>
          </form>

          {/* Status Messages */}
          {status === 'success' && (
            <p className="text-accent-gold text-sm font-medium mt-4">
              ✓ Successfully added. We will keep you updated.
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-500 text-sm font-medium mt-4">
              ✕ {errorMessage}
            </p>
          )}
        </div>

      </div>
    </section>
  );
}
