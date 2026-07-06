import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Dynamic favicon renderer
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#C9A84C', // Brand gold color
          fontFamily: 'sans-serif',
          fontWeight: '900',
          borderRadius: '20%', // Rounded box shape
        }}
      >
        {"//"}
      </div>
    ),
    {
      ...size,
    }
  );
}
