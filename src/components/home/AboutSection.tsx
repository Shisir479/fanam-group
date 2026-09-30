"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Award, Building2 } from "lucide-react";

const defaultHighlights = [
  {
    title: "Trusted Conglomerate",
    desc: "A beacon of excellence and trust in Bangladesh's business landscape.",
  },
  {
    title: "Multi-Sector Presence",
    desc: "Visionary leadership across Real Estate, E-Commerce, Trading & IT.",
  },
  {
    title: "Enduring Integrity",
    desc: "Long-term client & partner relationships built on radical transparency.",
  },
  {
    title: "Decade of Sustained Growth",
    desc: "Continuous expansion driven by high standards and innovation.",
  },
];

interface Highlight {
  title: string;
  desc: string;
}

export function AboutSection({
  cmsData,
  mainSettings,
}: {
  cmsData?: Record<string, unknown>;
  mainSettings?: Record<string, unknown>;
}) {
  // Dynamic highlights from CMS or main settings
  const cmsHighlights = (mainSettings?.highlights ||
    cmsData?.highlights ||
    []) as Array<Record<string, unknown>>;
  const highlights: Highlight[] =
    cmsHighlights.length > 0
      ? cmsHighlights.map((item: Record<string, unknown>, index: number) => ({
          title: (item.title as string) || "",
          desc: (item.desc as string) || (item.description as string) || "",
        }))
      : defaultHighlights;

  return (
    <section className="relative w-full bg-white py-28 md:py-40 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F9C602] rounded-full mb-8">
              <span className="text-[#392F5F] font-bold text-xs tracking-widest uppercase">
                Corporate Profile
              </span>
            </div>
            <h2 className="text-[#392F5F] font-serif font-bold text-3xl md:text-4xl lg:text-[44px] leading-[1.2] tracking-tight mb-6">
              Building Legacies, Driving Transformation.
            </h2>
            <p className="text-[#392F5F]/80 text-base md:text-[17px] leading-relaxed mb-8 max-w-lg">
              Starting as an ambitious real estate pioneer in 2018, Fanam Group
              has rapidly expanded into a diversified, multi-industry
              powerhouse united under one gold standard of uncompromising quality.
            </p>
            <Link
              href="/about"
              className="group inline-flex items-center gap-4 bg-[#392F5F] text-white hover:bg-[#F9C602] hover:text-[#392F5F] px-8 py-3.5 font-bold text-sm tracking-widest uppercase rounded-full transition-colors duration-300"
            >
              <span>Discover Our Heritage</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Large Clean Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-[400px] lg:h-[520px] bg-gray-100 rounded-3xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
              alt="Fanam Group Headquarters"
              fill
              className="object-cover rounded-3xl"
            />
            {/* Bold Overlapping Stat Block */}
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-[#F9C602] rounded-2xl p-5 md:p-6 shadow-2xl max-w-[180px]">
              <div className="text-3xl md:text-4xl font-serif font-bold text-[#392F5F] mb-1.5 leading-none">
                7+
              </div>
              <div className="text-[#392F5F] font-bold tracking-widest uppercase text-[10px] md:text-xs leading-snug">
                Years of Excellence & Growth
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
