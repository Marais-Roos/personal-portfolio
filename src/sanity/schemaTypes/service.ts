// service.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      description: 'The unique identifier for the service (used for filtering projects).',
    }),
    defineField({
      name: 'index',
      title: 'Display Order',
      type: 'number',
      validation: (rule) => rule.required().min(0).integer(),
      description: 'Lower numbers appear earlier in lists (e.g., on the home page).',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description (Card)',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required().max(160),
      description: 'A brief description for the Service Cards on the home page.',
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description (Projects Page)',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
      description: 'A longer description used at the top of the Projects carousel section.',
    }),
    // UPDATED: Changed from 'url' to 'image' for direct upload
    defineField({
      name: 'iconInactive',
      title: 'Icon (Inactive State)',
      type: 'image',
      description: 'The SVG/Image for the inactive state of the service card.',
      options: {
        // SVG upload support (optional but useful for icons)
        accept: 'image/svg+xml,image/png,image/jpeg',
      },
    }),
    // UPDATED: Changed from 'url' to 'image' for direct upload
    defineField({
      name: 'iconActive',
      title: 'Icon (Active/Hover State)',
      type: 'image',
      description: 'The SVG/Image for the active (hover) state of the service card.',
      options: {
        accept: 'image/svg+xml,image/png,image/jpeg',
      },
    }),
    defineField({
      name: 'sectionLink',
      title: 'Section Link (Optional)',
      type: 'string',
      description: 'Optional internal link for the Service Card, e.g., #web-development.',
    }),
  ],
});