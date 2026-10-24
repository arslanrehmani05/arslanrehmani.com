import React from 'react';

export default function BrandLogo({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0 transition-transform duration-200 group-hover:scale-105`}
      aria-hidden="true"
    >
      {/* Outer squircle tile with dynamic LeftClick theme background and subtle border */}
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="7.5"
        className="fill-bg-secondary stroke-border-color"
        strokeWidth="1.2"
      />

      {/* Solid Architectural AR Monogram in dynamic LeftClick theme color */}
      <g className="fill-text-primary">
        {/* Central Shared Vertical Column */}
        <rect x="13.2" y="7.5" width="2.8" height="17" rx="0.5" />

        {/* 'A' Left Diagonal Strut */}
        <polygon points="6.5,24.5 9.8,24.5 15.2,7.5 12.6,7.5" />

        {/* 'A' Horizontal Bridge */}
        <rect x="9.5" y="16.5" width="4.5" height="2.4" />

        {/* 'R' Precision Upper Bowl with Crisp Negative Space Cutout */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 14.5 7.5 H 19.8 C 23.4 7.5 23.4 15.5 19.8 15.5 H 14.5 V 7.5 Z M 16.0 9.9 V 13.1 H 19.5 C 21.1 13.1 21.1 9.9 19.5 9.9 H 16.0 Z"
        />

        {/* 'R' Angular Kick */}
        <polygon points="15.8,14.6 18.8,14.6 25,24.5 21.8,24.5" />
      </g>
    </svg>
  );
}
