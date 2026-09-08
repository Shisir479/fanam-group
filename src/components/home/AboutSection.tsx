"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  Award,
  Building2,
} from "lucide-react";

export function AboutSection() {
  const highlights = [
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

  return (
    <section className="relative fanam-section bg-gradient-to-b from-white via-neutral-50/50 to-white overflow-hidden">
      {/* Subtle decorative background blur shapes */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#F9C602]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#F9C602]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="fanam-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5 lg:col-span-7"
          >
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f9c602]/15 border border-[#f9c602]/30 w-fit">
              <Building2 className="w-4 h-4 text-[#392F5F]" />
              <span className="text-[#392F5F] font-semibold text-xs md:text-sm tracking-wide uppercase">
                About Fanam Group
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-[#392F5F] font-serif font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.2]">
              Building Legacies, Driving{" "}
              <span className="relative whitespace-nowrap text-[#392F5F]">
                Transformation
                <span className="absolute left-0 -bottom-1.5 w-full h-1 bg-gradient-to-r from-[#6B4E9E] to-[#F9C602]" />
              </span>{" "}
              Since 2018
            </h2>

            {/* Narrative text */}
            <p className="text-gray-600 text-base md:text-[16px] leading-relaxed max-w-2xl font-normal">
              Starting as an ambitious real estate pioneer in 2018, Fanam Group has
              rapidly expanded into a diversified, multi-industry powerhouse. Today,
              our dynamic footprint spans real estate, e-commerce, international
              trading, hospitality, and tech solutions — united under one gold standard
              of uncompromising quality.
            </p>

            {/* Feature Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="group p-3.5 rounded-xl bg-white border border-gray-100 hover:border-[#f9c602]/40 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#f9c602]/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#f9c602] transition-colors duration-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#392F5F]" />
                    </div>
                    <div>
                      <h4 className="text-[#392F5F] font-semibold text-sm">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 text-xs mt-0.5 leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 bg-[#392F5F] hover:bg-[#F9C602] border border-[#392F5F] hover:border-[#F9C602] text-white hover:text-[#392F5F] px-7 py-3.5 font-semibold text-sm transition-all duration-300 active:scale-[0.98]"
              >
                <span>Learn More About Us</span>
                <span className="w-6 h-6 bg-white/20 group-hover:bg-[#392F5F]/10 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5 text-white group-hover:text-[#392F5F]" />
                </span>
              </Link>

              <Link
                href="/concern"
                className="inline-flex items-center gap-2 text-[#392F5F] hover:text-[#f9c602] font-semibold text-sm px-4 py-3 transition-colors duration-300"
              >
                <span>View Our Business Concerns</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Image Collage & Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-square max-w-[480px] md:max-w-[540px] mx-auto lg:col-span-5 lg:ml-auto mt-6 lg:mt-0"
          >
            {/* Elegant Corner Decorative Frames */}
            <div className="absolute -top-4 -left-4 w-3/4 h-3/4 border-t-2 border-l-2 border-[#f9c602] rounded-tl-3xl z-0 pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-3/4 h-3/4 border-b-2 border-r-2 border-[#f9c602] rounded-br-3xl z-0 pointer-events-none" />

            {/* Main Picture Frame */}
            <div className="relative w-full h-full p-3 z-10 bg-white rounded-3xl shadow-2xl border border-gray-100/80">
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner group">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
                  alt="Fanam Group Team & Corporate Headquarters"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              </div>
            </div>

            {/* Floating Card 1: Experience Badge (Top Right) */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -top-6 -right-4 md:-right-6 z-20"
            >
              <div className="bg-[#392F5F] text-white border border-white/10 rounded-2xl px-5 py-4 shadow-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#f9c602] flex items-center justify-center text-[#392F5F]">
                  <Award className="w-5 h-5 font-bold" />
                </div>
                <div>
                  <div className="text-xl font-bold font-mono text-[#f9c602]">
                    7+ Years
                  </div>
                  <div className="text-white/70 text-xs">Excellence Journey</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 2: Community & Reviews (Bottom Left) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -left-4 md:-left-6 z-20"
            >
              <div className="bg-white border border-gray-100 rounded-2xl px-6 py-4 shadow-2xl flex flex-col gap-2 min-w-[200px]">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2.5">
                    <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop"
                      width={36}
                      height={36}
                      alt="Reviewer 1"
                      className="rounded-full border-2 border-white shadow-sm w-9 h-9 object-cover"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop"
                      width={36}
                      height={36}
                      alt="Reviewer 2"
                      className="rounded-full border-2 border-white shadow-sm w-9 h-9 object-cover"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop"
                      width={36}
                      height={36}
                      alt="Reviewer 3"
                      className="rounded-full border-2 border-white shadow-sm w-9 h-9 object-cover"
                    />
                    <div className="w-9 h-9 rounded-full border-2 border-white shadow-sm bg-[#f9c602] flex items-center justify-center text-[#392F5F] text-sm font-bold z-10">
                      +
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[#f9c602] text-xs font-bold">
                    ★ 4.9
                  </div>
                </div>
                <p className="text-[#392F5F] font-semibold text-xs tracking-tight">
                  Trusted by 10,000+ Clients & Partners
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
