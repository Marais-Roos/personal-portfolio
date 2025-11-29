import { MetadataRoute } from 'next';
import { getSanityClient } from '@/sanity/lib/client';

// 1. Define your base URL (copied from your layout.tsx metadata)
const BASE_URL = 'https://www.maraisroos.co.za';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 2. Fetch all project slugs from Sanity so Google knows they exist
  const client = getSanityClient();
  const projects = await client.fetch<{ slug: { current: string }, _updatedAt: string }[]>(`
    *[_type == "project"] {
      slug,
      _updatedAt
    }
  `);

  // 3. Map the dynamic projects into the sitemap format
  const projectUrls = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug.current}`,
    lastModified: new Date(project._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 4. Return the combined list of static pages + dynamic projects
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9, // High priority as this is your portfolio showcase
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...projectUrls, // Spread the dynamic project URLs here
  ];
}