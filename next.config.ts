// next.config.ts
import type { NextConfig } from "next";

// Safely get the hostname from the full URL
const supabaseUrl = process.env.SUPABASE_URL;

let supabaseHostname = '';
if (supabaseUrl) {
    try {
        // Use URL to correctly parse the hostname for the images configuration
        supabaseHostname = new URL(supabaseUrl).hostname;
    } catch (e) {
        console.error("Invalid SUPABASE_URL in .env.local. Check format.");
        // Fallback or exit if necessary
    }
}

// Set the nextConfig object based on your latest file state, excluding the problematic keys.
const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

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
      // IMPORTANT: This allows loading images from your Supabase storage bucket
      {
        protocol: 'https',
        hostname: supabaseHostname, // Dynamically set hostname from .env.local
        // The path must include '/storage/v1/object/public/**' for public buckets
        pathname: '/storage/v1/object/public/**', 
      },
    ],
  },
// We keep the 'as any' casting to prevent any potential type issues with 'NextConfig'
}; 

export default nextConfig;