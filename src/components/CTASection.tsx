import Button from "@/components/Button";
import { Star } from "lucide-react";
import { ReactNode } from "react";
import Image from "next/image";

export default function CTASection() {
  return (
    <div className="flex flex-col md:flex-row items-center w-full bg-background-primary max-w-full p-6 md:p-8 lg:p-9 rounded-3xl gap-6 shadow-xl shadow-black/10">
      {/*Left*/}
      <div className="flex flex-col flex-1 gap-5">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.2em] text-center md:text-left">Check out my <span className="font-black">latest portfolio</span>.</h2>
        <div className="bg-background-secondary flex flex-col gap-4 p-4 rounded-2xl">
          <p className="text-sm md:text-base text-center md:text-left">"Marais fixed something on my screen, and suddenly everything started working smoothly. I guess that's what the kids call tech-savvy."</p>
          <div className="flex items-center gap-4 flex-col md:flex-row">
            <div className="aspect-square w-10 h-10 rounded-full relative overflow-hidden">
              <Image src="/Avatar.png" alt="" fill className="object-contain"/>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="flex gap-0 w-fit">
                {Array(5).fill(0).map((_, index) => (
                  <Star key={index} size={16} className="text-transparent fill-amber-500"/>
                ))}
              </div>
              <p className="font-semibold text-base text-center md:text-left">The Friendly Old Lady Next Door</p>
            </div>
          </div>
        </div>
      </div>
      {/*Right*/}
      <div className="flex flex-col flex-1 gap-5">
        <p className="text-lg md:text-xl text-center md:text-left">Get an in-depth look at the work I do, and how I turn creative ideas into concrete digital assets.</p>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <Button href="/portfolio/Portfolio Large.pdf" target='_blank' variant="small">I want the PDF</Button>
          <Button href="/projects" variant="outline">Take me there</Button>
        </div>
      </div>
    </div>
  );
}
