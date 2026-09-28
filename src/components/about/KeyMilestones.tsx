"use client";

import React from "react";
import {
  Building2,
  Handshake,
  Users,
  TrendingUp,
  Globe,
  Sparkles,
} from "lucide-react";

const milestones = [
  {
    icon: <Building2 className="w-8 h-8 text-[#392f5f]" strokeWidth={2} />,
    stat: "25+",
    title: "Years of Excellence",
    subtitle: "Pioneering institutional heritage",
  },
  {
    icon: <Handshake className="w-8 h-8 text-[#392f5f]" strokeWidth={2} />,
    stat: "10+",
    title: "Business Ventures",
    subtitle: "Active enterprise concerns",
  },
  {
    icon: <Users className="w-8 h-8 text-[#392f5f]" strokeWidth={2} />,
    stat: "5,000+",
    title: "Dedicated Team",
    subtitle: "Professionals & specialists",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-[#392f5f]" strokeWidth={2} />,
    stat: "1M+",
    title: "Happy Customers",
    subtitle: "Across diversified sectors",
  },
  {
    icon: <Globe className="w-8 h-8 text-[#392f5f]" strokeWidth={2} />,
    stat: "10+",
    title: "Global Reach",
    subtitle: "International markets & hubs",
  },
];

export function KeyMilestones() {
  return (
    <section className="relative fanam-section bg-[#392f5f] text-white overflow-hidden py-20 lg:py-28">
      {/* Ambient gold glow elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[350px] bg-[#f9c602]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="fanam-container relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f9c602]/15 border border-[#f9c602]/30 text-[#f9c602] text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Key Milestones</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-[1.2] tracking-tight mb-5">
            A Legacy of Impact, Measured in{" "}
            <span className="text-[#f9c602]">Numbers</span>
          </h2>

          <p className="text-white/70 text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
            Celebrating the defining milestones that reflect our journey of
            relentless innovation, operational scale, and trust across
            industries.
          </p>
        </div>

        {/* Milestones Grid (5 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {milestones.map((item, idx) => (
            <div
              key={idx}
              className="group relative p-6 sm:p-7 rounded-3xl bg-white/5 border border-white/10 hover:border-[#f9c602]/50 backdrop-blur-md transition-all duration-300 flex flex-col items-center text-center transform hover:-translate-y-2 hover:bg-white/[0.08]"
            >
              {/* Gold Icon Box */}
              <div className="w-16 h-16 rounded-2xl bg-[#f9c602] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(249,198,2,0.4)] group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              {/* Stat Number */}
              <h3 className="text-4xl lg:text-5xl font-extrabold text-[#f9c602] tracking-tight mb-2">
                {item.stat}
              </h3>

              {/* Title */}
              <h4 className="text-base font-bold text-white mb-1 tracking-tight">
                {item.title}
              </h4>

              {/* Subtitle */}
              <p className="text-white/60 text-xs font-medium">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
