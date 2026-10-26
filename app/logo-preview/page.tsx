'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, ShieldCheck, Zap, Layers, Terminal, Sparkles, ArrowLeft } from 'lucide-react';
import BrandLogo from '@/components/brand-logo';
import { LOGO_OPTIONS, LogoVariant, DEFAULT_LOGO_VARIANT } from '@/lib/logo-variants';

export default function LogoPreviewPage() {
  const [activeVariant, setActiveVariant] = useState<LogoVariant>(DEFAULT_LOGO_VARIANT);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('site_logo_variant') as LogoVariant;
    if (saved && LOGO_OPTIONS.some((opt) => opt.id === saved)) {
      setActiveVariant(saved);
    }
  }, []);

  const handleActivate = (variant: LogoVariant) => {
    setActiveVariant(variant);
    localStorage.setItem('site_logo_variant', variant);
    window.dispatchEvent(new CustomEvent('logo-variant-change', { detail: variant }));
    setCopiedId(variant);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getVariantIcon = (id: LogoVariant) => {
    switch (id) {
      case 'apex':
        return <Zap className="w-4 h-4 text-text-primary" />;
      case 'prism':
        return <Layers className="w-4 h-4 text-text-primary" />;
      case 'delta':
        return <ShieldCheck className="w-4 h-4 text-text-primary" />;
      case 'brackets':
        return <Terminal className="w-4 h-4 text-text-primary" />;
      case 'architectural':
        return <Sparkles className="w-4 h-4 text-text-primary" />;
    }
  };

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Navigation back */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors py-1 px-3 rounded-lg bg-bg-secondary border border-border-color"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-border-color text-xs font-mono text-text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Brand Identity System &bull; LeftClick Architectural Alignment</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-text-primary">
            Logo & Favicon Laboratory
          </h1>
          <p className="text-base sm:text-lg text-text-muted leading-relaxed">
            Moving beyond clunky letter monograms. Here are 5 modern, geometric identity concepts designed specifically for an{' '}
            <strong className="text-text-primary font-medium">Operational AI Systems Builder</strong>. Each mark is engineered for razor-sharp clarity from a 16px browser tab up to high-resolution displays, in both Dark and Light themes.
          </p>
        </div>

        {/* Live Active Bar */}
        <div className="p-4 sm:p-6 rounded-2xl bg-bg-secondary border border-border-color flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-bg-primary border border-border-color flex items-center justify-center p-2">
              <BrandLogo variant={activeVariant} className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-text-subtle font-mono">
                Currently Active Across Entire Site
              </div>
              <div className="text-base font-medium text-text-primary flex items-center gap-2">
                <span>{LOGO_OPTIONS.find((o) => o.id === activeVariant)?.name}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-bg-surface border border-border-color text-text-muted font-mono">
                  {activeVariant}
                </span>
              </div>
            </div>
          </div>
          <p className="text-xs text-text-muted max-w-xs">
            Any selection you make below updates your entire site header, footer, and navigation in real time.
          </p>
        </div>

        {/* Candidates Grid */}
        <div className="space-y-12">
          <div className="border-b border-border-color pb-4">
            <h2 className="text-xl font-medium text-text-primary">Exploration Candidates</h2>
            <p className="text-sm text-text-muted mt-1">
              Test each identity at high resolution, favicon scale, and in simulated header navigation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10">
            {LOGO_OPTIONS.map((opt, idx) => {
              const isActive = activeVariant === opt.id;
              const isRecommended = opt.id === 'apex';

              return (
                <section
                  key={opt.id}
                  className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-bg-secondary/70 border-text-primary/30 shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
                      : 'bg-bg-secondary/30 border-border-color hover:border-border-color/80'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Concept Info */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-bg-surface border border-border-color flex items-center justify-center text-xs font-mono text-text-subtle">
                          0{idx + 1}
                        </span>
                        {getVariantIcon(opt.id)}
                        <h3 className="text-xl font-medium text-text-primary">{opt.name}</h3>
                        {isRecommended && (
                          <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-text-primary/10 border border-text-primary/20 text-text-primary">
                            Recommended
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-medium text-text-subtle uppercase tracking-wider font-mono">
                        {opt.tagline}
                      </p>

                      <p className="text-sm text-text-muted leading-relaxed">
                        {opt.description}
                      </p>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => handleActivate(opt.id)}
                          className={`btn-primary !px-5 !py-2.5 !text-sm flex items-center gap-2 ${
                            isActive
                              ? '!bg-emerald-500 !text-black !border-emerald-400'
                              : ''
                          }`}
                        >
                          {isActive ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>Active Brand Logo</span>
                            </>
                          ) : copiedId === opt.id ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>Applied!</span>
                            </>
                          ) : (
                            <>
                              <span>Set as Active Logo</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Visual Comparison Matrix */}
                    <div className="lg:col-span-7 space-y-6">
                      {/* Dual Canvas: Dark vs Light Theme Render */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Dark Obsidian Tile */}
                        <div className="p-6 rounded-2xl bg-[#111113] border border-white/10 flex flex-col items-center justify-center gap-3 text-center">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-white/50">
                            Dark Obsidian Theme
                          </span>
                          <div className="w-20 h-20 flex items-center justify-center">
                            <BrandLogo variant={opt.id} className="w-16 h-16" />
                          </div>
                          <span className="text-xs text-white/70 font-mono">#111113 Canvas</span>
                        </div>

                        {/* Light Theme Tile */}
                        <div className="p-6 rounded-2xl bg-[#f7f7f8] border border-black/10 flex flex-col items-center justify-center gap-3 text-center">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-black/50">
                            Light Mode Theme
                          </span>
                          <div className="w-20 h-20 flex items-center justify-center text-black">
                            <svg
                              viewBox="0 0 32 32"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-16 h-16 shrink-0"
                            >
                              <rect
                                x="1"
                                y="1"
                                width="30"
                                height="30"
                                rx="7"
                                fill="#ffffff"
                                stroke="rgba(0, 0, 0, 0.16)"
                                strokeWidth="1.2"
                              />
                              <rect
                                x="2.5"
                                y="2.5"
                                width="27"
                                height="27"
                                rx="5.5"
                                fill="none"
                                stroke="rgba(0, 0, 0, 0.08)"
                                strokeWidth="0.5"
                              />
                              {opt.id === 'apex' && (
                                <g>
                                  <path d="M 15.2 6.5 L 7.5 22.5 L 12 22.5 L 15.2 16 Z" fill="#000000" />
                                  <path d="M 16.8 6.5 L 16.8 16 L 20 22.5 L 24.5 22.5 Z" fill="rgba(0, 0, 0, 0.45)" />
                                  <circle cx="16" cy="11.5" r="1.1" fill="#000000" />
                                </g>
                              )}
                              {opt.id === 'prism' && (
                                <g>
                                  <polygon points="16,6.5 23.5,10.8 16,15.2 8.5,10.8" fill="#000000" opacity="0.85" />
                                  <polygon points="8.5,10.8 16,15.2 16,24.2 8.5,19.8" fill="#000000" opacity="0.25" />
                                  <polygon points="16,15.2 23.5,10.8 23.5,19.8 16,24.2" fill="#000000" opacity="0.5" />
                                  <circle cx="16" cy="15.2" r="1.2" fill="#000000" />
                                </g>
                              )}
                              {opt.id === 'delta' && (
                                <g>
                                  <path d="M 16 6.5 L 24.5 22.5 L 19.5 22.5 L 16 16 L 12.5 22.5 L 7.5 22.5 Z" fill="#000000" />
                                  <polygon points="16,10 18.2,13 16,16 13.8,13" fill="#ffffff" stroke="#000000" strokeWidth="0.8" />
                                </g>
                              )}
                              {opt.id === 'brackets' && (
                                <g strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M 10.5 8.5 L 18 16 L 10.5 23.5" fill="none" stroke="#000000" strokeWidth="2.4" />
                                  <path d="M 16.5 8.5 L 24 16 L 16.5 23.5" fill="none" stroke="#000000" opacity="0.4" strokeWidth="2.4" />
                                </g>
                              )}
                              {opt.id === 'architectural' && (
                                <g strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="#000000">
                                  <path d="M 7.5 22.5 L 13.5 9.5 L 19.5 22.5" strokeWidth="1.8" />
                                  <path d="M 9.8 17.8 H 17.2" strokeWidth="1.6" />
                                  <path d="M 13.5 9.5 H 19.2 C 22.2 9.5, 22.2 15.5, 19.2 15.5 H 13.5" strokeWidth="1.8" />
                                  <path d="M 17 15.5 L 23 22.5" strokeWidth="1.8" />
                                  <circle cx="13.5" cy="9.5" r="1.1" fill="#000000" />
                                </g>
                              )}
                            </svg>
                          </div>
                          <span className="text-xs text-black/70 font-mono">#f7f7f8 Canvas</span>
                        </div>
                      </div>

                      {/* Scale Test (From Favicon 16px to Header 28px) */}
                      <div className="p-4 rounded-xl bg-bg-surface border border-border-color space-y-2">
                        <div className="text-[10px] uppercase font-mono tracking-wider text-text-subtle">
                          Scale Fidelity Test (16px Favicon &bull; 24px Mobile &bull; 28px Header &bull; 44px Card)
                        </div>
                        <div className="flex items-center gap-6 py-2">
                          {/* 16px Browser Tab */}
                          <div className="flex flex-col items-center gap-1.5">
                            <div className="w-5 h-5 flex items-center justify-center p-0.5 bg-bg-secondary rounded">
                              <BrandLogo variant={opt.id} className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] text-text-subtle font-mono">16px tab</span>
                          </div>

                          {/* 24px */}
                          <div className="flex flex-col items-center gap-1.5">
                            <BrandLogo variant={opt.id} className="w-6 h-6" />
                            <span className="text-[10px] text-text-subtle font-mono">24px</span>
                          </div>

                          {/* 28px Nav */}
                          <div className="flex flex-col items-center gap-1.5">
                            <BrandLogo variant={opt.id} className="w-7 h-7" />
                            <span className="text-[10px] text-text-subtle font-mono">28px nav</span>
                          </div>

                          {/* 44px */}
                          <div className="flex flex-col items-center gap-1.5">
                            <BrandLogo variant={opt.id} className="w-11 h-11" />
                            <span className="text-[10px] text-text-subtle font-mono">44px</span>
                          </div>
                        </div>
                      </div>

                      {/* Simulated In-Situ Navigation Mockup */}
                      <div className="p-3.5 rounded-xl bg-bg-primary border border-border-color flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <BrandLogo variant={opt.id} className="w-7 h-7" />
                          <span className="text-sm font-medium tracking-tight text-text-primary">
                            Arslan Rehmani
                          </span>
                        </div>
                        <div className="hidden sm:flex items-center gap-4 text-xs text-text-muted">
                          <span>Case Studies</span>
                          <span>Services</span>
                          <span className="text-text-primary font-medium">Free Diagnostics</span>
                        </div>
                        <div className="text-[11px] px-2 py-1 rounded bg-bg-secondary border border-border-color text-text-muted">
                          Preview Header
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>

        {/* Technical Architecture Note */}
        <div className="p-6 rounded-2xl bg-bg-secondary/40 border border-border-color text-sm text-text-muted space-y-2">
          <div className="flex items-center gap-2 text-text-primary font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>How Identity Assets Are Synchronized</span>
          </div>
          <p className="leading-relaxed">
            The active identity mark is rendered dynamically as a scalable SVG across <code className="text-xs bg-bg-surface px-1.5 py-0.5 rounded text-text-primary">components/brand-logo.tsx</code>, vector favicon at <code className="text-xs bg-bg-surface px-1.5 py-0.5 rounded text-text-primary">public/favicon.svg</code> (with native <code className="text-xs bg-bg-surface px-1.5 py-0.5 rounded text-text-primary">@media (prefers-color-scheme)</code> browser tab switching), dynamic Next.js App Router metadata icons, and raster PWA app icons generated via Sharp.
          </p>
        </div>
      </div>
    </main>
  );
}
