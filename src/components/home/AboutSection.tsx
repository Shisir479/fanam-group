"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Building2,
  Globe,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const YELLOW = "#F9C602";
const DARK = "#06202A";

type AboutSummary = {
  companyHeading?: string;
  companyDescription?: string;
  companyImage?: { url?: string };
  heroImage?: { url?: string };
  experience?: number;
  timeline?: Array<{ year?: string }>;
  departments?: Array<unknown>;
};

export function AboutSection({
  cmsData,
  mainSettings,
  aboutData,
}: {
  cmsData?: Record<string, unknown>;
  mainSettings?: Record<string, unknown>;
  aboutData?: AboutSummary | null;
}) {
  const about = aboutData || {};
  const foundedYear = about.timeline?.[0]?.year || "2017";
  const sectorCount = about.departments?.length || 0;

  return (
    <section className="relative w-full bg-white py-12 md:py-18 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          {/* ───────── Left: geometric triangles ───────── */}
          <div className="relative w-full max-w-[540px] mx-auto aspect-[1.15] lg:ml-auto">
            {/* Pale beige wedge behind the images */}
            <div
              className="absolute left-[47%] top-[40%] w-[52%] h-[50%] bg-[#F6F5F2] z-0"
              style={{
                clipPath: "polygon(0 100%, 100% 0, 100% 22%, 25% 100%)",
              }}
            />

            {/* Small yellow triangle (points right) */}
            <motion.div
              animate={{
                rotate: [0, 180, 0],
                opacity: [0.4, 1, 0.4],
                scale: [0.85, 1.1, 0.85],
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute left-[19%] top-[35%] w-[12%] h-[15%] z-10 origin-center"
              style={{
                background: YELLOW,
                clipPath: "polygon(0 0, 100% 50%, 0 100%)",
              }}
            />

            {/* Top image triangle (points right) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="absolute left-[52%] top-[5%] w-[47%] h-[75%] z-10"
              style={{ clipPath: "polygon(0 0, 0 100%, 100% 50%)" }}
            >
              <Image
                src={about.companyImage?.url || "/about-us-image-new.png"}
                alt="Fanam Group team collaborating on a project"
                fill
                sizes="300px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#9fc4cf]/25 mix-blend-multiply" />
            </motion.div>

            {/* Bottom image triangle (points left) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute left-0 top-[38%] w-[48%] h-[60%] z-20"
              style={{ clipPath: "polygon(100% 0, 100% 100%, 0 50%)" }}
            >
              <Image
                src={about.heroImage?.url || "/about-us-image.png"}
                alt="Fanam Group team shaping the future together"
                fill
                sizes="300px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#9fc4cf]/25 mix-blend-multiply" />
            </motion.div>

            {/* Big yellow triangle (bottom left, points right, transparent overlay) */}
            <motion.div
              animate={{ x: [0, 40, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute left-21 top-[60%] w-[25%] h-[35%] z-30 mix-blend-multiply opacity-90"
              style={{
                background: YELLOW,
                clipPath: "polygon(0 0, 0 100%, 100% 50%)",
              }}
            />
          </div>

          {/* ───────── Right: content ───────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col max-w-[520px]"
          >
            {/* Eyebrow */}
            <div className="mb-3">
              <SectionLabel>ABOUT US</SectionLabel>
            </div>

            {/* Heading */}
            <h2
              className="font-bold text-3xl md:text-4xl mb-4"
              style={{
                color: "#392F5F",
                lineHeight: "normal",
                paddingBottom: "0.2em",
              }}
            >
              {about.companyHeading || "Building Businesses. Creating Value. Shaping Tomorrow."}
            </h2>

            <p className="text-gray-500 text-base md:text-lg leading-relaxed text-justify mb-8">
              {about.companyDescription ||
                "Learn more about Fanam Group, our businesses, and the value we create for our stakeholders."}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10 border-t border-gray-100 pt-8">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#392F5F]" />
                  <span className="text-2xl font-bold text-[#F9C602]">
                    {foundedYear}
                  </span>
                </div>
                <span className="text-xs font-bold text-[#06202A] uppercase tracking-wider">
                  FOUNDED
                </span>
              </div>
              <div className="flex flex-col gap-1 border-l border-gray-100 pl-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#392F5F]" />
                  <span className="text-2xl font-bold text-[#F9C602]">
                    {sectorCount}+
                  </span>
                </div>
                <span className="text-xs font-bold text-[#06202A] uppercase tracking-wider">
                  SECTORS
                </span>
              </div>
              <div className="flex flex-col gap-1 border-l border-gray-100 pl-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#392F5F]" />
                  <span className="text-xl md:text-2xl font-bold text-[#F9C602] leading-tight">
                    {about.experience || 0}+
                  </span>
                </div>
                <span className="text-xs font-bold text-[#06202A] uppercase tracking-wider">
                  YEARS EXPERIENCE
                </span>
              </div>
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center gap-3 bg-[#392F5F] hover:bg-[#F6B705] text-white hover:text-[#18202b] px-5 py-2.5 rounded-full w-fit transition-all duration-300"
            >
              <span className="font-bold text-[13px]">Discover More</span>
              <div className="w-7 h-7 bg-white/20 group-hover:bg-[#18202b]/10 rounded-full flex items-center justify-center text-white group-hover:text-[#18202b] transition-colors">
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
