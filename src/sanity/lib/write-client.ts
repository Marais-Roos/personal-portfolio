import { createClient } from 'next-sanity';
import { projectId, dataset, apiVersion } from './client';

// This client uses the token and should ONLY be used in Server Actions or API routes
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // We always want fresh data when writing
  token: process.env.SANITY_API_WRITE_TOKEN, // The secret token
});