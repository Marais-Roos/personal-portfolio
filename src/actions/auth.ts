// src/actions/auth.ts
'use server';

import { createServerActionClient } from '@/utils/supabase/server'; 
import { redirect } from 'next/navigation';

/**
 * Handles user sign-in via email and password using Supabase Auth.
 * @param formData The form data containing email and password.
 */
export async function signIn(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    // 1. Create a Supabase Client that runs on the server and is cookie-aware
    const supabase = await createServerActionClient();

    // 2. Perform the sign-in
    const { error } = await supabase.auth.signInWithPassword({
        // FIX: Using explicit longhand notation to resolve the TypeScript error
        email: email, 
        password: password, 
    });

    if (error) {
        console.error("Sign-in failed:", error.message);
        return { error: 'Authentication failed. Please check your email and password.' };
    }
    
    redirect('/admin');
}

/**
 * Handles user sign-out.
 */
export async function signOut() {
    const supabase = await createServerActionClient();
    
    // Clear the session on Supabase
    await supabase.auth.signOut();
    
    // Redirect to the admin page (which will redirect to login)
    redirect('/admin');
}

/**
 * Helper to get the current session on the server.
 */
export async function getSession() {
    const supabase = await createServerActionClient();
    const { data: { session } } = await supabase.auth.getSession();
    return session;
}