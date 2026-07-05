// app/thinking/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug, getArticles } from '@/sanity/lib/client';

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.seo?.metaTitle || `${article.title} | Arslan Rehmani`,
    description: article.seo?.metaDescription || article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="flex flex-col min-h-screen bg-bg-primary pt-36 pb-20">
      <div className="max-w-3xl mx-auto px-6 w-full">
        
        {/* Back Link */}
        <Link
          href="/thinking"
          className="text-xs font-bold text-accent-gold hover:text-accent-gold-hover uppercase tracking-widest mb-8 inline-flex items-center"
          style={{ minHeight: '44px' }}
        >
          ← Back to thinking
        </Link>

        {/* Article Header */}
        <div className="flex flex-col gap-4 mb-12 text-left border-b border-border-color/60 pb-8">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent-gold">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-primary leading-tight">
            {article.title}
          </h1>
          <div className="flex gap-4 items-center text-xs text-text-subtle mt-2">
            <span>{article.readTime} min read</span>
            <span>•</span>
            <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        {/* Article Body */}
        <div className="space-y-6 text-base text-text-muted leading-relaxed font-normal">
          {article.body?.map((block: any, blockIdx: number) => {
            if (block._type === 'block') {
              const textContent = block.children?.map((span: any) => span.text).join('') || '';
              return <p key={blockIdx}>{textContent}</p>;
            }
            return null;
          })}
        </div>

        {/* CTA Footer Banner */}
        <div className="mt-16 pt-12 border-t border-border-color/60 text-center">
          <h4 className="text-lg font-bold text-text-primary mb-4">
            Want to discuss these concepts for your organization?
          </h4>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-accent-gold hover:bg-accent-gold-hover text-bg-primary font-bold text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-gold"
            style={{ minHeight: '44px' }}
          >
            Connect with Arslan
          </Link>
        </div>

      </div>
    </main>
  );
}
