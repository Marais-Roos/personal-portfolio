// src/actions/projects.ts
'use server';

// Use the session-aware client (no Service Role Key needed)
import { createServerActionClient } from '@/utils/supabase/server'; 
import { revalidatePath } from "next/cache";

/**
 * Handles the authenticated upload and database insertion.
 * This function relies on the logged-in user having RLS permissions.
 */
export async function createProject(formData: FormData) {
    // 1. Initialize the session-aware client
    const supabase = await createServerActionClient(); 
    
    // 2. Security Check: Ensure a user is logged in
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        return { error: 'Authentication required. Please log in before submitting.' };
    }

    // --- 3. Extract and Validate Data (Logic remains the same) ---
    const slug = formData.get('slug') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const serviceSlugs = formData.get('serviceSlugs') as string;
    const mainImageFile = formData.get('mainImageFile') as File;
    const mainImageAltText = formData.get('mainImageAltText') as string;
    const galleryAltTextsRaw = formData.get('galleryAltTexts') as string;
    const galleryFiles = formData.getAll('galleryImageFiles').filter(
        (item): item is File => item instanceof File && item.size > 0
    );

    // ... (All validation and parsing logic remains here)
    if (!slug || !title || !description || !mainImageFile || !mainImageAltText) {
        return { error: 'Missing required fields.' };
    }
    const galleryAltTexts = galleryAltTextsRaw 
        ? galleryAltTextsRaw.split(',').map(t => t.trim()).filter(Boolean) 
        : [];
    if (galleryFiles.length > 0 && galleryFiles.length !== galleryAltTexts.length) {
         return { error: 'If uploading gallery images, the number of files must match the number of comma-separated alt texts provided.' };
    }
    
    let mainImageUrl = '';
    const galleryImages: { url: string; alt: string }[] = [];

    // --- 4. Upload Files (Relying on Authenticated RLS Policy) ---
    try {
        const filePath = `Projects/${slug}/main/${mainImageFile.name}`;
        
        // This upload uses the client authenticated by the session cookie
        const { error: uploadError } = await supabase.storage
            .from('portfolio-assets') 
            .upload(filePath, mainImageFile, { upsert: true });

        if (uploadError) {
            console.error("Storage upload error:", uploadError);
            // This error now means your RLS policies are too strict for logged-in users
            return { error: `Upload failed. You may need to update your RLS policies to allow authenticated 'INSERT'.` }; 
        }

        const { data: publicUrlData } = supabase.storage
            .from('portfolio-assets')
            .getPublicUrl(filePath);
            
        mainImageUrl = publicUrlData.publicUrl;

    } catch (e) {
        return { error: 'Failed to process file on server.' }; 
    }
    
    // ... (Gallery Upload logic here, using the same authenticated client)
    
    // --- 5. Insert DB entry (Relying on Authenticated RLS Policy) ---
    const { error: dbError } = await supabase
        .from('Projects')
        .insert({
            // ... (Insert data)
        });

    if (dbError) {
        console.error("Database insert error:", dbError);
        // This error now means your RLS policies are too strict for logged-in users
        return { error: `Database insert failed. You may need to update your RLS policies on the 'Projects' table for authenticated 'INSERT'.` };
    }
    
    revalidatePath('/projects');
    revalidatePath('/');

    return { success: `Project "${title}" created successfully!`, url: `/projects/${slug}` };
}