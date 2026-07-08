"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { BlockReveal } from "@/components/ui/BlockReveal";

const images = [
  {
    src: "https://images.unsplash.com/photo-1568295123886-8d09a5986b4e?q=80&w=435&auto=format&fit=crop",
    style:
      "top-[10%] left-[5%] rotate-[-12deg] w-[220px] md:w-[280px] aspect-[4/3] z-10",
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    style:
      "top-[25%] left-[30%] rotate-[8deg] w-[250px] md:w-[320px] aspect-[16/9] z-20",
  },
  {
    src: "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?q=80&w=1032&auto=format&fit=crop",
    style:
      "top-[40%] left-[55%] rotate-[-5deg] w-[200px] md:w-[260px] aspect-[4/3] z-10",
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop",
    style:
      "bottom-[15%] left-[20%] rotate-[15deg] w-[240px] md:w-[300px] aspect-[16/9] z-30",
  },
];

export default function ImageGalleryBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Entrance animation for scattered photos
    const ctx = gsap.context(() => {
      gsap.from(imagesRef.current, {
        y: 100,
        opacity: 0,
        rotation: 0,
        scale: 0.8,
        stagger: 0.15,
        duration: 1,
        ease: "back.out(1.5)",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] bg-cover bg-center overflow-hidden flex items-end"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1655817149896-542104bbdb09?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none z-0"></div>

      {/* Scattered Photos */}
      {images.map((img, index) => (
        <div
          key={index}
          ref={(el) => {
            imagesRef.current[index] = el;
          }}
          className={`absolute shadow-2xl border-[6px] border-white ${img.style}`}
        >
          <Image
            src={img.src}
            alt="Gallery Photo"
            fill
            className="object-cover"
          />
        </div>
      ))}

      {/* Optional: Camera graphic on the right side */}
      <div className="absolute right-0 md:-right-10 top-[20%] md:top-[10%] w-[150px] md:w-[400px]  aspect-square opacity-90 z-20 pointer-events-none">
        <Image
          src="https://res.cloudinary.com/duqlhfshv/image/upload/v1782892369/Adobe_Express_-_file_1_2_unb7gh.png"
          alt="Camera"
          fill
          className="object-contain rotate-[15deg] drop-shadow-2xl"
        />
      </div>

      {/* Title */}
      <div className="container mx-auto px-5 md:px-16 relative z-40 pb-12">
        <BlockReveal color="var(--color-brand-blue)" delay={0.5}>
          <h1 className="text-white text-3xl md:text-4xl  font-extrabold tracking-wider uppercase drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
            IMAGE GALLERY
          </h1>
        </BlockReveal>
      </div>
    </div>
  );
}
