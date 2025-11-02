'use client'

import React, { useState } from 'react';
import Navbar from "@/components/Navbar"; 
import Button from '@/components/Button';
import Footer from "@/components/Footer";
import ContactForm from '@/components/ContactForm';
import { Mail, Phone} from 'lucide-react';
import LinkArrow from '@/components/LinkArrow';

interface formData {
    name: string;
    email: string;
    message: string;
}

export default function Contact() {

    //Define component state to hold form data and submission status
    const [formData, setFormData] = useState<formData>({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    //Handle input changes and update state
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    //Handle form submission
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //Replace with API endpoint here
        console.log('Form data submitted: ', formData);

        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });

        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return(
        <div className="bg-background-primary min-h-screen">
            <div className="flex flex-col items-center mx-auto py-4 px-18 ">
                <Navbar/>
                <main className="flex flex-col items-center justify-start grow w-full max-w-[1056px] gap-24 pt-25">
                    <div className='flex flex-col gap-5 w-full mb-[-24]'>
                        <p className='uppercase font-2xl font-semibold text-accent mb-[-12]'>Let's talk</p>
                        <h1 className='text-6xl text-dominant font-black capitalize'>I'd love to hear from you!</h1>
                        <p className='text-2xl'>Have a project, question, or just want to chat about web design, coffee, or how <span className='font-medium italic'>The Office</span> is the greatest show of all time? Send a message.</p>
                    </div>
                    <div className='flex gap-12 w-full justify-start items-top align-start'>
                        <div className='flex-2'>
                            <ContactForm/>
                        </div>
                                                
                        <div className='flex-1 flex flex-col gap-12'>
                            <div className='flex flex-col gap-4'>
                                <Mail size={48} className='text-accent'/>
                                <h2 className='text-3xl font-medium'>Email</h2>
                                <p className='font-lg'>Get in touch with a good old fashioned email.</p>
                                <LinkArrow href="mailto:hello@maraisroos.site">Send me an email</LinkArrow>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <Phone size={48} className='text-accent'/>
                                <h2 className='text-3xl font-medium'>Phone</h2>
                                <p className='font-lg'>Drop me a line.</p>
                                <LinkArrow href="tel:+27793866062">Give me a call</LinkArrow>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        </div>
    );
}