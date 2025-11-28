// src/sanity/lib/image.ts
import createImageUrlBuilder from '@sanity/image-url';
import { projectId, dataset } from './client';
import { SanityImageAsset } from '@/data/types'; // Import the new type

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '', 
  dataset: dataset || '',
});

/**
 * Creates the Next-friendly src string for the <Image /> component.
 * It also applies image optimization parameters.
 * @param source The raw Sanity image asset object.
 */
export function getImageUrl(source: SanityImageAsset | undefined): string {
  if (!source) {
    return ''; // Return empty string if no source is provided
  }
  
  // FIX: Use .width(1200) instead of .w(1200)
  // This ensures the source image is limited to a manageable size, 
  // preventing the timeout caused by fetching a massive original image.
  return imageBuilder.image(source).auto('format').fit('max').width(1200).url();
}