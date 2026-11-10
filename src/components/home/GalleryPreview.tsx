"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { BlockReveal } from "@/components/ui/BlockReveal";
import Image from "next/image";
import { SectionLabel } from "./SectionLabel";

export function GalleryPreview({ data }: { data?: any }) {
  const defaultImages = [
    {
      src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
      title: "Luxury Villa",
    },
    {
      src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800",
      title: "Modern Apartment",
    },
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
      title: "Commercial Hub",
    },
  ];

  const galleryImages =
    data?.galleryItems?.length > 0
      ? data.galleryItems.map((item: any) => ({
          src: item.image?.url || "",
          title: item.title || "",
        }))
      : defaultImages;

  const galleryTitle = data?.galleryTitle || "GALLERY";
  const galleryHeading = data?.galleryHeading || (
    <>
      Discover Our <br className="hidden md:block" /> Signature Projects
    </>
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const textsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const SLIDE_DURATION = 0.4;
  const AUTOPLAY_DELAY = 5000; // 5.0 seconds for slower zoom

  const goToSlide = (newIndex: number) => {
    if (isAnimating.current || newIndex === activeIndex) return;
    isAnimating.current = true;

    const currentSlide = slidesRef.current[activeIndex];
    const nextSlide = slidesRef.current[newIndex];
    const currentText = textsRef.current[activeIndex];
    const nextText = textsRef.current[newIndex];

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(newIndex);
        isAnimating.current = false;
        startProgress();
      },
    });

    // Reset next slide to prepare for fade in
    gsap.set(nextSlide, { zIndex: 10, opacity: 0 });
    gsap.set(currentSlide, { zIndex: 1 });

    // Fade in next slide
    tl.to(
      nextSlide,
      {
        opacity: 1,
        duration: SLIDE_DURATION,
        ease: "power2.inOut",
      },
      0,
    );

    // Fade out current slide
    tl.to(
      currentSlide,
      {
        opacity: 0,
        duration: SLIDE_DURATION,
        ease: "power2.inOut",
      },
      0,
    );

    // Continuous slow zoom for Ken Burns effect on next slide
    tl.fromTo(
      nextSlide?.querySelector(".slide-image") as Element,
      { scale: 1.35, x: "0%" }, // Reset X from previous animation if any
      {
        scale: 1,
        duration: AUTOPLAY_DELAY / 1000 + SLIDE_DURATION,
        ease: "none",
      },
      0,
    );

    // Text Animations
    if (currentText) {
      tl.to(
        currentText.children,
        {
          y: -50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.in",
        },
        0,
      );
    }
    if (nextText) {
      tl.fromTo(
        nextText.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        },
        SLIDE_DURATION * 0.5,
      );
    }
  };

  const startProgress = () => {
    if (progressBarRef.current) {
      gsap.fromTo(
        progressBarRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: AUTOPLAY_DELAY / 1000,
          ease: "none",
        },
      );
    }
  };

  useEffect(() => {
    // Initial setup
    slidesRef.current.forEach((slide, i) => {
      if (i !== activeIndex) {
        gsap.set(slide, { opacity: 0, zIndex: 1, clipPath: "none" });
        if (textsRef.current[i]) {
          gsap.set(textsRef.current[i]?.children || [], { y: 50, opacity: 0 });
        }
      } else {
        gsap.set(slide, { zIndex: 10, opacity: 1, clipPath: "none" });

        // Start the first slide's zoom
        gsap.fromTo(
          slide?.querySelector(".slide-image") as Element,
          { scale: 1.35 },
          { scale: 1, duration: AUTOPLAY_DELAY / 1000, ease: "none" },
        );

        if (textsRef.current[i]) {
          gsap.set(textsRef.current[i]?.children || [], { y: 0, opacity: 1 });
        }
      }
    });

    startProgress();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % galleryImages.length;
      goToSlide(nextIndex);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <section className="w-full py-12 md:py-16 bg-transparent overflow-hidden">
      <div className="container mx-auto px-5 md:px-16">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div className="flex flex-col gap-4">
            <BlockReveal color="var(--color-brand-blue)">
              <SectionLabel dark>{galleryTitle}</SectionLabel>
            </BlockReveal>
            <BlockReveal color="var(--color-brand-blue)" delay={0.2}>
              <h2 className="text-2xl md:text-[34px] font-bold tracking-tight text-white leading-[1.1] uppercase">
                {galleryHeading}
              </h2>
            </BlockReveal>
          </div>
        </div>

        {/* GSAP Slider Container */}
        <div
          ref={containerRef}
          className="relative w-full h-[400px] md:h-[500px] overflow-hidden shadow-2xl bg-zinc-900 group"
        >
          {galleryImages.map((image: any, index: number) => (
            <div
              key={index}
              ref={(el) => {
                slidesRef.current[index] = el;
              }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Image */}
              <div className="slide-image absolute inset-0 w-full h-full">
                <Image
                  src={image.src}
                  alt={image.title || `Gallery image ${index + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Title Content */}
              {image.title && (
                <div
                  ref={(el) => {
                    textsRef.current[index] = el;
                  }}
                  className="absolute bottom-16 left-8 md:bottom-24 md:left-16 z-20 pointer-events-none"
                >
                  <h3 className="text-white text-2xl md:text-4xl font-extrabold tracking-wider uppercase drop-shadow-lg">
                    {image.title}
                  </h3>
                  <div className="w-16 md:w-20 h-1.5 bg-brand-blue mt-4" />
                </div>
              )}
            </div>
          ))}

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/20 z-30">
            <div
              ref={progressBarRef}
              className="h-full bg-brand-blue transform origin-left"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
