'use client';

import React, { useState, useActionState, useEffect } from 'react';
import { requestPortfolio } from '@/app/portfolio-actions';
import { Loader2, CheckCircle, Mail } from 'lucide-react';

interface PortfolioCTAProps {
  source?: string; // Track which page the request came from
  variant?: 'default' | 'compact'; // Different layouts
}

export default function PortfolioCTA({ 
  source = 'cta-section',
  variant = 'default' 
}: PortfolioCTAProps) {
  const [email, setEmail] = useState('');
  const [state, formAction, isPending] = useActionState(requestPortfolio, {
    success: false,
    message: '',
  });

  // Reset email on success
  useEffect(() => {
    if (state.success) {
      setEmail('');
    }
  }, [state.success]);

  if (variant === 'compact') {
    return (
      <div className="flex flex-col gap-4 w-full">
        {state.success ? (
          // SUCCESS STATE
          <div className="flex items-center gap-3 p-4 bg-green-100 border-2 border-green-500 rounded-xl">
            <CheckCircle className="text-green-600 shrink-0" size={24} />
            <p className="text-green-800 font-medium">{state.message}</p>
          </div>
        ) : (
          <>
            {/* ERROR MESSAGE */}
            {state.message && !state.success && (
              <p className="text-red-600 font-semibold text-sm p-3 bg-red-100 border border-red-300 rounded-lg">
                {state.message}
              </p>
            )}
            
            {/* COMPACT FORM */}
            <form action={formAction} className="flex gap-2 w-full flex-col lg:flex-row">
              <input type="hidden" name="source" value={source} />
              
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@company.com"
                required
                disabled={isPending}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-background-secondary focus:border-accent outline-none text-base transition-all disabled:opacity-50 min-w-0"
              />
              
              <button
                type="submit"
                disabled={isPending}
                className="bg-accent text-background-primary font-bold px-6 py-3 rounded-xl hover:bg-dominant transition-all disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
              >
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span className="hidden sm:inline">Sending...</span>
                  </>
                ) : (
                  <>
                    {/*<Mail size={20} />*/}
                    <span className="hidden sm:inline">Get Portfolio</span>
                    <span className="sm:hidden">Send</span>
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    );
  }

  // DEFAULT VARIANT (Full featured)
  return (
    <div className="flex flex-col gap-6 w-full">
      {state.success ? (
        // SUCCESS STATE
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <CheckCircle className="text-accent" size={64} />
          <h3 className="text-2xl font-bold text-dominant">Portfolio Sent! 🎉</h3>
          <p className="text-lg text-dominant max-w-md">
            {state.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-accent font-semibold hover:underline"
          >
            Send to another email
          </button>
        </div>
      ) : (
        <>
          {/* ERROR MESSAGE */}
          {state.message && !state.success && (
            <p className="text-red-600 font-semibold p-4 bg-red-100 border border-red-300 rounded-lg text-center">
              {state.message}
            </p>
          )}
          
          {/* FULL FORM */}
          <form action={formAction} className="flex flex-col gap-4 w-full">
            <input type="hidden" name="source" value={source} />
            
            <div className="relative">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={isPending}
                className="w-full px-6 py-4 rounded-xl border-2 border-background-secondary focus:border-accent outline-none text-lg transition-all disabled:opacity-50 min-w-0"
              />
            </div>
            
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-accent text-background-primary font-bold text-xl py-4 px-8 rounded-xl hover:bg-dominant hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  Sending Portfolio...
                </>
              ) : (
                <>
                  <Mail size={24} />
                  Send Me the Portfolio PDF
                </>
              )}
            </button>
            
            <p className="text-sm text-center text-dominant/70">
              I'll send you my complete portfolio with project case studies and contact info.
            </p>
          </form>
        </>
      )}
    </div>
  );
}