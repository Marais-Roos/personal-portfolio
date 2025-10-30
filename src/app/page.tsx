import Navbar from "@/components/Navbar"; 
import Image from "next/image";
import Button from "@/components/Button";
import LottieIcon from "@/components/LottieIcon";
import LinkArrow from "@/components/LinkArrow";
import { Star } from "lucide-react";

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
          <div className="flex flex-col items-center p-9 bg-background-secondary w-full rounded-2xl gap-12 shadow-2xl shadow-black/10"> 
            {/*Hero Section Top*/}
            <div className="flex items-center w-full gap-6 max-w-full">
              {/*Image container*/}
              <div className="max-w-full flex-1 relative h-full aspect-square">
                <Image src="/Hero Image.png" alt="Marais Roos" fill className="object-cover"/>
              </div>
              {/*Content of top part of header*/}
              <div className="flex flex-col gap-5 w-full max-w-full flex-1 relative">
                <h1 className="text-7xl font-black">Dumela le kae!?</h1>
                <p className="text-2xl">I'm Marais. I once studied serious things like informatics and engineering... now I make pretty websites that actually work.</p>
                <div className="absolute top-[-72] right-0">
                  <LottieIcon size={84} src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/lottie.json"/>
                </div>
              </div>
            </div>
            {/*Hero Section Middle*/}
            <div className="flex items-center w-full bg-background-primary max-w-full p-9 rounded-3xl gap-6 shadow-xl shadow-black/10">
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
                        {Array(5).fill(0).map((_, index) => (
                          <Star key={index} size={16} className="text-transparent fill-amber-500"/>
                        ))}
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
                  <Button href="/contact" variant="small">I want the PDF</Button>
                  <Button href="/contact" variant="outline">Take me there</Button>
                </div>
              </div>
            </div>
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

          {/*Call To Action Section*/}
          <div className="flex flex-col items-center p-9 bg-background-secondary w-full rounded-2xl gap-12 shadow-2xl shadow-black/10">
            <div className="flex items-center w-full bg-background-primary max-w-full p-9 rounded-3xl gap-6 shadow-xl shadow-black/10">
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
                        {Array(5).fill(0).map((_, index) => (
                          <Star key={index} size={16} className="text-transparent fill-amber-500"/>
                        ))}
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
                  <Button href="/contact" variant="small">I want the PDF</Button>
                  <Button href="/contact" variant="outline">Take me there</Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}