// app/thinking/page.tsx
import Link from 'next/link';
import { getArticles } from '@/sanity/lib/client';

export const metadata = {
  title: 'Thinking & Frameworks | Arslan Rehmani',
  description: 'Practitioner essays, logs, and observations on designing and deploying AI operational agents.',
};

export default async function ThinkingIndexPage() {
  const articles = await getArticles();

  return (
    <main className="flex flex-col min-h-screen bg-bg-primary pt-36 pb-20">
      <div className="max-w-6xl mx-auto px-6 w-full">
        
        {/* Page Header */}
        <div className="flex flex-col gap-4 mb-16 text-left max-w-2xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent-gold">
            System Insights
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary leading-tight">
            The Thinking
          </h1>
          <p className="text-base text-text-muted leading-relaxed">
            Real practitioner knowledge. Focused on operational challenges, architectural design guidelines, and build logs. No theory, no vaporware.
          </p>
        </div>

        {/* Article Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/thinking/${article.slug}`}
              className="group bg-bg-secondary border border-border-color p-8 rounded-3xl flex flex-col justify-between min-h-[300px] transition-gold hover:border-accent-gold/40 hover:translate-y-[-4px]"
            >
              <div>
                <span className="inline-block text-[11px] font-bold text-accent-gold uppercase tracking-wider mb-6">
                  {article.category}
                </span>
                
                <h2 className="text-xl font-bold text-text-primary mb-3 group-hover:text-accent-gold transition-gold line-clamp-2">
                  {article.title}
                </h2>
                
                <p className="text-text-muted text-sm leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="flex justify-between items-center border-t border-border-color/60 pt-6 mt-6">
                <span className="text-xs text-text-subtle font-medium">
                  {article.readTime} min read
                </span>
                <span className="text-xs font-bold text-accent-gold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Read Article →
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
