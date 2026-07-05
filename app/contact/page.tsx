// app/contact/page.tsx
'use client';

import { useState } from 'react';

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
    <main className="flex flex-col min-h-screen bg-bg-primary pt-36 pb-20">
      <div className="max-w-3xl mx-auto px-6 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-12 text-left">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent-gold">
            Contact
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary leading-tight">
            Start the conversation.
          </h1>
          <p className="text-base text-text-muted max-w-lg">
            Let&apos;s outline your operational leaks, estimate implementation scope, and map out automated alternatives.
          </p>
        </div>

        {/* Contact Form Container */}
        <div className="bg-bg-secondary border border-border-color p-8 rounded-3xl">
          {status === 'success' ? (
            <div className="text-center py-12">
              <span className="text-4xl font-bold text-accent-gold mb-4 block">✓ Submission Received</span>
              <p className="text-text-muted text-base max-w-md mx-auto">
                Thank you for reaching out. Arslan will review your submission and contact you within 24 hours to schedule a consultation.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-8 text-sm font-bold text-accent-gold hover:text-accent-gold-hover uppercase tracking-wider"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-bg-primary border border-border-color text-text-primary text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-accent-gold transition-gold"
                    style={{ minHeight: '44px' }}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-bg-primary border border-border-color text-text-primary text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-accent-gold transition-gold"
                    style={{ minHeight: '44px' }}
                  />
                </div>

              </div>

              {/* Company */}
              <div className="flex flex-col gap-2">
                <label htmlFor="company" className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-bg-primary border border-border-color text-text-primary text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-accent-gold transition-gold"
                  style={{ minHeight: '44px' }}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  Operational Bottlenecks / Project Scope
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your current manual operations, tools in use, and what you would like to automate..."
                  className="bg-bg-primary border border-border-color text-text-primary text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-accent-gold transition-gold resize-none"
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
                  {status === 'loading' ? 'Sending...' : 'Schedule Consultation'}
                </button>
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm font-medium text-center">
                  ✕ An error occurred. Please verify your details and try again.
                </p>
              )}

            </form>
          )}
        </div>

      </div>
    </main>
  );
}
