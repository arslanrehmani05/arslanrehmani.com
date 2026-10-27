// components/writing-preview.tsx
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';

const posts = [
  {
    slug: 'spreadsheets-bottleneck-manufacturing',
    title: 'Why Spreadsheets are the Secret Bottleneck in $50M Companies',
    category: 'Field Note &bull; Inventory Architecture',
    excerpt: 'Many high-revenue firms run their inventory and scheduling on brittle spreadsheets. Here is the operational impact and how to structure a database-backed alternative with zero downtime.',
    readTime: '6 min read',
    date: 'Field Note #01',
  },
  {
    slug: 'designing-failsafe-ai-agents',
    title: 'Designing Failsafe AI Agents: The Deterministic Staging Table Pattern',
    category: 'Architecture &bull; AI Verification',
    excerpt: 'LLMs are probabilistic; financial databases are not. How to build an intermediary staging architecture that evaluates schema validity, range constraints, and math before committing rows.',
    readTime: '8 min read',
    date: 'Field Note #02',
  },
  {
    slug: 'automating-financial-reconciliation',
    title: 'Automating Financial Reconciliation: From 3 Days to 45 Minutes',
    category: 'Accounting Systems &bull; Ledger Close',
    excerpt: 'How to construct deterministic matching algorithms that ingest daily banking API exports, normalize supplier invoices, and cut month-end close time without risking accounting discrepancies.',
    readTime: '7 min read',
    date: 'Field Note #03',
  },
];

export default function WritingPreview() {
  return (
    <section className="py-24 md:py-32 border-b border-border-color bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs uppercase font-mono tracking-wider text-text-subtle">
              Writing &bull; Field Notes &amp; Build Logs
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
              Hard-won lessons from production operations.
            </h2>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              No generic thought leadership. Detailed breakdowns of what failed, what worked, and reproducible schemas.
            </p>
          </div>
          <Link
            href="/thinking"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-primary hover:text-accent-gold transition-colors font-mono"
          >
            <span>Read all build notes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/thinking/${post.slug}`}
              className="p-8 rounded-3xl bg-bg-secondary/40 border border-border-color hover:border-text-primary/30 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-text-subtle">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>

                <div className="text-[11px] font-mono uppercase tracking-wider text-accent-gold font-semibold">
                  {post.category}
                </div>

                <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-gold transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-border-color/60 flex items-center justify-between text-xs font-mono text-text-subtle group-hover:text-text-primary transition-colors">
                <span>Read field note</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
