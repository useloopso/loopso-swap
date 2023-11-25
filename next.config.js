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
      },
    ],
    domains: [
      "",
      "bafybeidl4qaedrfyo5mkfove4sjffod43wvxmshlxwtg5zvtkrlcawxjbu.ipfs.localhost",
    ]
  },
};

module.exports = nextConfig;
