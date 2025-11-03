// src/utils/text-utils.ts

/**
 * Converts a string into a URL-friendly slug.
 * - Converts to lowercase.
 * - Replaces non-alphanumeric characters (except spaces/hyphens) with nothing.
 * - Replaces spaces and underscores with hyphens.
 * - Removes leading/trailing hyphens.
 */
export function createSlug(text: string): string {
    return text
        .toLowerCase()
        // Replace spaces, underscores, and various non-alphanumeric chars with a single hyphen
        .replace(/[\s_]+/g, '-') 
        // Remove characters that are not letters, numbers, or hyphens
        .replace(/[^\w-]+/g, '')
        // Replace multiple consecutive hyphens with a single hyphen
        .replace(/--+/g, '-') 
        // Remove leading/trailing hyphens
        .replace(/^-+|-+$/g, '');
}