// components/footer.tsx
import Link from 'next/link';

const navLinks = [
  { label: 'Work', href: '/#proof' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
];

const externalLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/arslanrehmani' },
  { label: 'GitHub', href: 'https://github.com/arslanrehmani05' },
  { label: 'X', href: 'https://x.com/arslanrehmani' },
];

export default function Footer() {
  return (
    <footer className="bg-bg-primary border-t border-border-color py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:items-center">
          {/* Left */}
          <div>
            <span className="block font-bold text-text-primary">Arslan Rehmani</span>
            <span className="block text-sm text-text-subtle mt-1">
              Operational AI Systems
            </span>
          </div>

          {/* Center */}
          <div className="flex gap-6 md:justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-text-muted hover:text-accent-gold transition-colors duration-200"
                style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex gap-6 md:justify-end">
            {externalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent-gold hover:text-accent-gold-hover hover:underline underline-offset-4 transition-colors duration-200"
                style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border-color">
          <p className="text-xs text-text-subtle">© 2026 Arslan Rehmani</p>
        </div>
      </div>
    </footer>
  );
}
