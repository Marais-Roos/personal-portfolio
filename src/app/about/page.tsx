import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeadingWithImage from "@/components/HeadingWithImage";
import { CircleCheck } from 'lucide-react';
import CTASection from "@/components/CTASection";
import Image from "next/image";
import DateBlock from "@/components/DateBlock";
import TimelineContent from "@/components/TimelineContent";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title : "About Me | The Guy Behind the Screen - Marais Roos",
  description: "From electronic engineering to financial advising, and finally to web design. Read the slightly chaotic backstory of how I found my way to code (and why I'm still here).",

  openGraph: {
    title: "About Me | The Guy Behind the Screen - Marais Roos",
    description: "From electronic engineering to financial advising, and finally to web design. Read the slightly chaotic backstory of how I found my way to code (and why I'm still here).",
    url: "https://www.maraisroos.co.za/about",
    siteName: "Marais Roos Portfolio",
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: '/opengraph_images/About.png',
        width: 1200,
        height: 630,
        alt: "Marais Roos Portfolio Cover",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Me | The Guy Behind the Screen - Marais Roos",
    description: "From electronic engineering to financial advising, and finally to web design. Read the slightly chaotic backstory of how I found my way to code (and why I'm still here).",
    images: ["/opengraph_images/About.png"],
  }
};

