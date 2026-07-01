"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface BlockRevealProps {
  children: React.ReactNode;
  color?: string;
  delay?: number;
  className?: string;
}

export function BlockReveal({
  children,
  color = "#003B6D",
  delay = 0,
  className = "",
}: BlockRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Using gsap.context ensures smooth cleanup in React 18+ strict mode
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%", // Trigger when it scrolls into view
          once: true,
        },
        delay: delay,
      });

      // Reset initial states
      gsap.set(contentRef.current, { opacity: 0 });
      gsap.set(blockRef.current, {
        scaleX: 0,
        transformOrigin: "left",
      });

      // The block reveal animation sequence
      tl.to(blockRef.current, {
        scaleX: 1,
        duration: 0.5,
        ease: "power3.inOut",
      })
        .set(contentRef.current, { opacity: 1 })
        .to(blockRef.current, {
          scaleX: 0,
          transformOrigin: "right",
          duration: 0.5,
          ease: "power3.inOut",
        });
    }, containerRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block self-start ${className}`}
    >
      {/* Content that gets revealed */}
      <div ref={contentRef} className="w-full h-full">
        {children}
      </div>

      {/* The solid block that sweeps across */}
      <div
        ref={blockRef}
        className="absolute inset-0 z-10"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
