import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = 'https://www.maraisroos.co.za';

  return {
    rules: {
      userAgent: '*', // Applies to all bots
      allow: '/',     // Allow access to everything...
      disallow: '/studio/', // ...EXCEPT the Sanity Studio admin area
    },
    sitemap: `${BASE_URL}/sitemap.xml`, // Tell bots where to find the sitemap we just made
  };
}