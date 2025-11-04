'use client'

import ProjectCard from "./ProjectCard";
import { Project, Service } from "@/data/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useRef } from "react";
import LinkArrow from "./LinkArrow";

interface ProjectCarouselProps {
    projects: Project[];
    // The full service object to derive the link
    service: Service; 
    // The map is passed through for the ProjectCard
    serviceLookupMap: Record<string, Service>;
}

export default function ProjectCarousel({ projects, service, serviceLookupMap }: ProjectCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollDistance = 400; // How far to scroll per click

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const current = scrollRef.current;
            const newScrollLeft = 
                direction === 'left'
                    ? current.scrollLeft - scrollDistance
                    : current.scrollLeft + scrollDistance;
            
            current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth',
            })
        }
    };

    if (projects.length === 0) return null;

    // Destructure properties from the service object for clean reading
    const { title, longDescription } = service;

    return (
        <div className="flex flex-col gap-8 w-full overflow-visible">
            {/* Header and Controls */}
            <div className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-18">
                {/* Left: Title and Description */}
                <div className="flex flex-col gap-5 flex-2">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">{title}</h2>
                    <p className="text-lg md:text-xl">{longDescription}</p>
                </div>
                {/* Right: Controls */}
                <div className="flex flex-1 gap-4 shrink-0 h-fit md:items-end md:justify-end">
                    <div 
                        className="h-16 w-16 rounded-full bg-accent flex items-center justify-center text-background-primary hover:bg-dominant transition-colors cursor-pointer" 
                        onClick={() =>scroll('left')}
                        aria-label={`Scroll left through ${title} projects`}
                    >
                        <ArrowLeft size={48} />
                    </div>
                    <div 
                        className="h-16 w-16 rounded-full bg-accent flex items-center justify-center text-background-primary hover:bg-dominant transition-colors cursor-pointer" 
                        onClick={() =>scroll('right')}
                        aria-label={`Scroll right through ${title} projects`}
                    >
                        <ArrowRight size={48} />
                    </div>
                </div>
            </div>
            {/* Carousel Content Container (Horizontal Scroll) */}
            <div className="relative w-full overflow-visible">
                <div ref={scrollRef}
                className="flex gap-6 px-9 py-4
                            overflow-x-scroll overflow-y-visible
                            snap-x snap-mandatory scroll-smooth
                            [&::-webkit-scrollbar]:h-0
                            [-ms-overflow-style]:none
                            [scrollbar-width]:none
                            relative z-20"   
                >
                    {projects.map((project) =>
                        <div key={project.slug} className="snap-start">
                            <ProjectCard project={project} serviceLookupMap={serviceLookupMap}/>
                        </div>)}
                </div>
            </div>
            
        </div>
    );
}