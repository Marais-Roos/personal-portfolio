// src/utils/portfolio-email.ts
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

interface PortfolioEmailOptions {
  recipientEmail: string;
  recipientName?: string; // Optional if you collect name
}

/**
 * Sends portfolio PDF to a recruiter with a personalized introduction
 */
export async function sendPortfolioEmail({ 
  recipientEmail, 
  recipientName 
}: PortfolioEmailOptions) {
  
  // Validate environment
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured');
    return { success: false, error: 'Email service not configured' };
  }

  const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
  
  try {
    // Read PDF file from public folder
    const pdfPath = path.join(process.cwd(), 'public', 'portfolio', 'Marais Roos - Portfolio - Small.pdf');
    const pdfBuffer = fs.readFileSync(pdfPath);
    const pdfBase64 = pdfBuffer.toString('base64');

    // Personalize greeting
    const greeting = recipientName 
      ? `Hi ${recipientName}` 
      : 'Hey there';

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      subject: "Marais Roos - Web Designer & Developer Portfolio",
      // Add PDF attachment
      attachments: [
        {
          filename: 'Marais-Roos-Portfolio.pdf',
          content: pdfBase64,
        },
      ],
      html: generatePortfolioEmailHTML(greeting),
      text: generatePortfolioEmailText(greeting),
    });

    if (error) {
      console.error('Failed to send portfolio email:', error);
      return { success: false, error: error.message };
    }

    console.log('Portfolio email sent successfully:', data?.id);
    return { success: true, messageId: data?.id };
    
  } catch (error: any) {
    console.error('Error sending portfolio email:', error);
    return { success: false, error: error.message || 'Failed to send portfolio' };
  }
}

/**
 * Sends you a notification when someone requests your portfolio
 */
