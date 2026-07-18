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
  title: "Arslan Rehmani | AI Systems That Replace Manual Operations",
  description: "AI operational systems in production — the last one eliminated 40+ hours of weekly manual work and replaced 5 roles at a textile manufacturer.",
  metadataBase: new URL("https://arslanrehmani.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Arslan Rehmani | AI Systems That Replace Manual Operations",
    description: "I build AI systems that take over manual operations permanently. Two in production, live at real URLs.",
    url: "https://arslanrehmani.com",
    siteName: "Arslan Rehmani Portfolio",
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

