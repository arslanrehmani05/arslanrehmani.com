import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import SiteShell from "@/components/site-shell";
import PwaRegister from "@/components/pwa-register";
import "./globals.css";

// LeftClick primary font: DM Sans
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
  title: "Arslan Rehmani | Operational AI Systems",
  description: "I build systems that replace manual work permanently. Custom operational software for manufacturing companies and ecommerce brands.",
  metadataBase: new URL("https://arslanrehmani.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Arslan R.",
  },
  openGraph: {
    title: "Arslan Rehmani | Operational AI Systems",
    description: "I build systems that replace manual work permanently. Four live products you can open and use right now.",
    url: "https://arslanrehmani.com",
    siteName: "Arslan Rehmani",
    locale: "en_US",
    type: "website",
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
        {/* Google Tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        />
        <Script
          id="google-tag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme_mode') === 'light') {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${dmSans.variable} bg-bg-primary text-text-primary antialiased font-sans`}>
        <SiteShell>{children}</SiteShell>
        <PwaRegister />
      </body>
    </html>
  );
}

