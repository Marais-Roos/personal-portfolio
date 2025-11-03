// src/components/LoginFormComponent.tsx
'use client';

import { useFormStatus } from 'react-dom';
import { signIn } from '@/actions/auth';
import { useState } from 'react';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button 
            type="submit" 
            disabled={pending}
            className="w-full bg-accent text-background-primary px-6 py-4 rounded-xl font-bold hover:bg-dominant disabled:bg-gray-400 transition-colors"
        >
            {pending ? 'Signing In...' : 'Sign In'}
        </button>
    );
}

export default function LoginFormComponent() {
    const [error, setError] = useState<string | null>(null);

    const actionHandler = async (formData: FormData) => {
        setError(null);
        // Call the secure sign-in Server Action
        const result = await signIn(formData);

        if (result?.error) {
            setError(result.error);
        }
    };

    return (
        <div className="flex flex-col gap-6 p-8 bg-background-secondary rounded-2xl shadow-xl w-full max-w-sm mx-auto my-20">
            <h1 className="text-3xl font-black text-center">Admin Sign In</h1>
            <p className="text-sm text-center text-dominant/70">Use your registered Supabase credentials.</p>

            <form action={actionHandler} className="flex flex-col gap-5">
                
                <input 
                    type="text" 
                    name="email" 
                    placeholder="Email" 
                    required
                    className="p-3 rounded-lg border-2 border-background-primary bg-background-primary focus:border-accent outline-none"
                />
                
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password"
                    required
                    className="p-3 rounded-lg border-2 border-background-primary bg-background-primary focus:border-accent outline-none"
                />
                
                <SubmitButton />

                {error && (
                    <div className="p-3 bg-red-100 text-red-700 rounded-lg text-center font-semibold">
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
}