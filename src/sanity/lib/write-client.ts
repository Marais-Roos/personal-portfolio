import { createClient } from 'next-sanity';
import { projectId, dataset, apiVersion } from './client';

// Validate that the write token exists
const writeToken = process.env.SANITY_API_WRITE_TOKEN;

if (!writeToken) {
  throw new Error(
    'Missing SANITY_API_WRITE_TOKEN. Contact form submissions will fail. ' +
    'Please add this to your .env.local file.'
  );
}

// This client uses the token and should ONLY be used in Server Actions or API routes
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // We always want fresh data when writing
  token: writeToken,
});