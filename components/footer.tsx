// components/footer.tsx
import Link from 'next/link';

export default function Footer() {
  const navLinks = [
    { label: 'About', href: '/#about' },
    { label: 'Services', href: '/#services' },
    { label: 'Work', href: '/work' },
    { label: 'Thinking', href: '/thinking' },
    { label: 'Tools', href: '/tools' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-bg-primary border-t border-border-color py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12">
          {/* Column 1: Brand & Tagline */}
          <div className="flex flex-col gap-4">
            <span className="text-xl font-bold tracking-tight text-text-primary">
              <span className="text-accent-gold">{"//"}</span> Arslan Rehmani
            </span>
            <p className="text-sm text-text-muted max-w-xs">
              AI systems that replace manual operations. Two in production, live at real URLs.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-accent-gold">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-text-muted hover:text-text-primary transition-gold"
                  style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Founder Credit */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-accent-gold">
              Elsewhere
            </h4>
            <p className="text-sm text-text-muted">
              Founder of Vanthrope. Building Belhide in public.
            </p>
            <Link
              href="https://vanthrope.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent-gold hover:text-accent-gold-hover underline transition-gold"
            >
              Visit Vanthrope →
            </Link>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-border-color pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-subtle">
            &copy; {new Date().getFullYear()} Arslan Rehmani. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <a
              href="https://x.com/arslanrehmani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent-gold transition-gold p-2"
              aria-label="Follow me on X (formerly Twitter)"
              style={{ minHeight: '44px', minWidth: '44px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {/* X icon SVG */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/arslanrehmani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent-gold transition-gold p-2"
              aria-label="Connect with me on LinkedIn"
              style={{ minHeight: '44px', minWidth: '44px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {/* LinkedIn icon SVG */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
