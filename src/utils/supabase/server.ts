// src/utils/supabase/server.ts

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Creates a Supabase client instance specifically for Server Components
 * or Server Actions that need access to the request/response context (cookies).
 * This ensures session management works correctly on the server.
 */
// MARKED ASYNC
export async function createServerActionClient() {
  // AWAIT cookies()
  const cookieStore = await cookies()

  return createServerClient(
    // Public keys are automatically picked up from environment
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Use the synchronous methods on the AWAITED cookieStore
        get: (name: string) => cookieStore.get(name)?.value,
        set: (name: string, value: string, options: any) => {
          cookieStore.set({ name, value, ...options })
        },
        remove: (name: string, options: any) => {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}