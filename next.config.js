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
      {
        protocol: "http",
        hostname: "",
      },
      {
        protocol: "http",
        hostname: "bafybeidl4qaedrfyo5mkfove4sjffod43wvxmshlxwtg5zvtkrlcawxjbu.ipfs.localhost",
      }
    ],
  },
};

module.exports = nextConfig;
