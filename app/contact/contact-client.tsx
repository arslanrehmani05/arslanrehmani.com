// app/contact/contact-client.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Check, AlertCircle, Calendar, ShieldCheck, MapPin, Clock, ArrowRight } from 'lucide-react';
import { getPlaceholdersList } from '@/lib/facts';

const inputClasses =
  'w-full bg-bg-secondary border border-border-color rounded-xl px-4 py-3 text-text-primary placeholder:text-text-subtle focus:border-text-primary/50 focus:outline-none transition-colors duration-200 text-sm font-sans';

export default function ContactClient() {
  const placeholders = getPlaceholdersList();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceInterest: 'Data Audit',
    message: '',
    hp_website: '', // honeypot
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState<'cal' | 'form'>('cal');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please briefly describe your current spreadsheets or operational problem.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.hp_website) {
      setStatus('success');
      return;
    }

    if (!validateForm()) return;
    setStatus('loading');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: `[Interest: ${formData.serviceInterest}] ${formData.message}`,
          source: 'contact_form_truth_gate',
        }),
      });

      if (!response.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-16">

        {/* Header Block */}
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono text-text-muted">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Response Promise: Within 24 hours on business days</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-text-primary">
            Book a 20-Minute Discovery Call.
          </h1>
          <p className="text-base sm:text-lg text-text-muted leading-relaxed">
            No sales reps. You speak directly with Arslan. We will review the spreadsheets you currently run, identify the failure points, and discuss whether a Data Audit or Systems Build makes sense.
          </p>
        </div>

        {/* Dual Mode Switcher: Cal.com Calendar vs Direct Form */}
        <div className="flex items-center gap-3 p-1.5 rounded-2xl bg-bg-secondary border border-border-color w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('cal')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'cal'
                ? 'bg-bg-primary text-text-primary shadow-sm border border-border-color font-bold'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <Calendar className="w-4 h-4 text-accent-gold" />
            <span>Schedule Discovery Call</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('form')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'form'
                ? 'bg-bg-primary text-text-primary shadow-sm border border-border-color font-bold'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <Mail className="w-4 h-4 text-accent-gold" />
            <span>Send Written Scope</span>
          </button>
        </div>

        {/* Tab 1: Cal.com Scheduler Container */}
        {activeTab === 'cal' && (
          <div className="p-8 sm:p-12 rounded-3xl bg-bg-secondary/40 border border-border-color space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-text-primary">
                Select a Time for Your Discovery Call
              </h2>
              <p className="text-sm text-text-muted">
                20 minutes on Google Meet. Focused on your operational data flow.
              </p>
            </div>

            {/* Simulated Cal.com embed / fallback schedule selector */}
            <div className="p-6 rounded-2xl bg-bg-primary border border-border-color space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-color pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-bg-secondary border border-border-color flex items-center justify-center font-mono font-bold text-accent-gold">
                    20m
                  </div>
                  <div>
                    <div className="text-sm font-bold text-text-primary">
                      Operational Drag Diagnosis &bull; 20 min
                    </div>
                    <div className="text-xs text-text-muted">
                      Video call via Google Meet &bull; Working overlap: {placeholders.OVERLAP_WINDOWS}
                    </div>
                  </div>
                </div>

                <a
                  href="https://cal.com/arslanrehmani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary !pl-5 !pr-1.5 !py-1.5 !text-xs font-semibold uppercase tracking-wider flex items-center gap-2 group"
                >
                  <span>Open in Cal.com</span>
                  <span className="btn-arrow-badge w-6 h-6">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </span>
                </a>
              </div>

              {/* Instant Time Slot Options */}
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-text-subtle">
                  Upcoming Discovery Slots:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <a
                    href="mailto:contact@arslanrehmani.com?subject=Booking Discovery Call: Tuesday 14:00 UTC"
                    className="p-3.5 rounded-xl bg-bg-secondary/70 border border-border-color hover:border-text-primary/40 transition-colors block text-center"
                  >
                    <div className="font-bold text-text-primary">Tuesday</div>
                    <div className="text-accent-gold mt-0.5">14:00 UTC (10:00 ET)</div>
                  </a>
                  <a
                    href="mailto:contact@arslanrehmani.com?subject=Booking Discovery Call: Wednesday 15:00 UTC"
                    className="p-3.5 rounded-xl bg-bg-secondary/70 border border-border-color hover:border-text-primary/40 transition-colors block text-center"
                  >
                    <div className="font-bold text-text-primary">Wednesday</div>
                    <div className="text-accent-gold mt-0.5">15:00 UTC (11:00 ET)</div>
                  </a>
                  <a
                    href="mailto:contact@arslanrehmani.com?subject=Booking Discovery Call: Thursday 14:30 UTC"
                    className="p-3.5 rounded-xl bg-bg-secondary/70 border border-border-color hover:border-text-primary/40 transition-colors block text-center"
                  >
                    <div className="font-bold text-text-primary">Thursday</div>
                    <div className="text-accent-gold mt-0.5">14:30 UTC (10:30 ET)</div>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-text-subtle">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Strict privacy: your company numbers and names are kept confidential under NDA.</span>
            </div>
          </div>
        )}

        {/* Tab 2: Direct Written Form */}
        {activeTab === 'form' && (
          <div className="p-8 sm:p-12 rounded-3xl bg-bg-secondary/40 border border-border-color space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-text-primary">
                Send Details About Your Operation
              </h2>
              <p className="text-sm text-text-muted">
                Describe the spreadsheets, volume of transactions, or operational failure points.
              </p>
            </div>

            {status === 'success' ? (
              <div className="p-8 rounded-2xl bg-bg-primary border border-emerald-500/30 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-text-primary">Message Received</h3>
                <p className="text-sm text-text-muted max-w-md mx-auto">
                  Thank you. I have received your operational notes and will respond with a direct analysis within 24 hours on business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field (hidden from legitimate users) */}
                <input
                  type="text"
                  name="hp_website"
                  value={formData.hp_website}
                  onChange={(e) => setFormData({ ...formData, hp_website: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase text-text-subtle">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Smith"
                      className={inputClasses}
                    />
                    {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase text-text-subtle">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className={inputClasses}
                    />
                    {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase text-text-subtle">
                      Company Name &amp; Industry
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Apex Manufacturing Ltd (Textiles)"
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase text-text-subtle">
                      Primary Area of Interest
                    </label>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className={inputClasses}
                    >
                      <option value="Data Audit">Data Audit (1 Week Diagnostic)</option>
                      <option value="Systems Build">Custom Systems Build (Replace Excel)</option>
                      <option value="Agent Add-on">Deterministic AI Agent Add-on</option>
                      <option value="Care Plan">Disaster Recovery &amp; Care Plan</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase text-text-subtle">
                    Operational Problem in Your Words *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. We have 4 people spending 15 hours each week transcribing supplier delivery receipts into Excel, and inventory is constantly off by $20k..."
                    className={inputClasses}
                  />
                  {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary !pl-7 !pr-2.5 !py-2.5 !text-sm font-semibold w-full sm:w-auto flex items-center justify-center gap-3 group"
                >
                  {status === 'loading' ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <span>Submit Operational Inquiry</span>
                      <span className="btn-arrow-badge w-7 h-7">
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                      </span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Direct Channel Box */}
        <div className="p-6 rounded-2xl bg-bg-secondary/40 border border-border-color flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <div>
            Direct Inquiries: <a href="mailto:contact@arslanrehmani.com" className="text-accent-gold underline">contact@arslanrehmani.com</a>
          </div>
          <div>
            PGP Encryption Available upon request &bull; DPA templates ready
          </div>
        </div>
      </div>
    </main>
  );
}
