import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

import type { Metadata } from "next";
import { Poppins } from "next/font/google"; //Import Poppins font from Google fonts
import "./globals.css";



//Define new Poppins font with specific weights and subsets
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.maraisroos.co.za'),

  title : {
    default: "Marais Roos | Personal Portfolio",
    template: "%s | Marais Roos",
  },

  openGraph: {
    title: "Marais Roos | Personal Portfolio",
    description: "I'm Marais. I once studied engineering, now I build clean, functional websites. No fake teams, no empty promises—just code, creativity, and a little bit of chaos.",
    url: "https://www.maraisroos.co.za",
    siteName: "Marais Roos Portfolio",
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: '/opengraph_images/Home.png',
        width: 1200,
        height: 630,
        alt: "Marais Roos Portfolio Cover",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Marais Roos | Personal Portfolio",
    description: "I'm Marais. I once studied engineering, now I build clean, functional websites. No fake teams, no empty promises—just code, creativity, and a little bit of chaos.",
    images: ["/opengraph_images/Home.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Applly the Poppins font to the body */}
      <body className={`${poppins.variable} antialiased`}>
            {children}        
        <SpeedInsights/>
        <Analytics/>
      </body>
    </html>
  );
}
      