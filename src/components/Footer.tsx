import Image from "next/image";
import Link from "next/link"

export default function Footer(){
    return (
        <footer className="flex flex-col gap-8 w-full max-w-[1056px]">
            {/*Top Footer Part*/}
            <div className="pt-8 border-t-2 border-background-secondary w-full flex flex-row gap-12 px-8">
                {/*Top left*/}
                <div className="flex flex-col gap-6 items-left flex-1">
                    <div className="relative shrink-0">
                        <Image src="/Logo-blue.svg" alt="Marais Roos Logo" width={180.43} height={62} className="object-contain"/>
                    </div>
                    <p className="text- font-normal">© Marais Roos 2025. All rights reserved.</p>
                    <div className="flex flex-row gap-4 items-left mt-4">
                        <Link className="bg-background-secondary rounded-full w-12 h-12  relative aspect-square flex items-center justify-center hover:border-2 hover:border-dominant" href="">
                            <Image src="/social_icons/Instagram.svg" alt="Instagram logo" width={24} height={24} className="object-contain"/>
                        </Link>
                        <Link className="bg-background-secondary rounded-full w-12 h-12  relative aspect-square flex items-center justify-center hover:border-2 hover:border-dominant" href="">
                            <Image src="/social_icons/Facebook.svg" alt="Facebook logo" width={24} height={24} className="object-contain"/>
                        </Link>
                        <Link className="bg-background-secondary rounded-full w-12 h-12  relative aspect-square flex items-center justify-center hover:border-2 hover:border-dominant" href="">
                            <Image src="/social_icons/X.svg" alt="X logo" width={24} height={24} className="object-contain"/>
                        </Link>
                        <Link className="bg-background-secondary rounded-full w-12 h-12  relative aspect-square flex items-center justify-center hover:border-2 hover:border-dominant" href="">
                            <Image src="/social_icons/LinkedIn.svg" alt="LinkedIn logo" width={24} height={24} className="object-contain"/>
                        </Link>
                    </div>
                </div>
                {/*Top right*/}
                <div className="flex flex-row gap-24 justify-end align-end items-right">
                    <div className="flex flex-col gap-4">
                        <p className="text-xl font-semibold">Quick Links</p>
                        <Link className="text-lg font-normal hover:text-accent" href="/">Home</Link>
                        <Link className="text-lg font-normal hover:text-accent" href="/about">About</Link>
                        <Link className="text-lg font-normal hover:text-accent" href="/projects">Projects</Link>
                        <Link className="text-lg font-normal hover:text-accent" href="/contact">Contact</Link>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-xl font-semibold">What I Do</p>
                        <Link className="text-lg font-normal hover:text-accent" href="/">Web Design & Development</Link>
                        <Link className="text-lg font-normal hover:text-accent" href="/">Graphic Design</Link>
                        <Link className="text-lg font-normal hover:text-accent" href="/">Automation</Link>
                        <Link className="text-lg font-normal hover:text-accent" href="/">Brand Design</Link>
                    </div>
                </div>
            </div>
            {/*Bottom Footer Part*/}
            <div className="pt-8 border-t-2 border-background-secondary w-full flex flex-row gap-12 px-8">
                <p>
                    <Link href="" className="hover:underline underline-offset-6">Privacy Policy</Link> / <Link href="" className="hover:underline underline-offset-6">Cookie Policy</Link>
                </p>
            </div>
        </footer>
    );
}