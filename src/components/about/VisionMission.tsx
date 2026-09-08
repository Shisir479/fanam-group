"use client";

import React from "react";
import { Target, Lightbulb, Compass, Sparkles, ArrowUpRight } from "lucide-react";

export function VisionMission({ data }: { data: any }) {
  const missionItems = [
    {
      num: "01",
      title: "Delivering Excellence with Purpose",
      desc: "To provide high-quality products and services through innovation, integrity, and customer-focused solutions while fostering sustainable growth and long-term success.",
    },
    {
      title: "Creating Value Through Cross-Industry Excellence",
      num: "02",
      desc: "Our mission is to deliver exceptional experiences through quality, collaboration, and responsible business practices while driving continuous growth across every industry we serve.",
    },
    {
      title: "Growing Together Through Innovation and Trust",
      num: "03",
      desc: "To deliver exceptional products, services, and experiences by embracing innovation, maintaining the highest standards of integrity, and creating long-term value for our customers, employees, partners, and communities.",
    },
  ];

  const visionItems = [
    {
      num: "01",
      title: "Shaping a Better Future Through Innovation",
      desc: "To become a trusted and diversified corporate group by delivering innovative solutions, creating sustainable value, and making a positive impact on businesses, communities, and future generations.",
    },
    {
      title: "Leading with Innovation, Growing with Trust",
      num: "02",
      desc: "Our vision is to build a future where innovation, sustainability, and excellence create lasting value for customers, partners, and communities.",
    },
    {
      title: "Inspiring Progress, Creating Lasting Impact",
      num: "03",
      desc: "To be recognized as a leading corporate group that transforms industries through innovation, trusted partnerships, and sustainable business practices while creating a better future for generations to come.",
    },
  ];

  return (
    <section className="relative fanam-section bg-gradient-to-b from-white via-neutral-50/50 to-white overflow-hidden py-20 lg:py-28">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-48 w-[500px] h-[500px] bg-[#f9c602]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-[500px] h-[500px] bg-slate-900/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="fanam-container relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f9c602]/15 border border-[#f9c602]/35 text-[#392f5f] text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-[#392f5f]" />
            <span>Mission & Vision</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#392f5f] leading-[1.2] tracking-tight mb-5">
            Guided by Purpose,{" "}
            <span className="relative whitespace-nowrap text-[#392f5f]">
              Driven by Vision
              <span className="absolute left-0 -bottom-1 w-full h-1 bg-[#f9c602] rounded-full" />
            </span>
          </h2>

          <p className="text-gray-600 text-base md:text-lg font-normal leading-relaxed max-w-3xl mx-auto">
            Guided by a clear strategic vision and an uncompromising mission, we are
            committed to creating sustainable multi-industry growth, delivering excellence,
            and building lasting value for all stakeholders.
          </p>
        </div>

        {/* 2 Grand Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Mission Card (High-Impact Dark Luxury) */}
          <div className="relative rounded-3xl bg-[#392f5f] text-white p-8 sm:p-10 md:p-12 border border-white/15 shadow-2xl overflow-hidden flex flex-col justify-between group">
            {/* Ambient gold glow in card */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#f9c602]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#f9c602]/25 transition-all duration-700" />

            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#f9c602] text-[#392f5f] flex items-center justify-center shadow-[0_0_25px_rgba(249,198,2,0.4)]">
                    <Target className="w-7 h-7" strokeWidth={2.2} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#f9c602] uppercase tracking-widest font-semibold block mb-0.5">
                      Strategic Commitment
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                      Our Mission
                    </h3>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#f9c602]" />
                  <span>Action Driven</span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-6">
                {missionItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#f9c602]/40 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <span className="w-9 h-9 rounded-xl bg-[#f9c602]/20 border border-[#f9c602]/40 text-[#f9c602] font-mono text-sm font-bold flex items-center justify-center shrink-0">
                        {item.num}
                      </span>
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-white mb-1.5 leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Footer Tag */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
              <span>Fanam Group Corporate Core</span>
              <span className="text-[#f9c602] font-semibold">Excellence Guaranteed</span>
            </div>
          </div>

          {/* Vision Card (Crisp Alabaster & Gold Luxury) */}
          <div className="relative rounded-3xl bg-white text-slate-900 p-8 sm:p-10 md:p-12 border-2 border-gray-100 hover:border-[#f9c602]/60 shadow-xl overflow-hidden flex flex-col justify-between group transition-all duration-300">
            {/* Ambient gold glow in card */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-100/50 rounded-full blur-3xl pointer-events-none group-hover:bg-[#f9c602]/20 transition-all duration-700" />

            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#392f5f] text-[#f9c602] flex items-center justify-center shadow-lg">
                    <Lightbulb className="w-7 h-7" strokeWidth={2.2} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest font-semibold block mb-0.5">
                      Long-Term Horizon
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#392f5f]">
                      Our Vision
                    </h3>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#392f5f]" />
                  <span>Future Focused</span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-6">
                {visionItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-neutral-50 border border-gray-100 hover:border-[#f9c602]/60 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <span className="w-9 h-9 rounded-xl bg-[#392f5f] text-[#f9c602] font-mono text-sm font-bold flex items-center justify-center shrink-0">
                        {item.num}
                      </span>
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-[#392f5f] mb-1.5 leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-medium">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Footer Tag */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
              <span>National & Global Reach</span>
              <span className="text-[#392f5f] font-bold">Horizon 2030 & Beyond</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
