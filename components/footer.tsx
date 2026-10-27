// components/footer.tsx
import Link from 'next/link';
import { Mail, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import BrandLogo from '@/components/brand-logo';

const navLinks = [
  { label: 'Work (Case Studies)', href: '/work' },
  { label: 'Agents Architecture', href: '/agents' },
  { label: 'Operational Tools (8)', href: '/tools' },
  { label: 'Proof Ledger', href: '/proof-ledger' },
  { label: 'Systems Lab', href: '/lab' },
  { label: 'Industries', href: '/industries' },
  { label: 'Enterprise Pack', href: '/enterprise' },
  { label: 'Security & Reliability', href: '/security' },
  { label: 'About', href: '/about' },
  { label: 'Field Notes & Writing', href: '/thinking' },
  { label: 'Ask My Twin (Fact-Grounded)', href: '/twin' },
];

const serviceLinks = [
  { label: 'Data Audit (1 Week)', href: '/services#data-audit' },
  { label: 'Systems Build', href: '/services#systems-build' },
  { label: 'Deterministic Agent Add-on', href: '/services#agent-addon' },
  { label: 'Care & Disaster Recovery', href: '/services#care-plan' },
];

const legalLinks = [
  { label: 'Security & Verification Matrix', href: '/security' },
  { label: 'Enterprise Dossier', href: '/enterprise' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-color bg-bg-secondary/40 text-text-primary">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-border-color">
          {/* Identity & Positioning — 5 cols */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 text-base font-medium tracking-tight text-text-primary">
              <BrandLogo className="w-7 h-7" />
              <span>Arslan Rehmani</span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed max-w-sm">
              I build secure data systems and deterministic AI agents for small and mid-sized businesses whose operations still run on spreadsheets, paper registers, and disconnected software.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-primary border border-border-color text-xs font-mono text-text-muted">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Truth Gate Enforced &bull; Backed by facts.json</span>
            </div>
            <div className="pt-2">
              <Link
                href="/contact"
                className="btn-primary !pl-5 !pr-1.5 !py-1.5 !text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 group"
              >
                <span>Book a 20-minute discovery call</span>
                <span className="btn-arrow-badge w-6 h-6">
                  <ArrowRight className="w-3 h-3 text-white" />
                </span>
              </Link>
            </div>
          </div>

          {/* Navigation — 2 cols */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-text-primary font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-text-muted hover:text-text-primary transition-colors py-0.5 block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services — 2 cols */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-text-primary font-semibold">
              The Four Offers
            </h4>
            <ul className="space-y-2 text-sm">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-text-muted hover:text-text-primary transition-colors py-0.5 block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Security & Direct Contact — 3 cols */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-text-primary font-semibold">
              Direct Contact
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Response promise: within 24 hours on business days. No sales reps; you speak directly with Arslan.
            </p>
            <div className="p-3 rounded-xl bg-bg-primary border border-border-color space-y-2">
              <div className="text-xs font-medium text-text-primary flex items-center justify-between">
                <span>Inquiries & Scope:</span>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <Check className="w-3 h-3" /> Direct
                </span>
              </div>
              <a
                href="mailto:contact@arslanrehmani.com"
                className="text-xs font-mono text-accent-gold hover:underline block truncate"
              >
                contact@arslanrehmani.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-subtle">
          <div>
            &copy; {new Date().getFullYear()} Arslan Rehmani. Truth Gate enforced. All claims verified.
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {legalLinks.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
