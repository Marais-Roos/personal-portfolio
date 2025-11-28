// src/data/sanity-types.ts
import { Service, Project, PortableTextBlock, SanityImageAsset } from './types';
import { getImageUrl } from '@/sanity/lib/image'; 

// --- 1. RAW SANITY STRUCTURES ---

/**
 * Defines the structure of data fetched directly from the Sanity 'service' documents.
 */
export interface SanityService {
    _id: string;
    slug: string; 
    title: string;
    index: number;
    shortDescription: string;
    longDescription: string;
    iconInactive?: SanityImageAsset; 
    iconActive?: SanityImageAsset; 
    sectionLink?: string;
}

/**
 * Defines the structure of data fetched directly from the Sanity 'project' documents.
 */
export interface SanityProject {
    _id: string; 
    slug: string; 
    title: string;
    description: PortableTextBlock[]; // Portable Text array for rich content
    
    // Sanity query projection is used to fetch these details for reference fields
    serviceDetails: { title: string; slug: string }[];
    
    publishedAt: string; 
    
    // Main Image object including its alt text field
    mainImage: SanityImageAsset & { altText?: string }; 
    galleryImages?: (SanityImageAsset & { altText?: string })[]; 

    // SEO FIELDS
    seoTitle?: string;
    metaDescription?: string;
    opengraphImage?: SanityImageAsset; 
}

// --- NEW INTERFACE FOR PROJECT DETAIL DATA ---
// This is used exclusively on the detail page to hold the raw rich text content.
export interface ProjectDetailData extends Project {
    rawDescription: PortableTextBlock;
    opengraphImage?: SanityImageAsset;
}

// --- 2. MAPPING FUNCTIONS (Sanity to Application Types) ---

/**
 * Maps a SanityService object to the application's Service interface.
 */
export function mapSanityService(s: SanityService): Service {
    
    // Use the image utility to get the actual URL for compatibility
    const iconInactiveUrl = getImageUrl(s.iconInactive);
    const iconActiveUrl = getImageUrl(s.iconActive);
    
    return {
        slug: s.slug,
        title: s.title,
        index: s.index,
        shortDescription: s.shortDescription,
        longDescription: s.longDescription,
        iconInactive: iconInactiveUrl, 
        iconActive: iconActiveUrl,     
        sectionLink: s.sectionLink,
    };
}

/**
 * Maps a SanityProject object (including full content) to the application's 
 * ProjectDetailData interface.
 */
export function mapSanityProjectToDetailData(p: SanityProject): ProjectDetailData {
    
    // Map fetched service details back to an array of slugs
    const serviceSlugsArray = p.serviceDetails?.map(detail => detail.slug) || [];
    
    // Map main image to URL
    const mainImageUrl = getImageUrl(p.mainImage);

    // Map gallery images to array of URLs/alts
    const galleryImages = p.galleryImages?.map(imageAsset => ({
        url: getImageUrl(imageAsset),
        alt: imageAsset.altText || p.title, 
    }));

    // Base Project mapping - uses fields common to Project interface
    const baseProject: Project = {
        slug: p.slug,
        title: p.title,
        // The description property is intentionally left empty/generic here.
        description: '', 
        serviceSlugs: serviceSlugsArray,
        created_at: p.publishedAt,
        mainImage: mainImageUrl,
        altText: p.mainImage.altText,
        galleryImages: galleryImages,
        seoTitle: p.seoTitle,
        metaDescription: p.metaDescription,
    };
    
    return {
        ...baseProject,
        // The raw Portable Text content (used by the new component)
        rawDescription: p.description,
        // The raw Sanity image asset for OpenGraph metadata generation
        opengraphImage: p.opengraphImage,
    };
}