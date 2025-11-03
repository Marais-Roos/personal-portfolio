// src/app/admin/login/page.tsx

import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";
import LoginFormComponent from "@/components/LoginFormComponent";
import { getSession } from "@/actions/auth";
import { redirect } from "next/navigation";

// Server Component: Checks if the user is already logged in and redirects them if so
export default async function LoginPage() {
    const session = await getSession();

    if (session) {
        redirect('/admin');
    }
    
    return (
        <div className="bg-background-primary min-h-screen">
            <div className="flex flex-col items-center mx-auto py-4 px-18 ">
                <Navbar />
                <main className="flex flex-col items-center justify-start grow w-full max-w-[1056px] pt-25">
                    
                    <LoginFormComponent />
                    
                    <Footer /> 
                </main>
            </div>
        </div>
    );
}