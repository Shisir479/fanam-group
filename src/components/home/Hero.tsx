"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const defaultSlides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", // Corporate building
    title: "BUILDING A DIVERSIFIED FUTURE",
    subtitle: "Welcome to Fanam Group Corporate",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop", // Modern office / Real Estate
    title: "EXCELLENCE IN EVERY VENTURE",
    subtitle: "Real Estate, Media, Travel & E-Commerce",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop", // Team / Corporate
    title: "EMPOWERING COMMUNITIES",
    subtitle: "Driven by Innovation and Trust",
  },
];

export function Hero({ data }: { data?: any }) {
  const [current, setCurrent] = useState(0);

  const slides =
    data?.heroSlides?.length > 0
      ? data.heroSlides.map((slide: any, index: number) => ({
          id: index + 1,
          image:
            slide.image?.url ||
            defaultSlides[index % defaultSlides.length].image,
          title: slide.title || defaultSlides[index % defaultSlides.length].title,
          subtitle: slide.subtitle || defaultSlides[index % defaultSlides.length].subtitle,
        }))
      : defaultSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            fill
            sizes="100vw"
            className="object-cover"
            priority={current === 0}
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:px-12 pointer-events-none pb-20">
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="text-amber-500 font-semibold tracking-[0.2em] uppercase text-sm md:text-base mb-4 drop-shadow-md"
            >
              {slides[current].subtitle}
            </motion.p>
            
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="text-white text-4xl md:text-6xl lg:text-7xl font-extrabold max-w-5xl tracking-tight uppercase leading-tight drop-shadow-2xl"
            >
              {slides[current].title}
            </motion.h1>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
