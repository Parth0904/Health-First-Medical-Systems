/** @type {import('next').NextConfig} */
const nextConfig = {
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '5.imimg.com',
      },
      {
        protocol: 'https',
        hostname: '**.imimg.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        // Preserve Next.js default trailing-slash removal everywhere except /admin/sales/ (PWA scope).
        source: '/:path((?!admin/sales/?$).+)/',
        destination: '/:path',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/admin/sales/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/admin/sales/',
          },
        ],
      },
      {
        source: '/admin/sales/manifest.webmanifest',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
