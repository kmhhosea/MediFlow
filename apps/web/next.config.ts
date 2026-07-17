import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.s3.amazonaws.com',
      },
    ],
  },
  outputFileTracingRoot: path.join(__dirname, '../../'),
};

export default nextConfig;