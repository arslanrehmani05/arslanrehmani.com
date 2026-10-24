import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#111113',
          borderRadius: '7px',
        }}
      >
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

        <g strokeLinecap="round" strokeLinejoin="round">
          <path d="M 9 22.5 L 15 9.5" stroke="#f0f0f2" strokeWidth="2.2" />
          <path d="M 15 9.5 V 22.5" stroke="#f0f0f2" strokeWidth="2.2" />
          <path d="M 11 17.5 H 18.5" stroke="#ffffff" strokeWidth="2" />
          <path d="M 15 9.5 H 20 C 22.8 9.5, 22.8 15.5, 20 15.5 H 15" stroke="#ffffff" strokeWidth="2" />
          <path d="M 17.5 15.5 L 23 22.5" stroke="#ffffff" strokeWidth="2.2" />
        </g>

        <circle cx="15" cy="9.5" r="1.1" fill="#ffffff" />
      </svg>
    ),
    {
      ...size,
    }
  );
}
