// app/thinking/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ArticlePortableText from '@/components/portable-text-renderer';
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
  
  const title = article.seo?.metaTitle || `${article.title} | Arslan Rehmani`;
  const description = article.seo?.metaDescription || article.excerpt;
  const canonical = article.seo?.canonicalUrl || `https://arslanrehmani.com/thinking/${article.slug}`;

  return {
    title,
    description,
    keywords: article.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Arslan Rehmani',
      locale: 'en_US',
      type: 'article',
      publishedTime: article.publishedAt,
      authors: ['Arslan Rehmani'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  // Structured Data (JSON-LD) for Search Engine Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Arslan Rehmani',
      url: 'https://arslanrehmani.com',
      jobTitle: 'AI Operational Systems Builder & ERP Architect',
    },
    publisher: {
      '@type': 'Person',
      name: 'Arslan Rehmani',
      url: 'https://arslanrehmani.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://arslanrehmani.com/thinking/${article.slug}`,
    },
    keywords: article.keywords?.join(', '),
  };

  return (
    <main className="flex flex-col min-h-screen bg-bg-primary pt-36 pb-20">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            <span>
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Article Body Content */}
        <div className="article-body">
          <ArticlePortableText value={article.body} />
        </div>

        {/* Article Author Footer Bio */}
        <div className="mt-16 bg-bg-secondary border border-border-color p-8 rounded-3xl flex flex-col sm:flex-row items-center gap-6">
          <div className="shrink-0 w-16 h-16 rounded-full bg-accent-gold-dim border border-border-gold flex items-center justify-center text-accent-gold font-black text-xl">
            AR
          </div>
          <div>
            <h3 className="text-base font-bold text-text-primary mb-1">
              Written by Arslan Rehmani
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              AI Operational Systems Builder & ERP Architect based in Karachi, Pakistan. Engineering custom production software and automated business systems.
            </p>
          </div>
        </div>

        {/* CTA Footer Banner */}
        <div className="mt-12 pt-12 border-t border-border-color/60 text-center">
          <h4 className="text-lg font-bold text-text-primary mb-4">
            Want to discuss these operational concepts for your business?
          </h4>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-accent-gold hover:bg-accent-gold-hover text-bg-primary font-bold text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-gold"
            style={{ minHeight: '44px' }}
          >
            Start a Conversation
          </Link>
        </div>
      </div>
    </main>
  );
}
