import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import SiteShell from "@/components/site-shell";
import PwaRegister from "@/components/pwa-register";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Display serif for headlines — high-contrast, editorial authority.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
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
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${fraunces.variable} bg-bg-primary text-text-primary antialiased font-sans`}>
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <SiteShell>{children}</SiteShell>
        <PwaRegister />
      </body>
    </html>
  );
}

