// src/components/PortableText.tsx
import { PortableText as PortableTextComponent, PortableTextReactComponents } from '@portabletext/react';
import { PortableTextBlock } from '@/data/types'; 
import React from 'react';

// FIX: Added 'Partial<...>' so we don't have to define every single property.
const components: Partial<PortableTextReactComponents> = {
  // --- Custom Block Rendering ---
  block: {
    // Renders a normal paragraph block with appropriate styling
    normal: ({ children }) => <p className="text-lg font-normal mb-6">{children}</p>,
    // Add basic support for headings
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-6 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-4 mb-2">{children}</h3>,
  },
  // You can customize lists, images, and other complex objects here later if needed.
};

interface PortableTextProps {
    value: PortableTextBlock;
}

/**
 * Renders the rich text content from Sanity using the PortableText library.
 */
export default function PortableText({ value }: PortableTextProps) {
  return (
    // prose/max-w-none is a common trick to apply typography defaults in a controlled manner
    <div className="prose max-w-none">
      <PortableTextComponent value={value} components={components} />
    </div>
  );
}