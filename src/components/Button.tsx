import Link from "next/link";
import { ReactNode } from "react";

//Define the props the Button component will accept
interface ButtonProps {
    href: string; //The URL the button will link to
    children: ReactNode; //The content inside the button
    className?: string; //Optional additional CSS classes
}

export default function Button({ href, children, className = "" }: ButtonProps) {
    return (
        <Link   
            href={href}
            className={`
                text-xl
                flex
                justify-center
                items-center
                px-6 py-4
                gap-4
                rounded-2xl
                bg-accent
                text-background-primary
                font-semibold
                shadow-lg
                shadow-black/10
                transition-all
                hover:bg-dominant
                hover:scale-[1.05]
                ${className}
            `}
        >
            {children}
        </Link>
    );
}