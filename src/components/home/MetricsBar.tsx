"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Handshake,
  Globe2,
  Building2,
  Award,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Layers,
} from "lucide-react";

const metrics = [
  {
    id: "alliances",
    index: "01",
    value: "50+",
    label: "Strategic Alliances",
    subtext: "Global corporate network",
    badge: "Tier-1 Partners",
    icon: Handshake,
  },
  {
    id: "markets",
    index: "02",
    value: "15+",
    label: "Global Markets",
    subtext: "Cross-continental footprint",
    badge: "Asia, EU & Americas",
    icon: Globe2,
  },
  {
    id: "valuation",
    index: "03",
    value: "$120M+",
    label: "Joint Venture Value",
    subtext: "Co-developed landmark assets",
    badge: "Institutional Capital",
    icon: Building2,
  },
  {
    id: "retention",
    index: "04",
    value: "99.4%",
    label: "Partner Retention",
    subtext: "Decade of sustained trust",
    badge: "Verified Reliability",
    icon: Award,
  },
];

type DesignType = "floating-island" | "editorial-columns" | "bento-cards";

export function MetricsBar() {
  const [activeDesign, setActiveDesign] = useState<DesignType>("floating-island");

  return (
    <div className="relative z-20 w-full bg-white">
      {/* Design Style Selector Pill (Allows user to inspect each premium design type) */}
      <div className="pt-6 pb-2 fanam-container flex items-center justify-end gap-2 text-xs">
        <span className="text-gray-400 font-medium text-[11px] uppercase tracking-wider flex items-center gap-1.5 mr-1">
          <Layers className="w-3.5 h-3.5 text-[#f9c602]" />
          <span>Design Style:</span>
        </span>
        <div className="inline-flex items-center p-1 rounded-full bg-gray-100/80 border border-gray-200/60 shadow-inner">
          <button
            onClick={() => setActiveDesign("floating-island")}
            className={`px-3 py-1 rounded-full font-medium text-xs transition-all duration-200 cursor-pointer ${
              activeDesign === "floating-island"
                ? "bg-[#0a0a0a] text-white shadow-sm"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Floating Island
          </button>
          <button
            onClick={() => setActiveDesign("editorial-columns")}
            className={`px-3 py-1 rounded-full font-medium text-xs transition-all duration-200 cursor-pointer ${
              activeDesign === "editorial-columns"
                ? "bg-[#0a0a0a] text-white shadow-sm"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Editorial Strip
          </button>
          <button
            onClick={() => setActiveDesign("bento-cards")}
            className={`px-3 py-1 rounded-full font-medium text-xs transition-all duration-200 cursor-pointer ${
              activeDesign === "bento-cards"
                ? "bg-[#0a0a0a] text-white shadow-sm"
                : "text-gray-600 hover:text-black"
            }`}
          >
            Bento Cards
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* ─── DESIGN TYPE 1: Floating Glass Island (Overlap & Gold Rim) ─── */}
        {activeDesign === "floating-island" && (
          <motion.section
            key="floating-island"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="pb-12 pt-4"
          >
            <div className="fanam-container">
              <div className="relative rounded-3xl bg-white/95 backdrop-blur-xl border border-gray-200/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] p-6 md:p-8 lg:p-10 overflow-hidden">
                {/* Top Gold Shimmer Beam */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#f9c602] to-transparent" />

                <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
                  {metrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <div
                        key={metric.id}
                        className="flex flex-col items-center text-center p-4 lg:px-6 first:pt-0 last:pb-0 lg:first:p-6 lg:last:p-6 group hover:bg-neutral-50/60 rounded-2xl transition-all duration-300"
                      >
                        {/* Gold Icon Capsule */}
                        <div className="w-12 h-12 rounded-2xl bg-[#f9c602]/15 border border-[#f9c602]/30 flex items-center justify-center text-[#0a0a0a] mb-4 group-hover:bg-[#f9c602] group-hover:scale-110 transition-all duration-300 shadow-sm">
                          <Icon className="w-5 h-5" />
                        </div>

                        {/* Number */}
                        <div className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0a0a0a] tracking-tight leading-none mb-2 group-hover:text-[#f9c602] transition-colors">
                          {metric.value}
                        </div>

                        {/* Label */}
                        <div className="text-[#0a0a0a] font-bold text-sm sm:text-base tracking-normal mb-1">
                          {metric.label}
                        </div>

                        {/* Micro Subtext */}
                        <div className="text-gray-500 text-xs font-normal">
                          {metric.subtext}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* ─── DESIGN TYPE 2: Editorial Architectural Columns ─── */}
        {activeDesign === "editorial-columns" && (
          <motion.section
            key="editorial-columns"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="py-14 sm:py-16 border-y border-gray-100 bg-neutral-50/50"
          >
            <div className="fanam-container">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {metrics.map((metric) => {
                  return (
                    <div
                      key={metric.id}
                      className="relative flex flex-col p-6 rounded-2xl bg-white border border-gray-200/70 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
                    >
                      {/* Index Tag */}
                      <div className="flex items-center justify-between text-xs mb-4">
                        <span className="font-mono text-[#f9c602] font-bold tracking-wider">
                          // {metric.index}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[11px] font-semibold">
                          {metric.badge}
                        </span>
                      </div>

                      {/* Number with underline accent */}
                      <div className="font-serif font-extrabold text-4xl sm:text-5xl text-[#0a0a0a] tracking-tight mb-2">
                        {metric.value}
                      </div>

                      <div className="text-base font-bold text-[#0a0a0a] mb-1">
                        {metric.label}
                      </div>

                      <div className="text-xs text-gray-500 mt-auto pt-2 border-t border-gray-100">
                        {metric.subtext}
                      </div>

                      {/* Hover gold underline bar */}
                      <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#f9c602] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.section>
        )}

        {/* ─── DESIGN TYPE 3: Modern Executive Bento Cards ─── */}
        {activeDesign === "bento-cards" && (
          <motion.section
            key="bento-cards"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="py-14 sm:py-16 bg-white"
          >
            <div className="fanam-container">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div
                      key={metric.id}
                      className="group relative p-6 rounded-3xl bg-gradient-to-b from-white to-neutral-50/80 border border-gray-200/80 hover:border-[#f9c602]/60 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                    >
                      <div>
                        {/* Header with Icon and Pill */}
                        <div className="flex items-center justify-between mb-5">
                          <div className="w-12 h-12 rounded-2xl bg-[#0a0a0a] text-white flex items-center justify-center group-hover:bg-[#f9c602] group-hover:text-[#0a0a0a] transition-all duration-300 shadow-md">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[11px] font-semibold text-[#0a0a0a] bg-gray-100 px-3 py-1 rounded-full border border-gray-200/50">
                            {metric.badge}
                          </span>
                        </div>

                        {/* Metric Value */}
                        <div className="font-serif font-black text-4xl sm:text-5xl text-[#0a0a0a] tracking-tight leading-none mb-2">
                          {metric.value}
                        </div>

                        {/* Title */}
                        <h4 className="text-base font-bold text-[#0a0a0a] tracking-tight mb-1">
                          {metric.label}
                        </h4>
                      </div>

                      {/* Subtext */}
                      <p className="text-xs text-gray-500 mt-4 pt-3 border-t border-gray-100">
                        {metric.subtext}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
