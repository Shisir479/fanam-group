"use client";

import React from "react";
import { motion } from "framer-motion";

const defaultPartners = [
  {
    name: "TV TechVision",
    category: "Technology",
    short: "TV",
  },
  {
    name: "GV Global Ventures",
    category: "Investment",
    short: "GV",
  },
  {
    name: "HP Horizon Properties",
    category: "Real Estate",
    short: "HP",
  },
  {
    name: "IT InnovateTech",
    category: "Innovation",
    short: "IT",
  },
  {
    name: "FD Future Dynamics",
    category: "Strategy",
    short: "FD",
  },
  {
    name: "PH Prime Holdings",
    category: "Holdings",
    short: "PH",
  },
  {
    name: "AS Apex Solutions",
    category: "Solutions",
    short: "AS",
  },
  {
    name: "NG Nexus Group",
    category: "Group",
    short: "NG",
  },
];

interface Partner {
  name: string;
  category: string;
  short: string;
}

export function PartnersSection({
  cmsData,
}: {
  cmsData?: Record<string, unknown>;
}) {
  // Dynamic partners from CMS
  const cmsPartners = (cmsData?.partners || []) as Array<
    Record<string, unknown>
  >;
  const partners: Partner[] =
    cmsPartners.length > 0
      ? cmsPartners.map((partner: Record<string, unknown>) => ({
          name: (partner.name as string) || "",
          category: (partner.category as string) || "",
          short: (partner.short as string) || "",
        }))
      : defaultPartners;

  return (
    <section className="relative w-full py-20 md:py-28 bg-gradient-to-b from-[#EDE8F7] via-[#F3F0FA] to-white text-[#392F5F] overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #392F5F 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#f9c602]" />

      <div className="fanam-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#392F5F]/5 border border-[#392F5F]/10 text-[#392F5F] text-xs md:text-sm font-medium tracking-wide mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#f9c602]" />
            Strategic Partners
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#392F5F] font-serif font-bold text-3xl md:text-4xl mb-4 tracking-tight leading-tight"
          >
            Alliances of{" "}
            <span className="bg-gradient-to-r from-[#6B4E9E] to-[#F9C602] bg-clip-text text-transparent">
              Distinction
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#392F5F]/60 text-sm sm:text-base mt-5 leading-relaxed max-w-xl mx-auto"
          >
            Partnering with forward-thinking organizations across technology,
            investment, real estate, and strategic ventures to drive shared
            prosperity and innovation.
          </motion.p>
        </div>

        {/* Partners Grid - Clean Corporate Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {partners.map((partner, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="group relative p-6 rounded-2xl bg-white border border-[#392F5F]/10 hover:border-[#f9c602]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] flex flex-col items-center text-center"
            >
              {/* Logo/Initials Badge */}
              <div className="w-14 h-14 rounded-xl bg-[#392F5F]/5 group-hover:bg-[#f9c602]/15 border border-[#392F5F]/10 group-hover:border-[#f9c602]/30 flex items-center justify-center transition-all duration-300 mb-4">
                <span className="font-serif font-bold text-lg text-[#392F5F] group-hover:text-[#f9c602] transition-colors duration-300">
                  {partner.short}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-serif font-bold text-[#392F5F] text-base group-hover:text-[#f9c602] transition-colors duration-300 mb-1">
                {partner.name}
              </h3>
              <span className="text-[11px] font-medium text-[#392F5F]/50 uppercase tracking-wider">
                {partner.category}
              </span>

              {/* Subtle bottom accent */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#f9c602] group-hover:w-12 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
