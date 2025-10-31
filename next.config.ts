import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
        // Optional: you can restrict the pathnames if needed, but not necessary here
        // pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
