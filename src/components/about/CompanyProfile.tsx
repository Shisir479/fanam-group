"use client";

import React from "react";
import Image from "next/image";

export function CompanyProfile({ data }: { data: any }) {
  if (!data) return null;

  return (
    <section className="relative fanam-section bg-white overflow-hidden py-12 lg:py-16">
      {/* Subtle background decoration (like the screenshot) */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-neutral-50/50 -skew-x-12 translate-x-32 -z-10" />

      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image with Triangle Decoration */}
          <div className="relative">
            {/* Faint speed lines decoration behind triangle */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-10">
              <div className="w-24 h-0.5 bg-black" />
              <div className="w-16 h-0.5 bg-black" />
              <div className="w-20 h-0.5 bg-black" />
              <div className="w-12 h-0.5 bg-black" />
            </div>

            {/* The Yellow Triangle */}
            <div
              className="absolute -left-8 md:-left-12 top-1/2 -translate-y-1/2 w-0 h-0 z-20"
              style={{
                borderTop: "30px solid transparent",
                borderBottom: "30px solid transparent",
                borderLeft: "45px solid #F9C602",
              }}
            ></div>

            {/* The Image */}
            <div className="relative aspect-[4/3] max-w-[500px] bg-gray-100 overflow-hidden mx-auto lg:mx-0">
              <Image
                src={data.companyImage?.url || "/partnering-growth-bg.png"}
                alt="About Fanam Group"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-[#F9C602] font-bold text-xs sm:text-sm tracking-widest uppercase mb-4">
              <span className="flex tracking-tighter">
                <span>&lt;</span>
                <span>&lt;</span>
                <span>&lt;</span>
              </span>
              <span>A B O U T U S</span>
              <span className="flex tracking-tighter">
                <span>&gt;</span>
                <span>&gt;</span>
                <span>&gt;</span>
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#392f5f] leading-[1.2] mb-8">
              {data.companyHeading || data.companyTitle || "About Fanam Group"}
            </h2>

            {/* Narrative text */}
            <div className="text-gray-700 text-base md:text-lg font-normal leading-relaxed text-justify max-w-xl space-y-4">
              {(data.companyDescription || "")
                .split(/\n+/)
                .filter(Boolean)
                .map((paragraph: string, idx: number) => (
                  <p key={idx}>{paragraph}</p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
