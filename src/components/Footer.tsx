import Image from "next/image";
import Link from "next/link"

export default function Footer(){
    return (
        <footer className="flex flex-col gap-8 w-full lg:max-w-[1056px] md:max-w-[738px] mt-18 md:mt-24 mb-16">
            {/*Top Footer Part*/}
            <div className="pt-8 border-t-2 border-background-secondary w-full flex flex-col md:flex-row px-8 items-center md:justify-between gap-6">
                {/*Top left*/}
                <div className="flex flex-col gap-6 items-center md:items-start flex-1">
                    <div className="relative shrink-0">
                        <Image src="/Logo-blue.svg" alt="Marais Roos Logo" width={180.43} height={62} className="object-contain"/>
                    </div>
                    <p className="text-base font-normal text-center md:text-left">© Marais Roos 2025. All rights reserved.</p>
                    <div className="flex flex-row gap-4 items-left mt-4">
                        <Link className="bg-background-secondary rounded-full w-12 h-12  relative aspect-square flex items-center justify-center hover:border-2 hover:border-dominant" href="https://www.instagram.com/marais_roos/">
                            <Image src="/social_icons/Instagram.svg" alt="Instagram logo" width={24} height={24} className="object-contain"/>
                        </Link>
                        <Link className="bg-background-secondary rounded-full w-12 h-12  relative aspect-square flex items-center justify-center hover:border-2 hover:border-dominant" href="https://www.facebook.com/marais.roos.99/">
                            <Image src="/social_icons/Facebook.svg" alt="Facebook logo" width={24} height={24} className="object-contain"/>
                        </Link>
                        <Link className="bg-background-secondary rounded-full w-12 h-12  relative aspect-square flex items-center justify-center hover:border-2 hover:border-dominant" href="https://x.com/M_Roos09">
                            <Image src="/social_icons/X.svg" alt="X logo" width={24} height={24} className="object-contain"/>
                        </Link>
                        <Link className="bg-background-secondary rounded-full w-12 h-12  relative aspect-square flex items-center justify-center hover:border-2 hover:border-dominant" href="https://www.linkedin.com/in/marais-roos/">
                            <Image src="/social_icons/LinkedIn.svg" alt="LinkedIn logo" width={24} height={24} className="object-contain"/>
                        </Link>
                    </div>
                </div>
                {/*Top right*/}
                <div className="flex flex-col md:flex-row gap-8 md:gap-4 lg:gap-24 w-fit">
                    <div className="flex flex-col gap-4 flex-1">
                        <p className="text-xl font-semibold text-center md:text-left">Quick Links</p>
                        <Link className="text-lg font-normal hover:text-accent text-center md:text-left" href="/">Home</Link>
                        <Link className="text-lg font-normal hover:text-accent text-center md:text-left" href="/about">About</Link>
                        <Link className="text-lg font-normal hover:text-accent text-center md:text-left" href="/projects">Projects</Link>
                        <Link className="text-lg font-normal hover:text-accent text-center md:text-left" href="/contact">Contact</Link>
                    </div>
                    <div className="flex flex-col gap-4 flex-1">
                        <p className="text-xl font-semibold text-center md:text-left">What I Do</p>
                        <Link className="text-lg font-normal hover:text-accent text-center md:text-left" href="/">Web Design & Development</Link>
                        <Link className="text-lg font-normal hover:text-accent text-center md:text-left" href="/">Graphic Design</Link>
                        <Link className="text-lg font-normal hover:text-accent text-center md:text-left" href="/">Automation</Link>
                        <Link className="text-lg font-normal hover:text-accent text-center md:text-left" href="/">Brand Design</Link>
                    </div>
                </div>
            </div>
            {/*Bottom Footer Part*/}
            {/*
            <div className="pt-8 border-t-2 border-background-secondary w-full flex flex-row gap-12 px-8">
                <p>
                    <Link href="" className="hover:underline underline-offset-6">Privacy Policy</Link> / <Link href="" className="hover:underline underline-offset-6">Cookie Policy</Link>
                </p>
            </div>
            */}
        </footer>
    );
}