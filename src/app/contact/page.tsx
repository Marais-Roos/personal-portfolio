import { Metadata } from 'next';
import ContactContent from '@/components/ContactContent';

export const metadata: Metadata = {
  title : "Get in Touch | Let's Talk Tech (or Confidence Tips)",
  description: "Ready to turn a creative idea into a real website? Reach out to Marais Roos for clean code, straight talk, and long-term support. Let's build something cool.",

  openGraph: {
    title: "Get in Touch | Let's Talk Tech (or Confidence Tips)",
    description: "Ready to turn a creative idea into a real website? Reach out to Marais Roos for clean code, straight talk, and long-term support. Let's build something cool.",
    url: "https://www.maraisroos.co.za/contact",
    siteName: "Marais Roos Portfolio",
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: '/opengraph_images/Contact.png',
        width: 1200,
        height: 630,
        alt: "Marais Roos Portfolio Cover",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Get in Touch | Let's Talk Tech (or Confidence Tips)",
    description: "Ready to turn a creative idea into a real website? Reach out to Marais Roos for clean code, straight talk, and long-term support. Let's build something cool.",
    images: ["/opengraph_images/Contact.png"],
  }
};

export default function Contact() {
    return (
        <ContactContent/>
    );
}