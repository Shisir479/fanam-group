"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  cloudinaryImageLoader,
  isCloudinaryImage,
} from "@/lib/cloudinary-image-loader";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Compass,
  Handshake,
  Globe,
  TrendingUp,
  ShieldCheck,
  Award,
  Building2,
  Layers,
} from "lucide-react";

/* ─── Corporate Palette ───
   Deep Purple  #392F5F  (primary dark)
   Brand Gold   #F9C602  (accent)
   White        #FFFFFF  (base)  */

const defaultSocialLinks = [
  {
    key: "facebook",
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-4 h-4 md:w-5 md:h-5"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    key: "instagram",
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-4 h-4 md:w-5 md:h-5"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-4 h-4 md:w-5 md:h-5"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    key: "twitter",
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-4 h-4 md:w-5 md:h-5"
      >
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    ),
  },
  {
    key: "youtube",
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-4 h-4 md:w-5 md:h-5"
      >
        <rect x="2" y="4" width="20" height="16" rx="4" />
        <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

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
    ctaPrimary: { label: "Explore Our Enterprise", href: "/concern" },
    ctaSecondary: { label: "Our Heritage", href: "/about" },
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
    ctaPrimary: { label: "View Developments", href: "/concern" },
    ctaSecondary: { label: "Our Heritage", href: "/about" },
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
    ctaPrimary: { label: "Our Journey", href: "/about" },
    ctaSecondary: { label: "Our Heritage", href: "/about" },
    category: "Global Impact",
  },
];

const AUTOPLAY_DURATION = 6500; // ms

const defaultStats = [
  {
    id: 1,
    icon: Handshake,
    value: "50+",
    label: "Tier-1 Partners",
    subtitle: "Strategic Alliances",
    description: "Global corporate network",
  },
  {
    id: 2,
    icon: Globe,
    value: "15+",
    label: "Asia, EU & Americas",
    subtitle: "Global Markets",
    description: "Cross-continental footprint",
  },
  {
    id: 3,
    icon: TrendingUp,
    value: "$120M+",
    label: "Institutional Capital",
    subtitle: "Joint Venture Value",
    description: "Co-developed landmark assets",
  },
  {
    id: 4,
    icon: ShieldCheck,
    value: "99.4%",
    label: "Verified Reliability",
    subtitle: "Partner Retention",
    description: "Trusted delivery track record",
  },
];

