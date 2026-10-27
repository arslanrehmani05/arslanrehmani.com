// app/thinking/page.tsx
import Link from 'next/link';
import { ArrowRight, Clock, ShieldCheck, FileCode } from 'lucide-react';
import { getArticles } from '@/sanity/lib/client';

export const metadata = {
  title: 'Field Notes & Build Logs | Arslan Rehmani',
  description:
    'Engineering field notes on spreadsheet-to-database migrations, deterministic AI staging patterns, and financial reconciliation algorithms.',
};

export default async function ThinkingIndexPage() {
  const articles = await getArticles();

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header Block with 40-60 Word Direct Answer */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono text-text-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Field Notes &bull; Production Build Logs</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-text-primary">
            Notes from Live Production Builds.
          </h1>
          <div className="p-6 rounded-2xl bg-bg-secondary/60 border border-border-color text-sm text-text-muted leading-relaxed">
            <strong className="text-text-primary block mb-1 font-mono text-xs uppercase tracking-wider">
              What is this section?
            </strong>
            Engineering build logs and reproducible field notes documenting how I migrate businesses from fragile spreadsheets to audited relational systems. Each note documents the real problem, what failed, what worked, verified numbers, and includes a downloadable architecture template.
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/thinking/${article.slug}`}
              className="p-8 rounded-3xl bg-bg-secondary/40 border border-border-color hover:border-text-primary/30 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-text-subtle">
                  <span className="text-accent-gold font-bold">{article.category}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {article.readTime} min read
                  </span>
                </div>

                <h2 className="text-xl font-bold text-text-primary group-hover:text-accent-gold transition-colors leading-snug">
                  {article.title}
                </h2>

                <p className="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-border-color/60 flex items-center justify-between text-xs font-mono text-text-subtle group-hover:text-text-primary transition-colors">
                <span>Read note &amp; template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-bg-secondary border border-border-color flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-text-primary">
              Have questions about implementing these patterns?
            </h3>
            <p className="text-sm text-text-muted">
              Book a 20-minute discovery call to discuss your exact schema and workflow.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-primary !px-6 !py-3 !text-sm whitespace-nowrap flex items-center gap-2"
          >
            <span>Book a 20-minute discovery call</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
