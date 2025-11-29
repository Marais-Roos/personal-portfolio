// src/utils/rate-limiter.ts
import { headers } from 'next/headers';

// Simple in-memory rate limiter (consider Redis for production)
const submissions = new Map<string, number[]>();
const MAX_SUBMISSIONS = 3; // 3 submissions
const TIME_WINDOW = 60 * 60 * 1000; // per hour

// Internal cleanup function (not exported as Server Action)
function cleanupOldEntries() {
  const now = Date.now();
  for (const [ip, timestamps] of submissions.entries()) {
    const recent = timestamps.filter(t => now - t < TIME_WINDOW);
    if (recent.length === 0) {
      submissions.delete(ip);
    } else {
      submissions.set(ip, recent);
    }
  }
}

// This is the only Server Action in this file
export async function checkRateLimit(): Promise<{ allowed: boolean; message?: string }> {
  'use server';
  
  // Run cleanup occasionally (every ~100 checks to avoid overhead)
  if (Math.random() < 0.01) {
    cleanupOldEntries();
  }

  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || 
             headersList.get('x-real-ip') || 
             'unknown';

  const now = Date.now();
  const userSubmissions = submissions.get(ip) || [];

  // Clean old submissions outside the time window
  const recentSubmissions = userSubmissions.filter(
    timestamp => now - timestamp < TIME_WINDOW
  );

  if (recentSubmissions.length >= MAX_SUBMISSIONS) {
    return {
      allowed: false,
      message: 'Too many submissions. Please try again later.',
    };
  }

  // Add current submission
  recentSubmissions.push(now);
  submissions.set(ip, recentSubmissions);

  return { allowed: true };
}