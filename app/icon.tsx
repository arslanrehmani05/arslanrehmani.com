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
          background: '#0A0A0A',
          borderRadius: '7px',
        }}
      >
        <defs>
          <linearGradient id="ar-site-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3E5AB" />
            <stop offset="45%" stopColor="#C9A84C" />
            <stop offset="100%" stopColor="#9A7B2C" />
          </linearGradient>
          <radialGradient id="ar-site-bg-grad" cx="50%" cy="50%" r="75%">
            <stop offset="0%" stopColor="#161616" />
            <stop offset="100%" stopColor="#0A0A0A" />
          </radialGradient>
        </defs>

        <rect x="1" y="1" width="30" height="30" rx="7" fill="url(#ar-site-bg-grad)" stroke="url(#ar-site-gold-grad)" strokeWidth="1.2" strokeOpacity="0.9" />
        <rect x="2.5" y="2.5" width="27" height="27" rx="5.5" fill="none" stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.3" />

        <g strokeLinecap="round" strokeLinejoin="round">
          <path d="M 21.5 12 C 21.5 9.8, 18.5 8.5, 16 8.5 C 12.5 8.5, 10.5 10.8, 10.5 13 C 10.5 17, 21.5 15.5, 21.5 19.5 C 21.5 22, 19 23.5, 16 23.5 C 12.8 23.5, 10.2 21.8, 10.2 19.5" stroke="url(#ar-site-gold-grad)" strokeWidth="2.2" />
          <path d="M 21.5 8.5 L 23.5 6.5" stroke="#F5F5F0" strokeWidth="1.8" />
        </g>

        <circle cx="23.5" cy="6.5" r="1.1" fill="#F3E5AB" />
      </svg>
    ),
    {
      ...size,
    }
  );
}
