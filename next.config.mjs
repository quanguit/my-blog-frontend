/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.1.7',
        port: '1337',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
