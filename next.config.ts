// next.config.ts
import type { NextConfig } from "next";

// --- Configuration for Sanity ---
const sanityImageHostname = 'cdn.sanity.io'; // Standard Sanity image CDN
// --- End Configuration ---


const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      // NEW: Sanity Image CDN
      {
        protocol: 'https',
        hostname: sanityImageHostname, 
      },
    ],
  },
};

export default nextConfig;