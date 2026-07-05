"use client";

import Image from "next/image";

import { BlockReveal } from "@/components/ui/BlockReveal";

export function AboutSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto px-5 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column (Text content) */}
          <div className="flex flex-col gap-5">
            {/* SubTitle with Block Reveal */}
            <BlockReveal color="#003B6D">
              <div className="flex items-center text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
                ABOUT US
              </div>
            </BlockReveal>

            {/* Title with Block Reveal (delayed slightly so it fires after subtitle) */}
            <BlockReveal color="#003B6D" delay={0.2}>
              <h2 className="text-2xl md:text-[34px] font-bold text-[#003B6D] leading-[1.2] uppercase">
                Redefining your standard of living
              </h2>
            </BlockReveal>

            <div className="flex flex-col gap-6 text-gray-700 leading-relaxed text-sm md:text-[14px] text-justify mt-2 font-semibold">
              <p>
                Edison Group was founded in 2009 with the aim to enhance aspects
                of life for people by providing powerful brands, reliable
                products and a wide range of services. It ventured into the real
                estate sector in 2015 with its "dream team" dedicated to merge
                value and innovation in the evolving real estate sector of
                Bangladesh. Through considerable focus on design, structural
                dimension, and feasibility in the sense of space and resource
                conservation; as well as environmental soundness; we deliver you
                optimum support in residential and commercial accommodation.
              </p>
              <p>
                Conjoining the expertise of different fields to develop and
                bring in the quintessence of contemporary lifestyle, we provide
                distinguished services and strictly maintain project handover
                deadlines. We assure you to be your most reliable developer in
                Dhaka in terms of integrity and credibility.
              </p>
            </div>

            {/* Learn More Button */}
            <div className="md:mt-10 mt-8 self-start">
              <button className="relative group border border-[#4ea24b] hover:border-[#003B6D] px-12 py-3 text-sm font-bold text-[#003B6D] overflow-hidden transition-colors duration-500 hover:text-white">
                <span className="relative z-10">Learn More</span>
                <span className="absolute inset-0 bg-[#003B6D] scale-x-0 origin-left transition-transform duration-700 ease-out group-hover:scale-x-100 z-0"></span>
              </button>
            </div>
          </div>

          {/* Right Column (Image with Play Button) */}
          <div className="relative w-full h-[220px] md:h-[350px] overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1637909336968-0687e3086c63?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Building Complex"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* The Text overlay and Play Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 pointer-events-none">
              <h3 className="text-white text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg text-center">
                The Biggest Developer
              </h3>
              <p className="text-white text-lg md:text-xl font-medium mb-6 drop-shadow-md">
                in Bashundhara R/A
              </p>
              <div className="relative bottom-16 flex items-center justify-center pointer-events-auto">
                {/* Ripple effects */}
                <div className="absolute w-12 h-12 rounded-full border border-white/80 animate-[ripple_2s_infinite_ease-out]"></div>
                <div className="absolute w-12 h-12 rounded-full border border-white/80 animate-[ripple_2s_infinite_ease-out_0.6s]"></div>
                <div className="absolute w-12 h-12 rounded-full border border-white/80 animate-[ripple_2s_infinite_ease-out_1.2s]"></div>

                {/* Play Button */}
                <div className="relative z-10 w-12 h-12 bg-[#ff0000] rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-red-700 transition-colors shadow-[0_0_20px_rgba(255,0,0,0.5)]">
                  <svg
                    className="w-6 h-6 ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
