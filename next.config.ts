// next.config.ts
import type { NextConfig } from "next";

// Environment variables are not directly available here, so we must access them via process.env.
// IMPORTANT: This file runs in a Node.js context, not a client/browser context.
// We must ensure NEXT_PUBLIC_SUPABASE_URL is defined in .env.local.

// Safely get the hostname from the full URL
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

let supabaseHostname = '';
if (supabaseUrl) {
    try {
        supabaseHostname = new URL(supabaseUrl).hostname;
    } catch (e) {
        console.error("Invalid UPABASE_URL in .env.local. Check format.");
        // Fallback or exit if necessary
    }
}

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
      // NEW ENTRY: Using the variable instead of hardcoding
      {
        protocol: 'https',
        hostname: supabaseHostname, // Dynamically set hostname
        // The path must include '/storage/v1/object/public/**' for public buckets
        pathname: '/storage/v1/object/public/**', 
      },
    ],
  },
};

export default nextConfig;