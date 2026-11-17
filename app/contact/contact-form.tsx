'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { BUSINESS_EMAILS } from '@/lib/emails';

type Status = 'idle' | 'loading' | 'success' | 'error';

const inputClass =
  'w-full bg-bg-primary border border-border-color rounded-xl px-4 py-3 text-base text-text-primary placeholder:text-text-subtle focus:border-border-gold focus:outline-none';
const labelClass = 'block text-sm text-text-muted mb-2';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const [tool, setTool] = useState('');

  // A tool hands its result over as ?tool=<slug>&summary=<text>. Put it in the message.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const summary = params.get('summary');
    setTool(params.get('tool') ?? '');
    if (summary) setMessage((current) => current || `${summary.slice(0, 1500)}\n\n`);
  }, []);

  const contactEmail = BUSINESS_EMAILS.business.email;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;

    setStatus('loading');
    try {
      const service = new URLSearchParams(window.location.search).get('service');
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          message: message.trim(),
          service,
          tool,
          source: tool ? `tool:${tool}` : 'contact_page',
        }),
      });
      const data = await res.json().catch(() => null);
      setStatus(res.ok && data?.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-bg-secondary border border-border-color p-8 md:p-10 text-center">
        <div className="w-12 h-12 rounded-full border border-border-gold text-text-primary flex items-center justify-center mx-auto">
          <Check className="w-6 h-6" />
        </div>
        <h2 className="headline text-2xl mt-6">Received.</h2>
        <p className="text-base text-text-muted mt-3">I’ll respond within 24 hours.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-bg-secondary border border-border-color p-6 md:p-8 space-y-5"
    >
      <div>
        <label htmlFor="contact-name" className={labelClass}>Name</label>
        <input
          id="contact-name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClass}>Work email</label>
        <input
          id="contact-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="contact-company" className={labelClass}>Company</label>
        <input
          id="contact-company"
          type="text"
          autoComplete="organization"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>What does your operation struggle with?</label>
        <textarea
          id="contact-message"
          rows={7}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} leading-relaxed`}
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-text-primary border border-border-gold rounded-xl px-4 py-3">
          That did not send. Try again, or email{' '}
          <a href={`mailto:${contactEmail}`} className="underline underline-offset-4">
            {contactEmail}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full !py-3.5 gap-2 disabled:opacity-50"
      >
        <span>{status === 'loading' ? 'Sending' : 'Send'}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
