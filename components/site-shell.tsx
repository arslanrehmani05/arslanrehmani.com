'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import AskArslanChat from '@/components/ask-arslan-chat';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  // When inside the Sanity Studio (/studio), isolate it completely:
  // no public website header, no footer, no floating chatbot, and no grain overlay.
  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <Navigation />
      {children}
      <AskArslanChat />
      <Footer />
    </>
  );
}
