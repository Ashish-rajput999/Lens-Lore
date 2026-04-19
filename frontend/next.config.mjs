/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["next-sanity", "sanity"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      }
    ]
  }
};

export default nextConfig;
