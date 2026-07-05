// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getArticles, getCaseStudies } from '@/sanity/lib/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://arslanrehmani.com';

  // Base routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/tools',
    '/tools/audit',
    '/tools/calculator',
    '/work',
    '/thinking',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    // Dynamic content routes
    const [articles, caseStudies] = await Promise.all([
      getArticles(),
      getCaseStudies(),
    ]);

    const articleRoutes = articles.map((article) => ({
      url: `${baseUrl}/thinking/${article.slug}`,
      lastModified: new Date(article.publishedAt).toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    const caseStudyRoutes = caseStudies.map((project) => ({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: new Date(project.publishedAt || new Date()).toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [...routes, ...articleRoutes, ...caseStudyRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return routes;
  }
}
