/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      }
    ],
    domains: [
      'res.cloudinary.com',
      "",
    ],
  },
};

module.exports = nextConfig;
