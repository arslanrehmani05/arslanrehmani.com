// components/navigation.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import BrandLogo from '@/components/brand-logo';

const navLinks = [
  { label: 'Work', href: '/work' },
  { label: 'Industries', href: '/industries' },
  { label: 'Agents', href: '/agents' },
  { label: 'Tools', href: '/tools' },
  { label: 'Services', href: '/services' },
  { label: 'Security', href: '/security' },
  { label: 'Proof Ledger', href: '/proof-ledger' },
  { label: 'About', href: '/about' },
  { label: 'Ask My Twin', href: '/twin' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-bg-primary/95 backdrop-blur-md border-b border-border-color">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="group text-base sm:text-lg font-medium tracking-tight text-text-primary hover:opacity-85 transition-opacity flex items-center gap-2.5"
        >
          <BrandLogo className="w-7 h-7" />
          <span>Arslan Rehmani</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-primary !pl-4 !pr-1.5 !py-1.5 !text-xs font-semibold uppercase tracking-wider flex items-center gap-2 group"
          >
            <span>Book 20-min call</span>
            <span className="btn-arrow-badge w-6 h-6">
              <ArrowRight className="w-3 h-3 text-white" />
            </span>
          </Link>
        </nav>

        {/* Mobile menu toggle button */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            href="/contact"
            className="btn-primary !pl-3.5 !pr-1.5 !py-1.5 !text-xs mr-1 flex items-center gap-1.5 group"
          >
            <span>Book call</span>
            <span className="btn-arrow-badge w-5 h-5">
              <ArrowRight className="w-2.5 h-2.5 text-white" />
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center text-text-primary hover:text-accent-gold transition-colors p-2 rounded-lg bg-bg-secondary border border-border-color"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-b border-border-color bg-bg-primary/98 px-6 py-6 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="p-3 rounded-xl bg-bg-secondary/60 border border-border-color text-sm text-text-muted hover:text-text-primary hover:border-text-primary/30 transition-all font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-2">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full text-center !py-2.5 !pl-6 !pr-2 !text-sm flex items-center justify-center gap-3 group"
            >
              <span>Book a 20-minute discovery call</span>
              <span className="btn-arrow-badge w-7 h-7">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
