import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Arslan Rehmani | Operational AI Systems",
  description: "I build systems that replace manual work permanently. Custom operational software for manufacturing companies and ecommerce brands.",
  metadataBase: new URL("https://arslanrehmani.com"),
  alternates: {
    canonical: "/",
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
      <body className={`${inter.variable} bg-bg-primary text-text-primary antialiased font-sans`}>
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}

