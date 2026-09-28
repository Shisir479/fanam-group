"use client";

import React from "react";
import Image from "next/image";
import {
  Heart,
  Droplets,
  BookOpen,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const csrInitiatives = [
  {
    id: 1,
    title: "Community Development",
    metric: "50,000+ Citizens Impacted",
    description:
      "Empowering underserved rural and urban communities through robust local infrastructure, clean water access, and sustainable livelihood generation programs.",
    icon: <Users className="w-6 h-6 text-[#392f5f]" />,
    image:
      "https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=1000&auto=format&fit=crop",
    category: "Social Empowerment",
  },
  {
    id: 2,
    title: "Environmental Sustainability",
    metric: "Green Zero-Waste Philosophy",
    description:
      "Implementing green energy solutions, eco-conscious construction practices, and aggressive reforestation to safeguard natural ecosystems for future generations.",
    icon: <Droplets className="w-6 h-6 text-[#392f5f]" />,
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop",
    category: "Ecological Action",
  },
  {
    id: 3,
    title: "Education & Healthcare Access",
    metric: "25+ Schools & Clinics Supported",
    description:
      "Investing in long-term human potential by providing merit scholarships, constructing modern learning centers, and offering free community medical camps.",
    icon: <BookOpen className="w-6 h-6 text-[#392f5f]" />,
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop",
    category: "Human Development",
  },
];

export function CSRActivities() {
  return (
    <section className="relative fanam-section bg-gradient-to-b from-neutral-50/50 via-white to-neutral-50/50 overflow-hidden py-20 lg:py-28">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#f9c602]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="fanam-container relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f9c602]/15 border border-[#f9c602]/35 text-[#392f5f] text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
            <Heart className="w-3.5 h-3.5 text-[#392f5f]" />
            <span>Social Responsibility</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#392f5f] leading-[1.2] tracking-tight mb-5">
            Empowering Communities, Enriching{" "}
            <span className="relative whitespace-nowrap text-[#392f5f]">
              Tomorrow
              <span className="absolute left-0 -bottom-1 w-full h-1 bg-[#f9c602] rounded-full" />
            </span>
          </h2>

          <p className="text-gray-600 text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
            At Fanam Group, our success is measured not merely by commercial
            milestones, but by the tangible, lasting upliftment we bring to
            people, education, and the environment.
          </p>
        </div>

        {/* 3 CSR Initiative Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {csrInitiatives.map((initiative) => (
            <div
              key={initiative.id}
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 min-h-[480px] flex flex-col justify-end border border-gray-100 transform hover:-translate-y-2"
            >
              {/* Image Background */}
              <div className="absolute inset-0 z-0 bg-neutral-900">
                <Image
                  src={initiative.image}
                  alt={initiative.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10" />
              </div>

              {/* Floating Category Pill */}
              <div className="absolute top-6 left-6 z-20">
                <span className="px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#f9c602] text-xs font-bold uppercase tracking-wider">
                  {initiative.category}
                </span>
              </div>

              {/* Content Panel */}
              <div className="relative z-20 p-8 flex flex-col justify-end">
                {/* Icon Box */}
                <div className="w-12 h-12 rounded-xl bg-[#f9c602] flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  {initiative.icon}
                </div>

                {/* Impact Metric */}
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold tracking-wide mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{initiative.metric}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-serif font-bold text-white mb-3 leading-snug">
                  {initiative.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed font-normal mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                  {initiative.description}
                </p>

                {/* Bottom Tag */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                  <span>Community Impact</span>
                  <span className="text-[#f9c602] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Active Program</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
