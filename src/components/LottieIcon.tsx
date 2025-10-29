'use client';

import React, { useEffect, useRef, useState } from "react";
import type {LottiePlayer} from "lottie-web";

interface LottieIconProps {
    src: string;
    size?: number;
}

export default function LottieIcon({ src, size = 24 }: LottieIconProps) {
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
            style={{ width: size, height: size }}
            className="inline-block flex-shrink-0" // Prevents the icon from being compressed
        />
    );
}