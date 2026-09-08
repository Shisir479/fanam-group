"use client";

import React from "react";
import Image from "next/image";
import { Users2, Sparkles } from "lucide-react";

const executives = [
  {
    designation: "Managing Director & CEO",
    name: "Mohammad Arif Hossain",
    bio: "Guiding enterprise strategy with vision, corporate integrity, and a commitment to sustainable multi-sector growth.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
    department: "Executive Management",
  },
  {
    designation: "Chief Operating Officer (COO)",
    name: "Md. Rakibul Hasan",
    bio: "Ensuring operational agility, supply chain excellence, and world-class project delivery across all concerns.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
    department: "Operations & Logistics",
  },
  {
    designation: "Chief Financial Officer (CFO)",
    name: "Nusrat Jahan",
    bio: "Championing fiscal discipline, capital allocation, and strategic partnerships for long-term stakeholder value.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    department: "Finance & Treasury",
  },
  {
    designation: "Chief Technology Officer (CTO)",
    name: "Engr. Kamrul Islam",
    bio: "Pioneering technological advancement, digital platforms, and tech-driven modernization across the group.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
    department: "Technology & Innovation",
  },
];

export function ManagingDirectors() {
  return (
    <section className="relative fanam-section bg-gradient-to-b from-neutral-50/50 via-white to-neutral-50/50 overflow-hidden py-20 lg:py-28">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#f9c602]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="fanam-container relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f9c602]/15 border border-[#f9c602]/35 text-[#392f5f] text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
            <Users2 className="w-3.5 h-3.5 text-[#392f5f]" />
            <span>Executive Leadership</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#392f5f] leading-[1.2] tracking-tight mb-5">
            Visionary Leaders Driving{" "}
            <span className="relative whitespace-nowrap text-[#392f5f]">
              Progress
              <span className="absolute left-0 -bottom-1 w-full h-1 bg-[#f9c602] rounded-full" />
            </span>
          </h2>

          <p className="text-gray-600 text-base md:text-lg font-normal leading-relaxed max-w-3xl mx-auto">
            Our experienced leadership brings decades of collective industry expertise,
            driving operational excellence, customer satisfaction, and ethical stewardship
            across every business sector of Fanam Group.
          </p>
        </div>

        {/* Executive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {executives.map((exec, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 hover:border-[#f9c602]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center transform hover:-translate-y-2"
            >
              {/* Top Gold Accent Bar */}
              <div className="w-12 h-1 bg-[#f9c602] rounded-full mb-6 group-hover:w-20 transition-all duration-300" />

              {/* Portrait Container */}
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden mb-6 ring-4 ring-gray-100 group-hover:ring-[#f9c602]/30 shadow-md transition-all duration-300">
                <Image
                  src={exec.image}
                  alt={exec.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Designation Pill */}
              <span className="inline-block px-3 py-1 rounded-full bg-[#f9c602]/15 text-[#392f5f] text-[11px] font-bold uppercase tracking-wider mb-2">
                {exec.designation}
              </span>

              {/* Executive Name */}
              <h3 className="text-lg font-bold text-[#392f5f] mb-2 tracking-tight group-hover:text-black">
                {exec.name}
              </h3>

              {/* Bio Description */}
              <p className="text-gray-600 text-[13px] leading-relaxed font-medium mb-6 flex-1">
                {exec.bio}
              </p>

              {/* Department Tag */}
              <div className="w-full pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                <span>{exec.department}</span>
                <span className="w-2 h-2 rounded-full bg-[#f9c602]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
