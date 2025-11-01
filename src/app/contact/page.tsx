import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";

export default function Contact() {
    return(
        <div className="bg-background-primary min-h-screen">
            <div className="flex flex-col items-center mx-auto py-4 px-18 ">
                <Navbar/>
                <main className="flex flex-col items-center justify-start grow w-full max-w-[1056px] gap-24 pt-25">
                    
                </main>
                <Footer/>
            </div>
        </div>
    );
}