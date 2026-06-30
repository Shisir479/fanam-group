"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    title: "OASIS OF COMFORT",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    title: "LUXURY LIVING IN THE HEART OF THE CITY",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2012&auto=format&fit=crop",
    title: "BOULEVARD THAT MAKES YOUR HEART SING",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSlide, setNextSlide] = useState(1);
  const [activeTextIndex, setActiveTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const currentImageRef = useRef<HTMLDivElement>(null);
  const nextImageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const goToSlide = (targetIndex: number) => {
    if (isAnimating || targetIndex === currentSlide) return;
    setIsAnimating(true);
    
    setNextSlide(targetIndex);

    const tl = gsap.timeline();

    // Prepare next slide off-screen to the right
    gsap.set(nextImageRef.current, { xPercent: 100, zIndex: 10 });
    gsap.set(currentImageRef.current, { xPercent: 0, zIndex: 0 });
    // Reset the dark overlay to cover the next image
    gsap.set(overlayRef.current, { xPercent: 0 });

    // Fade out current text quickly
    gsap.to(textRef.current, {
      y: -20, opacity: 0, duration: 0.4, ease: "power2.in",
      onComplete: () => {
        setActiveTextIndex(targetIndex);
      }
    });
    
    // Step 1: Standard horizontal slide animation (Next image slides in with black overlay)
    tl.to(currentImageRef.current, { xPercent: -100, duration: 1.2, ease: "power3.inOut" }, 0)
      .to(nextImageRef.current, { xPercent: 0, duration: 1.2, ease: "power3.inOut" }, 0)
    // Step 2: "Another slide" - The black overlay slides away to reveal the clear image
      .to(overlayRef.current, { xPercent: 100, duration: 1, ease: "power3.inOut" }, 1.2)
    .add(() => {
      // Fade in the new text exactly as the clear image is revealed
      gsap.fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }, 1.2)
    .add(() => {
      setCurrentSlide(targetIndex);
      
      // Reset positions instantly after React render
      setTimeout(() => {
        gsap.set(currentImageRef.current, { xPercent: 0 });
        gsap.set(nextImageRef.current, { xPercent: 100 });
        setIsAnimating(false);
      }, 50);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide((currentSlide + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlide, isAnimating]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Current Slide Container */}
      <div ref={currentImageRef} className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <img
          src={slides[currentSlide].image}
          alt="current"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* We keep a static overlay on current slide so it matches the incoming dark slide before it clears */}
        <div className="absolute inset-0 bg-black/40 opacity-0" />
      </div>

      {/* Next Slide Container */}
      <div 
        ref={nextImageRef} 
        className="absolute inset-0 w-full h-full overflow-hidden z-10"
        style={{ transform: "translateX(100%)" }}
      >
        <img
          src={slides[nextSlide].image}
          alt="next"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* This overlay slides away to reveal the clear image */}
        <div ref={overlayRef} className="absolute inset-0 bg-black/60 z-20" />
      </div>
      
      {/* Overlay for better text readability (overall screen) */}
      <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-32 md:pb-40 pointer-events-none">
        <div className="container mx-auto px-6 md:px-12 w-full">
          <h1
            ref={textRef}
            className="text-white text-3xl md:text-5xl font-bold max-w-5xl tracking-tight uppercase"
            style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
          >
            {slides[activeTextIndex].title}
          </h1>
        </div>
      </div>

      {/* Pagination Dots (Right Side) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className={`flex items-center justify-center rounded-full transition-colors duration-300 w-5 h-5 ${
              index === currentSlide ? "bg-white/30" : "bg-transparent hover:bg-white/10"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
          </button>
        ))}
      </div>

      {/* Bottom Bar: Explore Projects */}
      <div className="absolute bottom-16 left-0 right-0 h-13 bg-black/70 z-30 flex items-center">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-start gap-4 md:gap-8 w-full h-full">
          <div className="flex items-center gap-2 text-white font-bold tracking-wider text-xs cursor-pointer hover:text-white/80 transition h-full px-4 border-l border-white/20">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            EXPLORE PROJECTS
          </div>

          {/* Separator arrow */}
          <div className="hidden md:block">
            <svg width="6" height="10" viewBox="0 0 8 12" fill="white">
              <path d="M0 0L8 6L0 12V0Z" />
            </svg>
          </div>

          <div className="flex items-center gap-6 text-[10px] sm:text-xs text-white font-semibold tracking-widest mt-1 md:mt-0">
            <span className="cursor-pointer hover:text-gray-300 transition">ONGOING</span>
            <span className="cursor-pointer hover:text-gray-300 transition">HANDED OVER</span>
            <span className="cursor-pointer hover:text-gray-300 transition">UPCOMING</span>
            <span className="cursor-pointer hover:text-gray-300 transition">READY</span>
          </div>
        </div>
      </div>
    </section>
  );
}
