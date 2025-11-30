// src/components/PortableText.tsx
import { PortableText as PortableTextComponent, PortableTextReactComponents } from '@portabletext/react';
import { PortableTextBlock } from '@/data/types'; 
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image
import { getImageUrl } from '@/sanity/lib/image'; // Import your image helper

const components: Partial<PortableTextReactComponents> = {
  // --- Custom Block Rendering ---
  block: {
    normal: ({ children }) => <p className="text-lg font-normal leading-relaxed mb-6">{children}</p>,
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-10 mb-6 text-black">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-8 mb-4 text-black">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-6 mb-3 text-black">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 py-1 my-6 text-xl italic text-gray-700">
        {children}
      </blockquote>
    ),
  },

  // --- Lists ---
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-lg font-normal pl-1">{children}</li>,
    number: ({ children }) => <li className="text-lg font-normal pl-1">{children}</li>,
  },

  // --- Marks (Inline styles) ---
  marks: {
    strong: ({ children }) => <strong className="font-bold text-black">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      const target = !value.href.startsWith('/') ? '_blank' : undefined;
      return (
        <Link
          href={value.href}
          rel={rel}
          target={target}
          className="font-medium underline decoration-gray-400 underline-offset-4 transition-colors hover:text-blue-600 hover:decoration-blue-600"
        >
          {children}
        </Link>
      );
    },
  },

  // --- Custom Types (Images, etc.) ---
  types: {
    image: ({ value }) => {
      // 1. Get the URL using your helper
      const imageUrl = getImageUrl(value);
      
      // 2. Render the image
      // We use width={0} height={0} sizes="100vw" w-full h-auto to make it fully responsive
      // because we don't always know the exact dimensions from inside the rich text.
      return (
        <div className="my-8 relative w-full overflow-hidden rounded-lg bg-gray-50">
           <Image
            src={imageUrl}
            alt={value.alt || 'Project Content Image'}
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, 800px"
            className="w-full h-auto object-cover"
          />
          {/* Optional: Render caption if you add one later */}
          {value.caption && (
            <div className="text-sm text-gray-500 mt-2 text-center italic">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
  },
};

interface PortableTextProps {
  value: PortableTextBlock[]; // Note: value is usually an array of blocks
}

export default function PortableText({ value }: PortableTextProps) {
  return (
    <div className="prose max-w-none text-gray-800">
      <PortableTextComponent value={value} components={components} />
    </div>
  );
}