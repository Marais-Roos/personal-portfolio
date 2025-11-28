// project.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title', // Automatically generates slug from the title
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      description: 'The slug determines the URL of the project page (e.g., /projects/my-new-project).',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      // Using a rich text field (Portable Text) for rich content in Sanity
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The main, detailed description for the project page.',
    }),
    defineField({
      name: 'serviceSlugs',
      title: 'Related Services',
      // Use array of references to link to the 'service' documents
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'service' }], // Links to the Service schema
        },
      ],
      description: 'Select the services/categories this project falls under.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true, // Allows designers to specify a focal point
      },
      fields: [
        defineField({
          name: 'altText',
          title: 'Alt Text (SEO/Accessibility)',
          type: 'string',
          description: 'A brief description of the image for accessibility and SEO.',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'altText',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        },
      ],
      description: 'Additional images for the project gallery.',
    }),
    // NEW FIELD: OpenGraph Image for social media previews
    defineField({
        name: 'opengraphImage',
        title: 'OpenGraph Image (Social Media Share)',
        type: 'image',
        description: 'An image optimized for sharing on platforms like Twitter and Facebook (recommended 1200x630px).',
    }),
    // SEO Fields
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Custom title tag for search engines (max 60 chars).',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Custom meta description for search engines (max 160 chars).',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'mainImage',
    },
  },
});