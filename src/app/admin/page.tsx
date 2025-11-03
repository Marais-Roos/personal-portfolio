// src/app/admin/page.tsx

import ProjectUploadForm from "@/components/ProjectUploadForm";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";
import { createClient } from '@/utils/supabase/client'; 
import { SupabaseService } from '@/data/supabase-types';
import { getSession, signOut } from '@/actions/auth'; // NEW AUTH IMPORTS
import { redirect } from "next/navigation";


// --- Existing Data Fetching Function (unchanged) ---
async function fetchServicesForForm(): Promise<{ slug: string, title: string }[]> {
    const supabase = createClient();
    
    const { data: rawServices, error: servicesError } = await supabase
        .from('Services') 
        .select('slug, title') 
        .order('index', { ascending: true }) 
        .returns<SupabaseService[]>(); 
    
    if (servicesError) {
        console.error("Error fetching services for admin form:", servicesError);
        return [];
    }
    
    const services = rawServices || [];
    return services.map(s => ({ 
        slug: s.slug, 
        title: s.title 
    }));
}


// --- MAIN ADMIN COMPONENT (Server Component Protection Middleware) ---
export default async function AdminPage() {
    
    // 1. Check for an active session
    const session = await getSession();

    // 2. If NO session exists, redirect to the login page
    if (!session) {
        redirect('/admin/login');
    }
    
    // 3. If authenticated, fetch the data and render the protected content
    const services = await fetchServicesForForm();
    
    return (
        <div className="bg-background-primary min-h-screen">
            <div className="flex flex-col items-center mx-auto py-4 px-18 ">
                <Navbar /> 
                <main className="flex flex-col items-center justify-start grow w-full max-w-[1056px] gap-24 pt-25">
                    
                    {/* Logout Button: Submits to the signOut Server Action */}
                    <form action={signOut} className="self-end mr-4">
                        <button 
                            type="submit" 
                            className="text-lg text-red-500 hover:text-red-700 font-semibold transition-colors"
                        >
                            Sign Out
                        </button>
                    </form>
                    
                    <ProjectUploadForm availableServices={services} />

                    <Footer /> 
                </main>
            </div>
        </div>
    );
}