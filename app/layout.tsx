import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import SiteShell from "@/components/site-shell";
import PwaRegister from "@/components/pwa-register";
import CookieConsent from "@/components/cookie-consent";
import "./globals.css";

// Primary font: DM Sans
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  weight: ["400", "500", "700"],
});

export const viewport: Viewport = {
  themeColor: "#111113",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Arslan Rehmani | Custom Operational Software & Autonomous AI Agents",
  description: "I diagnose where businesses bleed time, payroll, and margin—then build private software systems and production AI agents that eliminate operational bottlenecks permanently.",
  metadataBase: new URL("https://arslanrehmani.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/favicon.png?v=2", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
      { url: "/icons/icon-192.png?v=2", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: [
      { url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Arslan R.",
  },
  openGraph: {
    title: "Arslan Rehmani | Secure Data Systems & Verified AI Agents",
    description: "I build secure, reliable data systems and deterministic AI agents for small and mid-sized businesses. Truth Gate enforced.",
    url: "https://arslanrehmani.com",
    siteName: "Arslan Rehmani",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arslan Rehmani | Secure Data Systems & Verified AI Agents",
    description: "Custom operational software and deterministic AI pipelines for manufacturing and ecommerce businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID &&
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID !== "G-41SCGGBT9X"
      ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
      : "G-JXZNH0R4ZZ";

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Explicit cache-busting link tags for Vercel, Safari, and search crawlers */}
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png?v=2" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" sizes="180x180" />
        {/* Google Tag (gtag.js) with default consent denied per UK/EU GDPR */}
        <Script
          id="google-consent-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied'
              });
            `,
          }}
        />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        />
        <Script
          id="google-tag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                localStorage.removeItem('theme_mode');
                document.documentElement.removeAttribute('data-theme');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${dmSans.variable} bg-bg-primary text-text-primary antialiased font-sans`}>
        <SiteShell>{children}</SiteShell>
        <CookieConsent />
        <PwaRegister />
      </body>
    </html>
  );
}
