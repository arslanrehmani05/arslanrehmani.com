/** @type {import('next').NextConfig} */
const nextConfig = {
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
