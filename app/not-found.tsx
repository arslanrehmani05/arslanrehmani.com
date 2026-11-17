// app/not-found.tsx
import Link from 'next/link';
import { ArrowLeft, Home, FileCode, Wrench, Mail } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="bg-bg-primary min-h-[60vh] py-12 md:py-16 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <span className="eyebrow mb-4 justify-center">404</span>
        <h1 className="headline text-4xl md:text-6xl text-text-primary mb-6">
          Page not found
        </h1>
        <p className="text-base md:text-lg text-text-muted leading-relaxed mb-10 max-w-lg mx-auto">
          This page does not exist or has moved. Try one of the sections below.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Link href="/" className="btn-primary !px-6 !py-3 !text-sm flex items-center gap-2">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link href="/work" className="btn-ghost !px-6 !py-3 !text-sm flex items-center gap-2">
            <FileCode className="w-4 h-4 text-accent-gold" />
            <span>See the work</span>
          </Link>
        </div>

        {/* Quick Links Card */}
        <div className="bg-bg-secondary border border-border-color rounded-2xl p-6 text-left max-w-md mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-3">
            Sections
          </h2>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/services" className="text-text-muted hover:text-accent-gold transition-colors flex items-center justify-between py-1">
                <span>Services</span>
                <span className="font-mono text-accent-gold">/services →</span>
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-text-muted hover:text-accent-gold transition-colors flex items-center justify-between py-1">
                <span>About</span>
                <span className="font-mono text-accent-gold">/about →</span>
              </Link>
            </li>
            <li>
              <Link href="/tools" className="text-text-muted hover:text-accent-gold transition-colors flex items-center justify-between py-1">
                <span>Tools</span>
                <span className="font-mono text-accent-gold">/tools →</span>
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-text-muted hover:text-accent-gold transition-colors flex items-center justify-between py-1">
                <span>Contact</span>
                <span className="font-mono text-accent-gold">/contact →</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
