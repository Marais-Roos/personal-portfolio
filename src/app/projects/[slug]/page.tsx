// src/app/projects/[slug]/page.tsx (Final fix to silence the compiler error)

import Navbar from "@/components/Navbar";
import CTASection from "@/components/CTASection";
import Image from "next/image";
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Import Supabase client and mapping types
import { createClient } from '@/utils/supabase/client';
import { SupabaseProject, mapSupabaseProject } from '@/data/supabase-types';
import { Project } from '@/data/types'; 


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

    const { data: rawProject, error } = await supabase
        .from('Projects')
        .select('*, created_at as date') 
        .eq('slug', slug)
        .single() 
        .returns<SupabaseProject>();

    if (error || !rawProject) {
        return null; 
    }
    
    return mapSupabaseProject(rawProject);
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
    // FINAL FIX: Extract slug value synchronously before passing it to await.
    const slug = params.slug;
    const project = await getProjectBySlug(slug); 

    if (!project) {
        return {
            title: 'Project Not Found | Portfolio',
            description: 'The requested project could not be found.',
        };
    }

    return {
        title: project.seoTitle || project.title,
        description: project.metaDescription || project.description,
    };
}


/**
 * 3. The Main Project Detail Component
 */
export default async function ProjectDetail({ params }: ProjectDetailPageProps) {
    // FINAL FIX: Extract slug value synchronously before passing it to await.
    // This forces the compiler to recognize 'slug' as a string, bypassing the bug.
    const slug = params.slug;

    const project = await getProjectBySlug(slug); 

    // If project is null, render the Next.js 404 page
    if (!project) {
        notFound();
    }

    return (
        <div className="bg-background-primary min-h-screen">
            <div className="flex flex-col items-center mx-auto py-4 px-18 ">
                <Navbar />
                
                <main className="flex flex-col items-center justify-start grow w-full max-w-[1056px] gap-16 pt-25">
                    
                    {/* Back Link */}
                    <Link href="/projects" className="flex items-center text-dominant hover:text-accent transition-colors self-start text-xl font-semibold gap-2">
                        <ArrowLeft size={24} />
                        Back to all projects
                    </Link>

                    {/* Project Hero Section (Image & Details) */}
                    <div className="flex flex-col gap-12 w-full">
                        {/* Title & Description */}
                        <div className="flex flex-col gap-4">
                            <h1 className="text-7xl font-black text-dominant">{project.title}</h1>
                            {/* Project Description (Full body content) */}
                            <p className="text-xl max-w-4xl">{project.description}</p>
                        </div>

                        {/* Main Project Image */}
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl shadow-black/20">
                            <Image 
                                src={project.mainImage} 
                                alt={project.altText || project.title} 
                                fill 
                                className="object-cover"
                            />
                        </div>
                    </div>
                    
                    {/* Project Gallery Section */}
                    {project.galleryImages && project.galleryImages.length > 0 && (
                        <div className="flex flex-col gap-8 w-full">
                            <h2 className="text-5xl font-bold text-dominant">Image Gallery</h2>
                            <div className="grid grid-cols-2 gap-6">
                                {project.galleryImages.map((image, index) => (
                                    <div key={index} className="relative w-full aspect-4/3 rounded-xl overflow-hidden shadow-xl shadow-black/10">
                                        <Image 
                                            src={image.url} 
                                            alt={image.alt} 
                                            fill 
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* Call To Action Section */}
                    <div className="flex flex-col items-center p-9 bg-background-secondary w-full rounded-2xl gap-12 shadow-2xl shadow-black/10 bg-[url(/background_1.png)]">
                        <CTASection/>
                    </div>
                </main>
                {/* <Footer /> */}
            </div>
        </div>
    );
}