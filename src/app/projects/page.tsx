import Navbar from "@/components/Navbar";
import CTASection from "@/components/CTASection";
import Image from "next/image";
import Button from "@/components/Button";
import ProjectCarousel from "@/components/ProjectCarousel";
import { portfolioData } from "@/data/portfolio-data";
import { Project, Service } from "@/data/types";
import { 
  createServiceLookupMap, 
  filterProjectsForService 
} from "@/utils/data-utils";

// --- Data Setup: This block runs once efficiently ---
const services: Service[] = portfolioData.services; 
const projects: Project[] = portfolioData.projects;

// 1. Create the Service Lookup Map once
const serviceLookupMap = createServiceLookupMap(services);

// 2. Filter the service list to only show carousels for categories that actually have projects
const servicesWithProjects = services
    .filter(service => 
        filterProjectsForService(service.slug, projects).length > 0
    ).sort((a, b) => a.index - b.index);

// Helper to filter projects by service for the carousel
function getRelevantProjects(serviceSlug: string): Project[] {
    // This calls the reusable utility function from the /utils folder
    return filterProjectsForService(serviceSlug, projects);
}

export default function Projects() {
    const toolLogos = [
        { src: "/tools/Figma.svg", alt: "Figma Logo" },
        { src: "/tools/Webflow.svg", alt: "Webflow Logo" },
        { src: "/tools/Framer.svg", alt: "Framer Logo" },
        { src: "/tools/Zapier.svg", alt: "Zapier Logo" },
        { src: "/tools/MailerLite.svg", alt: "Mailerlite Logo" },
    ];

    return (
        <div className="bg-background-primary min-h-screen">
            <div className="flex flex-col items-center mx-auto py-4 px-18 ">
                {/* The Navbar component */}
                <Navbar />
                <main className="flex flex-col items-center justify-start grow w-full max-w-[1056px] gap-24 pt-25">
                    <div className="flex flex-col items-center p-9 bg-background-secondary w-full rounded-2xl gap-12 shadow-2xl shadow-black/10">
                        <div className="flex items-center w-full gap-6 max-w-full">
                            <div className="max-w-full flex-1 relative h-full aspect-3/4">
                                <Image src="/Projects Hero.png" alt="Marais Roos" fill className="object-contain"/>
                            </div>
                            <div className="flex flex-col gap-5 w-full max-w-full flex-1 relative align-left items-center">
                                <h1 className="text-7xl text-dominant font-black">My Greatest Hits</h1>
                                <p className="text-3xl">A collection of works by a guy who spends way too much time at his desk while neglecting his chores.</p>
                                <div className="w-full flex flex-row items-left">
                                    <Button href="" variant="primary">Download the PDF version</Button>
                                </div>
                                <div className="flex flex-col items-left justify-start w-full gap-2">
                                    <p className="text-xs"><span className="font-base font-bold">100% </span>of people I met said it was a pleasure meeting me - after a single conversation.</p>
                                    <p className="italic text-[10px]"><span className="font-bold">Source: </span>Networking event. Probably just being polite.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full max-w-full gap-4 items-center">
                            <h2 className="text-l font-medium">Some of the tools in my shed:</h2>
                            <div className="flex gap-9 justify-center items-center w-full h-7">
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
                </main>
            </div>
        </div>
    );
}        