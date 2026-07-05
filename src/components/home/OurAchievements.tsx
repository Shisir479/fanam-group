"use client";

import { useEffect, useState, useRef } from "react";
import { BlockReveal } from "@/components/ui/BlockReveal";

const achievements = [
  { value: "50+", label: "Completed Projects" },
  { value: "2000+", label: "Happy Families" },
  { value: "15+", label: "Years of Excellence" },
  { value: "100%", label: "On-time Delivery" },
];

export function OurAchievements() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 bg-[#003B6D] overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541888081622-3866113ccf3a?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-fixed"></div>

      <div className="absolute inset-0 bg-[#003B6D]/80 z-0"></div>

      <div className="container mx-auto px-5 md:px-16 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <BlockReveal color="#ffffff">
            <div className="text-[16px] font-semibold tracking-[0.2em] text-gray-300 uppercase mb-4">
              Our Legacy
            </div>
          </BlockReveal>

          <BlockReveal color="#ffffff" delay={0.2}>
            <h2 className="text-2xl md:text-[34px] font-bold text-white leading-[1.2] uppercase tracking-wider">
              Our Achievements
            </h2>
          </BlockReveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x-0 md:divide-x divide-white/20">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center transform transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${idx * 200}ms` }}
            >
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-4 tracking-tighter">
                {item.value}
              </div>
              <div className="text-xs md:text-sm font-bold text-gray-300 uppercase tracking-widest text-center">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
