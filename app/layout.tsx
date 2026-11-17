import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const siteTitle = 'Arslan Rehmani | Operational Systems and AI Agents';
const siteDescription =
  'I build custom software and AI agents that replace manual work for manufacturers, ecommerce brands and finance teams.';

export const metadata: Metadata = {
  metadataBase: new URL('https://arslanrehmani.com'),
  title: {
    default: siteTitle,
    template: '%s | Arslan Rehmani',
  },
  description: siteDescription,
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.svg?v=4', type: 'image/svg+xml' },
      { url: '/icons/icon-192.png?v=4', sizes: '192x192', type: 'image/png' },
      { url: '/icon.png?v=4', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico?v=4', sizes: 'any' },
    ],
    apple: [{ url: '/apple-touch-icon.png?v=4', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico?v=4',
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: 'https://arslanrehmani.com',
    siteName: 'Arslan Rehmani',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Arslan Rehmani',
  url: 'https://arslanrehmani.com',
  jobTitle: 'Operational Systems Builder',
  description: siteDescription,
  sameAs: [
    'https://github.com/arslanrehmani05',
    'https://linkedin.com/in/arslanrehmani',
    'https://x.com/arslanrehmani',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-bg-primary text-text-primary antialiased font-sans">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
