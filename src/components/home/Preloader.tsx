"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disable scroll while loading
    document.body.style.overflow = "hidden";

    const duration = 1600; // ms
    const intervalTime = 20;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "";
          }, 300);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-gradient-to-br from-[#392F5F] via-[#4A3A7A] to-[#2A2545] text-white select-none pointer-events-auto"
        >
          {/* Brand Gradient Backlight */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(249,198,2,0.25) 0%, rgba(107,78,158,0.35) 50%, transparent 75%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
            {/* Animated Brand Emblem */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-20 h-20 mb-8 flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-2xl border border-[#f9c602]/40 rotate-45 animate-[spin_8s_linear_infinite]" />
              <div className="absolute inset-2 rounded-xl border border-white/20 -rotate-45" />
              <span className="font-serif font-bold text-3xl text-[#f9c602] tracking-wider">
                F
              </span>
            </motion.div>

            {/* Brand Title */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif font-bold text-2xl md:text-3xl tracking-[0.25em] text-white uppercase mb-2"
            >
              Fanam Group
            </motion.h2>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-[11px] md:text-xs font-semibold tracking-[0.3em] text-[#f9c602] uppercase mb-10"
            >
              Building Trust • Driving Growth
            </motion.p>

            {/* Modern Linear Progress Bar */}
            <div className="w-56 md:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-[#392F5F] via-[#6B4E9E] to-[#F9C602] shadow-[0_0_12px_rgba(249,198,2,0.6)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>

            {/* Percentage Display */}
            <div className="font-mono text-xs text-white/50 tracking-wider">
              <span>{Math.round(progress)}</span>%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
