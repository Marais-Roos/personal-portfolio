// This component must be a client component for Framer Motion
'use client';

import React, { useState, useEffect } from 'react';
// NEW IMPORTS
import { motion, AnimatePresence, Variants } from 'framer-motion'; 

// Your list of greetings
const GREETINGS = [
  "Hey there!", 
  "Dag sê!",    
  "Dumela!",  
];

const ROTATION_INTERVAL = 2500; 

// Framer Motion animation definitions (Variants)
const animationVariants: Variants = {
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


export default function RotatingGreeting() {
  // State is simplified back to just the index
  const [index, setIndex] = useState(0); 

  // Core Logic: Cycle the index every ROTATION_INTERVAL
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % GREETINGS.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  return (
    // Outer container acts as the fixed window (h-[4.5rem] from previous steps)
    <h1
      className="text-7xl font-black text-dominant relative overflow-hidden h-24 w-full flex items-start justify-start
      "
    >
       
      {/* AnimatePresence manages the transition between elements with the same key.
          mode="wait" ensures the exiting element finishes before the new element enters. */}
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          // Key change triggers the exit/enter sequence
          key={GREETINGS[index]} 
          
          className="absolute top-0 left-0 w-full text-left" 
          
          variants={animationVariants}
          initial="enter" // Start below
          animate="center" // Scroll to center
          exit="exit"    // Scroll up and out
        >
          {GREETINGS[index]}
        </motion.span>
      </AnimatePresence>
    </h1>
  );
}