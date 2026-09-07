"use client";

import React from "react";
import {
  ShieldCheck,
  Medal,
  Lightbulb,
  Target,
  Leaf,
  Users,
  Sparkles,
} from "lucide-react";

const coreValues = [
  {
    num: "01",
    title: "Radical Integrity",
    desc: "We uphold the highest ethical standards, ensuring transparent communication, accountability, and unwavering trust in every relationship.",
    icon: <ShieldCheck className="w-7 h-7 text-[#0a0a0a]" strokeWidth={2} />,
  },
  {
    num: "02",
    title: "Pursuit of Excellence",
    desc: "We set ambitious benchmarks and execute with meticulous precision, delivering superior quality across every product and enterprise.",
    icon: <Medal className="w-7 h-7 text-[#0a0a0a]" strokeWidth={2} />,
  },
  {
    num: "03",
    title: "Continuous Innovation",
    desc: "We embrace progressive thinking, agile methodologies, and technological modernization to lead industries and pioneer change.",
    icon: <Lightbulb className="w-7 h-7 text-[#0a0a0a]" strokeWidth={2} />,
  },
  {
    num: "04",
    title: "Customer Centricity",
    desc: "Our clients and partners are at the core of our vision; we build enduring value by actively listening and exceeding expectations.",
    icon: <Target className="w-7 h-7 text-[#0a0a0a]" strokeWidth={2} />,
  },
  {
    num: "05",
    title: "Environmental Sustainability",
    desc: "We balance economic advancement with ecological stewardship, prioritizing green practices that safeguard our planet for tomorrow.",
    icon: <Leaf className="w-7 h-7 text-[#0a0a0a]" strokeWidth={2} />,
  },
  {
    num: "06",
    title: "Empowered Teamwork",
    desc: "We foster an inclusive culture of mutual respect, shared purpose, and multidisciplinary collaboration to achieve great heights together.",
    icon: <Users className="w-7 h-7 text-[#0a0a0a]" strokeWidth={2} />,
  },
];

export function CoreValues({ data }: { data: any }) {
  return (
    <section className="relative fanam-section bg-gradient-to-b from-neutral-50/50 via-white to-neutral-50/50 overflow-hidden py-20 lg:py-28">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#f9c602]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="fanam-container relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f9c602]/15 border border-[#f9c602]/35 text-[#0a0a0a] text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#0a0a0a]" />
            <span>Our Core Values</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0a0a0a] leading-[1.2] tracking-tight mb-5">
            The Principles That Define{" "}
            <span className="relative whitespace-nowrap text-[#0a0a0a]">
              Our DNA
              <span className="absolute left-0 -bottom-1 w-full h-1 bg-[#f9c602] rounded-full" />
            </span>
          </h2>

          <p className="text-gray-600 text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
            Our core values guide every decision we make, inspire our collective culture,
            and guarantee unyielding integrity in all that we deliver.
          </p>
        </div>

        {/* 6 Executive Values Grid (3x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreValues.map((val, idx) => (
            <div
              key={idx}
              className="group relative p-8 rounded-3xl bg-white border border-gray-100 hover:border-[#f9c602]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-2"
            >
              <div>
                {/* Header Row with Icon and Roman/Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#f9c602] flex items-center justify-center shadow-[0_0_18px_rgba(249,198,2,0.35)] group-hover:scale-105 transition-transform duration-300">
                    {val.icon}
                  </div>
                  <span className="font-mono text-sm font-bold text-gray-400 group-hover:text-[#0a0a0a] transition-colors">
                    {val.num}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#0a0a0a] mb-3 tracking-tight group-hover:text-black">
                  {val.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed font-medium">
                  {val.desc}
                </p>
              </div>

              {/* Bottom Decorative Gold Line */}
              <div className="w-10 h-1 bg-gray-100 group-hover:w-full group-hover:bg-[#f9c602] rounded-full transition-all duration-500 mt-6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
