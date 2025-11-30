// src/app/portfolio-actions.ts
'use server';

import { writeClient } from "@/sanity/lib/write-client";
import { sendPortfolioEmail, notifyPortfolioRequest } from "@/utils/portfolio-email";
import { headers } from 'next/headers';
import crypto from 'crypto';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// === ENHANCED SPAM PROTECTION ===

// Common disposable/temporary email domains (expanded list)
const DISPOSABLE_DOMAINS = [
  'tempmail.com', 'guerrillamail.com', '10minutemail.com', 'throwaway.email',
  'mailinator.com', 'trashmail.com', 'getnada.com', 'temp-mail.org',
  'maildrop.cc', 'sharklasers.com', 'grr.la', 'yopmail.com',
  'fakeinbox.com', 'throwawaymail.com', 'emailondeck.com', 'dispostable.com',
  'mintemail.com', 'mytrashmail.com', 'guerrillamailblock.com'
];

// Generic/suspicious email patterns that bots use
const SUSPICIOUS_PATTERNS = [
  /^test\d*@/i,           // test@, test1@, test123@
  /^spam@/i,              // spam@
  /^noreply@/i,           // noreply@
  /^no-reply@/i,          // no-reply@
  /^admin@/i,             // admin@
  /^webmaster@/i,         // webmaster@
  /^info@/i,              // info@
  /^contact@/i,           // contact@
  /^example@/i,           // example@
  /^asdf/i,               // asdfasdf@, asdf123@
  /^qwerty/i,             // qwerty@
  /^\d+@/,                // Pure numbers: 12345@
  /^[a-z]{1,2}@/i,        // Single/double letters: a@, ab@
];

// Free email domains are OK, but we track them
const FREE_EMAIL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com',
  'protonmail.com', 'aol.com', 'zoho.com', 'mail.com'
];

// Professional domains are preferred (company emails)
function isProfessionalEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;
  
  // Not a free email provider = likely professional
  return !FREE_EMAIL_DOMAINS.includes(domain) && !DISPOSABLE_DOMAINS.includes(domain);
}

function isValidEmail(email: string): boolean {
  if (!EMAIL_REGEX.test(email)) return false;
  
  // Additional checks
  const [localPart, domain] = email.split('@');
  
  // Local part should be reasonable length (3-64 chars)
  if (localPart.length < 3 || localPart.length > 64) return false;
  
  // Domain should have at least one dot
  if (!domain.includes('.')) return false;
  
  return true;
}

function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return DISPOSABLE_DOMAINS.some(disposable => domain?.includes(disposable));
}

function isSuspiciousEmail(email: string): boolean {
  const localPart = email.split('@')[0]?.toLowerCase();
  return SUSPICIOUS_PATTERNS.some(pattern => pattern.test(localPart));
}

function hashIP(ip: string): string {
  return crypto.createHash('sha256').update(ip).digest('hex').slice(0, 16);
}

// Rate limiting for portfolio requests (stricter than contact form)
const portfolioRequests = new Map<string, number[]>();
const MAX_REQUESTS = 2;  // Only 2 requests per IP
const TIME_WINDOW = 24 * 60 * 60 * 1000; // per 24 hours

function checkPortfolioRateLimit(ipHash: string): { allowed: boolean; message?: string } {
  const now = Date.now();
  const requests = portfolioRequests.get(ipHash) || [];
  
  // Clean old requests
  const recentRequests = requests.filter(timestamp => now - timestamp < TIME_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return {
      allowed: false,
      message: 'You have already requested the portfolio. Please check your email or contact me directly at hello@maraisroos.co.za',
    };
  }
  
  recentRequests.push(now);
  portfolioRequests.set(ipHash, recentRequests);
  
  return { allowed: true };
}

// Log suspicious/blocked requests for monitoring
async function logBlockedRequest(reason: string, email: string, ipHash: string) {
  try {
    await writeClient.create({
      _type: 'portfolioDownload',
      email,
      status: 'not_interested', // Use existing status for blocked
      requestedAt: new Date().toISOString(),
      source: 'BLOCKED',
      ipHash,
      notes: `[BLOCKED: ${reason}]`,
    });
    console.log(`Blocked portfolio request: ${reason}`, { email, ip: ipHash });
  } catch (error) {
    console.error('Failed to log blocked request:', error);
  }
}

