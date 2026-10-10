"use client";

import React, { useEffect, useState, useRef } from "react";
import { Target, Eye, Rocket } from "lucide-react";

export function VisionMission({ data }: { data: any }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative fanam-section bg-gray-50 py-16 lg:py-24 overflow-hidden"
    >
      {/* Custom CSS for Tree Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .tree-line-v { height: 0; transition: height 0.3s ease-out; }
        .tree-active .tree-line-v { height: 100%; }
        
        .tree-line-h-left { transform: scaleX(0); transform-origin: right; transition: transform 0.25s ease-out 0.3s; }
        .tree-active .tree-line-h-left { transform: scaleX(1); }

        .tree-line-h-center { transform: scaleX(0); transform-origin: center; transition: transform 0.25s ease-out 0.3s; }
        .tree-active .tree-line-h-center { transform: scaleX(1); }

        .tree-line-h-right { transform: scaleX(0); transform-origin: left; transition: transform 0.25s ease-out 0.3s; }
        .tree-active .tree-line-h-right { transform: scaleX(1); }
        
        .tree-line-v-drop { height: 0; transition: height 0.25s ease-out 0.55s; }
        .tree-active .tree-line-v-drop { height: 100%; }
        
        .tree-card { opacity: 0; transform: translateY(40px); transition: all 0.4s ease-out; }
        
        .tree-active .card-1 { opacity: 1; transform: translateY(0); transition-delay: 0.8s; }
        .tree-active .card-2 { opacity: 1; transform: translateY(0); transition-delay: 0.95s; }
        .tree-active .card-3 { opacity: 1; transform: translateY(0); transition-delay: 1.1s; }
      `,
        }}
      />

      <div
        className={`fanam-container relative z-10 max-w-6xl mx-auto ${isVisible ? "tree-active" : ""}`}
      >
        {/* Top Block: Title Box */}
        <div className="flex justify-center relative z-20">
          <div className="bg-white border-2 border-[#392f5f] rounded-full py-2 px-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] relative">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#392f5f] tracking-widest uppercase text-center">
              Our Purpose
            </h2>
          </div>
        </div>

        {/* Tree Connecting Lines (Hidden on mobile) */}
        <div className="hidden md:flex flex-col items-center w-full relative z-10">
          {/* Main vertical trunk */}
          <div className="h-12 w-full flex justify-center">
            <div className="w-[2px] bg-[#392f5f] tree-line-v" />
          </div>

          {/* Horizontal branches & vertical drops perfectly mapped to 3 columns */}
          <div className="grid grid-cols-3 w-full h-10">
            {/* Col 1 Lines */}
            <div className="w-full relative">
              <div className="w-1/2 h-[2px] bg-[#392f5f] tree-line-h-left absolute right-0 top-0" />
              <div className="w-[2px] bg-[#392f5f] tree-line-v-drop absolute left-1/2 top-0 -translate-x-1/2" />
            </div>
            {/* Col 2 Lines */}
            <div className="w-full relative">
              <div className="w-full h-[2px] bg-[#392f5f] tree-line-h-center absolute left-0 top-0" />
              <div className="w-[2px] bg-[#392f5f] tree-line-v-drop absolute left-1/2 top-0 -translate-x-1/2" />
            </div>
            {/* Col 3 Lines */}
            <div className="w-full relative">
              <div className="w-1/2 h-[2px] bg-[#392f5f] tree-line-h-right absolute left-0 top-0" />
              <div className="w-[2px] bg-[#392f5f] tree-line-v-drop absolute left-1/2 top-0 -translate-x-1/2" />
            </div>
          </div>
        </div>

        {/* The 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 mt-8 md:mt-0 relative z-20">
          {/* Mission */}
          <div className="px-4 lg:px-6 flex flex-col items-center tree-card card-1 group mt-8 md:mt-0">
            {/* Icon Circle */}
            <div className="w-20 h-20 rounded-full bg-white shadow-xl flex items-center justify-center relative z-10 -mb-10 transition-transform duration-300">
              <div className="w-14 h-14 rounded-full border border-[#f9c602] flex items-center justify-center">
                <Target className="w-6 h-6 text-[#392f5f]" />
              </div>
            </div>

            {/* Banner Body */}
            <div
              className="w-full bg-gradient-to-b from-[#F9C602] to-[#e6b600] pt-20 pb-16 px-6 sm:px-8 text-center shadow-lg relative"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% calc(100% - 2rem), 50% 100%, 0 calc(100% - 2rem))",
              }}
            >
              <h3 className="font-heading text-[#392f5f] text-2xl font-bold uppercase tracking-widest mb-4">
                Mission
              </h3>
              <h4 className="text-[#392f5f] font-bold text-[15px] mb-3 leading-snug">
                Building Sustainable Businesses
              </h4>
              <p className="text-[#392f5f]/80 text-sm font-medium leading-relaxed">
                To build sustainable businesses through innovation, excellence
                and responsible growth, creating lasting value for our
                stakeholders and society.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="px-4 lg:px-6 flex flex-col items-center tree-card card-2 group mt-8 md:mt-0">
            {/* Icon Circle */}
            <div className="w-20 h-20 rounded-full bg-white shadow-xl flex items-center justify-center relative z-10 -mb-10 transition-transform duration-300">
              <div className="w-14 h-14 rounded-full border border-[#f9c602] flex items-center justify-center">
                <Eye className="w-6 h-6 text-[#f9c602]" />
              </div>
            </div>

            {/* Banner Body */}
            <div
              className="w-full bg-gradient-to-b from-[#4a3d7a] to-[#392f5f] pt-20 pb-16 px-6 sm:px-8 text-center shadow-lg relative"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% calc(100% - 2rem), 50% 100%, 0 calc(100% - 2rem))",
              }}
            >
              <h3 className="font-heading text-white text-2xl font-bold uppercase tracking-widest mb-4">
                Vision
              </h3>
              <h4 className="text-[#f9c602] font-bold text-[15px] mb-3 leading-snug">
                A Globally Respected Group
              </h4>
              <p className="text-white/80 text-sm font-medium leading-relaxed">
                To become a globally respected and diversified business group,
                originating from Bangladesh and creating sustainable value
                across industries and markets.
              </p>
            </div>
          </div>

          {/* Ambition / Values */}
          <div className="px-4 lg:px-6 flex flex-col items-center tree-card card-3 group mt-8 md:mt-0">
            {/* Icon Circle */}
            <div className="w-20 h-20 rounded-full bg-white shadow-xl flex items-center justify-center relative z-10 -mb-10 transition-transform duration-300">
              <div className="w-14 h-14 rounded-full border border-[#f9c602] flex items-center justify-center">
                <Rocket className="w-6 h-6 text-[#392f5f]" />
              </div>
            </div>

            {/* Banner Body */}
            <div
              className="w-full bg-gradient-to-b from-[#2a2245] to-[#1a142c] pt-20 pb-16 px-6 sm:px-8 text-center shadow-lg relative"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% calc(100% - 2rem), 50% 100%, 0 calc(100% - 2rem))",
              }}
            >
              <h3 className="font-heading text-white text-2xl font-bold uppercase tracking-widest mb-4">
                Ambition
              </h3>
              <h4 className="text-[#f9c602] font-bold text-[15px] mb-3 leading-snug">
                Future-Ready & Enduring
              </h4>
              <p className="text-white/80 text-sm font-medium leading-relaxed">
                To build strong, future-ready businesses that create lasting
                value and stand the test of time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
