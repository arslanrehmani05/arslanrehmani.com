import React from 'react';

interface BrandLogoProps {
  className?: string;
  showTile?: boolean;
}

export default function BrandLogo({
  className = 'w-7 h-7',
  showTile = true,
}: BrandLogoProps) {
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

      {/* Vector Mark */}
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
    </svg>
  );
}
