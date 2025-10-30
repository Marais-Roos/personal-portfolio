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
  title: "Marais Roos | Personal Portfolio",
  description:
    "Welcome to my personal portfolio! I'm Marais Roos, a passionate developer specializing in creating dynamic and responsive web applications. Explore my projects, skills, and experience as you navigate through my portfolio."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Applly the Poppins font to the body */}
      <body className={`${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
      