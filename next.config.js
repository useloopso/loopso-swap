/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['res.cloudinary.com'],
      remotePatterns: [
        {
          protocol: "https",
          protocol: "http",
          hostname: "**",
        },
      ],
    },
}

module.exports = nextConfig
