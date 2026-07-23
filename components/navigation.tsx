// components/navigation.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Work', href: '/#proof' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-bg-primary/90 backdrop-blur-md border-b border-border-color">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-lg font-medium tracking-tight text-text-primary transition-colors duration-200 hover:text-accent-gold"
        >
          Arslan Rehmani
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-text-muted transition-colors duration-200 hover:text-accent-gold"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-primary !px-5 !py-2 !text-sm"
          >
            Start a conversation
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center text-text-primary transition-colors duration-200 hover:text-accent-gold"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          style={{ width: '44px', height: '44px' }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-bg-primary flex flex-col items-center justify-center gap-8 md:hidden">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl text-text-primary transition-colors duration-200 hover:text-accent-gold"
              style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="btn-primary mt-2"
          >
            Start a conversation
          </Link>
        </div>
      )}
    </header>
  );
}
