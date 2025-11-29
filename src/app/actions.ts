'use server';

import { writeClient } from "@/sanity/lib/write-client";
import { checkRateLimit } from "@/utils/rate-limiter";
import { sendContactNotification } from "@/utils/email-notifications";
import { headers } from 'next/headers';
import crypto from 'crypto';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Common disposable email domains
const DISPOSABLE_DOMAINS = [
  'tempmail.com', 'guerrillamail.com', '10minutemail.com', 'throwaway.email',
  'mailinator.com', 'trashmail.com', 'getnada.com', 'temp-mail.org'
];

// Spam keywords to check for
const SPAM_KEYWORDS = [
  'viagra', 'cialis', 'casino', 'lottery', 'bitcoin', 'crypto investment',
  'click here', 'buy now', 'limited time', 'act now', 'earn money fast'
];

// Input sanitization
function sanitizeInput(input: string): string {
  return input.trim().slice(0, 5000);
}

// Validate email format
function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

// Check for disposable email
function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return DISPOSABLE_DOMAINS.some(disposable => domain?.includes(disposable));
}

// Check for spam content
function containsSpam(text: string): boolean {
  const lowerText = text.toLowerCase();
  return SPAM_KEYWORDS.some(keyword => lowerText.includes(keyword));
}

// Hash IP address for privacy-compliant tracking
function hashIP(ip: string): string {
  return crypto.createHash('sha256').update(ip).digest('hex').slice(0, 16);
}

// Log failed submission attempts to Sanity for monitoring
async function logFailedSubmission(reason: string, data: any) {
  try {
    await writeClient.create({
      _type: 'contact',
      name: data.name || 'Unknown',
      email: data.email || 'unknown@unknown.com',
      message: `[BLOCKED: ${reason}] ${data.message || 'No message'}`,
      status: 'spam',
      submittedAt: new Date().toISOString(),
      ipHash: data.ipHash,
      userAgent: data.userAgent,
      honeypotTriggered: data.honeypotTriggered || false,
      submissionTime: data.submissionTime || 0,
    });
    console.log(`Blocked submission: ${reason}`, { email: data.email, ip: data.ipHash });
  } catch (error) {
    console.error('Failed to log blocked submission:', error);
  }
}

export async function submitContactForm(prevState: any, formData: FormData) {
  // 1. RATE LIMITING
  const rateLimitCheck = await checkRateLimit();
  if (!rateLimitCheck.allowed) {
    return { success: false, message: rateLimitCheck.message };
  }

  // 2. GET REQUEST METADATA
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || 
             headersList.get('x-real-ip') || 
             'unknown';
  const userAgent = headersList.get('user-agent') || 'unknown';
  const ipHash = hashIP(ip);

  // 3. EXTRACT AND SANITIZE FORM DATA
  const name = sanitizeInput(formData.get('name') as string || '');
  const email = sanitizeInput(formData.get('email') as string || '');
  const message = sanitizeInput(formData.get('message') as string || '');
  const honeypot = formData.get('website') as string || '';
  const formLoadTime = parseInt(formData.get('formLoadTime') as string || '0');
  
  // Calculate submission time
  const submissionTime = formLoadTime ? (Date.now() - formLoadTime) / 1000 : 0;
  const submittedAt = new Date().toISOString();

  // 4. HONEYPOT CHECK (bots fill hidden fields)
  if (honeypot) {
    await logFailedSubmission('Honeypot triggered', {
      name, email, message, ipHash, userAgent, honeypotTriggered: true, submissionTime
    });
    // Return success to not alert the bot
    return { success: true, message: 'Message sent successfully!' };
  }

  // 5. TIMING CHECK (humans take at least 3 seconds to fill form)
  if (submissionTime < 3) {
    await logFailedSubmission('Too fast (bot suspected)', {
      name, email, message, ipHash, userAgent, submissionTime
    });
    return { success: false, message: 'Please take your time filling out the form.' };
  }

  // 6. BASIC VALIDATION
  if (!name || name.length < 2) {
    return { success: false, message: 'Please provide a valid name (at least 2 characters).' };
  }

  if (!email || !isValidEmail(email)) {
    return { success: false, message: 'Please provide a valid email address.' };
  }

  if (!message || message.length < 10) {
    return { success: false, message: 'Please provide a message (at least 10 characters).' };
  }

  // 7. DISPOSABLE EMAIL CHECK
  if (isDisposableEmail(email)) {
    await logFailedSubmission('Disposable email', {
      name, email, message, ipHash, userAgent, submissionTime
    });
    return { success: false, message: 'Please use a permanent email address.' };
  }

  // 8. SPAM CONTENT CHECK
  if (containsSpam(message) || containsSpam(name)) {
    await logFailedSubmission('Spam content detected', {
      name, email, message, ipHash, userAgent, submissionTime
    });
    return { success: false, message: 'Your message appears to contain spam. Please revise and try again.' };
  }

  // 9. XSS/INJECTION CHECK
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /<iframe/i,
    /onclick=/i,
    /onerror=/i,
    /eval\(/i,
    /expression\(/i,
  ];

  const combinedText = `${name} ${email} ${message}`;
  if (suspiciousPatterns.some(pattern => pattern.test(combinedText))) {
    await logFailedSubmission('Suspicious patterns (XSS)', {
      name, email, message, ipHash, userAgent, submissionTime
    });
    return { success: false, message: 'Invalid input detected. Please remove any special characters.' };
  }

  // 10. SUBMIT TO SANITY
  try {
    await writeClient.create({
      _type: 'contact',
      name,
      email,
      message,
      status: 'new',
      submittedAt,
      ipHash,
      userAgent,
      honeypotTriggered: false,
      submissionTime,
    });

    console.log('Contact form submission successful:', { 
      name, 
      email: email.replace(/(.{2}).*(@.*)/, '$1***$2'), // Partially hide email in logs
      submissionTime: `${submissionTime}s`
    });

    // 11. SEND EMAIL NOTIFICATION (non-blocking)
    // We don't await this to avoid slowing down the form response
    sendContactNotification({
      name,
      email,
      message,
      submittedAt,
      submissionTime,
    }).catch(error => {
      // Log error but don't fail the form submission
      console.error('Failed to send email notification (non-critical):', error);
    });

    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('Sanity submission error:', error);
    
    return { 
      success: false, 
      message: 'Unable to send message at this time. Please try again later or contact us directly at hello@maraisroos.co.za' 
    };
  }
}