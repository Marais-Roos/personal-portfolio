// src/utils/data-utils.ts
import { Service, Project } from "@/data/types"

// 1. Utility to create the Service Lookup Map
/**
 * Converts an array of Service objects into a map (dictionary) 
 * keyed by the service slug for fast O(1) lookup.
 * @param services The array of all services.
 * @returns A Record<string, Service> map.
 */
export function createServiceLookupMap(services: Service[]): Record<string, Service> {
    return services.reduce((acc, service) => {
        acc[service.slug] = service;
        return acc;
    }, {} as Record<string, Service>);
}

// 2. Utility to filter projects by service slug
/**
 * Filters all projects to find those that are tagged with the given service slug.
 * @param serviceSlug The slug of the service to filter by.
 * @param allProjects The array of all projects.
 * @returns An array of projects that include the serviceSlug in their serviceSlugs array.
 */
export function filterProjectsForService(serviceSlug: string, allProjects: Project[]): Project[] {
    return allProjects.filter(project => 
        // Checks if the project's array of slugs includes the target slug
        project.serviceSlugs.includes(serviceSlug)
    );
}

// 3. Utility to get the display title from a slug
/**
 * Converts an array of service slugs into an array of service titles using the lookup map.
 * @param slugs An array of service slugs (strings).
 * @param lookupMap The map of slugs to full Service objects.
 * @returns An array of human-readable service titles.
 */
export function getServiceTitlesFromSlugs(slugs: string[], lookupMap: Record<string, Service>): string[] {
    return slugs.map(slug => {
        const service = lookupMap[slug];
        // Returns the full title or the slug as a fallback if the service isn't found
        return service ? service.title : slug; 
    });
}

// 4. Utility to get the 8 most recent projects, sorted by date
/**
 * Sorts all projects by date (newest first) and limits the results to a specified count.
 * @param allProjects The array of all projects.
 * @param limit The maximum number of projects to return (default: 8).
 * @returns A sorted and limited array of recent projects.
 */
export function getRecentProjects(allProjects: Project[], limit: number = 8): Project[] {
    // IMPORTANT: Create a copy of the array with .slice() before calling .sort() to prevent mutating the original array.
    const sortedProjects = allProjects
        .slice() 
        .sort((a, b) => {
            // Converts date strings to Date objects for comparison.
            // b - a ensures newest date (larger value) comes first (descending sort).
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

    return sortedProjects.slice(0, limit); // Limits the array to the first 'limit' items
}