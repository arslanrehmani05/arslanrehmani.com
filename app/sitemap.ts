// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getArticles } from '@/sanity/lib/client';
import { caseStudies } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://arslanrehmani.com';
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${baseUrl}/work`, lastModified: now, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/products`, lastModified: now, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/services`, lastModified: now, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/about`, lastModified: now, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/contact`, lastModified: now, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/thinking`, lastModified: now, priority: 0.6, changeFrequency: 'weekly' },

    // Interactive Diagnostic & Assessment Tools
    { url: `${baseUrl}/tools`, lastModified: now, priority: 0.85, changeFrequency: 'weekly' },
    { url: `${baseUrl}/tools/process-mapper`, lastModified: now, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/readiness`, lastModified: now, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/decision`, lastModified: now, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/access-audit`, lastModified: now, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/cost-estimator`, lastModified: now, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/reconciliation`, lastModified: now, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/scanner`, lastModified: now, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/tools/calculator`, lastModified: now, priority: 0.8, changeFrequency: 'monthly' },

    // Legal & Policies
    { url: `${baseUrl}/privacy`, lastModified: now, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${baseUrl}/terms`, lastModified: now, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${baseUrl}/cookies`, lastModified: now, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${baseUrl}/disclaimer`, lastModified: now, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${baseUrl}/accessibility`, lastModified: now, priority: 0.3, changeFrequency: 'yearly' },
  ];

  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const articles = await getArticles();
    if (Array.isArray(articles)) {
      articleRoutes = articles.map((article) => ({
        url: `${baseUrl}/thinking/${article.slug}`,
        lastModified: article.publishedAt ? new Date(article.publishedAt) : now,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }));
    }
  } catch {
    articleRoutes = [];
  }

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${baseUrl}/work/${cs.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...articleRoutes, ...caseStudyRoutes];
}
