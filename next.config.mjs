/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rematexperu.com",
      },
      {
        protocol: "https",
        hostname: "www.alibaba.com",
      },
      {
        protocol:'https',
        hostname:'s.alicdn.com'
      },
      {
        protocol:'https',
        hostname:'sc04.alicdn.com'
      },
      {
        protocol:'https',
        hostname:'res.cloudinary.com'
    }
      
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb',
    },
  },
};

export default nextConfig;
