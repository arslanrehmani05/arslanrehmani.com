// components/thinking-section.tsx
import Link from 'next/link';
import { getArticles } from '@/sanity/lib/client';

export default async function ThinkingSection() {
  const allArticles = await getArticles();
  // Get top 3 articles
  const articles = allArticles.slice(0, 3);

  return (
    <section id="thinking" className="bg-bg-primary py-36 border-b border-border-color">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16 text-left max-w-3xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent-gold">
            The Thinking
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary leading-tight">
            Notes from building systems businesses actually run on.
          </h2>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/thinking/${article.slug}`}
              className="group bg-bg-secondary border border-border-color p-8 rounded-3xl flex flex-col justify-between min-h-[300px] transition-gold hover:border-accent-gold/40 hover:translate-y-[-4px]"
            >
              <div>
                {/* Category tag */}
                <span className="inline-block text-[11px] font-bold text-accent-gold uppercase tracking-wider mb-6">
                  {article.category}
                </span>
                
                <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-accent-gold transition-gold line-clamp-2">
                  {article.title}
                </h3>
                
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

        {/* Read All Link */}
        <div className="mt-16 flex justify-start">
          <Link
            href="/thinking"
            className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-accent-gold hover:text-accent-gold-hover transition-gold"
            style={{ minHeight: '44px' }}
          >
            Read all articles →
          </Link>
        </div>

      </div>
    </section>
  );
}
