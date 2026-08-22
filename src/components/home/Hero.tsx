"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const defaultSlides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    tagline: "Building Trust. Driving Growth. Fanam Group.",
    title:
      "Fanam Group One Multinational Group, Endless Sectors of Opportunity",
    description:
      "Fanam Group has evolved from a real estate pioneer into a diversified multinational conglomerate, with a growing presence in e-commerce, trading, hospitality, FMCG, and beyond — all united by a single standard of excellence.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    tagline: "Excellence in Every Venture We Undertake.",
    title: "Real Estate, Media, Travel & E-Commerce Under One Umbrella",
    description:
      "With a portfolio spanning across industries, Fanam Group continues to set benchmarks for quality, innovation, and sustainable growth in every sector we operate.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    tagline: "Empowering Communities. Creating Impact.",
    title: "Driven by Innovation, United by Purpose and Integrity",
    description:
      "From corporate social responsibility to community empowerment, we are committed to making a positive impact through every initiative and partnership.",
  },
];

export function Hero({ data }: { data?: any }) {
  const [current, setCurrent] = useState(0);

  const slides = defaultSlides; // Hardcoding to defaultSlides for now as requested

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#181428]">
      {/* Background Image with Overlay */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
          transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
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
          {/* Faded black overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content — Left Aligned */}
      <div className="relative z-10 h-full flex items-center pt-24">
        <div className="fanam-container">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Tagline */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-[#f9c602] font-semibold text-sm md:text-[15px] tracking-wide mb-4"
                >
                  {slides[0].tagline}
                </motion.p>

                {/* Title */}
                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.35 }}
                  className="text-white text-3xl md:text-4xl  font-serif font-bold leading-snug tracking-normal mb-6 drop-shadow-md"
                >
                  {slides[0].title}
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-white/90 text-sm md:text-[15px] leading-relaxed max-w-2xl mb-10 drop-shadow"
                >
                  {slides[0].description}
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.65 }}
                >
                  <Link
                    href="/concern"
                    className="group inline-flex items-center gap-3 bg-[#181428] text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-[#f9c602] hover:text-[#181428] border border-[#181428] hover:border-[#f9c602] transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      Discover Our Business
                    </span>
                    <span className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-[#181428]/10 text-white group-hover:text-[#181428] flex items-center justify-center transition-all duration-300 group-hover:-translate-x-1 group-hover:-rotate-45">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_: any, index: number) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-500 cursor-pointer ${
              index === current
                ? "w-3 h-3 bg-[#f9c602] shadow-[0_0_12px_rgba(249,198,2,0.5)]"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
