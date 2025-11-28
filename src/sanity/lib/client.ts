// src/sanity/lib/client.ts
import { createClient } from 'next-sanity';

// CONFIGURATION
// These are pulled from your .env.local file
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
// Use the recommended API version
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-01';

if (!projectId || !dataset) {
  throw new Error(
    'Missing Sanity Project ID or Dataset. Please check your .env.local file.'
  );
}

// FIX: Renamed from 'sanityClient' to 'client' to satisfy src/sanity/lib/live.ts
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for faster static data fetching
});

/**
 * Export a function to get the client instance for use in server components.
 */
export function getSanityClient() {
  // Returns the client instance
  return client;
}