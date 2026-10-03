"use client";

import React from "react";
import { motion } from "framer-motion";

const defaultPartners = [
  { name: "TV TechVision", category: "Technology", short: "TV" },
  { name: "GV Global Ventures", category: "Investment", short: "GV" },
  { name: "HP Horizon Properties", category: "Real Estate", short: "HP" },
  { name: "IT InnovateTech", category: "Innovation", short: "IT" },
  { name: "FD Future Dynamics", category: "Strategy", short: "FD" },
  { name: "PH Prime Holdings", category: "Holdings", short: "PH" },
  { name: "AS Apex Solutions", category: "Solutions", short: "AS" },
  { name: "NG Nexus Group", category: "Group", short: "NG" },
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
    <section className="w-full bg-[#F6F5F2] border-y border-[#392F5F]/25 overflow-hidden">
      <div className="w-full flex overflow-hidden group">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {/* Double array for seamless infinite scrolling */}
          {[...partners, ...partners].map((partner, idx) => (
            <div
              key={idx}
              className="group/partner relative flex items-center justify-center px-16 lg:px-20 py-16 lg:py-16 border-r border-[#392F5F]/25 min-w-[350px] cursor-pointer overflow-hidden"
            >
              {/* Normal State */}
              <div className="flex items-center gap-4 transition-all duration-500 ease-out group-hover/partner:-translate-y-10 group-hover/partner:opacity-0">
                <span className="text-[#392F5F] text-3xl font-medium tracking-tight">
                  {partner.name}
                </span>
              </div>

              {/* Hover Light State */}
              <div className="absolute flex items-center gap-4 transition-all duration-500 ease-out translate-y-10 opacity-0 group-hover/partner:translate-y-0 group-hover/partner:opacity-40">
                <span className="text-[#392F5F] text-3xl font-medium tracking-tight">
                  {partner.name}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
