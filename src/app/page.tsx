import Navbar from "@/components/Navbar"; 
import Image from "next/image";
import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="bg-background-primary min-h-screen">
      <div className="flex flex-col items-center mx-auto py-4 px-18 gap-24">
        {/* The Navbar component */}
        <Navbar />

        {/* Semantic main content area for the Hero Section and other page content */}
        <main className="flex flex-col items-center justify-start flex-grow w-full max-w-[1056px]"> 
          {/*Hero Section Container*/}
          <div className="flex flex-col items-center p-9 bg-background-secondary w-full rounded-2xl gap-12 shadow-2xl shadow-black/10"> 
            {/*Hero Section Top*/}
            <div className="flex items-center w-full gap-6 max-w-[100%]">
              {/*Image container*/}
              <div className="max-w-[100%] flex-1 relative h-full aspect-square">
                <Image src="/Hero Image.png" alt="Marais Roos" fill className="object-cover"/>
              </div>
              {/*Content of top part of header*/}
              <div className="flex flex-col gap-5 w-full max-w-[100%] flex-1">
                <h1 className="text-7xl font-black">Dumela le kae!?</h1>
                <p className="text-2xl">I'm Marais. I once studied serious things like informatics and engineering... now I make pretty websites that actually work.</p>
              </div>
            </div>
            {/*Hero Section Middle*/}
            <div className="flex items-center w-full bg-background-primary max-w-[100%] p-9 rounded-3xl gap-6 shadow-xl shadow-black/10">
              {/*Left*/}
              <div className="flex flex-col flex-1 gap-5">
                <h2 className="text-5xl font-bold">Check out my latest portfolio.</h2>
                <div className="bg-background-secondary flex flex-col gap-4 p-4 rounded-2xl">
                  <p className="text-base">"Marais fixed something on my screen, and suddenly everything started working smoothly. I guess that's what the kids call tech-savvy."</p>
                  <div className="flex items-center gap-4">
                    <div className="aspect-square w-10 h-10 rounded-full bg-[url(/Avatar.png)] bg-cover bg-center">
                    </div>
                    <div className="flex flex-col">
                      <div className="flex gap-0">
                        <div className="aspect-square w-4 h-4 rounded-full bg-[url(/star-icon.svg)] bg-cover bg-center"></div>
                        <div className="aspect-square w-4 h-4 rounded-full bg-[url(/star-icon.svg)] bg-cover bg-center"></div>
                        <div className="aspect-square w-4 h-4 rounded-full bg-[url(/star-icon.svg)] bg-cover bg-center"></div>
                        <div className="aspect-square w-4 h-4 rounded-full bg-[url(/star-icon.svg)] bg-cover bg-center"></div>
                        <div className="aspect-square w-4 h-4 rounded-full bg-[url(/star-icon.svg)] bg-cover bg-center"></div>
                      </div>
                      <p className="font-semibold text-base">The Friendly Old Lady Next Door</p>
                    </div>
                  </div>
                </div>
              </div>
              {/*Right*/}
              <div className="flex flex-col flex-1 gap-5">
                <p className="text-xl">Get an in-depth look at the work I do, and how I turn creative ideas into concrete digital assets.</p>
                <div className="flex gap-6">
                  <Button href="/contact">View Portfolio</Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}