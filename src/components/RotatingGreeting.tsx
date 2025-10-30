'use client'; // This component must be a client component for Framer Motion

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 

// --- Configuration ---
// The list of words for the rotating part (Part 2)
const ROTATING_WORDS = [
  "Hey there!", 
  "Dag sê!",    
  "Dumela!",  
];

const ROTATION_INTERVAL = 3000; 

// Framer Motion animation definitions (Variants) - Must be accessible to the motion component
const animationVariants = {
  // State 1: When the new text is ready to enter (off-screen below)
  enter: { 
    y: "100%", 
    opacity: 0,
    transition: { duration: 0.5 }
  },
  // State 2: Active state (in the viewport)
  center: { 
    y: "0%", 
    opacity: 1, 
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    } 
  },
  // State 3: When the old text is exiting (scrolling up and out)
  exit: { 
    y: "-100%", 
    opacity: 0,
    transition: { 
      duration: 0.5, 
      ease: "easeIn" 
    } 
  }
};
// --------------------

export default function RotatingHeading() {
  // State is for the index of the word currently being displayed
  const [index, setIndex] = useState(0); 

  // Core Logic: Cycle the index every ROTATION_INTERVAL
  useEffect(() => {
    const timer = setInterval(() => {
      // Use modulo operator to loop back to 0
      setIndex((prevIndex) => (prevIndex + 1) % ROTATING_WORDS.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(timer); // Cleanup function
  }, []); // Empty dependency array means this runs once on mount

  return (
    // The H1 container holds all three parts. 
    // It must be a 'flex' container (or similar) to arrange the spans horizontally.
    // The rotating part's parent container (span below) needs 'overflow-hidden' and a fixed height/width.
    <h1
      className="text-7xl font-black text-dominant flex items-left justify-left h-24"
    >
      {/* Part 2: Rotating Span Container */}
      <span
        // Key is not needed here, only for the inner motion.span
        className="relative overflow-hidden h-24" // Fixed height for the window
        style={{ width: '100%' }} // Set a max-width to prevent shifting when words change length
      >
        <AnimatePresence initial={false} mode="wait">
          {/* Inner Motion Span: The actual rotating content */}
          <motion.span
            // **Crucial Fix:** The key must change to trigger the exit/enter sequence
            key={ROTATING_WORDS[index]} 
            
            // Positioning for the animation: must be absolute to stack
            className="absolute top-0 left-0 w-full text-left" 
            
            // Corrected Variants usage: `animationVariants` is now in scope.
            variants={animationVariants} 
            initial="enter" // Start below
            animate="center" // Scroll to center
            exit="exit"     // Scroll up and out
          >
            {ROTATING_WORDS[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  );
}