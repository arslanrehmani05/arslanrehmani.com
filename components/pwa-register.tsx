'use client';

import { useEffect } from 'react';

export default function PwaRegister() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    let refreshing = false;

    // Listen for controller changes (when a new SW takes over after deployment)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        console.log('[PWA] Controller changed. Auto-refreshing app to latest version...');
        window.location.reload();
      }
    });

    // Register Service Worker
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[PWA] Service Worker active with scope:', registration.scope);

          // Force update check on launch
          registration.update();

          // Check periodically for updates (every 30 minutes)
          setInterval(() => {
            registration.update();
          }, 30 * 60 * 1000);
        })
        .catch((err) => {
          console.warn('[PWA] SW registration failed:', err);
        });
    });

    // Re-check for updates whenever user brings PWA back into focus/foreground on iOS
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        navigator.serviceWorker.getRegistration().then((reg) => {
          if (reg) reg.update();
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
}
