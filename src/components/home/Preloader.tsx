"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disable scroll while loading
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
    }, 350);

    return () => {
      clearTimeout(timer);
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
            transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
            transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-white select-none pointer-events-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-20 h-20 flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-2xl border border-[#f9c602]/60 rotate-45 animate-[spin_8s_linear_infinite]" />
            <div className="absolute inset-2 rounded-xl border border-[#392F5F]/25 -rotate-45" />
            <Image
              src="/company_logo/logo-mark.svg"
              alt="Fanam Group"
              width={43}
              height={44}
              className="relative z-10 h-14 w-auto object-contain"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
