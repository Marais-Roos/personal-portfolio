import Button from "@/components/Button";
import { Star } from "lucide-react";
import { ReactNode } from "react";
import Image from "next/image";

export default function CTASection() {
  return (
    <div className="flex items-center w-full bg-background-primary max-w-full p-9 rounded-3xl gap-6 shadow-xl shadow-black/10">
      {/*Left*/}
      <div className="flex flex-col flex-1 gap-5">
        <h2 className="text-5xl font-bold leading-[1.2em]">Check out my <span className="font-black">latest portfolio</span>.</h2>
        <div className="bg-background-secondary flex flex-col gap-4 p-4 rounded-2xl">
          <p className="text-base">"Marais fixed something on my screen, and suddenly everything started working smoothly. I guess that's what the kids call tech-savvy."</p>
          <div className="flex items-center gap-4">
            <div className="aspect-square w-10 h-10 rounded-full relative overflow-hidden">
              <Image src="/Avatar.png" alt="" fill className="object-contain"/>
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
          <Button href="/projects" variant="outline">Take me there</Button>
        </div>
      </div>
    </div>
  );
}
