import Link from 'next/link';
import BrandLogo from '@/components/brand-logo';

const siteLinks = [
  { label: 'Work', href: '/work' },
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Tools', href: '/tools' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const legalLinks = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Cookies', href: '/cookies' },
];

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/arslanrehmani' },
  { label: 'GitHub', href: 'https://github.com/arslanrehmani05' },
  { label: 'X', href: 'https://x.com/arslanrehmani' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-color py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5 text-text-primary font-medium">
              <BrandLogo className="w-6 h-6" />
              <span>Arslan Rehmani</span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed mt-4">
              Operational systems and AI agents that replace manual work.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {siteLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-muted hover:text-text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 pt-6 border-t border-border-color flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-text-subtle">
          <span>© {new Date().getFullYear()} Arslan Rehmani</span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary transition-colors"
              >
                {social.label}
              </a>
            ))}
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
