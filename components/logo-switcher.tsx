'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, Check, ChevronUp, ChevronDown, X, ExternalLink } from 'lucide-react';
import BrandLogo from '@/components/brand-logo';
import { LOGO_OPTIONS, LogoVariant, DEFAULT_LOGO_VARIANT } from '@/lib/logo-variants';

export default function LogoSwitcher() {
  const [activeVariant, setActiveVariant] = useState<LogoVariant>(DEFAULT_LOGO_VARIANT);
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('site_logo_variant') as LogoVariant;
    if (saved && LOGO_OPTIONS.some((opt) => opt.id === saved)) {
      setActiveVariant(saved);
    }
  }, []);

  const selectVariant = (variant: LogoVariant) => {
    setActiveVariant(variant);
    localStorage.setItem('site_logo_variant', variant);
    window.dispatchEvent(new CustomEvent('logo-variant-change', { detail: variant }));
  };

  if (isDismissed) {
    return (
      <button
        onClick={() => setIsDismissed(false)}
        className="fixed bottom-6 left-6 z-40 bg-bg-surface/90 hover:bg-bg-secondary text-text-muted hover:text-text-primary border border-border-color rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-md transition-all flex items-center gap-2 shadow-lg"
        title="Open Logo Lab"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Logo Concepts</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm">
      {/* Header Pill */}
      <div className="bg-bg-surface/95 backdrop-blur-xl border border-border-color rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] overflow-hidden transition-all duration-300">
        <div className="px-3.5 py-2.5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-6 h-6 rounded-md bg-bg-secondary border border-border-color flex items-center justify-center p-0.5">
              <BrandLogo variant={activeVariant} className="w-5 h-5" showTile={false} />
            </div>
            <div>
              <div className="text-xs font-medium text-text-primary flex items-center gap-1.5">
                <span>Identity: {LOGO_OPTIONS.find((o) => o.id === activeVariant)?.name}</span>
                <span className="text-[10px] uppercase tracking-wider text-text-subtle font-mono px-1.5 py-0.5 bg-bg-secondary rounded">
                  Live
                </span>
              </div>
            </div>
            {isOpen ? (
              <ChevronDown className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-colors ml-1" />
            ) : (
              <ChevronUp className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-colors ml-1" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="text-text-subtle hover:text-text-primary p-1 rounded-md transition-colors"
            title="Minimize"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Expanded Options Tray */}
        {isOpen && (
          <div className="p-3 pt-0 border-t border-border-color space-y-1.5">
            <p className="text-[11px] text-text-muted pb-1 pt-2">
              Select a concept to preview live across the site:
            </p>

            <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
              {LOGO_OPTIONS.map((opt) => {
                const isSelected = activeVariant === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => selectVariant(opt.id)}
                    className={`w-full text-left p-2 rounded-xl flex items-center justify-between gap-3 transition-all ${
                      isSelected
                        ? 'bg-text-primary/10 border border-text-primary/20 text-text-primary'
                        : 'hover:bg-bg-secondary text-text-muted hover:text-text-primary border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-bg-primary border border-border-color flex items-center justify-center p-1 shrink-0">
                        <BrandLogo variant={opt.id} className="w-5 h-5" showTile={false} />
                      </div>
                      <div>
                        <div className="text-xs font-medium flex items-center gap-1.5">
                          {opt.name}
                          {opt.id === 'apex' && (
                            <span className="text-[9px] px-1 py-0.2 bg-text-primary/10 text-text-primary rounded font-mono">
                              Recommended
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-text-subtle truncate max-w-[190px]">
                          {opt.tagline}
                        </div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-text-primary shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-border-color flex items-center justify-between text-[11px]">
              <Link
                href="/logo-preview"
                className="text-text-primary hover:underline flex items-center gap-1 font-medium"
              >
                <span>Open Full Comparison Lab</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <span className="text-[10px] text-text-subtle">Saved locally</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
