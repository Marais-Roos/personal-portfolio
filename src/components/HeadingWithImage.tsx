import Image from "next/image";

interface HeadingWithImageProps {
    level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    beforeText?: string;
    afterText?: string;
    imageSrc: string;
    imageAlt: string;
    aspectRatio?: string;
    tailwindClasses?: string;
}

export default function HeadingWithImage({
    level = 'h2', 
    beforeText = 'Hello',
    afterText = 'World',
    imageSrc,
    imageAlt = 'Decorative Image',
    aspectRatio = '4 / 3', // New prop with a default value
    tailwindClasses = '', 
}: HeadingWithImageProps) {
    const HeadingTag = level;
    
    return (
        <HeadingTag className={`${tailwindClasses} leading-[1.2]`}>
            <span className="mt-[0.5em] inline">{beforeText}</span>
            {imageSrc && (
                // This div acts as the wrapper to define the image dimensions
                <div 
                    className={`relative inline-block align-middle mx-2 mb-0.5`}
                    style={{ height: "1.5em", aspectRatio: aspectRatio }}
                >
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        className="object-contain" 
                        aria-hidden="true" 
                    />
                </div>
            )}
            <span className="mt-[0.5em] inline">{afterText}</span>
        </HeadingTag>
    );
}