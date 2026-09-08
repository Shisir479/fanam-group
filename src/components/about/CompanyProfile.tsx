"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Building2, Sparkles, Globe2, ShieldCheck } from "lucide-react";

export function CompanyProfile({ data }: { data: any }) {
  if (!data) return null;

  const features = [
    {
      title: "Sustainable Long-Term Value",
      desc: "Creating lasting value for customers, partners, dedicated employees, and national communities.",
    },
    {
      title: "Forward-Thinking Innovation",
      desc: "Driving progress through modern engineering, digital solutions, and continuous enhancement.",
    },
    {
      title: "Uncompromising Quality & Trust",
      desc: "Delivering world-class standards, radical transparency, and remarkable customer experiences.",
    },
    {
      title: "Diversified Industry Presence",
      desc: "Operating strategically across Real Estate, E-Commerce, Tourism, Media & Technology.",
    },
    {
      title: "Ethical Governance & Stewardship",
      desc: "Building enduring institutional relationships grounded in integrity and societal respect.",
    },
  ];

  return (
    <section className="relative fanam-section bg-gradient-to-b from-white via-neutral-50/60 to-white overflow-hidden py-20 lg:py-28">
      {/* Ambient background lighting */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-[#f9c602]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="fanam-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Prominent Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f9c602]/15 border border-[#f9c602]/35 text-[#392f5f] text-xs font-bold uppercase tracking-wider mb-6 self-start shadow-sm">
              <Building2 className="w-3.5 h-3.5 text-[#392f5f]" />
              <span>Company Profile</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#392f5f] leading-[1.18] tracking-tight mb-6">
              Shaping the Future with{" "}
              <span className="relative whitespace-nowrap text-[#392f5f]">
                Vision & Integrity
                <span className="absolute left-0 -bottom-1 w-full h-1 bg-[#f9c602] rounded-full" />
              </span>
            </h2>

            {/* Narrative text */}
            <p className="text-gray-700 text-base md:text-[16px] font-normal leading-relaxed mb-8">
              Fanam Group is a diversified corporate conglomerate committed to shaping
              the future through innovation, integrity, and operational excellence. With a
              growing footprint spanning Real Estate, E-Commerce, Travel & Tourism, Media,
              and emerging industries, we deliver high-value solutions that build enduring
              legacies and empower communities across Bangladesh and beyond.
            </p>

            {/* Feature List Cards */}
            <div className="flex flex-col gap-3.5">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-4 p-3.5 rounded-2xl bg-white border border-gray-100 hover:border-[#f9c602]/50 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-7 h-7 rounded-xl bg-[#f9c602] text-[#392f5f] flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_12px_rgba(249,198,2,0.35)] group-hover:scale-105 transition-transform duration-300">
                    <CheckCircle2 className="w-4 h-4 text-[#392f5f]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-[#392f5f] mb-0.5 group-hover:text-black transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-xs md:text-[13px] leading-relaxed font-medium">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Composition (Luxury Bento Grid) */}
          <div className="lg:col-span-6 relative">
            {/* Bento Grid */}
            <div className="grid grid-cols-12 gap-4">
              {/* Image 1 */}
              <div className="col-span-5 relative h-48 sm:h-56 rounded-3xl overflow-hidden shadow-md border-2 border-white group">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                  alt="Corporate Strategy"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Image 2 */}
              <div className="col-span-7 relative h-48 sm:h-56 rounded-3xl overflow-hidden shadow-md border-2 border-white group">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                  alt="Executive Team"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Image 3 */}
              <div className="col-span-7 relative h-52 sm:h-60 rounded-3xl overflow-hidden shadow-md border-2 border-white group">
                <Image
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop"
                  alt="Global Innovation"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Image 4 */}
              <div className="col-span-5 relative h-52 sm:h-60 rounded-3xl overflow-hidden shadow-md border-2 border-white group">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                  alt="Enterprise Meeting"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating Luxury Impact Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#392f5f]/90 backdrop-blur-md border border-[#f9c602]/40 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 z-20 pointer-events-none">
              <div className="w-12 h-12 rounded-xl bg-[#f9c602] flex items-center justify-center text-[#392f5f] shadow-[0_0_20px_rgba(249,198,2,0.5)]">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-[#f9c602] font-semibold">
                  Gold Standard
                </p>
                <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Excellence Across Sectors
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
