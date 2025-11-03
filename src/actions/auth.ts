// src/actions/auth.ts
'use server';

import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';

/**
 * Handles user sign-in via email and password using Supabase Auth.
 * @param formData The form data containing email and password.
 */
export async function signIn(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    // 1. Initialize the public Supabase client (runs on the server for security)
    const supabase = createClient();

    // 2. Perform the sign-in
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error("Sign-in failed:", error.message);
        // Return an object with an error message to the client component
        return { error: 'Authentication failed. Please check your email and password.' };
    }
    
    // 3. On success, redirect to the protected admin page
    redirect('/admin');
}

/**
 * Handles user sign-out.
 */
export async function signOut() {
    const supabase = createClient();
    
    // Clear the session on Supabase
    await supabase.auth.signOut();
    
    // Redirect to the admin page (which will redirect to login)
    redirect('/admin');
}

/**
 * Helper to get the current session on the server.
 */
export async function getSession() {
    const supabase = createClient();
    // This is the core function that reads the secure cookie and validates the session
    const { data: { session } } = await supabase.auth.getSession();
    return session;
}