'use client';

import React, { useEffect, useState } from 'react';
import { LogoVariant, DEFAULT_LOGO_VARIANT } from '@/lib/logo-variants';

interface BrandLogoProps {
  className?: string;
  variant?: LogoVariant;
  showTile?: boolean;
}

export default function BrandLogo({
  className = 'w-7 h-7',
  variant: propVariant,
  showTile = true,
}: BrandLogoProps) {
  const [activeVariant, setActiveVariant] = useState<LogoVariant>(propVariant || DEFAULT_LOGO_VARIANT);

  useEffect(() => {
    if (propVariant) {
      setActiveVariant(propVariant);
      return;
    }

    const saved = localStorage.getItem('site_logo_variant') as LogoVariant;
    if (saved && ['apex', 'prism', 'delta', 'brackets', 'architectural'].includes(saved)) {
      setActiveVariant(saved);
    }

    const handleVariantChange = (e: CustomEvent<LogoVariant>) => {
      if (e.detail) {
        setActiveVariant(e.detail);
      }
    };

    window.addEventListener('logo-variant-change', handleVariantChange as EventListener);
    return () => {
      window.removeEventListener('logo-variant-change', handleVariantChange as EventListener);
    };
  }, [propVariant]);

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0 transition-transform duration-200 group-hover:scale-105`}
      aria-hidden="true"
    >
      {/* Outer Squircle Container */}
      {showTile && (
        <>
          <rect
            x="1"
            y="1"
            width="30"
            height="30"
            rx="7"
            className="fill-bg-secondary stroke-border-color"
            strokeWidth="1.2"
          />
          <rect
            x="2.5"
            y="2.5"
            width="27"
            height="27"
            rx="5.5"
            className="stroke-border-color opacity-35"
            strokeWidth="0.5"
          />
        </>
      )}

      {/* CONCEPT 1: THE KINETIC APEX (Velocity & Precision Cursor) */}
      {activeVariant === 'apex' && (
        <g>
          {/* Left Wing (Solid Crisp Light) */}
          <path
            d="M 15.2 6.5 L 7.5 22.5 L 12 22.5 L 15.2 16 Z"
            className="fill-text-primary"
          />
          {/* Right Wing (Balanced Depth Facet) */}
          <path
            d="M 16.8 6.5 L 16.8 16 L 20 22.5 L 24.5 22.5 Z"
            className="fill-text-primary opacity-45"
          />
          {/* Central Precision Core Node */}
          <circle cx="16" cy="11.5" r="1.1" className="fill-text-primary" />
        </g>
      )}

      {/* CONCEPT 2: THE SYSTEMS PRISM (3D Isometric Software Architecture) */}
      {activeVariant === 'prism' && (
        <g>
          {/* Top Face (High light) */}
          <polygon
            points="16,6.5 23.5,10.8 16,15.2 8.5,10.8"
            className="fill-text-primary opacity-90 stroke-border-color"
            strokeWidth="0.5"
          />
          {/* Left Face (Mid surface glass) */}
          <polygon
            points="8.5,10.8 16,15.2 16,24.2 8.5,19.8"
            className="fill-text-primary opacity-30 stroke-border-color"
            strokeWidth="0.5"
          />
          {/* Right Face (Deep obsidian facet) */}
          <polygon
            points="16,15.2 23.5,10.8 23.5,19.8 16,24.2"
            className="fill-text-primary opacity-55 stroke-border-color"
            strokeWidth="0.5"
          />
          {/* Central Core Nexus */}
          <circle cx="16" cy="15.2" r="1.2" className="fill-text-primary" />
        </g>
      )}

      {/* CONCEPT 3: THE DELTA CORE (Aerospace & AI Research Mark) */}
      {activeVariant === 'delta' && (
        <g>
          {/* Precision Delta Arrowhead */}
          <path
            d="M 16 6.5 L 24.5 22.5 L 19.5 22.5 L 16 16 L 12.5 22.5 L 7.5 22.5 Z"
            className="fill-text-primary"
          />
          {/* Floating Diamond Core Aperture */}
          <polygon
            points="16,10 18.2,13 16,16 13.8,13"
            className="fill-bg-primary stroke-text-primary"
            strokeWidth="0.8"
          />
        </g>
      )}

      {/* CONCEPT 4: THE TERMINAL CHEVRONS (Automated Pipelines & Execution) */}
      {activeVariant === 'brackets' && (
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Lead Chevron */}
          <path
            d="M 10.5 8.5 L 18 16 L 10.5 23.5"
            fill="none"
            className="stroke-text-primary"
            strokeWidth="2.4"
          />
          {/* Lag Chevron */}
          <path
            d="M 16.5 8.5 L 24 16 L 16.5 23.5"
            fill="none"
            className="stroke-text-primary opacity-40"
            strokeWidth="2.4"
          />
        </g>
      )}

      {/* CONCEPT 5: THE ARCHITECTURAL AR (Clean Swiss Hairline Monogram) */}
      {activeVariant === 'architectural' && (
        <g>
          <g
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="stroke-text-primary"
          >
            {/* Pure Architectural A */}
            <path d="M 7.5 22.5 L 13.5 9.5 L 19.5 22.5" strokeWidth="1.8" />
            <path d="M 9.8 17.8 H 17.2" strokeWidth="1.6" />
            {/* Architectural R Loop and Leg */}
            <path
              d="M 13.5 9.5 H 19.2 C 22.2 9.5, 22.2 15.5, 19.2 15.5 H 13.5"
              strokeWidth="1.8"
            />
            <path d="M 17 15.5 L 23 22.5" strokeWidth="1.8" />
          </g>
          {/* Apex Precision Dot */}
          <circle cx="13.5" cy="9.5" r="1.1" className="fill-text-primary" />
        </g>
      )}
    </svg>
  );
}
