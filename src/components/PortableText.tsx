// src/components/PortableText.tsx
import { PortableText as PortableTextComponent, PortableTextReactComponents } from '@portabletext/react';
import { PortableTextBlock } from '@/data/types'; 
import React from 'react';
import Link from 'next/link';

const components: Partial<PortableTextReactComponents> = {
  // --- Custom Block Rendering ---
  block: {
    // normal: Your standard paragraph. 
    // 'text-lg': Makes it readable and elegant.
    // 'leading-relaxed': Adds breathing room between lines for better readability.
    normal: ({ children }) => <p className="text-lg font-normal leading-relaxed mb-6">{children}</p>,

    // Headings: Bold and hierarchically sized.
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-10 mb-6 text-black">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-8 mb-4 text-black">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-6 mb-3 text-black">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-bold mt-4 mb-2 text-black">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 py-1 my-6 text-xl italic text-gray-700">
        {children}
      </blockquote>
    ),
  },

  // --- Lists ---
  list: {
    // 'list-disc': Adds standard bullet points.
    // 'space-y-2': Adds vertical space between list items.
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
    
    // 'list-decimal': Adds 1., 2., 3. numbering.
    number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
  },

  listItem: {
    // Ensures list items match your paragraph font size ('text-lg').
    bullet: ({ children }) => <li className="text-lg font-normal pl-1">{children}</li>,
    number: ({ children }) => <li className="text-lg font-normal pl-1">{children}</li>,
  },

  // --- Marks (Inline styles like Bold, Link, etc.) ---
  marks: {
    // 'strong': Bold text.
    strong: ({ children }) => <strong className="font-bold text-black">{children}</strong>,

    // 'em': Italic text.
    em: ({ children }) => <em className="italic">{children}</em>,

    // 'code': For inline code snippets (optional, but good for devs).
    code: ({ children }) => (
      <code className="bg-gray-100 text-red-500 rounded px-1 py-0.5 text-sm font-mono">
        {children}
      </code>
    ),

    // 'link': External or internal links.
    link: ({ children, value }) => {
      // Check if the link is external (starts with http/https)
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      const target = !value.href.startsWith('/') ? '_blank' : undefined;

      return (
        <Link
          href={value.href}
          rel={rel}
          target={target}
          // 'underline': Adds a line under the text.
          // 'decoration-1': Makes the underline thin.
          // 'underline-offset-4': Pushes the underline down slightly for a modern look.
          // 'hover:text-blue-600': Changes color on hover (adjust to your brand color).
          className="font-medium underline decoration-gray-400 underline-offset-4 transition-colors hover:text-blue-600 hover:decoration-blue-600"
        >
          {children}
        </Link>
      );
    },
  },
};

interface PortableTextProps {
  value: PortableTextBlock[]; 
}

/**
 * Renders the rich text content from Sanity using the PortableText library.
 */
export default function PortableText({ value }: PortableTextProps) {
  return (
    // 'max-w-none': Prevents Tailwind's 'prose' plugin from constraining width too much if you use it later.
    // 'text-gray-800': Sets a default readable dark gray for text.
    <div className="prose max-w-none text-gray-800">
      <PortableTextComponent value={value} components={components} />
    </div>
  );
}