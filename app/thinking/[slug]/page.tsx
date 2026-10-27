// app/thinking/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Download, Clock, ShieldCheck, FileCode, Check } from 'lucide-react';
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
      jobTitle: 'Operational Data Systems Engineer',
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
    <main className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href="/thinking"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-text-primary transition-colors py-1 px-3 rounded-lg bg-bg-secondary border border-border-color"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Field Notes</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="space-y-4 border-b border-border-color pb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-accent-gold uppercase tracking-wider font-semibold">
            <span>{article.category}</span>
            <span className="text-border-color">&bull;</span>
            <span className="text-text-subtle flex items-center gap-1">
              <Clock className="w-3 h-3" /> {article.readTime} min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-tight">
            {article.title}
          </h1>

          {/* Self-contained 40-60 word Direct Answer */}
          <div className="p-5 rounded-2xl bg-bg-secondary/60 border border-border-color text-sm text-text-muted leading-relaxed">
            <strong className="text-text-primary block mb-1 font-medium font-mono text-xs uppercase tracking-wider">
              Field Note Summary:
            </strong>
            {article.excerpt}
          </div>
        </div>

        {/* Article Body */}
        <div className="article-body text-base text-text-muted leading-relaxed space-y-6">
          <ArticlePortableText value={article.body} />
        </div>

        {/* Downloadable Template Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-bg-secondary/50 border border-border-color space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent-gold font-bold">
              <FileCode className="w-4 h-4" />
              <span>Reproducible Engineering Template</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
              Verified Architecture
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-text-primary">
              Download the Blueprint &amp; Schema Starter
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Includes the complete PostgreSQL table schema, Row-Level Security policies, and TypeScript validation guards discussed in this field note.
            </p>
          </div>

          <div className="pt-2">
            <a
              href="mailto:contact@arslanrehmani.com?subject=Requesting Blueprint Template"
              className="btn-primary !px-5 !py-2.5 !text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Request Schema Template (Direct Email)</span>
            </a>
          </div>
        </div>

        {/* Author Bio Footer */}
        <div className="p-6 rounded-2xl bg-bg-secondary/30 border border-border-color flex items-center gap-4 text-xs text-text-muted">
          <div className="w-12 h-12 rounded-xl bg-bg-primary border border-border-color flex items-center justify-center font-mono font-bold text-accent-gold text-sm shrink-0">
            AR
          </div>
          <div>
            <div className="text-sm font-bold text-text-primary">Arslan Rehmani</div>
            <p className="leading-snug mt-0.5">
              Operational Data Systems Engineer. I build custom ERPs, ledger reconciliation suites, and deterministic AI pipelines for small and mid-sized businesses.
            </p>
          </div>
        </div>

        {/* Bottom Booking CTA */}
        <div className="p-8 rounded-3xl bg-bg-secondary border border-border-color text-center space-y-4">
          <h3 className="text-xl font-bold text-text-primary">
            Have a similar data bottleneck in your business?
          </h3>
          <p className="text-sm text-text-muted max-w-lg mx-auto">
            Book a 20-minute discovery call to map out whether an audit or custom build is the right path forward.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="btn-primary !px-6 !py-3 !text-sm inline-flex items-center gap-2"
            >
              <span>Book a 20-minute discovery call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
