import Link from 'next/link';

export default function Custom500() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0A0A0A',
      color: '#F5F5F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem',
    }}>
      <div style={{
        maxWidth: '420px',
        width: '100%',
        backgroundColor: '#111111',
        border: '1px solid #2A2A2A',
        borderRadius: '24px',
        padding: '2rem',
        textAlign: 'center',
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#F5F5F0' }}>
          500 - Server Error
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#888888', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          An internal server error occurred. Please refresh or return home.
        </p>
        <Link href="/" style={{
          display: 'inline-block',
          backgroundColor: '#C9A84C',
          color: '#000000',
          padding: '0.75rem 1.5rem',
          borderRadius: '12px',
          fontWeight: '600',
          fontSize: '0.875rem',
          textDecoration: 'none',
        }}>
          Return Home
        </Link>
      </div>
    </div>
  );
}
