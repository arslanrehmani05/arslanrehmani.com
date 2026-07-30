// components/footer.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Check, ArrowRight } from 'lucide-react';
import { EMAIL_LIST } from '@/lib/emails';

const navLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Speaking', href: '/speaking' },
  { label: 'Media', href: '/media' },
  { label: 'Contact', href: '/contact' },
];

const toolLinks = [
  { label: 'Free Diagnostics Hub', href: '/diagnostics' },
  { label: 'Operational Readiness Audit', href: '/diagnostics' },
  { label: 'ROI Calculator', href: '/diagnostics' },
  { label: 'Operational Thinking', href: '/thinking' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'Accessibility', href: '/accessibility' },
];

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/arslanrehmani' },
  { label: 'GitHub', href: 'https://github.com/arslanrehmani05' },
  { label: 'X (Twitter)', href: 'https://x.com/arslanrehmani' },
];

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus('loading');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newsletterEmail,
          source: 'footer-newsletter',
        }),
      });

      if (response.ok) {
        setNewsletterStatus('success');
        setNewsletterEmail('');
      } else {
        setNewsletterStatus('error');
      }
    } catch {
      setNewsletterStatus('error');
    }
  };

  return (
    <footer className="bg-bg-primary border-t border-border-color pt-16 pb-12 text-text-muted">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Header: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-border-color">
          {/* Brand */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <Link href="/" className="font-serif text-2xl font-medium tracking-tight text-text-primary hover:text-accent-gold transition-colors">
                Arslan Rehmani
              </Link>
              <p className="text-sm text-accent-gold mt-1 font-medium">
                Operational AI Systems Builder
              </p>
              <p className="text-sm text-text-muted leading-relaxed mt-3 max-w-md">
                I build systems that replace manual work permanently. Custom operational software for manufacturing companies and ecommerce brands. Based in Karachi, Pakistan.
              </p>
            </div>
          </div>

          {/* Newsletter Placeholder */}
          <div className="lg:col-span-6 bg-bg-secondary border border-border-color rounded-2xl p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="eyebrow mb-2">Newsletter</span>
              <h3 className="headline text-xl text-text-primary">
                Operational Insights
              </h3>
              <p className="text-sm text-text-muted mt-2">
                Occasional technical notes on building production ERPs, operational automation, and eliminating manual drag.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="mt-6">
              {newsletterStatus === 'success' ? (
                <div className="flex items-center gap-2 text-sm text-accent-gold bg-accent-gold-dim border border-border-gold rounded-xl px-4 py-3">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Subscribed. You will receive technical updates directly.</span>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <label htmlFor="footer-newsletter-email" className="sr-only">
                      Email address for newsletter
                    </label>
                    <input
                      id="footer-newsletter-email"
                      type="email"
                      required
                      placeholder="your.email@company.com"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full bg-bg-primary border border-border-color rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-subtle focus:border-accent-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={newsletterStatus === 'loading'}
                    className="btn-primary !px-6 !py-3 !text-sm shrink-0 flex items-center justify-center gap-2"
                  >
                    {newsletterStatus === 'loading' ? 'Joining...' : 'Subscribe'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
              {newsletterStatus === 'error' && (
                <p className="text-xs text-red-400 mt-2">
                  Subscription failed. Please check your email and try again.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Middle Navigation & Email Shortcuts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-12 border-b border-border-color">
          {/* Email Shortcuts — 5 cols */}
          <div className="lg:col-span-5">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-primary mb-4">
              Direct Business Emails
            </h4>
            <ul className="space-y-3">
              {EMAIL_LIST.map((item) => (
                <li key={item.id} className="group">
                  <a
                    href={`mailto:${item.email}`}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-bg-secondary/60 hover:bg-bg-secondary border border-border-color hover:border-border-gold transition-all duration-200"
                  >
                    <div>
                      <span className="block text-xs font-semibold text-accent-gold">
                        {item.label}
                      </span>
                      <span className="block text-xs text-text-subtle mt-0.5">
                        {item.purpose}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs text-text-primary group-hover:text-accent-gold transition-colors font-mono mt-1 sm:mt-0">
                      <Mail className="w-3 h-3" />
                      {item.email}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links — 2 cols */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-primary mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-accent-gold transition-colors duration-200 block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools — 2 cols */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-primary mb-4">
              Tools & Thinking
            </h4>
            <ul className="space-y-2.5">
              {toolLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-accent-gold transition-colors duration-200 block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links — 3 cols */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-text-primary mb-4">
              Legal & Compliance
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-accent-gold transition-colors duration-200 block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-subtle">
            © {new Date().getFullYear()} Arslan Rehmani. All rights reserved.
          </p>

          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-accent-gold hover:text-accent-gold-hover transition-colors duration-200"
                style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
