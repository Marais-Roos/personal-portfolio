'use client'; 

import React, { useState } from 'react';
import Button from './Button'; 
// Import the Supabase client creation function
import { createClient } from '@/utils/supabase/client'; 

// Define the shape of the form data
interface FormData {
    name: string;
    email: string;
    message: string;
}

// FLOATING FIELD COMPONENT - Remains unchanged
const FloatingField = ({ 
    label, 
    name, 
    type = 'text', 
    value, 
    onChange 
}: { 
    label: string, 
    name: keyof FormData, 
    type?: 'text' | 'email' | 'textarea',
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; 
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const isActive = isFocused || !!value;
    
    // Note: Using border-dominant/20 for unfocused state as discussed
    const borderStyle = isFocused 
        ? 'border-accent' 
        : 'border-dominant/20'; 
    const bgStyle = 'bg-background-secondary';


    return (
        <div className="relative flex flex-col gap-2 w-full">
            
            {type === 'textarea' ? (
                <textarea
                    id={name}
                    name={name}
                    rows={4} 
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)} 
                    onBlur={() => setIsFocused(false)}  
                    required
                    className={`
                        w-full p-4 rounded-xl border-2 transition-all duration-300 outline-none text-lg md:text-xl resize-none
                        ${borderStyle} 
                        text-dominant
                        ${bgStyle}
                        pt-6
                    `}
                />
            ) : (
                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    required
                    className={`
                        w-full p-4 rounded-xl border-2 transition-all duration-300 outline-none text-lg md:text-xl 
                        ${borderStyle} 
                        text-dominant
                        ${bgStyle}
                        pt-6
                    `}
                />
            )}
            
            <label 
                htmlFor={name} 
                className={`
                    absolute left-4 transition-all duration-300 ease-in-out cursor-text select-none
                    text-lg md:text-xl text-dominant pointer-events-none 
                    
                    ${isActive 
                        ? '-top-3 text-base text-accent bg-background-secondary px-2 font-medium z-10' 
                        : 'top-1/2 -translate-y-1/2'
                    }
                `}
            >
                {label}
            </label>
        </div>
    );
};


// --- CONTACT FORM MAIN COMPONENT ---
export default function ContactForm() {
    
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });
    
    const [isSubmitted, setIsSubmitted] = useState(false); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true); // Disable the button immediately
        setError(null);
        
        try {
            // 1. Initialize Supabase Client
            const supabase = createClient();
            
            // 2. Insert data into a 'Contacts' table (you must create this table in your Supabase project)
            const { error: dbError } = await supabase
                .from('Contacts')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        message: formData.message,
                        // Add a timestamp column if needed, but Supabase handles 'created_at' by default
                    },
                ]);

            if (dbError) {
                // Handle the error returned by Supabase
                throw new Error(dbError.message || 'An unknown error occurred during submission.');
            }

            // 3. Success: Set submission flag, clear form data
            setIsSubmitted(true); 
            setFormData({ name: '', email: '', message: '' }); 

        } catch (err) {
            console.error('Submission Error:', err);
            // Display an error message to the user
            setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false); // Re-enable the button or keep it disabled based on UI flow
        }
    };
    

    return (
        <div className="bg-background-secondary p-6 md:p-9 rounded-2xl w-full flex flex-col gap-6 md:gap-9 shadow-2xl shadow-black/10">
            
            {isSubmitted ? (
                // SUCCESS VIEW
                <div className="flex flex-col gap-4 items-center justify-center text-center py-16">
                    <h2 className="text-6xl font-black text-accent">Thank You!</h2>
                    <p className="text-2xl text-dominant max-w-md">Your message has been sent successfully. I'll get back to you as soon as I can, usually within 24 hours.</p>
                </div>
            ) : (
                // FORM VIEW
                <>
                    
                    {/* Display Error Message */}
                    {error && (
                        <p className="text-lg font-semibold text-red-600 p-3 bg-red-100 border border-red-300 rounded-lg">
                            Error: {error}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                        <FloatingField 
                            label="Your Name" 
                            name="name" 
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <FloatingField 
                            label="Your Email" 
                            name="email" 
                            type="email" 
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <FloatingField 
                            label="Your Message" 
                            name="message" 
                            type="textarea" 
                            value={formData.message}
                            onChange={handleChange}
                        />

                        <div className="w-fit">
                            <Button 
                                type="submit" 
                                variant="primary" 
                                className="mt-4"
                                // Disable button while submitting
                                disabled={isSubmitting}
                                href="#"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </Button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}