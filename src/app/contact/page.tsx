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
            <div className="flex flex-col items-center mx-auto py-4 lg:px-18 md:px-9 px-6">
                <div className="sticky top-6 w-full flex justify-center z-10">
                    <Navbar/>
                </div>
                <main className="flex flex-col items-center justify-start grow w-full lg:max-w-[1056px] lg:gap-24 lg:pt-25 pt-12 md:max-w-[738px] md:gap-18 md:pt-20 gap-8 max-w-full">
                    <div className='flex flex-col gap-5 w-full '>
                        <p className='text-left uppercase font-2xl font-semibold text-accent mb-[-12]'>Let's talk</p>
                        <h1 className='text-left text-4xl md:text-5xl lg:text-6xl text-dominant font-black capitalize'>I'd love to hear from you!</h1>
                        <p className='text-left text-lg md:text-xl lg:text-2xl'>Have a project, question, or just want to chat about web design, coffee, or how <span className='font-medium italic'>The Office</span> is the greatest show of all time? Send a message.</p>
                    </div>
                    <div className='flex flex-col md:flex-row gap-12 lg:gap-12 w-full justify-start items-top align-start'>
                        <div className='flex-1 md:flex-2'>
                            <ContactForm/>
                        </div>
                                                
                        <div className='flex-1 flex flex-col gap-12 pl-6 md:pl-0'>
                            <div className='flex flex-col gap-4 items-start'>
                                <Mail size={48} className='text-accent'/>
                                <h2 className='text-3xl font-medium'>Email</h2>
                                <p className='font-lg text-left'>Get in touch with a good old fashioned email.</p>
                                <LinkArrow href="mailto:hello@maraisroos.co.za">Send me an email</LinkArrow>
                            </div>
                            <div className='flex flex-col gap-4 items-start'>
                                <Phone size={48} className='text-accent'/>
                                <h2 className='text-3xl font-medium'>Phone</h2>
                                <p className='font-lg text-left'>I'll always answer the phone... except if your a spammer!</p>
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