export async function requestPortfolio(prevState: any, formData: FormData) {
  const email = (formData.get('email') as string || '').trim().toLowerCase();
  const source = (formData.get('source') as string) || 'unknown';
  
  // Get request metadata
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || 
             headersList.get('x-real-ip') || 
             'unknown';
  const userAgent = headersList.get('user-agent') || 'unknown';
  const ipHash = hashIP(ip);

  // === SPAM PROTECTION GAUNTLET ===

  // 1. BASIC VALIDATION
  if (!email) {
    return { success: false, message: 'Please enter your email address.' };
  }

  if (!isValidEmail(email)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  // 2. RATE LIMITING (Stricter than contact form - 2 per 24h per IP)
  const rateLimitCheck = checkPortfolioRateLimit(ipHash);
  if (!rateLimitCheck.allowed) {
    return { success: false, message: rateLimitCheck.message };
  }

  // 3. DISPOSABLE EMAIL CHECK
  if (isDisposableEmail(email)) {
    await logBlockedRequest('Disposable email', email, ipHash);
    return { 
      success: false, 
      message: 'Please use your professional or personal email address, not a temporary one.' 
    };
  }

  // 4. SUSPICIOUS PATTERN CHECK
  if (isSuspiciousEmail(email)) {
    await logBlockedRequest('Suspicious pattern', email, ipHash);
    return { 
      success: false, 
      message: 'Please use a valid professional or personal email address.' 
    };
  }

  // 5. CHECK FOR EXISTING REQUEST
  try {
    const existing = await writeClient.fetch(
      `*[_type == "portfolioDownload" && email == $email][0]`,
      { email }
    );

    if (existing) {
      // === DECISION: Allow resend OR block? ===
      // Option A: Allow resend (current behavior)
      console.log('Duplicate portfolio request from:', email);
      
      const emailResult = await sendPortfolioEmail({ 
        recipientEmail: email 
      });

      if (!emailResult.success) {
        return { 
          success: false, 
          message: 'Failed to send portfolio. Please try again or contact me directly at hello@maraisroos.co.za' 
        };
      }

      return { 
        success: true, 
        message: "Portfolio re-sent! Check your inbox (and spam folder)." 
      };
      
      // Option B: Block duplicates completely (uncomment to use)
      /*
      return {
        success: false,
        message: 'You have already received my portfolio. Please check your inbox or spam folder, or contact me directly at hello@maraisroos.co.za'
      };
      */
    }
  } catch (error) {
    console.error('Error checking for existing request:', error);
    // Continue anyway
  }

  // 6. PROFESSIONAL EMAIL PREFERENCE (Optional - log but don't block)
  const isProfessional = isProfessionalEmail(email);
  if (!isProfessional) {
    console.log('Portfolio request from free email provider:', email);
    // Still allow it, but you can track this metric
  }

  // === ALL CHECKS PASSED - SEND PORTFOLIO ===

  // 7. SEND PORTFOLIO EMAIL TO RECRUITER
  const emailResult = await sendPortfolioEmail({ 
    recipientEmail: email 
  });

  if (!emailResult.success) {
    console.error('Failed to send portfolio email:', emailResult.error);
    return { 
      success: false, 
      message: 'Failed to send portfolio. Please try again or contact me at hello@maraisroos.co.za' 
    };
  }

  // 8. SAVE TO SANITY (for tracking)
  try {
    await writeClient.create({
      _type: 'portfolioDownload',
      email,
      status: 'sent',
      requestedAt: new Date().toISOString(),
      source,
      ipHash,
      userAgent,
      notes: isProfessional 
        ? 'Professional email domain' 
        : 'Free email provider',
    });

    console.log('Portfolio request saved:', { 
      email, 
      source,
      isProfessional,
    });
  } catch (error) {
    console.error('Failed to save portfolio request to Sanity:', error);
    // Don't fail - email was already sent
  }

  // 9. NOTIFY YOU (non-blocking)
  notifyPortfolioRequest(email, source).catch(error => {
    console.error('Failed to send portfolio request notification:', error);
  });

  return { 
    success: true, 
    message: 'Portfolio sent! Check your inbox (and spam folder) for an email with my portfolio attached.' 
  };
}