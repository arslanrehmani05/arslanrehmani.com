// components/navigation.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import BrandLogo from '@/components/brand-logo';

const navLinks = [
  { label: 'Work', href: '/work' },
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
        <nav className="hidden lg:flex items-center gap-6">
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
            className="btn-primary !px-4 !py-2 !text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
          >
            <span>Book 20-min call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </nav>

        {/* Mobile menu toggle button */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            href="/contact"
            className="btn-primary !px-3 !py-1.5 !text-xs mr-1"
          >
            Book call
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
              className="btn-primary w-full text-center !py-3 !text-sm flex items-center justify-center gap-2"
            >
              <span>Book a 20-minute discovery call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
