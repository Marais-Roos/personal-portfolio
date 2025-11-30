// src/sanity/schemaTypes/portfolioDownload.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'portfolioDownload',
  title: 'Portfolio Download Requests',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (rule) => rule.required().email(),
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Email Sent', value: 'sent' },
          { title: 'Email Opened', value: 'opened' },
          { title: 'Contacted Back', value: 'contacted' },
          { title: 'In Discussion', value: 'discussing' },
          { title: 'Opportunity', value: 'opportunity' },
          { title: 'Not Interested', value: 'not_interested' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'sent',
    }),
    defineField({
      name: 'requestedAt',
      title: 'Requested At',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'source',
      title: 'Source Page',
      type: 'string',
      description: 'Which page did they request from?',
      readOnly: true,
    }),
    defineField({
      name: 'ipHash',
      title: 'IP Hash',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'userAgent',
      title: 'User Agent',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    // NEW: Notes field for you to track conversations
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 4,
      description: 'Your notes about this lead/conversation',
    }),
    // NEW: Company info (you can fill this in later)
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'Company name (if known)',
    }),
    defineField({
      name: 'role',
      title: 'Role/Position',
      type: 'string',
      description: 'Their role or position they mentioned',
    }),
  ],
  preview: {
    select: {
      email: 'email',
      status: 'status',
      requestedAt: 'requestedAt',
      company: 'company',
    },
    prepare({ email, status, requestedAt, company }) {
      const date = requestedAt ? new Date(requestedAt).toLocaleDateString() : 'Unknown';
      const statusEmoji = {
        sent: '📤',
        opened: '👀',
        contacted: '💬',
        discussing: '🤝',
        opportunity: '🎯',
        not_interested: '❌',
      }[status as string] || '📧';
      
      return {
        title: `${statusEmoji} ${email}`,
        subtitle: company ? `${company} • ${date}` : date,
      };
    },
  },
  orderings: [
    {
      title: 'Request Date, New First',
      name: 'requestedAtDesc',
      by: [{ field: 'requestedAt', direction: 'desc' }],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
});