'use client';

import React, { useEffect, useRef, useState } from "react";
import type {LottiePlayer} from "lottie-web";

interface LottieIconProps {
    src: string;
    className?: string;
}

export default function LottieIcon({ src, className = 'w-6 h-6' }: LottieIconProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [lottie, setLottie] = useState<LottiePlayer | null>(null);

    //Dynamically import the lottie-web library on component mount
    useEffect(() => {
        import("lottie-web").then((Lottie) => {
            setLottie(Lottie.default);
        });
    }, []);

    //Load and play the animation once Lottie is available
    useEffect(() => {
        if (lottie && ref.current) {
            const animation = lottie.loadAnimation({
                container: ref.current, // The DOM element to attach the animation to
                renderer: "svg",        // Render as SVG for best quality and scaling
                loop: true,             // Keep it looping indefinitely
                autoplay: true,         // tart playing immediately
                path: src,              // The remote URL of the Lottie JSON file
            });

            //Cleanup: Destroy the animation instance when the component is removed.
            return () => animation.destroy();
        }
    }, [lottie, src]);

    return (
        <div
            ref={ref}
            className={`inline-block shrink-0 ${className}`} // Prevents the icon from being compressed
        />
    );
}