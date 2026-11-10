"use client";

import React from "react";
import Image from "next/image";
import { Medal } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const awards = [
  {
    title: "National Business Leadership Award",
    category: "Corporate Governance",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Corporate Excellence Award",
    category: "Multi-Sector Development",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Industry Pioneer of the Year",
    category: "Real Estate & Commerce",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1561489396-888724a1543d?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Outstanding Employer Recognition",
    category: "Workplace & Culture",
    year: "2022",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Sustainable Growth Honor",
    category: "Green Enterprise",
    year: "2022",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Digital Innovation Trophy",
    category: "Enterprise Tech",
    year: "2021",
    image:
      "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=800&auto=format&fit=crop",
  },
];

export function AwardsRecognition() {
  return (
    <section className="relative fanam-section bg-gradient-to-b from-white via-neutral-50/60 to-white overflow-hidden py-20 lg:py-28">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-[#f9c602]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="fanam-container relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
          <div className="mb-6">
            <SectionLabel>AWARDS &amp; RECOGNITION</SectionLabel>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#392f5f] leading-[1.2] tracking-tight mb-5">
            Honored for Industry{" "}
            <span className="relative whitespace-nowrap text-[#392f5f]">
              Leadership
              <span className="absolute left-0 -bottom-1 w-full h-1 bg-[#f9c602] rounded-full" />
            </span>
          </h2>

          <p className="text-gray-600 text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
            Honored by respected industry bodies and international institutions,
            these accolades stand testament to our unwavering standard of
            craftsmanship and ethical excellence.
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award, idx) => (
            <div
              key={idx}
              className="group relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#f9c602]/80 transform hover:-translate-y-2 cursor-pointer bg-neutral-900"
            >
              {/* Background Award Image */}
              <Image
                src={award.image}
                alt={award.title}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-85 group-hover:opacity-95"
              />

              {/* Gradient Shade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 group-hover:from-black/90 transition-all duration-300" />

              {/* Floating Top Year Badge */}
              <div className="absolute top-4 right-4 z-20">
                <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#f9c602]/40 text-[#f9c602] shadow-sm">
                  {award.year}
                </span>
              </div>

              {/* Bottom Award Content */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="flex items-center gap-2 mb-2 text-[#f9c602] text-xs font-semibold uppercase tracking-wider">
                  <Medal className="w-4 h-4" />
                  <span>{award.category}</span>
                </div>

                <h3 className="text-xl font-serif font-bold text-white leading-snug group-hover:text-[#f9c602] transition-colors duration-300">
                  {award.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
