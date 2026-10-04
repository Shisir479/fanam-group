"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Medal,
  Lightbulb,
  Target,
  Leaf,
  Users,
} from "lucide-react";

const coreValues = [
  {
    num: "01",
    title: "Integrity",
    desc: "We build trust through honesty, transparency and accountability in every relationship.",
    icon: <ShieldCheck strokeWidth={1.5} />,
  },
  {
    num: "02",
    title: "Excellence",
    desc: "We pursue quality and continuous improvement in everything we do, every day.",
    icon: <Medal strokeWidth={1.5} />,
  },
  {
    num: "03",
    title: "Innovation",
    desc: "We embrace new ideas, technology and opportunities to shape the future of business.",
    icon: <Lightbulb strokeWidth={1.5} />,
  },
  {
    num: "04",
    title: "Customer Focus",
    desc: "We create meaningful value by understanding and exceeding customer expectations.",
    icon: <Target strokeWidth={1.5} />,
  },
  {
    num: "05",
    title: "Responsibility",
    desc: "We grow responsibly and contribute positively to people, communities and the environment.",
    icon: <Leaf strokeWidth={1.5} />,
  },
  {
    num: "06",
    title: "Collaboration",
    desc: "We achieve more through teamwork, partnerships and shared success across all we do.",
    icon: <Users strokeWidth={1.5} />,
  },
];

export function CoreValues({ data }: { data: any }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="relative fanam-section bg-white overflow-hidden py-16 lg:py-20">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f9c602]/5 rounded-l-[100px] blur-3xl -z-10" />

      <div className="fanam-container relative z-10 max-w-[1400px] mx-auto">
        {/* Header (Left Aligned for modern look) */}
        <div className="mb-10 lg:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[#F9C602] font-bold text-xs sm:text-sm tracking-widest uppercase mb-4">
              <span className="flex tracking-tighter">
                <span>&lt;</span>
                <span>&lt;</span>
                <span>&lt;</span>
              </span>
              <span>CORE VALUES</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#392f5f] leading-[1.1] mb-5">
              What We Stand For
            </h2>

            <p className="text-gray-500 text-[15px] sm:text-base font-medium leading-relaxed">
              Our six core values are not aspirations — they are the operating
              principles that guide every decision, every partnership, and every
              business we build.
            </p>
          </div>
        </div>

        {/* The Interactive Accordion */}
        <div className="flex flex-col lg:flex-row w-full gap-3 lg:gap-4 lg:h-[400px]">
          {coreValues.map((val, idx) => {
            const isActive = activeIdx === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
                className={`relative rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer border
                  ${
                    isActive
                      ? "lg:flex-[3.5] bg-[#392f5f] border-[#392f5f] shadow-[0_20px_50px_rgba(57,47,95,0.25)] h-[220px] lg:h-full"
                      : "lg:flex-1 bg-gray-50 border-[#392f5f]/10 hover:border-[#392f5f]/40 hover:bg-gray-100 h-[76px] lg:h-full"
                  }
                `}
              >
                {/* --- MOBILE CONTENT LAYOUT --- */}
                <div className="lg:hidden absolute inset-0 p-5 flex flex-col">
                  {/* Always visible header row */}
                  <div className="flex items-center gap-4 z-10 relative">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-500 ${isActive ? "bg-[#f9c602]" : "bg-white border border-gray-200"}`}
                    >
                      {React.cloneElement(val.icon as React.ReactElement<any>, {
                        className: `w-5 h-5 transition-colors duration-500 ${isActive ? "text-[#392f5f]" : "text-gray-500"}`,
                      })}
                    </div>
                    <h3
                      className={`font-heading font-bold text-lg transition-colors duration-500 ${isActive ? "text-white" : "text-[#392f5f]"}`}
                    >
                      {val.title}
                    </h3>
                  </div>

                  {/* Expanding Description */}
                  <div
                    className={`mt-auto transition-all duration-700 delay-100 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
                  >
                    <p className="text-gray-300 text-[14px] leading-relaxed">
                      {val.desc}
                    </p>
                  </div>

                  {/* Giant Number Background */}
                  {isActive && (
                    <span className="absolute bottom-1 right-3 text-6xl font-black text-white/5 z-0 select-none">
                      {val.num}
                    </span>
                  )}
                </div>

                {/* --- DESKTOP CONTENT LAYOUT --- */}
                <div className="hidden lg:flex absolute inset-0 p-6 flex-col justify-between w-full h-full">
                  {/* Top Section */}
                  <div
                    className={`flex w-full ${isActive ? "justify-between" : "justify-center"} items-start relative z-10`}
                  >
                    <div
                      className={`rounded-xl flex items-center justify-center shrink-0 transition-all duration-700 
                      ${isActive ? "w-14 h-14 bg-[#f9c602]" : "w-12 h-12 bg-white border border-gray-200"}
                    `}
                    >
                      {React.cloneElement(val.icon as React.ReactElement<any>, {
                        className: `transition-colors duration-700 ${isActive ? "w-7 h-7 text-[#392f5f]" : "w-6 h-6 text-gray-400"}`,
                      })}
                    </div>

                    {/* Big Number (Active Only) */}
                    <div
                      className={`transition-all duration-700 ${isActive ? "opacity-100 transform-none" : "opacity-0 translate-x-8 absolute right-0"}`}
                    >
                      <span className="text-white/10 font-bold text-5xl font-mono leading-none mt-1">
                        {val.num}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex-1 flex flex-col justify-end relative z-10">
                    {/* Inactive Vertical Title */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 flex justify-center transition-all duration-500 ${isActive ? "opacity-0 pointer-events-none" : "opacity-100 delay-200"}`}
                    >
                      <h3
                        className={`font-heading text-gray-500 group-hover:text-[#392f5f] font-bold text-2xl tracking-widest whitespace-nowrap transition-colors duration-300`}
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                        }}
                      >
                        {val.title}
                      </h3>
                    </div>

                    {/* Active Content */}
                    <div
                      className={`transition-all duration-700 transform w-full max-w-[280px] ${isActive ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-8 absolute bottom-0 pointer-events-none"}`}
                    >
                      <h3 className="font-heading text-white font-bold text-3xl mb-3">
                        {val.title}
                      </h3>
                      <p className="text-gray-300 text-[15px] leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  </div>

                  {/* Decorative huge background number for active state */}
                  {isActive && (
                    <span className="absolute -bottom-6 right-2 text-[150px] font-black text-white/5 z-0 select-none leading-none pointer-events-none">
                      {val.num}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
