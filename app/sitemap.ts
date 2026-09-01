// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getArticles, getCaseStudies } from '@/sanity/lib/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://arslanrehmani.com';
  const now = new Date();

  const staticRoutes = [
    { url: baseUrl, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/diagnostics`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/work`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/thinking`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/contact`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/media`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/speaking`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/projects`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/services`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/privacy`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${baseUrl}/terms`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${baseUrl}/cookies`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${baseUrl}/disclaimer`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${baseUrl}/accessibility`, priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  const articles = await getArticles();
  const articleRoutes = articles.map((article) => ({
    url: `${baseUrl}/thinking/${article.slug}`,
    lastModified: article.publishedAt ? new Date(article.publishedAt) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const caseStudies = await getCaseStudies();
  const caseStudyRoutes = caseStudies.map((cs) => ({
    url: `${baseUrl}/work/${cs.slug}`,
    lastModified: cs.publishedAt ? new Date(cs.publishedAt) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    ...staticRoutes.map((route) => ({
      ...route,
      lastModified: now,
    })),
    ...articleRoutes,
    ...caseStudyRoutes,
  ];
}
