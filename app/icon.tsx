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
          background: '#080808',
          borderRadius: '7px',
        }}
      >
        <defs>
          <linearGradient id="ar-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3E5AB" />
            <stop offset="45%" stopColor="#C9A84C" />
            <stop offset="100%" stopColor="#9A7B2C" />
          </linearGradient>
          <radialGradient id="ar-bg-grad" cx="50%" cy="50%" r="75%">
            <stop offset="0%" stopColor="#161616" />
            <stop offset="100%" stopColor="#080808" />
          </radialGradient>
        </defs>

        <rect x="1" y="1" width="30" height="30" rx="7" fill="url(#ar-bg-grad)" stroke="url(#ar-gold-grad)" strokeWidth="1.2" strokeOpacity="0.85" />
        <rect x="2.5" y="2.5" width="27" height="27" rx="5.5" fill="none" stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.25" />

        <g strokeLinecap="round" strokeLinejoin="round">
          <path d="M 9 22.5 L 15 9.5" stroke="#F5F5F0" strokeWidth="2.2" />
          <path d="M 15 9.5 V 22.5" stroke="#F5F5F0" strokeWidth="2.2" />
          <path d="M 11 17.5 H 18.5" stroke="url(#ar-gold-grad)" strokeWidth="2" />
          <path d="M 15 9.5 H 20 C 22.8 9.5, 22.8 15.5, 20 15.5 H 15" stroke="url(#ar-gold-grad)" strokeWidth="2" />
          <path d="M 17.5 15.5 L 23 22.5" stroke="url(#ar-gold-grad)" strokeWidth="2.2" />
        </g>

        <circle cx="15" cy="9.5" r="1.1" fill="#F3E5AB" />
      </svg>
    ),
    {
      ...size,
    }
  );
}
