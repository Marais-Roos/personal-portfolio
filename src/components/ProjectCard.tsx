import Image from "next/image";
import Link from 'next/link';
import { Project, Service } from "@/data/types";
import { useState } from "react";
import { ArrowRight } from 'lucide-react';
import { getServiceTitlesFromSlugs } from "@/utils/data-utils";

interface ProjectCardProps {
    project: Project;
    serviceLookupMap: Record<string, Service>;
}

export default function ProjectCard({project, serviceLookupMap} : ProjectCardProps) {
    const projectUrl = `projects/${project.slug}`
    const [isHovered, setIsHovered] = useState(false);

    // Convert service slugs to human-readable titles using the map
    const displayTitles = getServiceTitlesFromSlugs(project.serviceSlugs, serviceLookupMap);

    return (
        <Link href={projectUrl} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
            className={`flex flex-col gap-6 items-left bg-accent rounded-2xl transition-all border-4 border-background-secondary
                       duration-300 group hover:scale-[1.01] h-full w-100 overflow-hidden hover:border-accent
                       ${isHovered ? 'bg-accent text-background-primary' : 'bg-background-secondary text-dominant'}`}
        >
            {/*Image container*/}
            <div className="relative w-full aspect-4/3 ">
                {/*Image*/}
                <Image src={project.mainImage} alt={project.altText || project.title} fill className="object-cover"/>
            </div>
            {/*Card content*/}
                <div className="flex flex-col gap-4 p-4 ">
                    {/* Service Tags (using the titles for elegance) */}
                    
                    <h3 className="text-3xl font-medium">{project.title}</h3>
                    <div className={`flex items-left font-semibold text-base transition-all gap-4 
                             ${isHovered ? 'gap-6' : 'gap-4'}
                          `}>
                        View project
                        <ArrowRight size={16} className={`mt-0.75 transition-transform duration-300 ${isHovered ? 'translate-x-1' : 'translate-x-0'}`}/>
                    </div>
                </div>
        </Link>
    )
}