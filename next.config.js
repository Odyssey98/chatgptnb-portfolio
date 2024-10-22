/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return process.env.NODE_ENV === 'development'
      ? [] // 在开发模式下不应用 CSP
      : [
          {
            source: '/:path*',
            headers: [
              {
                key: 'Content-Security-Policy',
                value: `
                  default-src 'self';
                  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com https://cdn.seline.so https://dashboard.10xlaunch.ai;
                  connect-src 'self' https://api.seline.so;
                  font-src 'self' data:;
                  img-src 'self' data: https://*.gstatic.com https://*.googleapis.com https://pic.imgdb.cn;
                  style-src 'self' 'unsafe-inline';
                  frame-src 'self' https://www.google.com;
                `.replace(/\s+/g, ' ').trim(),
              },
            ],
          },
        ];
  },
  images: {
    domains: ['pic.imgdb.cn'],
  },
};

module.exports = nextConfig;
