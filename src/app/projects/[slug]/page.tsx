import Navbar from "@/components/Navbar"
import Image from "next/image"
import Footer from "@/components/Footer";
import Link from "next/link";
import Button from "@/components/Button";
{/*Imports for CMS functionality*/}
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
// Import Supabase client and mapping types
import { createClient } from '@/utils/supabase/client';
import { SupabaseProject, SupabaseService, mapSupabaseProject, mapSupabaseService } from '@/data/supabase-types';
import { Project, Service } from '@/data/types';

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

/**
 * Data Fetching Utility for a Single Project (Runs on the Server)
 */
async function getProjectBySlug(slug: string): Promise<Project | null> {
    const supabase = createClient();

    // Fetch the single project where slug matches the URL parameter
    const { data: rawProject, error } = await supabase
        .from('Projects')
        .select('*')
        .eq('slug', slug)
        .single() // Expect only one row
        .returns<SupabaseProject>();

    console.log('[getProjectBySlug] slug:', slug);
    console.log('[getProjectBySlug] rawProject:', rawProject);
    console.log('[getProjectBySlug] error:', error);

    if (error || !rawProject) {
    console.error('[getProjectBySlug] error:', error);
    return null;
    }

    // Force the type before using it
    const project = rawProject as unknown as SupabaseProject;

    // Rename created_at → date before mapping
    const projectWithDate = { ...project, date: project.created_at };
    return mapSupabaseProject(projectWithDate);
}

/**
 * Fetch all services for the lookup map (separate function for clarity)
 */
async function fetchServices(): Promise<Service[]> {
    const supabase = createClient();
    const { data: rawServices } = await supabase
        .from('Services')
        .select('*')
        .returns<SupabaseService[]>();

    return rawServices ? rawServices.map(mapSupabaseService) : [];
}

/**
 * 1. MANDATORY: Tell Next.js which slugs exist for static generation.
 */
export async function generateStaticParams() {
    const supabase = createClient();
    
    const { data: rawProjects } = await supabase
        .from('Projects')
        .select('slug');

    if (!rawProjects) return [];

    return rawProjects.map((project) => ({
        slug: project.slug,
    }));
}

/**
 * 2. SEO / Dynamic Metadata Generation
 */
export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const project = await getProjectBySlug(resolvedParams.slug);

    if (!project) {
        return {
            title: 'Project Not Found | Portfolio',
            description: 'The requested project could not be found.',
        };
    }

    // Use the SEO fields from the Project object, falling back to title/description
    return {
        title: project.seoTitle || project.title,
        description: project.metaDescription || project.description,
    };
}

/**
 * 3. The Main Project Detail Component (Now an Async Server Component)
 */
export default async function ProjectDetail({ params }: ProjectDetailPageProps) {
    // 1. Fetch data for the specific project
    const resolvedParams = await params;
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
            <div className="flex flex-col items-center mx-auto py-4 lg:px-18 md:px-9 px-6">
                <div className="sticky top-6 w-full flex justify-center z-10">
                    <Navbar/>
                </div>
                <main className="flex flex-col items-center justify-start grow w-full lg:max-w-[1056px] lg:gap-24 lg:pt-25 pt-12 md:max-w-[738px] md:gap-18 md:pt-20 gap-20 max-w-full">
                        
                        {/*Hero Section*/}
                        <div className="flex flex-col items-left p-6 lg:p-9 bg-background-secondary w-full rounded-2xl gap-8 lg:gap-12 shadow-2xl shadow-black/10 bg-[url(/background_2.png)] bg-center pb-50 lg:pb-50">
                            {/*Project and project type*/}
                            <div className="flex gap-4 md:gap-6 flex-wrap">
                                <div className="px-4 py-2 bg-accent rounded-full">
                                    <p className="uppercase text-base lg:text-xl tracking-wider font-medium text-background-primary">Projects</p>
                                </div>
                                {/* Linked projects are displayed here */}
                                {serviceTitles.map((title) => (
                                    <div key={title} className="px-4 py-2 border-2 border-accent rounded-full">
                                        <p className="uppercase text-base lg:text-xl tracking-wider font-medium text-accent">{title}</p> 
                                    </div>
                                ))}
                            </div>
                            {/*Author and publish details*/}
                            <div className="flex items-center w-full gap-4 lg:gap-6 h-fit flex-wrap">
                                <div className="w-12 h-12 aspect-square relative overflow-hidden rounded-full">
                                    <Image alt="Author avatar" src="/Profile.png" fill className="object-contain"/> {/*Image of author: Static because it's only me publishing stuff*/}
                                </div>
                                <p className="text-base lg:text-xl grow-0">Marais Roos</p> {/*Name of author: Static because it's only me publishing stuff*/}
                                <div className="bg-dominant w-[1] h-6"></div>
                                <p className="text-base lg:text-xl">{publishDate}</p> {/*Date that the project was published*/}
                                <div className="bg-dominant w-[1] h-6"></div>
                                <div className="flex gap-4">
                                    <p className="text-base lg:text-xl">Share: </p>
                                    <div className="flex gap-2"> {/*Links to share the project to social media*/}
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
                            <h1 className="font-black text-5xl md:text-6xl lg:text-7xl capitalize">{project.title}</h1> {/*Project title*/}
                        </div>
                        
                        {/*Content*/}
                        <div className="flex flex-col md:flex-row gap-6 -mt-50 px-6 lg:px-9">
                            {/*Main Content*/}
                            <div className="flex flex-col flex-2 gap-8">
                                {/*Image container*/}
                                <div className="w-full aspect-4/3 relative bg-dominant rounded-2xl overflow-hidden"> 
                                    <Image src={project.mainImage} fill alt={project.altText || project.title} className="object-cover"/> {/*Main project image*/}
                                </div>
                                {/*Project description*/}
                                <p className="text-lg font-normal">{project.description}</p>
                            </div>
                            {/*CTA*/}
                            <div className="flex-1 bg-background-primary shadow-2xl shadow-black/20 rounded-2xl flex flex-col p-6 gap-6 h-fit w-full ">
                                <h2 className="text-4xl lg:text-5xl font-bold leading-[1.2em] text-left">My latest portfolio</h2>
                                <Button variant="small" href="">I want the PDF</Button>
                                <Button variant="outline" href="/projects">Take me there</Button>
                                <div className="flex flex-col items-left justify-start w-full gap-2">
                                    <p className="text-xs"><span className="font-base font-bold">100% </span>of people I met said it was a pleasure meeting me - after a single conversation.</p>
                                    <p className="italic text-[10px]"><span className="font-bold">Source: </span>Networking event. Probably just being polite.</p>
                                </div>
                            </div>
                        </div>
                        {/*Gallery of project images*/}
                        {project.galleryImages && project.galleryImages.length > 0 && (
                            <div className="grid grid-cols 1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6 px-6 lg:px-9">
                                {project.galleryImages.map((image, index) => (
                                    <div key={index} className="aspect-4/3 bg-background-secondary rounded-2xl relative overflow-hidden">
                                        <Image src={image.url} alt={image.alt} fill className="object-cover"/>
                                    </div>
                                ))}
                            </div>
                        )}
                </main>
                <Footer/>
            </div>
        </div>
    );
    
}