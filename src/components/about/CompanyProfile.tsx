"use client";

import React from "react";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";

export function CompanyProfile({ data }: { data: any }) {
  if (!data) return null;

  const features = [
    {
      title: "Sustainable Long-Term Value",
      desc: "Creating lasting value for customers, partners, dedicated employees, and national communities.",
    },
    {
      title: "Forward-Thinking Innovation",
      desc: "Driving progress through modern engineering, digital solutions, and continuous enhancement.",
    },
  ];

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
                src="/partnering-growth-bg.png"
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
              A Vision Built on Lasting Value
            </h2>

            {/* Two Points Side by Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f9c602] text-[#392f5f] flex items-center justify-center shrink-0 shadow-sm hover:scale-105 transition-transform cursor-pointer">
                    <ArrowDownRight className="w-4 h-4" strokeWidth={2.5} />
                  </div>
                  <h4 className="font-bold text-[#392f5f] leading-tight text-sm">
                    {feature.title}
                  </h4>
                </div>
              ))}
            </div>

            {/* Narrative text */}
            <div className="text-gray-700 text-base md:text-lg font-normal leading-relaxed text-justify max-w-xl space-y-4">
              <p>
                Established on 16 September 2017, Fanam Group was founded by a
                British-Bangladeshi entrepreneur with a vision to build a
                diversified and sustainable business organization. Today,
                Fanam Group operates across Real Estate, Construction, Trading,
                Hotel & Resort, ECommerce, Travel & Tourism, IT & Technology,
                News & Media, and Industrial Manufacturing.
              </p>
              <p>
                Driven by innovation, excellence and responsible growth, we
                build businesses that create lasting value for our customers,
                partners, people and communities. We build businesses for today
                and opportunities for tomorrow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
