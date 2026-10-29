import React from 'react';

export default function BrandLogo({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer Squircle Tile */}
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="7"
        fill="#111113"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1.2"
      />

      {/* Subtle Inner Perimeter Frame for Depth */}
      <rect
        x="2.5"
        y="2.5"
        width="27"
        height="27"
        rx="5.5"
        fill="none"
        stroke="rgba(255, 255, 255, 0.10)"
        strokeWidth="0.5"
      />

      {/* Brand Vector Mark */}
      <g>
        {/* Left Wing (Solid Crisp White) */}
        <path d="M 15.2 6.5 L 7.5 22.5 L 12 22.5 L 15.2 16 Z" fill="#f0f0f2" />

        {/* Right Wing (Balanced Depth Facet) */}
        <path d="M 16.8 6.5 L 16.8 16 L 20 22.5 L 24.5 22.5 Z" fill="rgba(240, 240, 242, 0.48)" />

        {/* Central Precision Core Node */}
        <circle cx="16" cy="11.5" r="1.1" fill="#ffffff" />
      </g>
    </svg>
  );
}
