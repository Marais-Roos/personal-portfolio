import { createClient as createServerClient } from '@supabase/supabase-js';

/**
 * Creates a Supabase client with the Service Role Key.
 * WARNING: This client bypasses Row Level Security (RLS) and should ONLY
 * be used in secure, server-only contexts (like Server Actions).
 */
export function createServiceRoleClient() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing Supabase credentials in environment variables (SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY).');
  }

  // Uses the plain supabase-js package for a server environment
  return createServerClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}