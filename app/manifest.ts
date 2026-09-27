import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Arslan Rehmani | Operational AI Systems',
    short_name: 'Arslan R.',
    description: 'Custom operational software and AI systems for manufacturing companies and ecommerce brands.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#0A0A0A',
    theme_color: '#0A0A0A',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-maskable-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Sanity Studio',
        short_name: 'Studio',
        description: 'Manage articles, case studies, and CMS content',
        url: '/studio',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }],
      },
      {
        name: 'AI Readiness Audit',
        short_name: 'Audit Tool',
        description: 'Run operational AI readiness diagnostic',
        url: '/tools/audit',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }],
      },
      {
        name: 'Automation ROI Calculator',
        short_name: 'ROI Calc',
        description: 'Calculate labor cost savings from custom AI systems',
        url: '/tools/calculator',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }],
      },
    ],
    categories: ['business', 'productivity', 'utilities'],
  };
}
