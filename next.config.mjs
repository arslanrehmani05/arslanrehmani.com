/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Routes removed in the November 2026 restructure. Keep old links working.
  async redirects() {
    return [
      { source: '/projects', destination: '/products', permanent: true },
      { source: '/agents', destination: '/services', permanent: true },
      { source: '/industries', destination: '/work', permanent: true },
      { source: '/enterprise', destination: '/services', permanent: true },
      { source: '/security', destination: '/services', permanent: true },
      { source: '/proof-ledger', destination: '/work', permanent: true },
      { source: '/lab', destination: '/products', permanent: true },
      { source: '/diagnostics', destination: '/tools', permanent: true },
      { source: '/tools/audit', destination: '/tools', permanent: true },
      { source: '/tools/decision', destination: '/tools/automation-finder', permanent: true },
      { source: '/tools/cost-estimator', destination: '/tools/hire-buy-build', permanent: true },
      { source: '/tools/access-audit', destination: '/tools/readiness', permanent: true },
    ];
  },
};

export default nextConfig;
