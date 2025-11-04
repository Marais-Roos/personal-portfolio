import Image from "next/image";
import React, { ReactNode } from 'react';

interface TimelineContentProps {
    src: string;
    content: string | ReactNode;
}

export default function TimelineContent({src='', content=''}: TimelineContentProps) {

    let processedContent = content;

    if (typeof content === 'string') {
        
        // 1. Normalize: Replaces any literal '\\n' (two characters) with '\n' (the actual newline character).
        // This handles the double-escaping issue from the call site.
        const normalizedContent = content.replace(/\\n/g, '\n');
        
        // 2. Split and Map: Split the normalized string by the actual newline character (\n)
        // and map the segments to an array of text pieces interleaved with <br /> tags.
        processedContent = normalizedContent.split('\n').map((line, index, array) => (
            // Use React.Fragment to group adjacent elements without adding an extra node to the DOM
            <React.Fragment key={index}>
                {line}
                {/* Add a line break element after every segment, except the last one in the array. */}
                {index < array.length - 1 && <br />}
            </React.Fragment>
        ));
    }

    return (
        <div className="bg-background-secondary p-4 md:p-6 rounded-2xl w-full flex gap-4 md:gap-6 col-span-1 md:col-span-4 flex-col md:flex-row">
            <p className="text-dominant text-sm md:text-base text-left">
                {processedContent}
            </p>
        <div className="flex-1 flex relative aspect-square shrink-0 md:w-32 md:h-32 w-24 h-24">
            <Image src={src} alt="" fill className=" w-full object-contain"/>
        </div>
    </div>
    )
    
}