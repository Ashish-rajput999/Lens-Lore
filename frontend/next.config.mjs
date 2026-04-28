/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["next-sanity", "sanity"],

  // Don't fail production builds on ESLint warnings
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
