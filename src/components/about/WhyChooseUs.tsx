"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Sparkles, ShieldCheck, Star } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const features = [
  {
    title: "Trusted Corporate Brand",
    detail: "Decades of proven integrity and verified reliability.",
  },
  {
    title: "Sustainable Scalable Growth",
    detail: "Responsible expansion creating multi-generational value.",
  },
  {
    title: "Innovation-Driven Solutions",
    detail: "Modern technologies and forward-looking business strategies.",
  },
  {
    title: "Seasoned Executive Leadership",
    detail: "Guided by veteran industry leaders and subject-matter experts.",
  },
  {
    title: "Uncompromising Quality",
    detail: "Gold standard execution across all products and deliverables.",
  },
  {
    title: "Diversified Portfolio",
    detail: "Robust synergy across real estate, tech, commerce & tourism.",
  },
  {
    title: "Customer-First Philosophy",
    detail: "Deep commitment to client delight and transparent communication.",
  },
  {
    title: "Enduring Global Partnerships",
    detail:
      "Strategic alliances with premier national & international entities.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative fanam-section bg-gradient-to-b from-neutral-50/50 via-white to-neutral-50/50 overflow-hidden py-20 lg:py-28">
      {/* Background blurs */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-[#f9c602]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="fanam-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Side: Modern Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full max-w-[460px] mx-auto h-[440px] sm:h-[480px]">
              {/* Main Background Image */}
              <div className="absolute top-0 right-0 w-[88%] h-[80%] rounded-[2.5rem] overflow-hidden shadow-lg border-2 border-white group">
                <Image
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop"
                  alt="Corporate Innovation"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Overlapping Bottom Image */}
              <div className="absolute bottom-0 left-0 w-[68%] h-[50%] rounded-[2rem] overflow-hidden border-[6px] border-white shadow-2xl z-10 group">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
                  alt="Team Collaboration"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Floating Experience Badge (Luxury Gold & Dark Badge) */}
              <div className="absolute top-12 -left-2 sm:-left-6 bg-[#392f5f] text-white border-2 border-[#f9c602]/50 p-5 rounded-2xl shadow-2xl z-20 flex flex-col items-center text-center">
                <div className="flex items-center gap-1 mb-2 text-[#f9c602]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#f9c602]" />
                  ))}
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#f9c602] tracking-tight leading-none mb-1">
                  25+
                </h3>
                <p className="text-[11px] font-bold uppercase tracking-wider text-white">
                  Years Of
                </p>
                <p className="text-[11px] font-medium text-white/70">
                  Excellence & Trust
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Text & Feature Cards Grid */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="mb-6">
              <SectionLabel>WHY CHOOSE US</SectionLabel>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#392f5f] leading-[1.2] tracking-tight mb-6">
              The Strategic Advantage of{" "}
              <span className="relative whitespace-nowrap text-[#392f5f]">
                Fanam Group
                <span className="absolute left-0 -bottom-1 w-full h-1 bg-[#f9c602] rounded-full" />
              </span>
            </h2>

            <p className="text-gray-600 text-base md:text-lg font-normal leading-relaxed mb-8">
              We combine visionary foresight, technical agility, and unwavering
              integrity to deliver unparalleled value across our diverse
              portfolio. Our commitment to excellence makes us the trusted
              partner of choice for institutional clients, investors, and
              communities.
            </p>

            {/* 8 Feature Cards (Grid 2x4) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="group p-3.5 rounded-2xl bg-white border border-gray-100 hover:border-[#f9c602]/60 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-3.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#f9c602] text-[#392f5f] flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_12px_rgba(249,198,2,0.35)] group-hover:scale-105 transition-transform duration-300">
                    <CheckCircle2
                      className="w-4 h-4 text-[#392f5f]"
                      strokeWidth={2.5}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#392f5f] mb-0.5 group-hover:text-black">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed font-medium">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
