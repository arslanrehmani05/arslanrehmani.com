import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Studio',
  description: 'Sanity Studio CMS for managing articles, case studies, and content.',
  manifest: '/studio/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/studio-icon.svg', type: 'image/svg+xml' },
      { url: '/icons/studio-192.png', sizes: '192x192', type: 'image/png' },
    ],
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

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