export function Hero({
  cmsData,
  homeSettings,
  mainSettings,
  branding,
}: {
  cmsData?: Record<string, unknown>;
  homeSettings?: Record<string, unknown>;
  mainSettings?: Record<string, unknown>;
  branding?: { socialLinks?: Record<string, string> };
}) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Use CMS slides if available, otherwise fallback to defaultSlides
  const cmsSlides = (cmsData?.heroSlides ||
    homeSettings?.slides ||
    []) as Array<Record<string, unknown>>;
  const slides =
    cmsSlides.length > 0
      ? cmsSlides.map((slide: Record<string, unknown>, idx: number) => ({
          id: (slide._id as string) || idx + 1,
          image:
            ((slide.image as Record<string, unknown>)?.url as string) ||
            (slide.image as string) ||
            "",
          video: (slide.videoUrl as string) || "",
          tagline:
            (slide.tagline as string) || (slide.subtitle as string) || "",
          title: (slide.title as string) || (slide.heading as string) || "",
          description:
            (slide.description as string) || (slide.content as string) || "",
          ctaPrimary: (slide.ctaPrimary as { label: string; href: string }) || {
            label: "Explore Our Enterprise",
            href: "/concern",
          },
          ctaSecondary: (slide.ctaSecondary as {
            label: string;
            href: string;
          }) || { label: "Our Heritage", href: "/about" },
          category: (slide.category as string) || "General",
        }))
      : defaultSlides;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => nextSlide(), AUTOPLAY_DURATION);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered]);

  const currentSlide = slides[current];

  // Dynamic social links from branding settings
  const dynamicSocialLinks = branding?.socialLinks
    ? defaultSocialLinks.map((link) => ({
        ...link,
        href: branding.socialLinks?.[link.key] || link.href,
      }))
    : defaultSocialLinks;

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ─── Premium geometric pattern overlay ─── */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none z-[1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ─── Background Media with Video-Style Motion ─── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        >
          {/* Continuous slow push-in (drone-style) */}
          <motion.div
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.12 }}
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
                loader={
                  isCloudinaryImage(currentSlide.image)
                    ? cloudinaryImageLoader
                    : undefined
                }
                sizes="100vw"
                className="object-cover object-center"
                priority={current === 0}
                loading="eager"
              />
            )}
          </motion.div>

          {/* Soft dark cinematic veil — images remain visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 via-[#0a0a0a]/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/55 via-transparent to-transparent" />

          {/* Horizontal Gold Scanline Sweep (Video-Feed Effect) */}
          <motion.div
            key={`scan-${current}`}
            initial={{ y: "-10%", opacity: 0 }}
            animate={{ y: "110%", opacity: [0, 0.7, 0] }}
            transition={{ duration: 2.4, ease: "easeInOut", delay: 0.4 }}
            className="absolute inset-x-0 h-40 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(249,198,2,0.12), rgba(249,198,2,0.28), rgba(249,198,2,0.12), transparent)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ─── Ambient living gradient aura ─── */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.25, 0.45, 0.25],
          x: [0, 40, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -right-24 w-[560px] h-[560px] rounded-full blur-[150px] pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(circle, rgba(249,198,2,0.25) 0%, rgba(57,47,95,0.3) 45%, transparent 70%)",
        }}
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, -30, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(circle, rgba(57,47,95,0.4) 0%, rgba(74,58,122,0.3) 50%, transparent 75%)",
        }}
      />

      {/* ─── 2. Main Hero Content ─── */}
      <div className="relative z-10 w-full fanam-container pt-28 pb-8 md:pt-32 md:pb-12 flex flex-col justify-end min-h-[90vh] md:min-h-screen">
        <div className="mt-auto mb-4 w-full">
          <div className="max-w-3xl">
            <div className="min-h-[250px] sm:min-h-[270px] md:min-h-[290px] flex flex-col justify-start relative">
              {/* Soft ambient text shadow — no hard line */}
              <div
                className="absolute -inset-x-10 -inset-y-8 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at left, rgba(10,10,10,0.35) 0%, transparent 70%)",
                }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {/* Tagline */}
                  <div className="inline-flex items-center gap-2 text-white font-medium mb-4">
                    <span>{currentSlide.tagline}</span>
                  </div>

                  <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8 drop-shadow max-w-4xl">
                    {currentSlide.title}
                  </h1>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 mt-8">
                    <Link
                      href={currentSlide.ctaPrimary.href}
                      className="group relative inline-flex items-center gap-4 bg-white text-[#392F5F] rounded-full pl-6 pr-2 py-2 font-medium text-[15px] transition-all duration-300 hover:bg-gray-100 active:scale-[0.98] shadow-lg"
                    >
                      <span>{currentSlide.ctaPrimary.label}</span>
                      <span className="w-8 h-8 rounded-full bg-[#F9C602] text-[#392F5F] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Aligned Description */}
          <div className="absolute bottom-8 md:bottom-16 right-24 md:right-32 max-w-[320px] hidden md:block">
            <div className="border-t border-white/30 pt-4">
              <p className="text-white/90 text-[15px] leading-relaxed font-normal">
                {currentSlide.description}
              </p>
            </div>
          </div>
          {/* ─── Floating Island Stats Bento ─── */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-10 w-full">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx, duration: 0.6 }}
                  className="group relative flex flex-col gap-3 p-4 md:p-5 bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-xl border border-white/15 hover:border-[#F9C602]/40 transition-all duration-500 hover:-translate-y-1 shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 bg-[#F9C602]/10 group-hover:bg-[#F9C602]/20 border border-[#F9C602]/30 text-[#F9C602] transition-colors duration-300">
                      <Icon className="w-5 h-5 md:w-5.5 md:h-5.5" />
                    </div>
                    <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                      {stat.value}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] md:text-xs font-semibold text-[#F9C602] uppercase tracking-wider">
                      {stat.subtitle}
                    </span>
                    <span className="text-xs md:text-sm text-white/80 font-medium leading-snug">
                      {stat.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div> */}
        </div>
      </div>

      {/* ─── Slide navigation ─── */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            aria-current={current === idx ? "step" : undefined}
            className={`rounded-full transition-all duration-300 ${
              current === idx
                ? "h-8 w-2 bg-[#F9C602]"
                : "h-2 w-2 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>

      {/* ─── 4. Floating Social Icons (transparent bordered design) ─── */}
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3 md:gap-4">
        {dynamicSocialLinks.map((item, idx) => (
          <motion.a
            key={item.key}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * idx, duration: 0.5 }}
            className="group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-md bg-white hover:bg-[#F9C602] backdrop-blur-xl border-[3px] border-[#F9C602] hover:border-[#F9C602] transition-all duration-300 cursor-pointer drop-shadow-md hover:scale-110 text-[#392F5F] hover:text-[#392F5F]"
            aria-label={item.label}
          >
            <span className="transition-transform duration-300 group-hover:scale-110">
              {item.icon}
            </span>
            <span className="absolute right-full mr-3 whitespace-nowrap rounded bg-[#392F5F] px-3 py-1 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              {item.label}
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
