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
      }
      
    ],
  },
};

export default nextConfig;
