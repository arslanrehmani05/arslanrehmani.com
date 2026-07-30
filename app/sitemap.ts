// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://arslanrehmani.com';
  const now = new Date().toISOString();

  const routes = [
    { url: baseUrl, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/diagnostics`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/projects`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/services`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/contact`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/speaking`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/media`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/thinking`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/privacy`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${baseUrl}/terms`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${baseUrl}/cookies`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${baseUrl}/disclaimer`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${baseUrl}/accessibility`, priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  return routes.map((route) => ({
    url: route.url,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
