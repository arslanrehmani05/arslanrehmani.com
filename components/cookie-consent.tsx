// components/cookie-consent.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [consentState, setConsentState] = useState<'pending' | 'accepted' | 'rejected'>('accepted');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('cookie_consent_status');
    if (!saved) {
      setConsentState('pending');
    } else if (saved === 'accepted') {
      setConsentState('accepted');
      enableAnalytics();
    } else {
      setConsentState('rejected');
    }
  }, []);

  const enableAnalytics = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
  };

  const handleAccept = () => {
    localStorage.setItem('cookie_consent_status', 'accepted');
    setConsentState('accepted');
    enableAnalytics();
  };

  const handleReject = () => {
    localStorage.setItem('cookie_consent_status', 'rejected');
    setConsentState('rejected');
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'denied',
      });
    }
  };

  if (!isMounted || consentState !== 'pending') {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-50 max-w-lg p-4 sm:p-5 rounded-2xl bg-bg-secondary/95 backdrop-blur-md border border-border-color shadow-xl text-xs space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <p className="text-text-muted leading-relaxed">
        We use cookies to improve your experience and analyze site traffic. Read our{' '}
        <Link href="/privacy" className="text-text-primary underline hover:text-accent-gold transition-colors">
          Privacy Policy
        </Link>{' '}
        and{' '}
        <Link href="/cookies" className="text-text-primary underline hover:text-accent-gold transition-colors">
          Cookie Policy
        </Link>
        .
      </p>

      <div className="flex items-center justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={handleReject}
          className="px-3.5 py-1.5 rounded-lg bg-bg-primary hover:bg-bg-surface border border-border-color text-text-muted hover:text-text-primary transition-colors text-xs font-medium"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={handleAccept}
          className="btn-primary !px-4 !py-1.5 !text-xs font-semibold"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
