'use client';

import { useEffect, useState } from 'react';
import { Download, X, RefreshCw } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PwaRegister() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    let refreshing = false;

    // Listen for controller changes (when a new SW takes over)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        console.log('[PWA] Controller changed. Refreshing app to load newest version...');
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

          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    console.log('[PWA] New version ready! Prompting update.');
                    setUpdateAvailable(true);
                  }
                }
              };
            }
          };
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

    // Capture install prompt event for Chrome / Android / Desktop PWA
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('[PWA] User accepted install');
    }
    setInstallPrompt(null);
  };

  const handleApplyUpdate = () => {
    window.location.reload();
  };

  return (
    <>
      {/* 1. Update Available Banner */}
      {updateAvailable && (
        <div className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-96 z-50 p-4 bg-[#111111] border border-[#C9A84C] rounded-[20px] shadow-2xl backdrop-blur-md transition-all duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wider text-[#C9A84C] font-semibold">
                System Update
              </p>
              <h4 className="text-sm font-bold text-[#F5F5F0]">
                New Version Available
              </h4>
              <p className="text-xs text-neutral-400">
                A new build of the app was published. Refresh now to apply updates.
              </p>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleApplyUpdate}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#C9A84C] hover:bg-[#D4B05A] text-black font-semibold rounded-xl text-xs transition-colors shadow-md"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Update Now
            </button>
          </div>
        </div>
      )}

      {/* 2. Install Prompt Banner (when available and not update pending) */}
      {!updateAvailable && installPrompt && !isDismissed && (
        <div className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-96 z-50 p-4 bg-[#111111] border border-[#C9A84C]/40 rounded-[20px] shadow-2xl backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wider text-[#C9A84C] font-semibold">
                {typeof window !== 'undefined' && window.location.pathname.startsWith('/studio') ? 'Studio App Ready' : 'Website App Ready'}
              </p>
              <h4 className="text-sm font-bold text-[#F5F5F0]">
                {typeof window !== 'undefined' && window.location.pathname.startsWith('/studio') ? 'Install Arslan Studio App' : 'Install Arslan Rehmani App'}
              </h4>
              <p className="text-xs text-neutral-400">
                {typeof window !== 'undefined' && window.location.pathname.startsWith('/studio')
                  ? 'Install Sanity Studio as a standalone desktop or mobile CMS app.'
                  : 'Access AI Audit tools, ROI calculator, and case studies directly from your Home Screen.'}
              </p>
            </div>
            <button
              onClick={() => setIsDismissed(true)}
              className="text-neutral-500 hover:text-white p-1 transition-colors"
              aria-label="Dismiss install banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleInstallClick}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#C9A84C] hover:bg-[#D4B05A] text-black font-semibold rounded-xl text-xs transition-colors shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              {typeof window !== 'undefined' && window.location.pathname.startsWith('/studio') ? 'Install Studio App' : 'Install Website App'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
