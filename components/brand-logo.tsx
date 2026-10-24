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
      {/* Outer squircle matching LeftClick theme */}
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="7"
        className="fill-bg-secondary stroke-border-color"
        strokeWidth="1.2"
      />

      {/* Subtle inner perimeter frame for executive depth */}
      <rect
        x="2.5"
        y="2.5"
        width="27"
        height="27"
        rx="5.5"
        className="stroke-border-color opacity-50"
        strokeWidth="0.5"
      />

      {/* Signature Monogram Mark in dynamic LeftClick theme color */}
      <g strokeLinecap="round" strokeLinejoin="round" className="stroke-text-primary">
        {/* 'A' Left Diagonal Stem */}
        <path d="M 9 22.5 L 15 9.5" strokeWidth="2.2" />

        {/* Central Shared Vertical Stem */}
        <path d="M 15 9.5 V 22.5" strokeWidth="2.2" />

        {/* 'A' Crossbar */}
        <path d="M 11 17.5 H 18.5" strokeWidth="2" />

        {/* 'R' Precision Upper Loop */}
        <path d="M 15 9.5 H 20 C 22.8 9.5, 22.8 15.5, 20 15.5 H 15" strokeWidth="2" />

        {/* 'R' Dynamic Diagonal Leg */}
        <path d="M 17.5 15.5 L 23 22.5" strokeWidth="2.2" />
      </g>

      {/* Signature Precision Node at Apex */}
      <circle cx="15" cy="9.5" r="1.1" className="fill-text-primary" />
    </svg>
  );
}
