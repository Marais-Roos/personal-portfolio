// src/actions/projects.ts

'use server'; // Marks all exports in this file as server-side functions (Server Actions)

import { createServiceRoleClient } from "@/utils/supabase/server-admin";
import { revalidatePath } from "next/cache";

/**
 * Handles the upload of project files to Supabase Storage and inserts a new project row.
 * WARNING: This is highly sensitive to the 1MB payload limit in your Next.js version.
 */
export async function createProject(formData: FormData) {
    const supabase = createServiceRoleClient();
    
    // 1. Extract form data
    const slug = formData.get('slug') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const serviceSlugs = formData.get('serviceSlugs') as string;
    const mainImageFile = formData.get('mainImageFile') as File;
    
    // Alt Text and Gallery Fields
    const mainImageAltText = formData.get('mainImageAltText') as string;
    const galleryAltTextsRaw = formData.get('galleryAltTexts') as string;
    const galleryFiles = formData.getAll('galleryImageFiles').filter(
        (item): item is File => item instanceof File && item.size > 0
    );

    // Validation
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

    // --- 2. Upload Main Image ---
    try {
        const filePath = `Projects/${slug}/main/${mainImageFile.name}`;
        
        // This is the operation that must carry the large file payload
        const { error } = await supabase.storage
            .from('portfolio-assets') 
            .upload(filePath, mainImageFile, { upsert: true });

        if (error) {
            console.error("Main image upload error:", error);
            return { error: `Main image upload failed: ${error.message}` };
        }

        const { data: publicUrlData } = supabase.storage
            .from('portfolio-assets')
            .getPublicUrl(filePath);
            
        mainImageUrl = publicUrlData.publicUrl;

    } catch (e) {
        return { error: 'Failed to process main image file. (Check payload size limit)' }; 
    }
    
    // --- 3. Upload Gallery Images ---
    for (let i = 0; i < galleryFiles.length; i++) {
        const file = galleryFiles[i];
        const altText = galleryAltTexts[i] || file.name;
        
        try {
            const filePath = `Projects/${slug}/gallery/${file.name}`;
            
            const { error } = await supabase.storage
                .from('portfolio-assets') 
                .upload(filePath, file, { upsert: true });

            if (error) {
                console.error(`Gallery image upload error for ${file.name}:`, error);
                return { error: `Gallery image upload failed for ${file.name}: ${error.message}` };
            }

            const { data: publicUrlData } = supabase.storage
                .from('portfolio-assets')
                .getPublicUrl(filePath);
            
            galleryImages.push({ url: publicUrlData.publicUrl, alt: altText });

        } catch (e) {
            return { error: `Failed to process gallery image file ${file.name}. (Check payload size limit)` };
        }
    }

    // 4. Insert DB entry
    const { error: dbError } = await supabase
        .from('Projects')
        .insert({
            slug: slug,
            title: title,
            description: description,
            service_slugs: serviceSlugs,
            main_image: mainImageUrl, 
            alt_text: mainImageAltText, 
            gallery: galleryImages.length > 0 ? galleryImages : null, 
            seo_title: title, 
            meta_description: description, 
        });

    if (dbError) {
        console.error("Database insert error:", dbError);
        return { error: `Database insert failed: ${dbError.message}` };
    }
    
    revalidatePath('/projects');
    revalidatePath('/');

    return { success: `Project "${title}" created successfully!`, url: `/projects/${slug}` };
}