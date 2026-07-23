// app/contact/page.tsx
'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

const inputClasses =
  'w-full bg-bg-secondary border border-border-color rounded-xl px-4 py-3 text-text-primary focus:border-accent-gold focus:outline-none transition-colors duration-200';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          source: `contact-form: name=${formData.name}, company=${formData.company}, message=${formData.message}`,
        }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <main className="bg-bg-primary">
      <section className="max-w-6xl mx-auto px-6 min-h-[70vh] py-20 md:py-32 flex flex-col items-center justify-center">
        {status === 'success' ? (
          <div className="flex flex-col items-center text-center">
            <span className="flex items-center justify-center w-14 h-14 rounded-full bg-accent-gold-dim">
              <Check className="w-7 h-7 text-accent-gold" />
            </span>
            <p className="text-base md:text-lg text-text-muted leading-relaxed mt-6">
              Received. I&apos;ll respond within 24 hours.
            </p>
          </div>
        ) : (
          <div className="w-full max-w-lg">
            <span className="eyebrow mb-5">Contact</span>
            <h1 className="headline text-3xl md:text-5xl leading-[1.1]">
              Start the conversation.
            </h1>
            <p className="text-base md:text-lg text-text-muted leading-relaxed mt-4">
              Tell me what your operation looks like and where the friction is. I
              respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-10">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm text-text-muted">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClasses}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm text-text-muted">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClasses}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="company" className="text-sm text-text-muted">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className={inputClasses}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm text-text-muted">
                  What does your operation struggle with?
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full disabled:opacity-50 mt-1"
              >
                {status === 'loading' ? 'Sending' : 'Send'}
              </button>

              {status === 'error' && (
                <p className="text-sm text-text-muted text-center">
                  Something went wrong. Check your details and try again, or email me
                  directly.
                </p>
              )}
            </form>
          </div>
        )}
      </section>
    </main>
  );
}
