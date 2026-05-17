import type { NextConfig } from "next"

const nextConfig: NextConfig = {
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
