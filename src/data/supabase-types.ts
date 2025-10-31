import { Service, Project } from "./types"

// --- 1. RAW SUPABASE STRUCTURES (snake_case from DB) ---

/**
 * Defines the structure of data fetched directly from the Supabase 'services' table.
 */
export interface SupabaseService {
    id: string; // The UUID from the database
    slug: string;
    title: string;
    index: number;
    short_description: string; // matches DB column name
    long_description: string; // matches DB column name
    icon_inactive: string | null; // URL for inactive icon.
    icon_active: string | null; // URL for active icon.
    section_link: string | null;
}

/**
 * Defines the structure of data fetched directly from the Supabase 'projects' table.
 */
export interface SupabaseProject {
    id: string; 
    slug: string;
    title: string;
    description: string;
    
    // Using a simple TEXT type in DB, separated by commas
    service_slugs: string; 
    
    date: string;
    main_image: string; 
    alt_text: string | null; 
    
    // JSONB type in DB, mapped to JS object array
    gallery: { url: string; alt: string }[] | null; 
    
    // SEO FIELDS (snake_case)
    seo_title: string | null;
    meta_description: string | null;
}

// --- 2. MAPPING FUNCTIONS (Converts DB data to Frontend Types.ts) ---

/**
 * Maps a SupabaseService object to the frontend Service interface.
 */
export function mapSupabaseService(s: SupabaseService): Service {
    return {
        slug: s.slug,
        title: s.title,
        index: s.index,
        // Convert snake_case to camelCase
        shortDescription: s.short_description,
        longDescription: s.long_description,
        iconInactive: s.icon_inactive ?? undefined,
        iconActive: s.icon_active ?? undefined,
        sectionLink: s.section_link ?? undefined,
    };
}

/**
 * Maps a SupabaseProject object to the frontend Project interface.
 */
export function mapSupabaseProject(p: SupabaseProject): Project {
    
    // Logic to convert the comma-separated string from the database into a string array (string[])
    const serviceSlugsArray = p.service_slugs 
        ? p.service_slugs.split(',').map(s => s.trim()).filter(Boolean) 
        : [];
        
    return {
        slug: p.slug,
        title: p.title,
        description: p.description,
        serviceSlugs: serviceSlugsArray,
        date: p.date,
        mainImage: p.main_image,
        altText: p.alt_text ?? undefined,
        galleryImages: p.gallery ?? undefined, 
        
        // Map SEO fields to camelCase
        seoTitle: p.seo_title ?? undefined,
        metaDescription: p.meta_description ?? undefined,
    };
}