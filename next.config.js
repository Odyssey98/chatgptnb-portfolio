/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com https://cdn.seline.so; connect-src 'self' https://api.seline.so; font-src 'self' data:; img-src 'self' data: https://*.gstatic.com https://*.googleapis.com; style-src 'self' 'unsafe-inline';`,
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;