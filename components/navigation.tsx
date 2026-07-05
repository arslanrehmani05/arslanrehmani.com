// components/navigation.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { label: 'About', href: '/#about' },
    { label: 'Services', href: '/#services' },
    { label: 'Work', href: '/work' },
    { label: 'Thinking', href: '/thinking' },
    { label: 'Tools', href: '/tools' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border-color">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-text-primary transition-gold hover:text-accent-gold" style={{ minWidth: '44px', minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>
          <span className="text-accent-gold mr-1.5">{"//"}</span> Arslan Rehmani
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-text-muted transition-gold hover:text-text-primary py-2 px-1"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-accent-gold hover:bg-accent-gold-hover text-bg-primary text-sm font-bold tracking-wide uppercase px-6 py-3 rounded-full transition-gold"
            style={{ minHeight: '44px' }}
          >
            Work with me
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center text-text-primary hover:text-accent-gold transition-gold"
          aria-label="Toggle navigation menu"
          style={{ width: '44px', height: '44px' }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-bg-primary flex flex-col px-6 py-12 md:hidden">
          <nav className="flex flex-col gap-6">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-semibold text-text-muted hover:text-text-primary transition-gold py-3"
                style={{ minHeight: '48px' }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center bg-accent-gold hover:bg-accent-gold-hover text-bg-primary text-lg font-bold tracking-wide uppercase py-4 rounded-full transition-gold mt-6"
              style={{ minHeight: '52px' }}
            >
              Work with me
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
