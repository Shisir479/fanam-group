"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Handshake,
  Building2,
  Cpu,
  Truck,
  Landmark,
  ShieldCheck,
  Globe2,
} from "lucide-react";

const partners = [
  {
    name: "Apex Financial Group",
    category: "Banking & Investment",
    icon: Landmark,
    description: "Syndicated financing & asset management partner",
  },
  {
    name: "Vertex Civil Engineering",
    category: "Architecture & Construction",
    icon: Building2,
    description: "Structural design & sustainable engineering",
  },
  {
    name: "Zenith Cloud Systems",
    category: "Technology & Cloud",
    icon: Cpu,
    description: "Enterprise IT infrastructure & cybersecurity",
  },
  {
    name: "Global Horizon Logistics",
    category: "Supply Chain & Freight",
    icon: Truck,
    description: "Nationwide retail fulfillment & cross-border freight",
  },
  {
    name: "Meridian Hospitality Intl.",
    category: "Travel & Hospitality",
    icon: Globe2,
    description: "International ticketing & luxury holiday partnerships",
  },
  {
    name: "Prime Capital Alliance",
    category: "Strategic Venture",
    icon: ShieldCheck,
    description: "Institutional equity & diversified project funds",
  },
];

export function PartnersSection() {
  return (
    <section className="relative fanam-section bg-[#0a0a0a] text-white overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#f9c602]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="fanam-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#f9c602] text-xs md:text-sm font-medium tracking-wide mb-4">
            <Handshake className="w-3.5 h-3.5 text-[#f9c602]" />
            <span>Strategic Ecosystem</span>
          </div>

          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            Trusted by Global <span className="text-[#f9c602]">Partners</span> & Alliances
          </h2>

          <p className="text-white/70 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl mx-auto">
            Fanam Group actively collaborates with industry-leading financial
            institutions, engineering consortiums, technology innovators, and
            logistics networks to drive shared prosperity.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-16">
          {partners.map((partner, idx) => {
            const IconComponent = partner.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#f9c602]/50 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-start gap-4">
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#f9c602] group-hover:bg-[#f9c602] group-hover:text-[#0a0a0a] transition-all duration-300 flex-shrink-0">
                    <IconComponent className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <span className="text-[11px] font-semibold text-[#f9c602] uppercase tracking-wider block mb-1">
                      {partner.category}
                    </span>
                    <h3 className="text-white font-serif font-bold text-lg group-hover:text-[#f9c602] transition-colors duration-300">
                      {partner.name}
                    </h3>
                    <p className="text-white/60 text-xs sm:text-sm mt-1.5 leading-relaxed">
                      {partner.description}
                    </p>
                  </div>
                </div>

                {/* Subtle bottom border highlight */}
                <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#f9c602]/0 to-transparent group-hover:via-[#f9c602]/60 transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
