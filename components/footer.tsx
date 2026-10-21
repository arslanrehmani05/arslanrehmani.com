// components/footer.tsx
'use client';

import Link from 'next/link';
import { Mail, ArrowRight } from 'lucide-react';
import { EMAIL_LIST } from '@/lib/emails';

const navLinks = [
  { label: 'Case Studies', href: '/projects' },
  { label: 'Services', href: '/services' },
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
  return (
    <footer className="bg-bg-primary border-t border-border-color pt-10 pb-8 text-text-muted">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Header: Brand & Direct Action */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8 border-b border-border-color">
          {/* Brand */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <Link href="/" className="font-serif text-2xl font-medium tracking-tight text-text-primary hover:text-accent-gold transition-colors">
                Arslan Rehmani
              </Link>
              <p className="text-sm text-accent-gold mt-1 font-medium">
                Operational AI Systems Builder
              </p>
              <p className="text-sm text-text-muted leading-relaxed mt-3 max-w-lg">
                I build systems that replace manual work permanently. Custom operational software for manufacturing companies and ecommerce brands. Based in Karachi, Pakistan.
              </p>
            </div>
          </div>

          {/* Direct Engagement Card */}
          <div className="lg:col-span-5 bg-bg-secondary border border-border-color rounded-2xl p-6 md:p-8 flex flex-col justify-between gap-4">
            <div>
              <span className="eyebrow mb-2">Direct Engagement</span>
              <h3 className="headline text-xl text-text-primary">
                Eliminate your manual drag.
              </h3>
              <p className="text-sm text-text-muted mt-2">
                Every engagement starts with understanding your specific operational workflows. No pitch, no slideware.
              </p>
            </div>
            <Link
              href="/contact"
              className="btn-primary !px-6 !py-3 !text-sm w-fit flex items-center gap-2"
            >
              <span>Start a conversation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Middle Navigation & Email Shortcuts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 py-8 border-b border-border-color">
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
