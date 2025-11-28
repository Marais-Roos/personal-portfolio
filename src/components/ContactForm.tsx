'use client';

import React, { useState, useActionState } from 'react';
// Import the server action we created
import { submitContactForm } from '@/app/actions';
import { Loader2 } from 'lucide-react';

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
    
    // We keep local state for the inputs to drive the "Floating Label" UI animations
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });

    // useActionState handles the form submission lifecycle (loading, success, errors)
    const [state, formAction, isPending] = useActionState(submitContactForm, {
        success: false,
        message: '',
    });

    // Update local state for UI effects (Floating Fields)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-background-secondary p-6 md:p-9 rounded-2xl w-full flex flex-col gap-6 md:gap-9 shadow-2xl shadow-black/10">
            
            {state.success ? (
                // SUCCESS VIEW
                <div className="flex flex-col gap-4 items-center justify-center text-center py-16">
                    <h2 className="text-6xl font-black text-accent">Thank You!</h2>
                    <p className="text-2xl text-dominant max-w-md">Your message has been sent successfully. I'll get back to you as soon as I can.</p>
                </div>
            ) : (
                // FORM VIEW
                <>
                    {/* Display Error Message from Server Action */}
                    {state.message && !state.success && (
                        <p className="text-lg font-semibold text-red-600 p-3 bg-red-100 border border-red-300 rounded-lg">
                            {state.message}
                        </p>
                    )}

                    <form action={formAction} className="flex flex-col gap-6 w-full">
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
                            {/* Replaced 'Button' component with a real submit button to ensure form works */}
                            <button 
                                type="submit" 
                                disabled={isPending}
                                className={`
                                    bg-accent text-background-primary font-bold text-xl py-4 px-8 rounded-2xl mt-4
                                    hover:scale-[1.05] transition-all duration-300
                                    flex justify-center items-center gap-2 disabled:opacity-50 disabled:hover:scale-100
                                `}
                            >
                                {isPending ? (
                                    <>Sending <Loader2 className="animate-spin" size={20}/></>
                                ) : (
                                    'Send Message'
                                )}
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}