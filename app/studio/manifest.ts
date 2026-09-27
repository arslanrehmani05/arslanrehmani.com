import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Studio',
    short_name: 'Studio',
    description: 'Sanity Studio CMS for managing articles, case studies, and content.',
    start_url: '/studio',
    scope: '/studio',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#0A0A0A',
    theme_color: '#0A0A0A',
    icons: [
      {
        src: '/studio-icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icons/studio-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/studio-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/studio-maskable-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/studio-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['productivity', 'business', 'utilities'],
  };
}
