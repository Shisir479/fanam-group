"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (totalScroll > 0) {
        const progress = Math.min(
          100,
          Math.max(0, (currentScroll / totalScroll) * 100),
        );
        setScrollProgress(progress);
      }

      setIsVisible(currentScroll > 320);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 right-8 z-50 group cursor-pointer"
        >
          <button
            onClick={scrollToTop}
            className="relative w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-[#392F5F] to-[#4A3A7A] backdrop-blur-md text-white border border-[#F9C602]/40 shadow-[0_8px_30px_rgba(57,47,95,0.45)] hover:shadow-[0_0_25px_rgba(249,198,2,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
            aria-label="Back to top"
          >
            {/* SVG Circular Scroll Progress Ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 transform pointer-events-none p-1"
              viewBox="0 0 52 52"
            >
              {/* Background Ring */}
              <circle
                cx="26"
                cy="26"
                r={radius}
                className="stroke-white/10"
                strokeWidth="2.5"
                fill="transparent"
              />
              {/* Progress Ring */}
              <circle
                cx="26"
                cy="26"
                r={radius}
                className="stroke-[#F9C602] transition-all duration-150 ease-out"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Inner Icon */}
            <ArrowUp className="w-5 h-5 text-white group-hover:text-[#F9C602] transition-all duration-300 transform group-hover:-translate-y-1" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
