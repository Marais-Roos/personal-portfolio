// src/data/types.ts

export interface Service {
    slug: string;
    title: string;
    index: number;
    shortDescription: string;
    longDescription: string;
    iconInactive?: string;
    iconActive?: string;
    sectionLink?: string;
}

export interface Project {
    slug: string;
    title: string;
    description: string;
    serviceSlugs: string[];
    created_at: string;
    mainImage: string;
    altText?: string;
    
    // NEW: Structured data type for the gallery (matches your Supabase JSONB column structure)
    galleryImages?: {
        url: string;
        alt: string;
    }[];

    // NEW: Fields for SEO 
    seoTitle?: string;
    metaDescription?: string;
}