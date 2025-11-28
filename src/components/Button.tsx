import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = 'primary' | 'small' | 'outline' | 'ghost';

//Define the props the Button component will accept
interface ButtonProps {
    href: string; //The URL the button will link to
    children: ReactNode; //The content inside the button
    className?: string; //Optional additional CSS classes
    variant?: ButtonVariant; //Optional variant to determine styling
    type?: 'submit'| 'button' | 'reset';
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    target?: '_blank';
}

const getVariantClasses = (variant: ButtonVariant = 'primary') => {
    switch (variant) {
        case 'outline':
            return {
                base: 'bg-transparent text-accent border-2 border-accent shadow-none px-4 py-2 gap-4', // Smaller padding and outline
                hover: 'hover:bg-dominant hover:text-background-primary hover:shadow-lg hover:border-transparent',
            };
        case 'small':
            return{
                base: 'bg-accent text-background-primary shadow-lg shadow-black/10 px-4 py-2 gap-4', // Smaller padding
                hover: 'hover:bg-dominant hover:text-background-primary',
            };
        case 'ghost':
            return{
                base: 'bg-transparent text-accent shadow-none px-6 py-4 gap-4', // Retained original large size, transparent
                hover: 'hover:bg-accent/10 hover:text-accent',
            };
        case 'primary':
        default:
            return{
                base: 'bg-accent text-background-primary shadow-lg shadow-black/10 px-6 py-4 gap-4', // Original large size
                hover: 'hover:bg-dominant hover:text-background-primary',
            };
    }
};

export default function Button({ href, children, className = "", variant="primary", type, disabled, onClick, target }: ButtonProps) {
    const variantClasses = getVariantClasses(variant);

    const classes = `
        text-xl text-center
        flex
        justify-center
        items-center
        px-6 py-4
        gap-4
        rounded-2xl
        font-semibold
        transition-all
        

        cursor-pointer

        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}

        ${variantClasses.base}
        ${variantClasses.hover}

        hover:scale-[1.1];

        ${className}
    `;

    if (type) {
        return (
            <button
                type={type} // Crucial for form submission!
                className={classes}
                onClick={onClick}
            >
                {children}
            </button>
        );
    }

    return (
        <Link   
            href={href || "#"} // Fallback to avoid TS error if href is missing, though it shouldn't be here
            className={classes}
            onClick={onClick}
            target={target}
        >
            {children}
        </Link>
    );
}