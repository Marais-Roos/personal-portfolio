// src/app/projects/page.tsx

import Navbar from "@/components/Navbar";
// Assuming Footer is in your project
// import Footer from "@/components/Footer"; 
import CTASection from "@/components/CTASection";
import Image from "next/image";
import Button from "@/components/Button";
import ProjectCarousel from "@/components/ProjectCarousel";
import Footer from "@/components/Footer";
import PortfolioCTA from "@/components/PortfolioCTA";

// Imports for Data Types and Utilities
import { Project, Service } from "@/data/types";
import { 
  createServiceLookupMap, 
  filterProjectsForService 
} from "@/utils/data-utils";

// [NEW IMPORTS] Import Sanity Client, Mappers, and Types
import { getSanityClient } from '@/sanity/lib/client';
// FIX: Changed mapSanityProject to mapSanityProjectToDetailData
import { mapSanityService, mapSanityProjectToDetailData, SanityService, SanityProject } from '@/data/sanity-types'; 

import { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title : "My Greatest Hits | Web Design Portfolio & Projects",
  description: "A collection of works by a guy who spends way too much time at his desk. Browse my latest web design projects, from creative concepts to concrete digital assets.",

  openGraph: {
    title: "My Greatest Hits | Web Design Portfolio & Projects",
    description: "A collection of works by a guy who spends way too much time at his desk. Browse my latest web design projects, from creative concepts to concrete digital assets.",
    url: "https://www.maraisroos.co.za/projects",
    siteName: "Marais Roos Portfolio",
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: '/opengraph_images/Projects.png',
        width: 1200,
        height: 630,
        alt: "Marais Roos Portfolio Cover",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "My Greatest Hits | Web Design Portfolio & Projects",
    description: "A collection of works by a guy who spends way too much time at his desk. Browse my latest web design projects, from creative concepts to concrete digital assets.",
    images: ["/opengraph_images/Projects.png"],
  }
};

// --- GROQ QUERIES (Sanity's Query Language) ---

// 1. Query to fetch all Services, ordered by index.
const ALL_SERVICES_QUERY = `
  *[_type == "service"] | order(index asc) {
    title,
    "slug": slug.current, // <-- FIX: Projecting slug.current as a string
    index,
    longDescription,
    shortDescription,
    iconInactive, 
    iconActive,
    sectionLink,
  }
`;

// 2. Query to fetch all Projects, including resolved service slugs/titles.
const ALL_PROJECTS_QUERY = `
  *[_type == "project"] {
    title,
    "slug": slug.current,
    description,
    
    // Fetch raw image for the utility
    mainImage {
        "asset": asset,
        altText
    },
    
    "publishedAt": _createdAt,
    
    // FIX: Project 'slug.current' specifically so it returns a string, not an object
    "serviceDetails": serviceSlugs[]->{ "slug": slug.current, title }
  }
`;

// --- NEW ASYNC DATA FETCHING FUNCTION (using Sanity) ---
async function fetchAllPortfolioData(): Promise<{ services: Service[], projects: Project[] }> {
    // 1. Initialize the Sanity client
    const client = getSanityClient();
    
    // 2. Fetch Services
    const rawServices = await client.fetch<SanityService[]>(ALL_SERVICES_QUERY);
    const services = rawServices ? rawServices.map(mapSanityService) : [];

    // 3. Fetch Projects
    const rawProjects = await client.fetch<SanityProject[]>(ALL_PROJECTS_QUERY);
    // FIX: Using the corrected mapper function
    const projects = rawProjects ? rawProjects.map(mapSanityProjectToDetailData) : [];
    
    return { services, projects };
}


