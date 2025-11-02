// src/utils/supabase/client.ts

import { createBrowserClient } from '@supabase/ssr'

/**
 * Creates a Supabase client instance for use in Server Components,
 * where it is used to fetch public, non-authenticated data.
 * * It uses the NEXT_PUBLIC keys from .env.local.
 */
export function createClient() {
  return createBrowserClient(
    // process.env.NEXT_PUBLIC_SUPABASE_URL should be defined in .env.local
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY should be defined in .env.local
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}