// app/contact/contact-client.tsx
'use client';

import { useState } from 'react';
import { Mail, Check, AlertCircle, ArrowUpRight, Copy } from 'lucide-react';
import { EMAIL_LIST, BUSINESS_EMAILS } from '@/lib/emails';

const inputClasses =
  'w-full bg-bg-secondary border border-border-color rounded-xl px-4 py-3 text-text-primary placeholder:text-text-subtle focus:border-accent-gold focus:outline-none transition-colors duration-200 text-sm';

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    targetEmail: 'contact@arslanrehmani.com',
    message: '',
    // Honeypot field (hidden from legitimate human users)
    hp_website: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details about your inquiry or operational drag.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters long.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check: drop silent success if a bot filled out the hidden field
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
          email: formData.email.trim(),
          source: `contact-page [Target: ${formData.targetEmail}]: Name=${formData.name.trim()}, Company=${formData.company.trim() || 'N/A'}, Message=${formData.message.trim()}`,
        }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          targetEmail: 'contact@arslanrehmani.com',
          message: '',
          hp_website: '',
        });
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  return (
    <main className="bg-bg-primary min-h-screen py-16 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow mb-4">Direct Communication</span>
          <h1 className="headline text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            Start the conversation.
          </h1>
          <p className="text-base md:text-lg text-text-muted leading-relaxed mt-6">
            Every business email address below routes directly to its intended purpose. Select the appropriate channel or send a message directly using the form below. Responses are sent within 24 business hours.
          </p>
        </div>

        {/* Purpose-Driven Email Cards Grid */}
        <div className="mb-20">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-text-primary mb-6">
            Business Email Directory
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EMAIL_LIST.map((item) => (
              <div
                key={item.id}
                className="bg-bg-secondary border border-border-color hover:border-border-gold rounded-2xl p-6 flex flex-col justify-between transition-colors duration-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-accent-gold uppercase tracking-wider">
                      {item.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyEmail(item.email)}
                      className="text-text-subtle hover:text-text-primary transition-colors p-1.5 rounded-lg hover:bg-bg-primary"
                      title="Copy email address"
                      aria-label={`Copy ${item.email}`}
                    >
                      {copiedEmail === item.email ? (
                        <Check className="w-4 h-4 text-accent-gold" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <a
                    href={`mailto:${item.email}`}
                    className="text-base font-mono font-semibold text-text-primary hover:text-accent-gold transition-colors inline-flex items-center gap-1.5 mb-3"
                  >
                    {item.email}
                    <ArrowUpRight className="w-4 h-4 shrink-0 text-accent-gold" />
                  </a>

                  <p className="text-xs font-semibold text-text-primary mb-2">
                    {item.purpose}
                  </p>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border-color/60 flex items-center justify-between">
                  <span className="text-[11px] text-text-subtle">Direct Channel</span>
                  <a
                    href={`mailto:${item.email}`}
                    className="text-xs text-accent-gold hover:text-accent-gold-hover font-semibold transition-colors inline-flex items-center gap-1"
                  >
                    Send Email →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Contact Form & Context Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start border-t border-border-color pt-16">
          {/* Left Context */}
          <div className="lg:col-span-5">
            <span className="eyebrow mb-3">Direct Form</span>
            <h2 className="headline text-2xl md:text-3xl">
              Describe your operational drag.
            </h2>
            <p className="text-sm md:text-base text-text-muted leading-relaxed mt-4">
              Whether you need to replace manual overhead, integrate multiple sales channels, build custom ERP modules, or discuss a speaking engagement — send your details and I will reply within 24 hours.
            </p>

            <div className="mt-8 space-y-4 bg-bg-secondary border border-border-color rounded-2xl p-6">
              <h3 className="text-sm font-bold text-text-primary">What happens next?</h3>
              <ul className="space-y-3 text-xs text-text-muted">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-accent-gold-dim border border-border-gold flex items-center justify-center text-accent-gold font-bold shrink-0 text-[10px]">1</span>
                  <span>Direct review of your message within 24 hours.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-accent-gold-dim border border-border-gold flex items-center justify-center text-accent-gold font-bold shrink-0 text-[10px]">2</span>
                  <span>Clear, technical feedback — no persistent sales follow-ups.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-accent-gold-dim border border-border-gold flex items-center justify-center text-accent-gold font-bold shrink-0 text-[10px]">3</span>
                  <span>Option for a 30-minute operational discovery session.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-bg-secondary border border-border-color rounded-2xl p-6 md:p-10">
            {status === 'success' ? (
              <div className="flex flex-col items-center text-center py-10">
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-accent-gold-dim border border-border-gold mb-6">
                  <Check className="w-8 h-8 text-accent-gold" />
                </span>
                <h3 className="headline text-2xl text-text-primary">Message Received</h3>
                <p className="text-sm text-text-muted leading-relaxed mt-3 max-w-md">
                  Thank you. Your message has been sent successfully. Arslan will review your details and respond within 24 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="btn-ghost mt-8 !px-6 !py-2.5 !text-xs"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Honeypot Spam Protection Field */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="hp_website">Do not fill this field</label>
                  <input
                    type="text"
                    id="hp_website"
                    name="hp_website"
                    tabIndex={-1}
                    value={formData.hp_website}
                    onChange={(e) => setFormData({ ...formData, hp_website: e.target.value })}
                  />
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-xs font-semibold text-text-primary">
                    Full Name <span className="text-accent-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    placeholder="e.g. Tariq Mahmood"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`${inputClasses} ${errors.name ? 'border-red-500' : ''}`}
                  />
                  {errors.name && (
                    <span className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-xs font-semibold text-text-primary">
                    Work Email <span className="text-accent-gold">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`${inputClasses} ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </span>
                  )}
                </div>

                {/* Company & Target Channel */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-company" className="text-xs font-semibold text-text-primary">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      id="contact-company"
                      placeholder="e.g. Apex Textiles"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className={inputClasses}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-target" className="text-xs font-semibold text-text-primary">
                      Recipient Email Channel
                    </label>
                    <select
                      id="contact-target"
                      value={formData.targetEmail}
                      onChange={(e) => setFormData({ ...formData, targetEmail: e.target.value })}
                      className={inputClasses}
                    >
                      {EMAIL_LIST.map((item) => (
                        <option key={item.id} value={item.email} className="bg-bg-secondary text-text-primary">
                          {item.email} ({item.label})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-xs font-semibold text-text-primary">
                    Message / Operational Details <span className="text-accent-gold">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    placeholder="Describe your operational bottleneck, current manual overhead, or project specifications..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputClasses} resize-none ${errors.message ? 'border-red-500' : ''}`}
                  />
                  {errors.message && (
                    <span className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full disabled:opacity-50 mt-2"
                >
                  {status === 'loading' ? 'Sending Message...' : 'Send Message'}
                </button>

                {status === 'error' && (
                  <div className="p-3 bg-red-950/40 border border-red-800/50 rounded-xl flex items-center gap-2 text-xs text-red-300">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>Something went wrong submitting your message. Please try again or write directly to <a href={`mailto:${formData.targetEmail}`} className="underline font-mono text-accent-gold">{formData.targetEmail}</a>.</span>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
