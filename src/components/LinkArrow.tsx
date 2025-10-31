'use client'

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface LinkArrowProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export default function LinkArrow({ href, children, className = "" }: LinkArrowProps) {
    return (
        <Link
            href={href}
            className={`
                group
                flex
                items-left
                align-center
                text-dominant
                font-semibold
                text-xl
                leading-normal
                transition-all
                gap-4

                hover:gap-6
                hover:text-accent

                ${className}
            `}
        >
            {children}
            <ArrowRight size={24} className="transition-transform"/>
        </Link>
    );
}