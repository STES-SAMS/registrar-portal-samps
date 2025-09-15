/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://ursmartmonitoring.ur.ac.rw/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