// --- MAIN PROJECTS COMPONENT (Now async to wait for data) ---
export default async function Projects() {
    // AWAIT the data fetch
    const { services, projects } = await fetchAllPortfolioData();

    // 1. Create the Service Lookup Map once
    const serviceLookupMap = createServiceLookupMap(services);
    
    // 2. Filter the service list to only show carousels for categories that actually have projects
    const servicesWithProjects = services
        .filter(service => 
            filterProjectsForService(service.slug, projects).length > 0
        ).sort((a, b) => a.index - b.index);

    // Helper to filter projects by service for the carousel
    function getRelevantProjects(serviceSlug: string): Project[] {
        return filterProjectsForService(serviceSlug, projects);
    }

    const toolLogos = [
        { src: "/tools/Figma.svg", alt: "Figma Logo" },
        { src: "/tools/Webflow.svg", alt: "Webflow Logo" },
        { src: "/tools/Framer.svg", alt: "Framer Logo" },
        { src: "/tools/Zapier.svg", alt: "Zapier Logo" },
        { src: "/tools/MailerLite.svg", alt: "Mailerlite Logo" },
    ];

    return (
        <div className="bg-background-primary min-h-screen">
            <div className="flex flex-col items-center mx-auto py-4 lg:px-18 md:px-9 px-6">
                {/* The Navbar component */}
                <Navbar />
                <main className="flex flex-col items-center justify-start grow w-full max-w-[calc(100vw-48px)] lg:max-w-[1056px] md:max-w-[738px] gap-24">
                    <div className="mt-24 md:mt-32 lg:mt-40 flex flex-col items-center p-6 lg:p-9 bg-background-secondary w-full max-w-full rounded-2xl gap-12 shadow-2xl shadow-black/10 bg-[url(/background_1.png)]">
                        <div className="flex flex-col md:flex-row items-center w-full gap-6 max-w-full">
                            <div className="max-w-full w-full flex-1 relative aspect-3/4">
                                <Image src="/Projects Hero.png" alt="Marais Roos" fill className="object-contain"/>
                            </div>
                            <div className="flex flex-col gap-5 w-full max-w-full flex-1 relative align-left items-center">
                                <h1 className="lg:text-7xl text-6xl text-dominant font-black text-center md:text-left">My Greatest Hits</h1>
                                <p className="text-2xl lg:text-3xl text-center md:text-left">A collection of works by a guy who spends way too much time at his desk while neglecting his chores.</p>
                                <div className="p-4 bg-background-primary/70 w-full rounded-2xl border-background-primary/50 flex flex-col gap-4">
                                    <PortfolioCTA source={`/project`} variant="compact" />
                                    <div className="flex flex-col items-center md:items-start justify-start w-full gap-2">
                                        <p className="text-xs text-center md:text-left"><span className="font-base font-bold">100% </span>of people I met said it was a pleasure meeting me - after a single conversation.</p>
                                        <p className="italic text-[10px] text-center md:text-left"><span className="font-bold">Source: </span>Networking event. Probably just being polite.</p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="flex flex-col w-full max-w-full gap-4 items-center">
                            <h2 className="text-l font-medium">Some of the tools in my shed:</h2>
                            <div className="flex flex-wrap gap-4 md:gap-9 justify-center items-center w-full">
                                {toolLogos.map((logo) => (
                                <div key={logo.src} className="h-7 w-20 relative shrink-0">
                                    <Image src={logo.src} alt={logo.alt} fill className="object-cover"/>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/*Projects Section*/}
                    <div className="w-full flex flex-col gap-24">
                        {/* Iterate over each Service Category that has projects */}
                        {servicesWithProjects.map(service => {
                            const serviceProjects = getRelevantProjects(service.slug);
                        
                            return (
                                <div key={service.slug} className="flex flex-col gap-8">
                                    <ProjectCarousel
                                        service={service} // Pass the full service object (has longDescription and title)
                                        projects={serviceProjects} // Pass the filtered array of projects
                                        serviceLookupMap={serviceLookupMap} // Pass the map for ProjectCard tags
                                    />
                                </div>
                            );
                        })}
                    </div>
                    {/*Call To Action Section*/}
                    <div className="flex flex-col items-center p-9 bg-background-secondary w-full rounded-2xl gap-12 shadow-2xl shadow-black/10">
                        <CTASection/>
                    </div>
                    {/* Assuming Footer component is available */}
                    {/* <Footer /> */}
                </main>
                <Footer/>
            </div>
        </div>
    );
}