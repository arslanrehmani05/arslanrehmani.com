import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <svg
        width="180"
        height="180"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#111113',
          borderRadius: '36px',
        }}
      >
        {/* Outer Squircle Container */}
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="7"
          fill="#111113"
          stroke="rgba(255, 255, 255, 0.22)"
          strokeWidth="1.2"
        />
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

        {/* Vector Mark "A" */}
        <g>
          {/* Left Wing (Solid Crisp Light) */}
          <path
            d="M 15.2 6.5 L 7.5 22.5 L 12 22.5 L 15.2 16 Z"
            fill="#f0f0f2"
          />
          {/* Right Wing (Balanced Depth Facet) */}
          <path
            d="M 16.8 6.5 L 16.8 16 L 20 22.5 L 24.5 22.5 Z"
            fill="rgba(240, 240, 242, 0.45)"
          />
          {/* Central Precision Core Node */}
          <circle cx="16" cy="11.5" r="1.1" fill="#ffffff" />
        </g>
      </svg>
    ),
    {
      ...size,
    }
  );
}
