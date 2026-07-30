import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0A0A',
          borderRadius: '36px',
          border: '2px solid rgba(201, 168, 76, 0.5)',
          position: 'relative',
        }}
      >
        <div
          style={{
            fontSize: '92px',
            fontFamily: 'Georgia, serif',
            fontWeight: '600',
            fontStyle: 'italic',
            color: '#C9A84C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing: '-4px',
          }}
        >
          AR
        </div>
        <div
          style={{
            width: '40px',
            height: '2px',
            background: '#C9A84C',
            marginTop: '8px',
            borderRadius: '1px',
            opacity: 0.8,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
