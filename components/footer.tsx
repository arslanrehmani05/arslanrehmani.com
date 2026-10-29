import Link from 'next/link';
import BrandLogo from '@/components/brand-logo';

export default function Footer() {
  return (
    <footer className="border-t border-border-color bg-bg-secondary/40 py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10">
        <div className="space-y-4 max-w-sm">
          <Link href="/" className="flex items-center gap-2.5 text-text-primary font-medium">
            <BrandLogo className="w-6 h-6" />
            <span>Arslan Rehmani</span>
          </Link>
          <p className="text-xs text-text-muted leading-relaxed">
            Operational Systems Builder & Forward-Deployed AI Architect. Reengineering manual back-offices, ERP integrations, and high-frequency business workflows into deterministic software instruments.
          </p>
          <div className="text-[11px] font-mono text-text-subtle">
            Verified Production Outcomes · Zero Speculative Commit
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
          <div className="space-y-3">
            <span className="font-semibold text-text-primary uppercase tracking-wider block font-mono text-[11px]">
              Work & Systems
            </span>
            <ul className="space-y-2 text-text-muted">
              <li><Link href="/work" className="hover:text-text-primary transition-colors">Case Studies</Link></li>
              <li><Link href="/industries" className="hover:text-text-primary transition-colors">Target Industries</Link></li>
              <li><Link href="/agents" className="hover:text-text-primary transition-colors">Autonomous Agents</Link></li>
              <li><Link href="/tools" className="hover:text-text-primary transition-colors">Interactive Tools</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-semibold text-text-primary uppercase tracking-wider block font-mono text-[11px]">
              Guarantees & Firm
            </span>
            <ul className="space-y-2 text-text-muted">
              <li><Link href="/services" className="hover:text-text-primary transition-colors">Engagements</Link></li>
              <li><Link href="/security" className="hover:text-text-primary transition-colors">Security & Isolation</Link></li>
              <li><Link href="/about" className="hover:text-text-primary transition-colors">Founder Story</Link></li>
              <li><Link href="/contact" className="hover:text-text-primary transition-colors">Book Discovery</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-semibold text-text-primary uppercase tracking-wider block font-mono text-[11px]">
              Engineering Direct
            </span>
            <p className="text-text-muted text-[11px] leading-relaxed">
              Based in Karachi, operating globally across North America, UK, and Europe.
            </p>
            <div className="pt-2">
              <Link href="/contact" className="text-accent-gold underline hover:opacity-80 font-mono">
                Direct Contact Channel →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-10 mt-10 border-t border-border-color/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-subtle font-mono">
        <div>© {new Date().getFullYear()} Arslan Rehmani. Built for enterprise reliability.</div>
        <div className="flex items-center gap-4">
          <span>Deterministic Staging</span>
          <span>·</span>
          <span>Human-in-the-Loop</span>
          <span>·</span>
          <span>Postgres Verified</span>
        </div>
      </div>
    </footer>
  );
}