export default function About() {

    return (
        <div className="bg-background-primary min-h-screen">
            <div className="flex flex-col items-center mx-auto py-4 lg:px-18 md:px-9 px-6">
                {/* The Navbar component */}
                <div className="sticky top-6 w-full flex justify-center z-10">
                    <Navbar/>
                </div>
        
                {/* Semantic main content area for the Hero Section and other page content */}
                <main className="flex flex-col items-center justify-start grow w-full lg:max-w-[1056px] lg:gap-24 lg:pt-25 pt-12 md:max-w-[738px] md:gap-18 md:pt-20 gap-20 max-w-full">
                    {/*Hero Section Container*/}
                    <div className="flex flex-col items-center p-6 md:p-9 bg-background-secondary w-full rounded-2xl gap-12 shadow-2xl shadow-black/10 bg-[url(/background_2.png)] bg-center"> 
                        <HeadingWithImage
                            level="h1" // **The dynamic tag you needed!**
                            beforeText="Hey there, I'm Marais"
                            afterText="."
                            imageSrc="/About Hero.png" // Path to an image in your 'public' folder
                            imageAlt="Lorem ipsum"
                            aspectRatio="1 / 1"
                            tailwindClasses="text-4xl md:text-6xl lg:text-6xl font-black text-dominant w-full text-left"
                        />
                        <p className="text-xl md:text-2xl lg:text-3xl text-left">I've messed up more than a few things along the way, from engineering to finance, but I'm still here, making websites and telling stories the way I want them told.</p>
                        {/* Quick facts section */}
                        <div className="flex flex-col gap-8 w-full">
                            <h2 className="font-bold text-dominant text-2xl md:text-3xl lg:text-5xl">Quick Facts About Me</h2>
                            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                                <div className=" flex flex-col gap-6 flex-1">
                                    <div className="flex align-top gap-4 text-dominant text-lg md:text-xl">
                                        <CircleCheck className="shrink-0 text-background-secondary fill-dominant w-[24] h-[24] md:w-[30] md:h-[30]"/>
                                        <p className="text-base md:text-lg lg:text-xl">I started in engineering but realized creativity was calling louder than formulas.</p>
                                    </div>
                                    <div className="flex align-top gap-4 text-dominant text-lg md:text-xl">
                                        <CircleCheck className="shrink-0 text-background-secondary fill-dominant  w-[24] h-[24] md:w-[30] md:h-[30]"/>
                                        <p className="text-base md:text-lg lg:text-xl">I'm currently studying BSc Informatics at UNISA because I still love logic and tech puzzles.</p>
                                    </div>
                                    <div className="flex align-top gap-4 text-dominant text-lg md:text-xl">
                                        <CircleCheck className="shrink-0 text-background-secondary fill-dominant w-[24] h-[24] md:w-[30] md:h-[30]"/>
                                        <p className="text-base md:text-lg lg:text-xl">I like clean, functional design — nothing too fancy, just stuff that works and looks good.</p>
                                    </div>
                                </div>
                                <div className=" flex flex-col gap-6 flex-1">
                                    <div className="flex align-top gap-4 text-dominant text-lg md:text-xl">
                                        <CircleCheck className="shrink-0 text-background-secondary fill-dominant w-[24] h-[24] md:w-[30] md:h-[30]"/>
                                        <p className="text-base md:text-lg lg:text-xl">I spent nearly a year as a financial advisor — it wasn't quite my thing, but I made great friends and learned a lot about sticking around for the long term.</p>
                                    </div>
                                    <div className="flex align-top gap-4 text-dominant text-lg md:text-xl">
                                        <CircleCheck className="shrink-0 text-background-secondary fill-dominant w-[24] h-[24] md:w-[30] md:h-[30]"/>
                                        <p className="text-base md:text-lg lg:text-xl">I've lost count of how many times I've rewatched The Office & Family Guy — it's basically comfort food.</p>
                                    </div>
                                    <div className="flex align-top gap-4 text-dominant text-lg md:text-xl">
                                        <CircleCheck className="shrink-0 text-background-secondary fill-dominant w-[24] h-[24] md:w-[30] md:h-[30]"/>
                                        <p className="text-base md:text-lg lg:text-xl">I'm pretty shy for an extrovert — maybe just a bit short on confidence. If you have any tips... please reach out! 😅</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*About Section*/}
                    <div className="flex flex-col items-left p-6 md:px-9 w-full gap-12"> 
                        <HeadingWithImage
                            level="h2" // **The dynamic tag you needed!**
                            beforeText="My journey to "
                            afterText=" knows where."
                            imageSrc="/Call out accent.png" // Path to an image in your 'public' folder
                            imageAlt="Lorem ipsum"
                            aspectRatio="4/3"
                            tailwindClasses="text-3xl md:text-5xl font-bold text-dominant text-left"
                        />
                        <div className="flex flex-col md:flex-row gap-8 w-full">
                            <div className="flex flex-col gap-6 w-full md:w-1/2">
                                <p className="text-dominant text-base md:text-lg lg:text-xl text-left">My web design journey started back in 2020, at the height of the COVID-19 pandemic, when everyone was either posting their latest banana bread recipe or bragging about home-brewed pineapple beer.</p>
                                <p className="text-dominant text-sm md:text-base text-left">What started as a hobby — part curiosity, part boredom — quickly became a full-blown obsession. I've always liked tech that shows up in places it's not supposed to. That's why I originally went into electronic engineering, and later switched to Information and Knowledge Systems, with a focus on IT and genetics. The mix of logic and creativity stuck — and web design hits that same sweet spot.</p>
                                <p className="text-dominant text-sm md:text-base text-left">Somewhere in between all of that, I spent a year as a financial advisor. I didn't hate it, but I also didn't want to grow old chasing commission off the back of someone else's retirement plan. So I leaned into the thing I actually liked doing.</p>
                                <p className="text-dominant text-sm md:text-base text-left">Now I run a one-man web design studio. It's just me — no fake team, no empty promises. I keep things simple: clean websites, straight talk, and long-term support if you need it. That's the whole pitch.</p>
                            </div>
                            <div className="flex relative aspect-3/4 w-full  md:w-1/2">
                                <Image src="/About Image.png" alt="A timeline showing Marais Roos's journey from engineering to finance to web development." fill className="object-contain"/>
                            </div>
                        </div>
                    </div>
                    {/*Timeline Section */}
                    <div className="flex flex-col px-6 md:px-9 align-center">
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-6 w-full border-l-2 border-accent items-start">
                            <DateBlock date="1999 - 2005"/>
                            <TimelineContent src="/timeline images/1.png" content="Born on a farm near what was then Pietersburg (now Polokwane). Spent most of my early days getting sunburnt, and drawing on things that weren't paper (i.e., my father's bakkie.)\n\nMy father introduced me and my brother to computers early in life, playing games on a PC running Windows 95.\n\nPerhaps that's where my fascination with all things tech started?"/>
                            <DateBlock date="2006 - 2017"/>
                            <TimelineContent src="/timeline images/2.png" content="Went through primary and high school in the Vaal Triangle. Took IT, EGD, physics, and maths — because apparently I liked pain. Somewhere in there, a teacher said I was going to be an artist. I ignored her… to my own fault."/>
                            <DateBlock date="2018"/>
                            <TimelineContent src="/timeline images/3.png" content="Started Electronic Engineering at Tuks. Thought I'd build robots or satellites. Mostly built character. Lived in Sonop and made friends for life. Passed more bar stools than modules."/>
                            <DateBlock date="2019 - 2021"/>
                            <TimelineContent src="/timeline images/4.png" content="Switched to Information and Knowledge Systems. Loved the mix of IT and genetics — tech showing up in places it shouldn't. Didn't finish the degree then, but the seed was planted."/>
                            <DateBlock date="2022"/>
                            <TimelineContent src="/timeline images/5.png" content="Did a short course in C++ at Boston City Campus, because apparently I missed debugging things that worked perfectly fine five minutes ago."/>
                            <DateBlock date="2023"/>
                            <TimelineContent src="/timeline images/6.png" content="Worked as a financial advisor. Learned how to shake hands, make small talk, and sell things I didn't fully believe in. Good people, solid job, not for me."/>
                            <DateBlock date="2024 - Present"/>
                            <TimelineContent src="/timeline images/7.png" content="Currently wrapping up a BSc in Informatics through UNISA while running Roos Web Design — my one-man studio where I make clean, fast, low-BS websites for humans. Still juggling, still learning, still having a laugh."/>
                        </div>    
                    </div>

                    {/*Tools section*/}
                    <div className="w-full flex flex-col gap-8 items-center">
                        <div className="flex flex-col gap-5 items-center w-full">
                            <h2 className="text-4xl md:text-5xl font-bold text-dominant text-center">The tools in my shed</h2>
                            <p className="text-dominant text-lg md:text-xl text-center">I utilize several tools… here are my favourites.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-4 md:gap-6 items-center justify-center align-center w-full">
                            <div className="border-2 rounded-2xl border-background-secondary p-6 items-center flex flex-col">
                                <div className="w-24 md:w-40 aspect-video relative shrink-0">
                                    <Image src="/tools/Figma-1.svg" alt="Figma Logo" fill className=" w-full object-contain"/>
                                </div>
                            </div>
                            <div className="border-2 rounded-2xl border-background-secondary p-6  items-center flex flex-col">
                                <div className="w-24 md:w-40 aspect-video relative shrink-0">
                                    <Image src="/tools/Webflow-1.svg" alt="Webflow Logo" fill className=" w-full object-contain"/>
                                </div>
                            </div>
                            <div className="border-2 rounded-2xl border-background-secondary p-6 items-center flex flex-col">
                                <div className="w-24 md:w-40 aspect-video relative shrink-0">
                                    <Image src="/tools/Framer-1.svg" alt="Framer Logo" fill className=" w-full object-contain"/>
                                </div>
                            </div>
                            <div className="border-2 rounded-2xl border-background-secondary p-6 items-center flex flex-col">
                                <div className="w-24 md:w-40 aspect-video relative shrink-0">
                                    <Image src="/tools/Zapier-1.svg" alt="Zapier Logo" fill className=" w-full object-contain"/>
                                </div>
                            </div>
                            <div className="border-2 rounded-2xl border-background-secondary p-6 items-center flex flex-col">
                                <div className="w-24 md:w-40 aspect-video relative shrink-0">
                                    <Image src="/tools/MailerLite-1.svg" alt="Mailerlite Logo" fill className=" w-full object-contain"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Call To Action Section*/}
                    <div className="flex flex-col items-center lg:p-9 p-6 bg-background-secondary w-full rounded-2xl gap-12 shadow-2xl shadow-black/10 bg-[url(/background_1.png)]">
                      <CTASection/>
                    </div>

                    
                </main>
                <Footer/>
            </div>
        </div>
    );

}