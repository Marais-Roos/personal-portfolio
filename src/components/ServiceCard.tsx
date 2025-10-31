'use client';

import Image from "next/image";
import { Service } from "@/data/types";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
    service: Service;
    className?: string; //Optional additional CSS classes
}

export default function ServiceCard({service, className} : ServiceCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const currentIconSrc = 
        isHovered && service.iconActive 
        ? service.iconActive
        : service.iconInactive;
    
    const cardLink = service.sectionLink || '#';

    return (
        <Link href={cardLink} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
            className={`flex flex-col p-8 gap-6 items-left bg-accent rounded-2xl transition-all 
                       duration-300 group hover:scale-[1.05] h-full
                       ${isHovered ? 'bg-accent text-background-primary' : 'bg-background-secondary text-dominant'} ${className}`}
        >
            <div className="relative w-24 h-24 transition-all duration-300">
                {currentIconSrc && (
                    <Image src={currentIconSrc} alt={service.title + (isHovered ? " active icon" : " inactive icon")} fill className="object-contain"/>
                )}
                {!currentIconSrc && (
                    <div className="w-full h-full bg-dominant rounded-lg"></div>
                )}
            </div>
            <h3 className="font-bold text-5xl">{service.title}</h3>
            <p className="text-lg grow">{service.shortDescription}</p>
            <div className={`flex items-left font-semibold text-xl transition-all gap-4 
                             ${isHovered ? 'gap-6' : 'gap-4'}
                          `}>
                Learn more
                <ArrowRight size={24} className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : 'translate-x-0'}`}/>
            </div>
        </Link>
    );
} 