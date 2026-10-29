import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://arslanrehmani.com'),
  title: {
    default: 'Arslan Rehmani - Operational AI Systems Builder',
    template: '%s | Arslan Rehmani',
  },
  description: 'Forward-deployed systems builder replacing fragile spreadsheets and admin bottlenecks with deterministic pipelines, custom operational software, and autonomous agents.',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.svg?v=3', type: 'image/svg+xml' },
      { url: '/icons/icon-192.png?v=3', sizes: '192x192', type: 'image/png' },
      { url: '/icon.png?v=3', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico?v=3', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=3', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=3',
  },
  openGraph: {
    title: 'Arslan Rehmani - Operational AI Systems Builder',
    description: 'Forward-deployed systems builder replacing fragile spreadsheets and admin bottlenecks with deterministic pipelines, custom operational software, and autonomous agents.',
    url: 'https://arslanrehmani.com',
    siteName: 'Arslan Rehmani',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arslan Rehmani - Operational AI Systems Builder',
    description: 'Forward-deployed systems builder replacing fragile spreadsheets and admin bottlenecks with deterministic pipelines, custom operational software, and autonomous agents.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
        <link rel="icon" href="/favicon.svg?v=3" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=3" />
      </head>
      <body className="min-h-screen flex flex-col bg-bg-primary text-text-primary antialiased">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
