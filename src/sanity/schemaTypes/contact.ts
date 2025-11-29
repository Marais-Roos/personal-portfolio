import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contact',
  title: 'Contact Form Submissions',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      readOnly: true,
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
          { title: 'Spam', value: 'spam' }, // NEW: Mark spam
        ],
        layout: 'radio',
      },
      initialValue: 'new',
      readOnly: false,
    }),
    // NEW: Timestamp field
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
      description: 'When the form was submitted',
    }),
    // NEW: IP address for tracking (anonymized for privacy)
    defineField({
      name: 'ipHash',
      title: 'IP Hash',
      type: 'string',
      readOnly: true,
      description: 'Hashed IP address for spam detection',
      hidden: true, // Hide from main view
    }),
    // NEW: User agent for bot detection
    defineField({
      name: 'userAgent',
      title: 'User Agent',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    // NEW: Honeypot field detection
    defineField({
      name: 'honeypotTriggered',
      title: 'Honeypot Triggered',
      type: 'boolean',
      readOnly: true,
      initialValue: false,
    }),
    // NEW: Submission time tracking (how fast form was filled)
    defineField({
      name: 'submissionTime',
      title: 'Submission Time (seconds)',
      type: 'number',
      readOnly: true,
      description: 'Time taken to fill the form (helps detect bots)',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      status: 'status',
      submittedAt: 'submittedAt',
    },
    prepare({ title, subtitle, status, submittedAt }) {
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString() : 'Unknown';
      const statusEmoji = {
        new: '🆕',
        read: '👀',
        replied: '✅',
        spam: '🚫',
      }[status as string] || '📧';
      
      return {
        title: `${statusEmoji} ${title}`,
        subtitle: `${subtitle} • ${date}`,
      };
    },
  },
  orderings: [
    {
      title: 'Submission Date, New First',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
});