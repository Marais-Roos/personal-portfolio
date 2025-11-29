// src/utils/email-notifications.ts
import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  submittedAt: string;
  submissionTime: number;
}

/**
 * Sends an email notification when a new contact form is submitted
 */
export async function sendContactNotification(submission: ContactSubmission) {
  // Validate environment variables
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured. Skipping email notification.');
    return { success: false, error: 'Email service not configured' };
  }

  if (!process.env.NOTIFICATION_EMAIL) {
    console.error('NOTIFICATION_EMAIL is not configured. Skipping email notification.');
    return { success: false, error: 'Notification email not configured' };
  }

  const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
  const notificationEmail = process.env.NOTIFICATION_EMAIL;

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: notificationEmail,
      subject: `🆕 New Contact Form Submission from ${submission.name}`,
      html: generateEmailHTML(submission),
      text: generateEmailText(submission), // Fallback for email clients that don't support HTML
    });

    if (error) {
      console.error('Failed to send email notification:', error);
      return { success: false, error: error.message };
    }

    console.log('Email notification sent successfully:', data?.id);
    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error('Error sending email notification:', error);
    return { success: false, error: 'Failed to send notification' };
  }
}

/**
 * Generates HTML email content
 */
function generateEmailHTML(submission: ContactSubmission): string {
  const formattedDate = new Date(submission.submittedAt).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #548EF8 0%, #4070D8 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">
          📬 New Contact Form Submission
        </h1>
      </div>
      
      <!-- Content -->
      <div style="background: #f7f9ff; padding: 30px; border-radius: 0 0 12px 12px; border: 2px solid #e2e2e0; border-top: none;">
        
        <!-- Submission Details -->
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #548EF8;">
          <h2 style="margin-top: 0; color: #040A1E; font-size: 18px;">Contact Information</h2>
          
          <p style="margin: 10px 0;">
            <strong style="color: #548EF8;">Name:</strong><br>
            <span style="font-size: 16px;">${escapeHtml(submission.name)}</span>
          </p>
          
          <p style="margin: 10px 0;">
            <strong style="color: #548EF8;">Email:</strong><br>
            <a href="mailto:${submission.email}" style="color: #548EF8; text-decoration: none; font-size: 16px;">
              ${escapeHtml(submission.email)}
            </a>
          </p>
          
          <p style="margin: 10px 0;">
            <strong style="color: #548EF8;">Submitted:</strong><br>
            <span style="font-size: 14px; color: #666;">${formattedDate}</span>
          </p>
          
          <p style="margin: 10px 0;">
            <strong style="color: #548EF8;">Form completion time:</strong><br>
            <span style="font-size: 14px; color: #666;">${submission.submissionTime.toFixed(1)} seconds</span>
          </p>
        </div>
        
        <!-- Message -->
        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #548EF8;">
          <h2 style="margin-top: 0; color: #040A1E; font-size: 18px;">Message</h2>
          <div style="background: #f7f9ff; padding: 15px; border-radius: 6px; white-space: pre-wrap; font-size: 15px; line-height: 1.6;">
${escapeHtml(submission.message)}
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div style="margin-top: 30px; text-align: center;">
          <a href="mailto:${submission.email}?subject=Re: Your message to Marais Roos" 
             style="display: inline-block; background: #548EF8; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 0 10px;">
            Reply to ${escapeHtml(submission.name.split(' ')[0])}
          </a>
          <a href="https://maraisroos.co.za/studio/structure/contact" 
             style="display: inline-block; background: #040A1E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 0 10px;">
            View in Sanity
          </a>
        </div>
        
      </div>
      
      <!-- Footer -->
      <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
        <p>This is an automated notification from your portfolio contact form.</p>
        <p>Sent from maraisroos.co.za</p>
      </div>
      
    </body>
    </html>
  `;
}

/**
 * Generates plain text email content (fallback)
 */
function generateEmailText(submission: ContactSubmission): string {
  const formattedDate = new Date(submission.submittedAt).toLocaleString('en-US');

  return `
New Contact Form Submission

Contact Information:
- Name: ${submission.name}
- Email: ${submission.email}
- Submitted: ${formattedDate}
- Form completion time: ${submission.submissionTime.toFixed(1)} seconds

Message:
${submission.message}

---
Reply to: ${submission.email}
View in Sanity: https://maraisroos.co.za/studio/structure/contact
  `.trim();
}

/**
 * Escapes HTML to prevent XSS in email content
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}