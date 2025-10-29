'use client'

import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import LottieIcon from "./LottieIcon";
import { usePathname } from "next/navigation";
import {useState, useEffect, use} from "react";

//Define the navigation items
const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
];

const LOTTIE_URL = "https://fonts.gstatic.com/s/e/notoemoji/latest/1f440/lottie.json"

//The main navbar component
export default function Navbar() {
    const [isMounted, setIsMounted] = useState(false); // 1. Initialized to false
    const currentPath = usePathname(); // Get the pathname on the client

    // Use useEffect to flag when the component has mounted on the client
    useEffect(() => {
        // 2. This runs only on the client, after initial render/hydration
        setIsMounted(true);
    }, []);
    return (
        <nav
            //The container for the entire navbar, centred on the page
            className="sticky top-6 z-10 flex items-center justify-between w-[100%] max-w-[1056px] p-4 sm:px-9 sm:py-4 bg-background-secondary  rounded-xl shadow-2xl shadow-black/10">
            {/* Logo*/}
            <div className="relative flex-shrink-0">
                <Image
                    src="/Logo-blue.svg"
                    alt="Marais Roos Logo"
                    width={180.43}
                    height={62}
                    className="object-contain"
                />
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-12 font-medium text-xl">
                {navItems.map((item) =>{
                    // 3. FIX: ONLY perform the isActive check AFTER mounting on the client
                    const isActive = isMounted && (item.href === currentPath);

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`leading-normal transition-all ${isActive ? 'text-accent ': 'text-dominant'} hover:border-b-3 hover:border-accent hover:pb-3 hover:text-accent hover:font-semibold`}
                        >
                            {item.name}
                        </Link>
                    );
                })}

                <Button href="/contact">
                    We should talk...
                    <LottieIcon src={LOTTIE_URL} size={24}/>
                </Button>
            </div>
        </nav>
    )
}