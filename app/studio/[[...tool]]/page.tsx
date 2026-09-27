import type { Metadata } from 'next';
import StudioClient from './studio-client';

export { viewport } from 'next-sanity/studio';

export const metadata: Metadata = {
  title: 'Studio | Content Management',
  description: 'Sanity Studio CMS for managing articles, case studies, and brand content.',
  manifest: '/studio/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/studio-icon.svg', type: 'image/svg+xml' },
      { url: '/icons/studio-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/studio-icon.svg',
    apple: [
      { url: '/icons/studio-192.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Studio',
  },
};

export default function StudioPage() {
  const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder-id';
  const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

  return <StudioClient projectId={projectId} dataset={dataset} />;
}
