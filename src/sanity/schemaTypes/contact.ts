import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contact',
  title: 'Contact Form Submissions',
  type: 'document',
  // Make these read-only in the Studio so you don't accidentally edit user messages
  readOnly: true, 
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Read', value: 'read' },
          { title: 'Replied', value: 'replied' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
      readOnly: false, // Allow changing status
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    },
  },
});