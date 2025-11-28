'use server';

import { writeClient } from "@/sanity/lib/write-client";

export async function submitContactForm(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { success: false, message: 'Please fill in all fields.' };
  }

  try {
    // Securely write to Sanity
    await writeClient.create({
      _type: 'contact',
      name,
      email,
      message,
      status: 'new', // Default status for new messages
    });

    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('Sanity submission error:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
}