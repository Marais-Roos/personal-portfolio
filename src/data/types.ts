// src/data/types.ts

export interface Service {
    slug: string;
    title: string;
    index: number;
    shortDescription: string;
    longDescription: string;
    iconInactive?: string; // This will now hold the generated Sanity image URL
    iconActive?: string; // This will now hold the generated Sanity image URL
    sectionLink?: string;
}

export interface Project {
    slug: string;
    title: string;
    description: string; // This will temporarily hold a stringified Portable Text array
    serviceSlugs: string[];
    created_at: string;
    mainImage: string;
    altText?: string;
    
    // NEW: Structured data type for the gallery 
    galleryImages?: {
        url: string;
        alt: string;
    }[];

    // NEW: Fields for SEO 
    seoTitle?: string;
    metaDescription?: string;
}

// === NEW SANITY TYPES ===

/**
 * Represents a raw Sanity image asset object.
 * Used internally before conversion to a URL.
 */
export interface SanityImageAsset {
    _type: 'image';
    asset: {
        _ref: string; // The reference ID
        _type: 'reference';
    };
    // This allows us to access custom fields added to the image type in the schema
    altText?: string; 
}

/**
 * Represents a Portable Text block array (Sanity's rich text field).
 * We use 'any' to simplify the initial integration.
 */
export type PortableTextBlock = any;