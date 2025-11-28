// src/components/Navbar.tsx
'use client'

import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import LottieIcon from "./LottieIcon";
import { usePathname } from "next/navigation";
import {useState, useEffect} from "react";
import { Menu, X } from "lucide-react"; 

//Define the navigation items
const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
];

const LOTTIE_URL = "https://fonts.gstatic.com/s/e/notoemoji/latest/1f440/lottie.json"

//The main navbar component
export default function Navbar() {
    // State to track if component is mounted (for hydration)
    const [isMounted, setIsMounted] = useState(false); 
    // NEW state to manage the mobile menu open/closed status
    const [isOpen, setIsOpen] = useState(false); 
    const currentPath = usePathname(); 

    // Use useEffect to flag when the component has mounted on the client
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Function to toggle the mobile menu state
    const toggleMenu = () => setIsOpen(!isOpen);

    // Function to close the menu when a link is clicked
    const closeMenu = () => setIsOpen(false);

    return (
        // Outer div to manage the full width container (Phone) vs max-width container (Tablet)
        // We use lg: to center on the desktop view when max-w is applied
        <div className="z-50 w-full lg:max-w-[1056px] flex justify-center lg:justify-start">
            <nav
                // The main container. Max width is set here for md, but full width for mobile.
                className={`
                    sticky top-6 z-50 flex items-center justify-between bg-background-secondary rounded-xl shadow-2xl shadow-black/10 transition-all

                    /* MOBILE (Below 768px - Phone) */
                    w-full max-w-full p-4
                    
                    /* TABLET (md: 768px to lg: 1023px): Constrained width for Tablet. Max width of 738px applied. */
                    md:w-[738px] md:max-w-[738px] md:px-6 md:py-3 md:gap-6
                    
                    /* DESKTOP (lg: 1024px+): Full width allowed by outer container, bigger padding/gap */
                    lg:w-full lg:max-w-[1056px] lg:px-9 lg:py-4 lg:gap-12
                `}>
                
                {/* Logo */}
                <div className="relative shrink-0 h-8 md:h-12 aspect-46/16 md:w-40 lg:w-auto">
                    <Image
                        src="/Logo-blue.svg"
                        alt="Marais Roos Logo"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* 1. Desktop Horizontal Links (Visible only on Desktop - lg:) */}
                <div className="
                    /* Default (Mobile/Tablet): Hidden */
                    hidden 
                    /* Desktop: Visible, full size, wide spacing */
                    lg:flex 
                    items-center font-medium
                    lg:gap-12 lg:text-xl
                ">
                    {navItems.map((item) =>{
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
                </div>
                
                {/* 2. Controls and CTA Group (Visible on md:/lg:) */}
                <div className="flex items-center gap-4">
                    {/* CTA Button (Visible on Tablet/Desktop, Hidden on Phone) */}
                    <div className="
                        /* Default (Phone): Hidden */
                        hidden
                        /* Tablet (md:) and Desktop (lg:): Visible */
                        md:flex lg:flex
                    ">
                        <Button 
                            href="/contact" 
                            variant="primary" 
                            className="
                                md:text-base md:px-4 md:py-2 
                                lg:text-xl lg:px-6 lg:py-4
                            "
                        >
                            We should talk...
                            <LottieIcon src={LOTTIE_URL} className="w-6 h-6"/>
                        </Button>
                    </div>
                    
                    {/* 3. Hamburger Menu Icon (Visible on Phone/Tablet, Hidden on Desktop) */}
                    <button
                        onClick={toggleMenu}
                        className="
                            lg:hidden md:flex max-md:flex items-center justify-center
                            w-8 h-8 text-dominant hover:text-accent transition-colors
                            cursor-pointer
                        "
                        aria-label="Toggle navigation menu"
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <X size={30} /> : <Menu size={30} />}
                    </button>
                </div>
            </nav>

            {/* Mobile/Tablet Overlay Menu (Visible on md:/max-md:) */}
            <div className={`
                absolute top-[calc(16px+62px+16px+32px)] left-1/2 -translate-x-1/2
                bg-background-secondary z-10 shadow-2xl shadow-black/30
                flex flex-col items-center p-9 gap-12 rounded-2xl
                transition-transform duration-300 ease-in-out
                max-w-[calc(100vw-48px)]
                md:w-[calc(100vw-72px)]
                max-md:w-[738px]
                lg:hidden

                ${isOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-4 opacity-0 invisible'}
            `}>
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeMenu}
                        className={`text-5xl font-bold leading-relaxed ${currentPath === item.href ? 'text-accent' : 'text-dominant'} hover:text-accent transition-colors`}
                    >
                        {item.name}
                    </Link>
                ))}
                
                {/* CTA Button in the mobile menu */}
                <div className="w-full pt-4">
                    <Button href="/contact" variant="primary" onClick={closeMenu}>
                        We should talk...
                        <LottieIcon src={LOTTIE_URL} className="w-6 h-6"/>
                    </Button>
                </div>
            </div>
            
            {/* Overlay to close menu when clicking outside (on md:/max-md:) */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-0 bg-dominant/50 lg:hidden"
                    onClick={closeMenu}
                    role="button"
                    aria-label="Close menu"
                />
            )}
        </div>
    )
}