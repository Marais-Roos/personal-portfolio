// src/components/ProjectUploadForm.tsx

'use client';

import { useFormStatus } from 'react-dom';
import { createProject } from '@/actions/projects'; // Back to the single Server Action
import { useState, useRef, ChangeEvent } from 'react';
import { createSlug } from '@/utils/text-utils'; 

interface ProjectUploadFormProps {
    availableServices: { slug: string; title: string }[];
}

// A simple button component to show loading state (uses useFormStatus)
function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button 
            type="submit" 
            aria-disabled={pending}
            disabled={pending}
            className="w-full bg-accent text-background-primary px-6 py-4 rounded-xl font-bold hover:bg-dominant disabled:bg-gray-400 transition-colors"
        >
            {pending ? 'Creating Project...' : 'Create New Project'}
        </button>
    );
}

export default function ProjectUploadForm({ availableServices }: ProjectUploadFormProps) {
    
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [isSlugManual, setIsSlugManual] = useState(false);
    
    // Handlers (same as before for controlled title/slug)
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);

        if (!isSlugManual) {
            setSlug(createSlug(newTitle));
        }
    };

    const handleSlugChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSlug(e.target.value);
        setIsSlugManual(true);
    };

    // The action handler now only calls the single server function
    const actionHandler = async (formData: FormData) => {
        setMessage(null);
        
        // Manually ensure controlled fields are set before sending
        formData.set('slug', slug);
        formData.set('title', title);
        
        // Handle multi-select data conversion to comma-separated string
        const selectedSlugs = formData.getAll('serviceSlugs') as string[];
        formData.set('serviceSlugs', selectedSlugs.join(','));

        // Direct call to server action (high payload risk)
        const result = await createProject(formData);

        if (result.error) {
            setMessage({ type: 'error', text: result.error });
        } else if (result.success) {
            setMessage({ type: 'success', text: result.success });
            setTitle('');
            setSlug('');
            setIsSlugManual(false);
            formRef.current?.reset();
        }
    };

    return (
        <div className="flex flex-col gap-6 p-8 bg-background-secondary rounded-2xl shadow-xl w-full max-w-lg mx-auto">
            <h1 className="text-3xl font-black">New Project Upload (Admin Tool)</h1>
            
            {/* Form uses the Server Action directly via the `action` prop */}
            <form ref={formRef} action={actionHandler} className="flex flex-col gap-5">
                
                {/* Project Title (Controlled input) */}
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Project Title"
                    required
                    value={title} 
                    onChange={handleTitleChange} 
                    className="p-3 rounded-lg border-2 border-background-primary bg-background-primary focus:border-accent outline-none"
                />

                {/* Slug (Controlled input) */}
                <input 
                    type="text" 
                    name="slug" 
                    placeholder="Slug (for URL, e.g., 'dunder-mifflin-site')"
                    required
                    value={slug} 
                    onChange={handleSlugChange} 
                    className="p-3 rounded-lg border-2 border-background-primary bg-background-primary focus:border-accent outline-none"
                />

                {/* Service Tags Dropdown (multi-select) */}
                <label className="text-sm font-semibold text-dominant" htmlFor="service-select">
                    Service Tags (Select one or more by holding Ctrl/Cmd)
                </label>
                <select
                    id="service-select"
                    name="serviceSlugs" 
                    required
                    multiple 
                    className="p-3 rounded-lg border-2 border-background-primary bg-background-primary focus:border-accent outline-none h-40" 
                >
                    {availableServices.map(service => (
                        <option 
                            key={service.slug} 
                            value={service.slug}
                        >
                            {service.title} ({service.slug})
                        </option>
                    ))}
                </select>


                {/* Description */}
                <textarea
                    name="description"
                    placeholder="Full Project Description"
                    rows={4}
                    required
                    className="p-3 rounded-lg border-2 border-background-primary bg-background-primary focus:border-accent outline-none"
                />

                <h2 className="text-2xl font-bold pt-4">Main Image (Required)</h2>
                
                {/* Main Image File Input */}
                <label className="text-sm font-semibold pt-2 text-dominant">Main Project Image File</label>
                <input 
                    type="file" 
                    name="mainImageFile" 
                    accept="image/*"
                    required
                    className="p-3 border-2 border-dashed border-accent rounded-lg bg-background-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-background-primary hover:file:bg-dominant"
                />
                
                {/* Main Image Alt Text */}
                <input 
                    type="text" 
                    name="mainImageAltText" 
                    placeholder="Main Image Alt Text (e.g., 'Screenshot of Dunder Mifflin website home page')"
                    required
                    className="p-3 rounded-lg border-2 border-background-primary bg-background-primary focus:border-accent outline-none"
                />

                {/* --- Gallery Image Section (Optional) --- */}
                <h2 className="text-2xl font-bold pt-4">Project Gallery (Optional)</h2>
                <p className="text-sm text-dominant/70">For the gallery, make sure the number of files selected matches the number of alt texts provided.</p>
                
                {/* Gallery File Input */}
                <label className="text-sm font-semibold pt-2 text-dominant">Gallery Images (Hold Ctrl/Cmd to select multiple)</label>
                <input 
                    type="file" 
                    name="galleryImageFiles" 
                    accept="image/*"
                    multiple
                    className="p-3 border-2 border-dashed border-dominant/50 rounded-lg bg-background-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-dominant file:text-background-primary hover:file:bg-accent"
                />

                {/* Gallery Alt Texts */}
                <textarea
                    name="galleryAltTexts"
                    placeholder="Gallery Alt Texts (Comma-separated list, e.g., 'Mobile view, Desktop hero section, Contact form design')"
                    rows={2}
                    className="p-3 rounded-lg border-2 border-background-primary bg-background-primary focus:border-accent outline-none"
                />

                <SubmitButton />

                {/* Status Message */}
                {message && (
                    <div className={`p-4 rounded-lg text-center font-semibold ${
                        message.type === 'success' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                    }`}>
                        {message.text}
                    </div>
                )}
            </form>
        </div>
    );
}