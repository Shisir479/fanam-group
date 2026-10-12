"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { SectionLabel } from "@/components/ui/SectionLabel";
const col1Images = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20%281%20of%201%29-5.jpg?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop",
];

const col2Images = [
  "https://images.unsplash.com/photo-1754531976828-69e42ce4e0d9?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1758599543120-c1cbcf407fec?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1000&auto=format&fit=crop",
];

export default function ImageGalleryBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite scroll down for col1
      gsap.to(col1Ref.current, {
        yPercent: -25, // Scroll exactly 1 of the 4 copies
        ease: "none",
        duration: 20,
        repeat: -1,
      });

      // Infinite scroll up for col2
      gsap.fromTo(
        col2Ref.current,
        { yPercent: -25 },
        {
          yPercent: 0,
          ease: "none",
          duration: 25,
          repeat: -1,
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[40vh] min-h-[350px] md:min-h-[350px] bg-slate-50 overflow-hidden flex items-center border-b border-gray-200"
    >
      {/* Background abstract element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

      {/* Added pt-28 md:pt-36 to clear the fixed navbar */}
      <div className="container mx-auto px-6 md:px-16 w-full h-full flex items-center relative z-10 pt-28 md:pt-36 pb-12">
        {/* Left Side: Premium Typography */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center h-full">
          <div className="mb-4">
            <SectionLabel>IMAGE GALLERY</SectionLabel>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 uppercase leading-tight tracking-wide mb-2">
            IMAGE GALLERY
          </h1>

          <p className="text-base md:text-xl lg:text-2xl text-brand-blue uppercase tracking-wider font-medium mb-6">
            VISUAL JOURNEY
          </p>

          <p className="text-slate-600 text-sm md:text-lg font-medium leading-relaxed max-w-md">
            Explore the defining moments, groundbreaking projects, and the
            people behind Fanam Group&apos;s continued success.
          </p>
        </div>
      </div>

      {/* Right Side: Infinite Parallax Gallery (Moved outside container to fix cutoff on right edge) */}
      <div className="hidden lg:flex w-[55vw] xl:w-[50vw] h-full absolute right-0 top-0 items-center justify-end overflow-visible pointer-events-none pt-20 z-0">
        {/* Precise gradient masks for smooth edge fading without hiding columns */}
        <div className="absolute top-0 bottom-0 left-0 w-40 bg-gradient-to-r from-slate-50 to-transparent z-10" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-50 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-slate-50 to-transparent z-10" />

        {/* Wrapper with 3D perspective rotation */}
        <div className="flex gap-4 w-[440px] -rotate-[10deg] scale-100 translate-x-10 opacity-90">
          {/* Column 1 (Scrolls Up) */}
          <div ref={col1Ref} className="flex-1 flex flex-col gap-4 w-full">
            {[...col1Images, ...col1Images, ...col1Images, ...col1Images].map(
              (src, idx) => (
                <div
                  key={`col1-${idx}`}
                  className="relative shrink-0 w-full h-[160px] rounded-xl overflow-hidden shadow-lg bg-gray-200 border-[3px] border-white"
                >
                  <Image
                    src={src}
                    alt="Gallery"
                    fill
                    className="object-cover"
                  />
                </div>
              ),
            )}
          </div>

          {/* Column 2 (Scrolls Down) */}
          <div
            ref={col2Ref}
            className="flex-1 flex flex-col gap-4 w-full translate-y-[80px]"
          >
            {[...col2Images, ...col2Images, ...col2Images, ...col2Images].map(
              (src, idx) => (
                <div
                  key={`col2-${idx}`}
                  className="relative shrink-0 w-full h-[200px] rounded-xl overflow-hidden shadow-lg bg-gray-200 border-[3px] border-white"
                >
                  <Image
                    src={src}
                    alt="Gallery"
                    fill
                    className="object-cover"
                  />
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
