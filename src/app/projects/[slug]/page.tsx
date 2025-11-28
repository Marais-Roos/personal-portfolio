// src/app/projects/[slug]/page.tsx

import Navbar from "@/components/Navbar"
import Image from "next/image"
import Footer from "@/components/Footer";
import Link from "next/link";
import Button from "@/components/Button";
import PortableText from "@/components/PortableText"; // NEW: For rendering rich text

{/*Imports for CMS functionality*/}
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// NEW: Import Sanity client, mappers, and types
import { getSanityClient } from '@/sanity/lib/client';
import { getImageUrl } from '@/sanity/lib/image'; 
import { 
    SanityProject, 
    SanityService, 
    mapSanityService, 
    mapSanityProjectToDetailData, 
    ProjectDetailData 
} from '@/data/sanity-types';
import { Service } from '@/data/types';

// Import Utilities for service tags and mapping
import { 
    createServiceLookupMap,
    getServiceTitlesFromSlugs 
} from '@/utils/data-utils'; 


// Define the structure for dynamic parameters passed to the page
interface ProjectDetailPageProps {
    params: {
        slug: string;
    };
}

// --- GROQ QUERIES ---

// Query to fetch a single project by slug, resolving all needed fields.
const PROJECT_BY_SLUG_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    description,
    "publishedAt": _createdAt,
    
    mainImage {
        "asset": asset,
        altText
    },
    
    galleryImages[] {
        "asset": asset,
        altText
    },
    
    seoTitle,
    metaDescription,
    opengraphImage,
    
    // FIX: Project 'slug.current' as string
    "serviceDetails": serviceSlugs[]->{ "slug": slug.current, title }
  }
`;

// Query to fetch all project slugs for static generation.
const ALL_PROJECT_SLUGS_QUERY = `
  *[_type == "project" && defined(slug.current)]{
    "slug": slug.current
  }
`;

// Query to fetch all services (for the lookup map).
const ALL_SERVICES_QUERY = `
  *[_type == "service"] | order(index asc) {
    title,
    slug,
    index,
    shortDescription,
    longDescription,
    iconInactive, 
    iconActive,
    sectionLink,
  }