export async function notifyPortfolioRequest(recruiterEmail: string, source: string) {
  if (!process.env.NOTIFICATION_EMAIL) {
    return { success: false, error: 'Notification email not configured' };
  }

  const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `🎯 New Portfolio Request from ${recruiterEmail}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <div style="background: linear-gradient(135deg, #548EF8 0%, #4070D8 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">
              🎯 New Portfolio Download Request!
            </h1>
          </div>
          
          <div style="background: #f7f9ff; padding: 30px; border-radius: 0 0 12px 12px; border: 2px solid #e2e2e0; border-top: none;">
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #548EF8;">
              <h2 style="margin-top: 0; color: #040A1E; font-size: 18px;">Recruiter Details</h2>
              
              <p style="margin: 10px 0;">
                <strong style="color: #548EF8;">Email:</strong><br>
                <a href="mailto:${recruiterEmail}" style="color: #548EF8; text-decoration: none; font-size: 16px;">
                  ${recruiterEmail}
                </a>
              </p>
              
              <p style="margin: 10px 0;">
                <strong style="color: #548EF8;">Source Page:</strong><br>
                <span style="font-size: 14px; color: #666;">${source}</span>
              </p>
              
              <p style="margin: 10px 0;">
                <strong style="color: #548EF8;">Time:</strong><br>
                <span style="font-size: 14px; color: #666;">${new Date().toLocaleString()}</span>
              </p>
            </div>
            
            <div style="background: #548EF8; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px;">
                ✅ Portfolio PDF automatically sent to ${recruiterEmail}
              </p>
            </div>
            
            <div style="margin-top: 30px; text-align: center;">
              <a href="mailto:${recruiterEmail}?subject=Re: My Portfolio" 
                 style="display: inline-block; background: #548EF8; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 0 10px;">
                Send Follow-up Email
              </a>
              <a href="https://maraisroos.co.za/studio/structure/portfolioDownload" 
                 style="display: inline-block; background: #040A1E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 0 10px;">
                View in Sanity
              </a>
            </div>
            
          </div>
        </body>
        </html>
      `,
      text: `
New Portfolio Download Request

Recruiter Email: ${recruiterEmail}
Source Page: ${source}
Time: ${new Date().toLocaleString()}

Portfolio PDF automatically sent to: ${recruiterEmail}

Quick Actions:
- Reply: mailto:${recruiterEmail}
- View in Sanity: https://maraisroos.co.za/studio/structure/portfolioDownload
      `.trim(),
    });

    if (error) {
      console.error('Failed to send portfolio request notification:', error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
    
  } catch (error: any) {
    console.error('Error sending notification:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Generate HTML email for portfolio recipient
 */
function generatePortfolioEmailHTML(greeting: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background: #f7f9ff;">
      
      <!-- Header with your branding -->
      <div style="background: linear-gradient(135deg, #548EF8 0%, #4070D8 100%); padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 900;">
          Marais Roos
        </h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
          Web Designer & Developer
        </p>
      </div>
      
      <!-- Main Content -->
      <div style="background: white; padding: 40px 30px; border-radius: 0 0 12px 12px;">
        
        <p style="font-size: 18px; margin-top: 0;">
          ${greeting}! 👋
        </p>
        
        <p style="font-size: 16px; line-height: 1.8;">
          Thanks for your interest in my work! I've attached my complete portfolio as requested.
        </p>
        
        <div style="background: #f7f9ff; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #548EF8;">
          <h2 style="margin-top: 0; color: #040A1E; font-size: 20px;">A bit about me:</h2>
          <p style="font-size: 15px; line-height: 1.7; margin-bottom: 0;">
            I'm a web designer and developer with a unique background—I started in engineering and informatics, 
            took a detour through finance, and found my calling in creating clean, functional websites that 
            actually work. I specialize in turning creative ideas into concrete digital assets, with a focus 
            on design systems, user experience, and technical implementation.
          </p>
        </div>
        
        <h3 style="color: #040A1E; font-size: 18px; margin-top: 30px;">What I can help with:</h3>
        <ul style="font-size: 15px; line-height: 1.8; padding-left: 20px;">
          <li>Custom website design & development</li>
          <li>UI/UX design and prototyping</li>
          <li>Frontend development (React, Next.js, TypeScript)</li>
          <li>CMS integration (Sanity, headless CMS)</li>
          <li>Design systems & component libraries</li>
          <li>Web automation & integrations</li>
        </ul>
        
        <div style="background: #548EF8; color: white; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center;">
          <p style="margin: 0; font-size: 16px; font-weight: 600;">
            📎 Portfolio attached: Marais-Roos-Portfolio.pdf
          </p>
        </div>
        
        <p style="font-size: 16px; line-height: 1.8;">
          I'd love to chat about how I can contribute to your team or project. Feel free to reach out 
          via email or schedule a call at your convenience.
        </p>
        
        <!-- CTA Buttons -->
        <div style="margin: 35px 0; text-align: center;">
          <a href="mailto:hello@maraisroos.co.za?subject=Let's chat about opportunities" 
             style="display: inline-block; background: #548EF8; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 0 10px 10px 10px; font-size: 16px;">
            📧 Reply to this Email
          </a>
          <a href="https://maraisroos.co.za" 
             style="display: inline-block; background: #040A1E; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 0 10px 10px 10px; font-size: 16px;">
            🌐 Visit My Website
          </a>
        </div>
        
        <p style="font-size: 16px; line-height: 1.8; margin-bottom: 0;">
          Looking forward to connecting!<br>
          <strong>Marais</strong>
        </p>
        
      </div>
      
      <!-- Footer -->
      <div style="text-align: center; margin-top: 30px; padding: 20px; color: #666; font-size: 14px;">
        <p style="margin: 5px 0;">
          <strong>Marais Roos</strong> | Web Designer & Developer
        </p>
        <p style="margin: 5px 0;">
          📧 <a href="mailto:hello@maraisroos.co.za" style="color: #548EF8; text-decoration: none;">hello@maraisroos.co.za</a>
          | 📱 <a href="tel:+27793866062" style="color: #548EF8; text-decoration: none;">+27 79 386 6062</a>
        </p>
        <p style="margin: 5px 0;">
          🌐 <a href="https://maraisroos.co.za" style="color: #548EF8; text-decoration: none;">maraisroos.co.za</a>
        </p>
        
        <div style="margin-top: 20px;">
          <a href="https://www.linkedin.com/in/marais-roos/" style="margin: 0 10px; text-decoration: none;">
            <span style="color: #548EF8; font-size: 20px;">LinkedIn</span>
          </a>
          <a href="https://www.instagram.com/marais_roos/" style="margin: 0 10px; text-decoration: none;">
            <span style="color: #548EF8; font-size: 20px;">Instagram</span>
          </a>
          <a href="https://github.com/your-github" style="margin: 0 10px; text-decoration: none;">
            <span style="color: #548EF8; font-size: 20px;">GitHub</span>
          </a>
        </div>
      </div>
      
    </body>
    </html>
  `;
}

/**
 * Generate plain text version
 */
function generatePortfolioEmailText(greeting: string): string {
  return `
${greeting}! 👋

Thanks for your interest in my work! I've attached my complete portfolio as requested.

A BIT ABOUT ME:
I'm a web designer and developer with a unique background—I started in engineering and informatics, took a detour through finance, and found my calling in creating clean, functional websites that actually work.

WHAT I CAN HELP WITH:
• Custom website design & development
• UI/UX design and prototyping
• Frontend development (React, Next.js, TypeScript)
• CMS integration (Sanity, headless CMS)
• Design systems & component libraries
• Web automation & integrations

I'd love to chat about how I can contribute to your team or project. Feel free to reach out via email or schedule a call at your convenience.

Looking forward to connecting!
Marais

---
Marais Roos | Web Designer & Developer
📧 hello@maraisroos.co.za | 📱 +27 79 386 6062
🌐 maraisroos.co.za

LinkedIn: https://www.linkedin.com/in/marais-roos/
Portfolio Website: https://maraisroos.co.za
  `.trim();
}