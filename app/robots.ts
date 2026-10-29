import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio', '/api/'],
    },
    sitemap: 'https://arslanrehmani.com/sitemap.xml',
    host: 'https://arslanrehmani.com',
  };
}
