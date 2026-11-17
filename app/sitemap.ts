// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getArticles } from '@/sanity/lib/client';
import { caseStudies } from '@/lib/content';
import { tools } from '@/lib/tools/registry';

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

    { url: `${baseUrl}/tools`, lastModified: now, priority: 0.85, changeFrequency: 'weekly' },
    ...tools.map((t) => ({
      url: `${baseUrl}/tools/${t.slug}`,
      lastModified: now,
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    })),

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
