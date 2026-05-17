import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'rombo.pro' }],
        destination: 'https://www.rombo.pro/:path*',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-store, no-cache' }],
      },
      {
        source: '/studio/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-store, no-cache' }],
      },
    ]
  },
}

export default nextConfig
