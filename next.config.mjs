/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
        ],
      },
      {
        source: '/manifest.webmanifest',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
  // The homepage is the site. These paths were previously indexed as standalone
  // pages, so they redirect to their homepage anchors at the server rather than
  // rendering a page that bounces client-side.
  async redirects() {
    return [
      { source: '/work', destination: '/#proof', permanent: true },
      { source: '/about', destination: '/#about', permanent: true },
    ];
  },
};

export default nextConfig;

