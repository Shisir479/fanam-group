"use client";

import Image from "next/image";
import { BlockReveal } from "@/components/ui/BlockReveal";

export function CompanyOverview() {
  return (
    <section className="w-full py-16 md:py-24 bg-[#001f3f] text-white relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full fill-current"
          preserveAspectRatio="none"
        >
          <polygon points="0,100 100,0 100,100" />
        </svg>
      </div>

      <div className="container mx-auto px-5 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Text */}
          <div className="flex flex-col gap-6">
            <BlockReveal color="#ffffff">
              <div className="flex items-center text-[16px] font-semibold tracking-[0.2em] text-gray-300 uppercase">
                Company Overview
              </div>
            </BlockReveal>

            <BlockReveal color="#ffffff" delay={0.2}>
              <h2 className="text-2xl md:text-[34px] font-bold leading-[1.2] uppercase">
                Pioneering the Future of <br className="hidden md:block" />
                <span className="text-[#4ea24b]">Real Estate</span>
              </h2>
            </BlockReveal>

            <div className="flex flex-col gap-5 text-gray-300 leading-relaxed text-sm md:text-[14px] text-justify font-semibold mt-4">
              <p>
                At Edison Real Estate, we believe in building more than just
                structures; we build enduring legacies. With a commitment to
                architectural excellence and sustainable development, we have
                established ourselves as a vanguard in the industry.
              </p>
              <p>
                Our philosophy centers around the seamless integration of modern
                aesthetics, environmental consciousness, and uncompromising
                quality. Every project we undertake is a testament to our
                dedication to enriching communities and elevating lifestyles.
              </p>
            </div>
          </div>

          {/* Right Column: Image Grid */}
          <div className="relative w-full h-[400px] md:h-[500px] grid grid-cols-2 gap-4">
            <div className="relative w-full h-full overflow-hidden rounded-tr-[80px] rounded-bl-[40px] transform transition-transform duration-700 hover:scale-105">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                alt="Architecture"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative w-full h-1/2 overflow-hidden rounded-br-[40px] transform transition-transform duration-700 hover:scale-105">
                <Image
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
                  alt="Interior"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-1/2 overflow-hidden rounded-tl-[40px] rounded-bl-[40px] transform transition-transform duration-700 hover:scale-105">
                <Image
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
                  alt="Design"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
