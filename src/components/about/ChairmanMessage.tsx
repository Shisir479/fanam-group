"use client";

import React from "react";
import { Quote } from "lucide-react";

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
          <div className="flex items-center justify-center gap-2 text-[#F9C602] font-bold text-xs sm:text-sm tracking-widest uppercase mb-4">
            <span className="flex tracking-tighter">
              <span>&lt;</span>
              <span>&lt;</span>
              <span>&lt;</span>
            </span>
            <span>MESSAGE FROM THE FOUNDER</span>
            <span className="flex tracking-tighter">
              <span>&gt;</span>
              <span>&gt;</span>
              <span>&gt;</span>
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#392f5f] leading-[1.2]">
            Connecting Bangladesh to Global Standards
          </h2>
        </div>

        <div className="bg-white p-8 md:p-16 rounded-[2rem] shadow-[0_15px_60px_rgba(57,47,95,0.08)] border border-gray-100/50 relative">
          {/* Small quote icon */}
          <div className="absolute -top-6 left-8 md:left-12 text-[#f9c602] bg-white rounded-full p-3 shadow-lg border border-gray-50">
            <Quote className="w-8 h-8" />
          </div>

          <div className="space-y-6 text-gray-600 text-[16px] md:text-lg leading-[1.85] font-medium">
            <p className="font-bold text-[#392f5f] text-lg md:text-xl pb-2">
              Dear Partners, Clients and Friends of Fanam Group,
            </p>
            <p>
              When I founded Fanam Group in September 2017, I carried with me a
              conviction: that Bangladesh deserves world-class businesses built
              on integrity, driven by innovation, and designed for lasting
              impact.
            </p>
            <p>
              What began as an entrepreneurial vision has grown into a
              diversified business platform spanning nine industries. Our
              journey has been shaped by the trust of our clients, the
              dedication of our people, and an unwavering commitment to
              excellence.
            </p>
            <p>
              As a British-Bangladeshi entrepreneur, I stand at the intersection
              of two great traditions — and I believe Fanam Group has a unique
              role to play in connecting Bangladesh to global standards of
              business and opportunity.
            </p>
            <p className="font-heading text-[#392f5f] font-bold text-2xl md:text-3xl border-l-4 border-[#f9c602] pl-6 md:pl-8 py-3 my-10 leading-[1.4]">
              "We are only at the beginning. The best of what Fanam Group will
              build is yet to come."
            </p>
          </div>

          {/* Signature block */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col items-end text-right">
            <h4 className="font-heading text-2xl font-bold text-[#392f5f]">
              Fanam Group Founder
            </h4>
            <p className="text-[#f9c602] text-xs sm:text-sm font-bold tracking-widest uppercase mt-2">
              British-Bangladeshi Entrepreneur
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
