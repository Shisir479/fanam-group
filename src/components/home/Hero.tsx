"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Compass,
} from "lucide-react";

const defaultSlides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    video: "",
    tagline: "Pioneering Conglomerate • Excellence Across Industries",
    title: "Shaping Tomorrow Through Vision, Integrity & Diverse Excellence",
    description:
      "From visionary real estate developments to digital commerce, global trading, hospitality, and modern ventures — Fanam Group builds enduring value across Bangladesh and beyond.",
    ctaPrimary: { label: "Discover Our Concerns", href: "/concern" },
    ctaSecondary: { label: "About Fanam Group", href: "/about" },
    category: "Conglomerate",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    video: "",
    tagline: "Real Estate • Tech • E-Commerce • Travel",
    title: "A Dynamic Portfolio United by a Single Standard of Distinction",
    description:
      "Redefining urban lifestyles with landmark residential projects and empowering modern consumers with cutting-edge IT and digital retail solutions.",
    ctaPrimary: { label: "Explore Projects", href: "/concern" },
    ctaSecondary: { label: "About Fanam Group", href: "/about" },
    category: "Real Estate & IT",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    video: "",
    tagline: "Sustainable Growth • Community Impact",
    title: "Empowering Communities & Inspiring Sustainable Innovation",
    description:
      "Committed to responsible progress, fostering long-term partnerships, and driving economic prosperity through ethical leadership and future-ready enterprise.",
    ctaPrimary: { label: "Our Story", href: "/about" },
    ctaSecondary: { label: "About Fanam Group", href: "/about" },
    category: "Global Impact",
  },
];

const AUTOPLAY_DURATION = 6500; // ms

export function Hero({ data }: { data?: any }) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = defaultSlides;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_DURATION);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered]);

  const currentSlide = slides[current];

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ─── 1. Continuous Slow Video Zoom-In Background Effect ─── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        >
          {/* Continuous Slow Zoom-In Motion (Replicating Slow Drone / Video Push-In) */}
          <motion.div
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.15 }}
            transition={{
              duration: AUTOPLAY_DURATION / 1000 + 1,
              ease: "linear",
            }}
            className="relative w-full h-full will-change-transform transform-gpu"
          >
            {currentSlide.video ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={currentSlide.image}
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={currentSlide.video} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={currentSlide.image}
                alt={currentSlide.title}
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority={current === 0}
              />
            )}
          </motion.div>

          {/* Sweeping Volumetric Cinema Light Beam */}
          <motion.div
            key={`light-${current}`}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "200%", opacity: [0, 0.35, 0] }}
            transition={{ duration: 3.5, ease: "easeInOut" }}
            className="absolute -inset-y-full w-[600px] bg-gradient-to-r from-transparent via-[#f9c602]/15 to-transparent -rotate-45 pointer-events-none blur-3xl"
          />

          {/* Color Grading & Cinematic Contrast Vignettes */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a] via-[#0a0a0a]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/45 to-black/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(10,10,10,0.85)_100%)]" />

          {/* 4K Projection Film Grid Texture */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, #fff, #fff 1px, transparent 1px, transparent 3px)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ─── Ambient Living Gold Nebula ─── */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -right-32 w-[550px] h-[550px] bg-[#f9c602] rounded-full blur-[140px] pointer-events-none z-[2]"
      />

      {/* ─── 2. Main Hero Content Layout (Steady, Left Aligned, Clean) ─── */}
      <div className="relative z-10 w-full fanam-container pt-32 pb-24 md:pt-36 md:pb-28 flex flex-col justify-between min-h-screen">
        <div className="my-auto max-w-3xl">

          {/* Fixed-Height Text Frame: Smooth Opacity Dissolve, ZERO vertical jump or shake */}
          <div className="min-h-[250px] sm:min-h-[270px] md:min-h-[290px] flex flex-col justify-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* Tagline Pill */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f9c602]/10 backdrop-blur-md border border-[#f9c602]/30 text-[#f9c602] text-xs md:text-sm font-medium tracking-wide mb-5 shadow-lg shadow-black/40">
                  <Sparkles className="w-3.5 h-3.5 text-[#f9c602]" />
                  <span>{currentSlide.tagline}</span>
                </div>

                {/* Title */}
                <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.12] tracking-tight mb-5 drop-shadow-2xl">
                  {currentSlide.title}
                </h1>

                {/* Description */}
                <p className="text-white/85 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl drop-shadow font-normal">
                  {currentSlide.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action Buttons: Anchored with smooth hover states */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link
              href={currentSlide.ctaPrimary.href}
              className="group relative inline-flex items-center gap-3 bg-[#f9c602] text-[#0a0a0a] px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 shadow-[0_0_25px_rgba(249,198,2,0.4)] hover:shadow-[0_0_40px_rgba(249,198,2,0.7)] hover:scale-105 active:scale-95"
            >
              <span>{currentSlide.ctaPrimary.label}</span>
              <span className="w-7 h-7 rounded-full bg-[#0a0a0a]/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-45">
                <ArrowRight className="w-4 h-4 text-[#0a0a0a]" />
              </span>
            </Link>

            <Link
              href={currentSlide.ctaSecondary.href}
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-white/90 hover:text-white font-medium text-sm tracking-wide bg-white/5 hover:bg-white/15 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Compass className="w-4 h-4 text-[#f9c602]" />
              <span>{currentSlide.ctaSecondary.label}</span>
              <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>

        {/* ─── 3. Progress Controller & Slide Navigation ─── */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Interactive Progress Indicators */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full md:max-w-xl">
            {slides.map((slide, idx) => {
              const isActive = idx === current;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrent(idx)}
                  className="group text-left focus:outline-none transition-opacity cursor-pointer"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span
                      className={`font-mono transition-colors duration-300 ${
                        isActive
                          ? "text-[#f9c602] font-semibold"
                          : "text-white/40 group-hover:text-white/70"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span
                      className={`hidden sm:inline-block text-[11px] font-medium truncate max-w-[110px] transition-colors duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-white/40 group-hover:text-white/70"
                      }`}
                    >
                      {slide.category}
                    </span>
                  </div>

                  {/* Progress Line */}
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden relative">
                    {isActive ? (
                      <motion.div
                        key={`progress-${idx}-${current}`}
                        initial={{ width: "0%" }}
                        animate={{
                          width: isHovered ? undefined : "100%",
                        }}
                        transition={{
                          duration: AUTOPLAY_DURATION / 1000,
                          ease: "linear",
                        }}
                        className="h-full bg-gradient-to-r from-[#f9c602] to-[#ffe066] rounded-full shadow-[0_0_8px_#f9c602]"
                      />
                    ) : (
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          idx < current
                            ? "w-full bg-white/50"
                            : "w-0 group-hover:w-1/3 bg-white/30"
                        }`}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Slide Navigation Controls */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Slide Number Counter */}
            <div className="font-mono text-sm tracking-wider flex items-baseline gap-1">
              <span className="text-[#f9c602] font-bold text-lg">
                0{current + 1}
              </span>
              <span className="text-white/30 text-xs">/</span>
              <span className="text-white/40 text-xs">0{slides.length}</span>
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#f9c602] text-white hover:text-[#0a0a0a] border border-white/15 hover:border-[#f9c602] backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-md active:scale-90 cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#f9c602] text-white hover:text-[#0a0a0a] border border-white/15 hover:border-[#f9c602] backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-md active:scale-90 cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
