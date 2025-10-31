import Navbar from "@/components/Navbar"; 
import RotatingGreeting from "@/components/RotatingGreeting";
import Image from "next/image";
import LottieIcon from "@/components/LottieIcon";
import LinkArrow from "@/components/LinkArrow";
import CTASection from "@/components/CTASection";
import ServiceCard from "@/components/ServiceCard";
import { portfolioData } from "@/data/portfolio-data";
import ProjectCarousel from "@/components/ProjectCarousel";
import { Project, Service } from "@/data/types"; // Import types
import { 
  createServiceLookupMap, 
  getRecentProjects // Utility for sorting/limiting
} from "@/utils/data-utils";

const services: Service[] = portfolioData.services;
const projects: Project[] = portfolioData.projects;

// 1. Create the lookup map once for component efficiency
const serviceLookupMap = createServiceLookupMap(services);

// 2. Get the 8 most recent projects, sorted by date (the Home Page featured content)
const featuredProjects = getRecentProjects(projects, 8);

// 3. Create a mock Service object for the single carousel's heading/description
const featuredService: Service = {
    slug: 'featured-work',
    title: 'Browse my latest projects', // The appropriate heading
    longDescription: "",
    index: 0,
    shortDescription: '',
};

export default function Home() {
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

        {/* Semantic main content area for the Hero Section and other page content */}
        <main className="flex flex-col items-center justify-start grow w-full max-w-[1056px] gap-24 pt-25"> 
          {/*Hero Section Container*/}
          <div className="flex flex-col items-center p-9 bg-background-secondary w-full rounded-2xl gap-12 shadow-2xl shadow-black/10 bg-[url(/background_1.png)]"> 
            {/*Hero Section Top*/}
            <div className="flex items-center w-full gap-6 max-w-full">
              {/*Image container*/}
              <div className="max-w-full flex-1 relative h-full aspect-square">
                <Image src="/Intro Image.png" alt="Marais Roos" fill className="object-cover"/>
              </div>
              {/*Content of top part of header*/}
              <div className="flex flex-col gap-5 w-full max-w-full flex-1 relative">
                <RotatingGreeting/>
                <p className="text-2xl">I'm Marais. I once studied serious things like informatics and engineering... now I make pretty websites that actually work.</p>
                <div className="absolute top-[-20] right-[-16]">
                  <LottieIcon size={84} src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/lottie.json"/>
                </div>
              </div>
            </div>
            {/*Hero Section Middle*/}
            <CTASection/>
            
            {/*Hero Section Bottom*/}
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

          {/*Services Section*/}
          <div className="grid w-full max-w-full gap-6 grid-cols-2 grid-rows-6">
            <div className="flex flex-col justify-start items-start pt-9 pl-9 h-min row-span-1">
              <h2 className="text-6xl font-bold">What I bring to the table</h2>
            </div>
            {services.map ((service, index) => (
                  <ServiceCard 
                  key={service.slug}
                  service={service}
                  className="row-span-2"
                /> 
              ))}
          </div>
          {/*About Section*/}
          <div className="p-9 bg-background-secondary w-full rounded-2xl gap-6 shadow-2xl shadow-black/10 flex items-center max-w-full">
            {/*Left*/}
            <div className="flex flex-col gap-5 flex-1">
              <h2 className="text-5xl font-bold">Hey, I'm Marais Roos</h2>
              <p className="text-xl font-base">I'm a creatively chaotic web designer and developer who took the scenic route into tech. With roots in engineering and informatics (plus a brief, mildly traumatic stint in finance and insurance), I've come to appreciate the magic that happens when structure meets imagination.</p>
              <p className="text-xl font-base">These days, I focus on designing and building clean, functional websites that balance logic with creativity. I’m at my best when solving problems, simplifying complexity, and adding a little personality to every pixel.</p>
              <LinkArrow href="/about">Read my full story</LinkArrow>
            </div>
            {/*Right*/}
            <div className="max-w-full flex-1 relative h-full aspect-3/4" >
              <Image src="/About Image.png" alt="A collection of images of Marais Roos, the first image his him doing a speech with a view from the back, the second is him being social, and the third is him doing work in his office." fill className="object-cover"/>
            </div>
          </div>
          {/*Latest Projects Section*/}
          {featuredProjects.length > 0 && (
              <div className="w-full flex flex-col gap-12">
                  <ProjectCarousel
                      service={featuredService} // Pass the mock object for heading/description
                      projects={featuredProjects} // Pass the sorted and limited projects
                      serviceLookupMap={serviceLookupMap} // Pass the map for ProjectCard tags
                  />
              </div>
          )}
          {/*Call To Action Section*/}
          <div className="flex flex-col items-center p-9 bg-background-secondary w-full rounded-2xl gap-12 shadow-2xl shadow-black/10 bg-[url(/background_1.png)]">
            <CTASection/>
          </div>
        </main>
      </div>
    </div>
  );
}