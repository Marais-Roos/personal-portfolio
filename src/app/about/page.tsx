import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeadingWithImage from "@/components/HeadingWithImage";
import { CircleCheck } from 'lucide-react';
import CTASection from "@/components/CTASection";
import Image from "next/image";

export default function About() {

    return (
        <div className="bg-background-primary min-h-screen">
            <div className="flex flex-col items-center mx-auto py-4 px-18 ">
                {/* The Navbar component */}
                <Navbar />
        
                {/* Semantic main content area for the Hero Section and other page content */}
                <main className="flex flex-col items-center justify-start grow w-full max-w-[1056px] gap-24 pt-25">
                    {/*Hero Section Container*/}
                    <div className="flex flex-col items-left p-9 bg-background-secondary w-full rounded-2xl gap-12 shadow-2xl shadow-black/10 bg-[url(/background_2.png)]"> 
                        <HeadingWithImage
                            level="h1" // **The dynamic tag you needed!**
                            beforeText="Hey there, I'm Marais."
                            afterText=""
                            imageSrc="/About Hero.png" // Path to an image in your 'public' folder
                            imageAlt="Lorem ipsum"
                            aspectRatio="1 / 1"
                            tailwindClasses="text-6xl font-black text-dominant items-left flex gap-5 w-full text-left"
                        />
                        <p className="text-3xl">I've messed up more than a few things along the way, from engineering to finance, but I'm still here, making websites and telling stories the way I want them told.</p>
                        {/* Quick facts section */}
                        <div className="flex flex-col gap-8">
                            <h2 className="font-bold text-dominant text-5xl">Quick Facts About Me</h2>
                            <div className="flex gap-8">
                                <div className=" flex flex-col gap-6 flex-1">
                                    <div className="flex align-top gap-4 text-dominant text-xl">
                                        <CircleCheck size={30} className="shrink-0 text-background-secondary fill-dominant"/>
                                        <p>I started in engineering but realized creativity was calling louder than formulas.</p>
                                    </div>
                                    <div className="flex align-top gap-4 text-dominant text-xl">
                                        <CircleCheck size={30} className="shrink-0 text-background-secondary fill-dominant"/>
                                        <p>I'm currently studying BSc Informatics at UNISA because I still love logic and tech puzzles.</p>
                                    </div>
                                    <div className="flex align-top gap-4 text-dominant text-xl">
                                        <CircleCheck size={30} className="shrink-0 text-background-secondary fill-dominant"/>
                                        <p>I like clean, functional design — nothing too fancy, just stuff that works and looks good.</p>
                                    </div>
                                </div>
                                <div className=" flex flex-col gap-6 flex-1">
                                    <div className="flex align-top gap-4 text-dominant text-xl">
                                        <CircleCheck size={30} className="shrink-0 text-background-secondary fill-dominant"/>
                                        <p>I spent nearly a year as a financial advisor — it wasn't quite my thing, but I made great friends and learned a lot about sticking around for the long term.</p>
                                    </div>
                                    <div className="flex align-top gap-4 text-dominant text-xl">
                                        <CircleCheck size={30} className="shrink-0 text-background-secondary fill-dominant"/>
                                        <p>I've lost count of how many times I've rewatched The Office & Family Guy — it's basically comfort food.</p>
                                    </div>
                                    <div className="flex align-top gap-4 text-dominant text-xl">
                                        <CircleCheck size={30} className="shrink-0 text-background-secondary fill-dominant"/>
                                        <p>I'm pretty shy for an extrovert — maybe just a bit short on confidence. If you have any tips... please reach out! 😅</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*About Section*/}
                    <div className="flex flex-col items-center p-9 bg-background-secondary w-full rounded-2xl gap-12 shadow-2xl shadow-black/10"> 
                        <HeadingWithImage
                            level="h2" // **The dynamic tag you needed!**
                            beforeText="My journey to "
                            afterText=" knows where."
                            imageSrc="/Call out accent.png" // Path to an image in your 'public' folder
                            imageAlt="Lorem ipsum"
                            aspectRatio="4 / 3"
                            tailwindClasses="text-5xl font-bold text-dominant items-left flex gap-4 w-full text-left"
                        />
                        <div className="flex gap-8">
                            <div className="flex-1 flex flex-col gap-6 shrink-0">
                                <p className="text-dominant text-xl text-left">My web design journey started back in 2020, at the height of the COVID-19 pandemic, when everyone was either posting their latest banana bread recipe or bragging about home-brewed pineapple beer.</p>
                                <p className="text-dominant text-base text-left">What started as a hobby — part curiosity, part boredom — quickly became a full-blown obsession. I've always liked tech that shows up in places it's not supposed to. That's why I originally went into electronic engineering, and later switched to Information and Knowledge Systems, with a focus on IT and genetics. The mix of logic and creativity stuck — and web design hits that same sweet spot.</p>
                                <p className="text-dominant text-base text-left">Somewhere in between all of that, I spent a year as a financial advisor. I didn't hate it, but I also didn't want to grow old chasing commission off the back of someone else's retirement plan. So I leaned into the thing I actually liked doing.</p>
                                <p className="text-dominant text-base text-left">Now I run a one-man web design studio. It's just me — no fake team, no empty promises. I keep things simple: clean websites, straight talk, and long-term support if you need it. That's the whole pitch.</p>
                            </div>
                            <div className="flex-1 flex relative aspect-3/4 shrink-0">
                                <Image src="/About Image.png" alt="A timeline showing Marais Roos's journey from engineering to finance to web development." fill className="w-full object-cover"/>
                            </div>
                        </div>
                    </div>
                    {/*Timeline Section */}
                    <div className="flex flex-col px-9 align-center">
                        <div className="grid grid-cols-6 gap-6 w-full border-l-2 border-accent items-start">
                            {/*Date Blocks*/}
                            <div className="flex p-6 items-center relative col-span-2">
                                <div className="h-6 w-6 rounded-full border-accent bg-background-primary border-2 absolute left-[-12]"></div>
                                <h3 className="text-5xl font-bold text-dominant items-left flex gap-4 w-full text-left">1999 - 2005</h3>
                            </div>
                            {/*Content Blocks*/}
                            <div className="bg-background-secondary p-6 rounded-2xl w-full flex gap-6 col-span-4 ">
                                <p className="text-dominant text-base text-left">
                                    Born on a farm near what was then Pietersburg (now Polokwane). Spent most of my early days getting sunburnt, and drawing on things that weren't paper (i.e., my father's bakkie.)
                                    <br/><br/>
                                    My father introduced me and my brother to computers early in life, playing games on a PC running Windows 95. 
                                    <br/><br/>
                                    Perhaps that's where my fascination with all things tech started?
                                </p>
                                <div className="flex-1 flex relative aspect-square shrink-0 w-32 h-32">
                                    <Image src="/timeline images/1.png" alt="" fill className=" w-full object-contain"/>
                                </div>
                            </div>
                            {/*Date Blocks*/}
                            <div className="flex p-6 items-center relative col-span-2">
                                <div className="h-6 w-6 rounded-full border-accent bg-background-primary border-2 absolute left-[-12]"></div>
                                <h3 className="text-5xl font-bold text-dominant items-left flex gap-4 w-full text-left">2006 - 2017</h3>
                            </div>
                            {/*Content Blocks*/}
                            <div className="bg-background-secondary p-6 rounded-2xl w-full flex gap-6 col-span-4">
                                <p className="text-dominant text-base text-left">
                                    Went through primary and high school in the Vaal Triangle. Took IT, EGD, physics, and maths — because apparently I liked pain. Somewhere in there, a teacher said I was going to be an artist. I ignored her… to my own fault.
                                </p>
                                <div className="flex-1 flex relative aspect-square shrink-0 w-32 h-32">
                                    <Image src="/timeline images/2.png" alt="" fill className=" w-full object-contain"/>
                                </div>
                            </div>
                            {/*Date Blocks*/}
                            <div className="flex p-6 items-center relative col-span-2">
                                <div className="h-6 w-6 rounded-full border-accent bg-background-primary border-2 absolute left-[-12]"></div>
                                <h3 className="text-5xl font-bold text-dominant items-left flex gap-4 w-full text-left">2018</h3>
                            </div>
                            {/*Content Blocks*/}
                            <div className="bg-background-secondary p-6 rounded-2xl w-full flex gap-6 col-span-4">
                                <p className="text-dominant text-base text-left">
                                    Started Electronic Engineering at Tuks. Thought I'd build robots or satellites. Mostly built character. Lived in Sonop and made friends for life. Passed more bar stools than modules.
                                </p>
                                <div className="flex-1 relative aspect-square shrink-0 w-32 h-32">
                                    <Image src="/timeline images/3.png" alt="" fill className=" w-full object-contain"/>
                                </div>
                            </div>
                            {/*Date Blocks*/}
                            <div className="flex p-6 items-center relative col-span-2">
                                <div className="h-6 w-6 rounded-full border-accent bg-background-primary border-2 absolute left-[-12]"></div>
                                <h3 className="text-5xl font-bold text-dominant items-left flex gap-4 w-full text-left">2019 - 2021</h3>
                            </div>
                            {/*Content Blocks*/}
                            <div className="bg-background-secondary p-6 rounded-2xl w-full flex gap-6 col-span-4">
                                <p className="text-dominant text-base text-left">
                                    Switched to Information and Knowledge Systems. Loved the mix of IT and genetics — tech showing up in places it shouldn't. Didn't finish the degree then, but the seed was planted.
                                </p>
                                <div className="flex-1 flex relative aspect-square shrink-0 w-32 h-32">
                                    <Image src="/timeline images/4.png" alt="" fill className=" w-full object-contain"/>
                                </div>
                            </div>
                            {/*Date Blocks*/}
                            <div className="flex p-6 items-center relative col-span-2">
                                <div className="h-6 w-6 rounded-full border-accent bg-background-primary border-2 absolute left-[-12]"></div>
                                <h3 className="text-5xl font-bold text-dominant items-left flex gap-4 w-full text-left">2022</h3>
                            </div>
                            {/*Content Blocks*/}
                            <div className="bg-background-secondary p-6 rounded-2xl w-full flex gap-6 col-span-4">
                                <p className="text-dominant text-base text-left">
                                    Did a short course in C++ at Boston City Campus, because apparently I missed debugging things that worked perfectly fine five minutes ago.
                                </p>
                                <div className="flex-1 flex relative aspect-square shrink-0 w-32 h-32">
                                    <Image src="/timeline images/5.png" alt="" fill className=" w-full object-contain"/>
                                </div>
                            </div>
                            {/*Date Blocks*/}
                            <div className="flex p-6 items-center relative col-span-2">
                                <div className="h-6 w-6 rounded-full border-accent bg-background-primary border-2 absolute left-[-12]"></div>
                                <h3 className="text-5xl font-bold text-dominant items-left flex gap-4 w-full text-left">2023</h3>
                            </div>
                            {/*Content Blocks*/}
                            <div className="bg-background-secondary p-6 rounded-2xl w-full flex gap-6 col-span-4">
                                <p className="text-dominant text-base text-left">
                                    Worked as a financial advisor. Learned how to shake hands, make small talk, and sell things I didn't fully believe in. Good people, solid job, not for me.
                                </p>
                                <div className="flex-1 flex relative aspect-square shrink-0 w-32 h-32">
                                    <Image src="/timeline images/6.png" alt="" fill className=" w-full object-contain"/>
                                </div>
                            </div>
                            {/*Date Blocks*/}
                            <div className="flex p-6 items-center relative col-span-2">
                                <div className="h-6 w-6 rounded-full border-accent bg-background-primary border-2 absolute left-[-12]"></div>
                                <h3 className="text-5xl font-bold text-dominant items-left flex gap-4 w-full text-left">2024 - Present</h3>
                            </div>
                            {/*Content Blocks*/}
                            <div className="bg-background-secondary p-6 rounded-2xl w-full flex gap-6 col-span-4">
                                <p className="text-dominant text-base text-left">
                                    Currently wrapping up a BSc in Informatics through UNISA while running Roos Web Design — my one-man studio where I make clean, fast, low-BS websites for humans. Still juggling, still learning, still having a laugh.
                                </p>
                                <div className="flex-1 flex relative aspect-square shrink-0 w-32 h-32">
                                    <Image src="/timeline images/7.png" alt="" fill className=" w-full object-contain"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Tools section*/}
                    <div className="w-full flex flex-col gap-8 items-center">
                        <div className="flex flex-col gap-5 items-center w-full">
                            <h2 className="text-5xl font-bold text-dominant text-center">The tools in my shed</h2>
                            <p className="text-dominant text-xl text-center">I utilize several tools… here are my favourites.</p>
                        </div>
                        <div className="grid grid-cols-3 grid-rows-2 gap-6 items-center justify-center align-center w-full">
                            <div className="border-2 rounded-2xl border-background-secondary p-6 items-center flex flex-col">
                                <div className="w-40 aspect-video relative shrink-0">
                                    <Image src="/tools/Figma-1.svg" alt="Figma Logo" fill className=" w-full object-contain"/>
                                </div>
                            </div>
                            <div className="border-2 rounded-2xl border-background-secondary p-6  items-center flex flex-col">
                                <div className="w-40 aspect-video relative shrink-0">
                                    <Image src="/tools/Webflow-1.svg" alt="Webflow Logo" fill className=" w-full object-contain"/>
                                </div>
                            </div>
                            <div className="border-2 rounded-2xl border-background-secondary p-6 items-center flex flex-col">
                                <div className="w-40 aspect-video relative shrink-0">
                                    <Image src="/tools/Framer-1.svg" alt="Framer Logo" fill className=" w-full object-contain"/>
                                </div>
                            </div>
                            <div className="border-2 rounded-2xl border-background-secondary p-6 items-center flex flex-col">
                                <div className="w-40 aspect-video relative shrink-0">
                                    <Image src="/tools/Zapier-1.svg" alt="Zapier Logo" fill className=" w-full object-contain"/>
                                </div>
                            </div>
                            <div className="border-2 rounded-2xl border-background-secondary p-6 items-center flex flex-col">
                                <div className="w-40 aspect-video relative shrink-0">
                                    <Image src="/tools/MailerLite-1.svg" alt="Mailerlite Logo" fill className=" w-full object-contain"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Call To Action Section*/}
                    <div className="flex flex-col items-center p-9 bg-background-secondary w-full rounded-2xl gap-12 shadow-2xl shadow-black/10 bg-[url(/background_1.png)]">
                      <CTASection/>
                    </div>

                    <Footer/>
                </main>
            </div>
        </div>
    );

}