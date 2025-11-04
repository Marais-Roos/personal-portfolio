// src/app/projects/page.tsx

import Navbar from "@/components/Navbar";
// Assuming Footer is in your project
// import Footer from "@/components/Footer"; 
import CTASection from "@/components/CTASection";
import Image from "next/image";
import Button from "@/components/Button";
import ProjectCarousel from "@/components/ProjectCarousel";
import { Project, Service } from "@/data/types";
import { 
  createServiceLookupMap, 
  filterProjectsForService 
} from "@/utils/data-utils";

// NEW IMPORTS: Supabase client and mapping types
import { createClient } from '@/utils/supabase/client';
import { 
    SupabaseService, 
    SupabaseProject, 
    mapSupabaseService, 
    mapSupabaseProject 
} from '@/data/supabase-types'; 
import Footer from "@/components/Footer";


// --- ASYNC DATA FETCHING FUNCTION ---
async function fetchAllPortfolioData(): Promise<{ services: Service[], projects: Project[] }> {
    const supabase = createClient();
    
    // 1. Fetch Services
    const { data: rawServices } = await supabase
        .from('Services') // Using correct case-sensitive name
        .select('*')
        .order('index', { ascending: true }) 
        .returns<SupabaseService[]>(); 

    const services = rawServices ? rawServices.map(mapSupabaseService) : [];

    // 2. Fetch all Projects
    const { data: rawProjects, error: projectsError } = await supabase
        .from('Projects') // Using correct case-sensitive name
        // FIX: Request all columns ('*') and alias 'created_at' as 'date'
        .select('*, created_at') 
        .returns<SupabaseProject[]>();

    if (projectsError) {
        console.error("Error fetching projects:", projectsError);
    }
    const projects = rawProjects ? rawProjects.map(mapSupabaseProject) : [];
    
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
                <main className="flex flex-col items-center justify-start grow w-full lg:max-w-[1056px] lg:gap-24 lg:pt-25 pt-12 md:max-w-[738px] md:gap-18 md:pt-20 gap-20 max-w-full">
                    {/*Hero Section Container*/}
                    <div className="flex flex-col items-center p-6 lg:p-9 bg-background-secondary w-full rounded-2xl gap-12 shadow-2xl shadow-black/10 bg-[url(/background_1.png)]">
                        {/*Hero Section Top*/}
                        <div className="flex flex-col md:flex-row items-center w-full gap-6 max-w-full">
                            <div className="max-w-full flex-1 relative w-full aspect-3/4">
                                <Image src="/Projects Hero.png" alt="Marais Roos" fill className="object-contain"/>
                            </div>
                            <div className="flex flex-col gap-5 w-full max-w-full flex-1 relative md:items-start items-center">
                                <h1 className="text-center md:text-left text-5xl md:text-6xl lg:text-7xl font-black text-dominant relative overflow-hidden w-full">My Greatest Hits</h1>
                                <p className="text-xl lg:text-3xl text-center md:text-left">A collection of works by a guy who spends way too much time at his desk while neglecting his chores.</p>
                            
                                <Button href="" variant="primary">Download the PDF</Button>
                            
                                <div className="flex flex-col items-left justify-start w-full gap-2">
                                    <p className="text-xs text-center md:text-left"><span className="font-base font-bold">100% </span>of people I met said it was a pleasure meeting me - after a single conversation.</p>
                                    <p className="italic text-[10px] text-center md:text-left"><span className="font-bold">Source: </span>Networking event. Probably just being polite.</p>
                                </div>
                            </div>
                        </div>
                        {/*Hero Section Bottom*/}
                        <div className="flex flex-col w-full max-w-full gap-4 items-center">
                            <h2 className="text-left font-medium">Some of the tools in my shed:</h2>
                            <div className="flex gap-6 justify-center items-center w-full flex-wrap md:gap-9">
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
                                <div id={service.sectionLink} key={service.slug} className="w-full flex flex-col gap-12 scroll-mt-36">
                                    <ProjectCarousel
                                        service={service} // Pass the full service object (has longDescription and title)
                                        projects={serviceProjects} // Pass the filtered array of projects
                                        serviceLookupMap={serviceLookupMap} // Pass the map for ProjectCard tags
                                    />
                                </div>
                            );
                        })}
                    </div>
                    
                </main>
                <Footer/>
            </div>
        </div>
    );
}