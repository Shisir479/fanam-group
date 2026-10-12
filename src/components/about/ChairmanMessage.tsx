"use client";

import React from "react";
import { Quote } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ChairmanMessage({ data }: { data: any }) {
  return (
    <section className="relative fanam-section bg-[#F6F5F2] text-gray-900 py-20 lg:py-28 overflow-hidden">
      {/* Decorative large quote in background */}
      <div className="absolute top-10 left-10 md:left-20 text-[#392f5f] opacity-[0.03] pointer-events-none">
        <Quote className="w-64 h-64 md:w-96 md:h-96" />
      </div>

      <div className="fanam-container relative z-10 max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          {/* Header Badge */}
          <div className="mb-4">
            <SectionLabel>
              {data?.chairmanTitle || "MESSAGE FROM THE FOUNDER"}
            </SectionLabel>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#392f5f] leading-[1.2]">
            {data?.chairmanHeading || "Message from Fanam Group"}
          </h2>
        </div>

        <div className="bg-white p-8 md:p-16 rounded-[2rem] shadow-[0_15px_60px_rgba(57,47,95,0.08)] border border-gray-100/50 relative">
          {/* Small quote icon */}
          <div className="absolute -top-6 left-8 md:left-12 text-[#f9c602] bg-white rounded-full p-3 shadow-lg border border-gray-50">
            <Quote className="w-8 h-8" />
          </div>

          <div
            className="space-y-6 text-gray-600 text-[16px] md:text-lg leading-[1.85] font-medium prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: data?.chairmanMessage || "",
            }}
          />

          {/* Signature block */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col items-end text-right">
            <h4 className="font-heading text-2xl font-bold text-[#392f5f]">
              {data?.chairmanName || "Fanam Group Founder"}
            </h4>
            <p className="text-[#f9c602] text-xs sm:text-sm font-bold tracking-widest uppercase mt-2">
              {data?.chairmanDesignation || ""}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