`;

/**
 * Data Fetching Utility for a Single Project (Runs on the Server)
 */
async function getProjectBySlug(slug: string): Promise<ProjectDetailData | null> {
    const client = getSanityClient();
    
    // Pass the slug as a variable to the query
    const rawProject = await client.fetch<SanityProject>(PROJECT_BY_SLUG_QUERY, { slug });

    if (!rawProject) {
        return null;
    }

    // Map the Sanity data structure to the application's detailed data type
    return mapSanityProjectToDetailData(rawProject);
}

/**
 * Fetch all services for the lookup map
 */
async function fetchServices(): Promise<Service[]> {
    const client = getSanityClient();
    const rawServices = await client.fetch<SanityService[]>(ALL_SERVICES_QUERY);

    return rawServices ? rawServices.map(mapSanityService) : [];
}

/**
 * 1. MANDATORY: Tell Next.js which slugs exist for static generation.
 */
export async function generateStaticParams() {
    const client = getSanityClient();
    // Fetch all slugs from Sanity
    const rawSlugs = await client.fetch<{ slug: string }[]>(ALL_PROJECT_SLUGS_QUERY);
    
    if (!rawSlugs) return [];

    return rawSlugs.map((project) => ({
        slug: project.slug,
    }));
}

/**
 * 2. SEO / Dynamic Metadata Generation
 */
export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
    // FIX 3: Unwrap the params object first for reliable access
    const resolvedParams = await params;
    
    // Fetch the project data to construct metadata
    const project = await getProjectBySlug(resolvedParams.slug);

    if (!project) {
        return {
            title: 'Project Not Found | Portfolio',
            description: 'The requested project could not be found.',
        };
    }
    
    // Get the URL for the OpenGraph image, using the new utility
    const ogImage = project.opengraphImage ? getImageUrl(project.opengraphImage) : undefined;
    
    return {
        title: project.seoTitle || project.title,
        description: project.metaDescription || 'View this featured project by Marais Roos.',
        openGraph: {
            // Use the opengraphImage field if set
            images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: project.title }] : undefined,
        },
        twitter: {
            card: ogImage ? 'summary_large_image' : 'summary',
            title: project.seoTitle || project.title,
            description: project.metaDescription || 'View this featured project by Marais Roos.',
            images: ogImage ? [ogImage] : undefined,
        }
    };
}

/**
 * 3. The Main Project Detail Component (Now an Async Server Component)
 */
export default async function ProjectDetail({ params }: ProjectDetailPageProps) {
    // FIX 2: Unwrap the params object first for reliable access
    const resolvedParams = await params; 

    // 1. Fetch data for the specific project
    const project = await getProjectBySlug(resolvedParams.slug);
    
    // 2. Fetch all services and create lookup map for tags
    const allServices = await fetchServices();
    const serviceLookupMap = createServiceLookupMap(allServices);

    // 3. Handle 404
    if (!project) {
        notFound();
    }
    
    // Calculate dynamic data:
    const publishDate = new Date(project.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const serviceTitles = getServiceTitlesFromSlugs(project.serviceSlugs, serviceLookupMap);

    return(
        <div className="bg-background-primary min-h-screen">
            <div className="flex flex-col items-center mx-auto py-4 px-18 ">
                <Navbar />
                <main className="flex flex-col items-center justify-start grow w-full max-w-[1056px] gap-24 pt-25">
                    {/* Background visual element */}
                    <div className="bg-background-secondary w-full rounded-2xl shadow-black/10 bg-[url(/background_1.png)] bg-center h-[500] absolute max-w-[1056] z-0"></div>
                    
                    <div className="flex flex-col items-left p-9 gap-8 relative z-1">
                        {/*Project and project type*/}
                        <div className="flex gap-6">
                            <div className="px-4 py-2 bg-accent rounded-full">
                                {/* Tailwind class explanation: uppercase makes text uppercase, text-xl sets size, tracking-wider increases letter spacing. */}
                                <p className="uppercase text-xl tracking-wider font-medium text-background-primary">Projects</p>
                            </div>
                            {/* Linked projects are displayed here */}
                            {serviceTitles.map((title) => (
                                <div key={title} className="px-4 py-2 border-2 border-accent rounded-full">
                                    <p className="uppercase text-xl tracking-wider font-medium text-accent">{title}</p> 
                                </div>
                            ))}
                        </div>
                        
                        {/*Author and publish details*/}
                        <div className="flex items-center w-full gap-6 h-fit">
                            <div className="w-12 h-12 aspect-square relative">
                                <Image alt="Author avatar" src="/Avatar.png" fill className="object-contain"/> 
                            </div>
                            <p className="text-2xl grow-0">Marais Roos</p> 
                            {/* Divider: w-[1] sets 1px width, h-6 sets 1.5rem height. */}
                            <div className="bg-dominant w-[1] h-6"></div> 
                            <p className="text-2xl">{publishDate}</p> 
                            <div className="bg-dominant w-[1] h-6"></div>
                            <div className="flex gap-4">
                                <p className="text-2xl">Share: </p>
                                {/* Social share links - bg-background-primary for circle background, hover:border for visual feedback. */}
                                <div className="flex gap-2"> 
                                    <Link className="bg-background-primary rounded-full w-8 h-8  relative aspect-square flex items-center justify-center hover:border hover:border-dominant" href="">
                                        <Image src="/social_icons/LinkedIn.svg" alt="Instagram logo" width={16} height={16} className="object-contain"/>
                                    </Link>
                                    <Link className="bg-background-primary rounded-full w-8 h-8  relative aspect-square flex items-center justify-center hover:border hover:border-dominant" href="">
                                        <Image src="/social_icons/Facebook.svg" alt="Instagram logo" width={16} height={16} className="object-contain"/>
                                    </Link>
                                    <Link className="bg-background-primary rounded-full w-8 h-8  relative aspect-square flex items-center justify-center hover:border hover:border-dominant" href="">
                                        <Image src="/social_icons/X.svg" alt="Instagram logo" width={16} height={16} className="object-contain"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                        {/*Project heading*/}
                        <h1 className="font-black text-7xl capitalize">{project.title}</h1> 
                        
                        {/*Content*/}
                        <div className="flex gap-6">
                            {/*Main Content*/}
                            <div className="flex flex-col flex-2 gap-8">
                                {/*Image container*/}
                                <div className="w-full aspect-2/1 relative bg-dominant rounded-2xl overflow-hidden"> 
                                    <Image src={project.mainImage} fill alt={project.altText || project.title} className="object-cover"/> 
                                </div>
                                
                                {/*Project description - USES PORTABLE TEXT */}
                                <div className="text-lg font-normal">
                                     <PortableText value={project.rawDescription} /> 
                                </div>
                            </div>
                            {/*CTA*/}
                            <div className="flex-1 bg-background-primary shadow-2xl shadow-black/20 rounded-2xl flex flex-col p-6 gap-6 h-fit">
                                <h2 className="font-bold text-5xl">My latest portfolio</h2>
                                <Button variant="small" href="">I want the PDF</Button>
                                <Button variant="outline" href="">Take me there</Button>
                                <div className="flex flex-col items-left justify-start w-full gap-2">
                                    <p className="text-xs"><span className="font-base font-bold">100% </span>of people I met said it was a pleasure meeting me - after a single conversation.</p>
                                    <p className="italic text-[10px]"><span className="font-bold">Source: </span>Networking event. Probably just being polite.</p>
                                </div>
                            </div>
                        </div>
                        
                        {/*Gallery of project images*/}
                        {project.galleryImages && project.galleryImages.length > 0 && (
                            <div className="grid grid-cols-3 w-full gap-6">
                                {project.galleryImages.map((image, index) => (
                                    <div key={index} className="aspect-4/3 bg-background-secondary rounded-2xl relative overflow-hidden">
                                        <Image src={image.url} alt={image.alt} fill className="object-cover"/>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <Footer/>
                </main>
            </div>
        </div>
    );
    
}