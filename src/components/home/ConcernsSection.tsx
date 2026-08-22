"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ArrowLeft } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const concerns = [
  {
    title: "Fanam Real Estate",
    description:
      "Landmark residential developments including Purbachal Fanam City and Purbachal Royal City.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
  },
  {
    title: "IT",
    description:
      "Creating opportunities through innovation and collaboration. Building a future defined by trust and excellence.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Fanam Shop",
    description:
      "A growing online marketplace with a nationwide delivery network built for a fast, customer experience.",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Fanam Trip",
    description:
      "Domestic and international tours, visa assistance and holiday packages travel made simple, reliable and memorable.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
  },
];

export function ConcernsSection() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="fanam-section bg-white relative overflow-hidden">
      <div className="fanam-container">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-[#f9c602] font-serif font-bold text-3xl md:text-4xl mb-4">
            Our Concerns
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            From real estate to e-commerce, travel, and media, our businesses
            are united by innovation, integrity, and sustainable growth.
          </p>
        </div>

        {/* Carousel Container - Group for hover state to show navigation */}
        <div className="relative group">
          <Swiper
            modules={[Navigation]}
            spaceBetween={12}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            className="w-full"
          >
            {concerns.map((concern, index) => (
              <SwiperSlide key={index} className="!h-auto">
                <Link href="#" className="flex h-full w-full outline-none py-4">
                  <div className="group/card w-full relative h-full flex flex-col bg-white hover:bg-gray-50 rounded-[1rem] p-3 transition-all duration-500 border border-gray-200 hover:border-[#f9c602]/50 cursor-pointer shadow-md hover:shadow-xl">
                    {/* Image */}
                    <div className="relative w-full aspect-[4/3] rounded-[0.8rem] overflow-hidden mb-4">
                      <Image
                        src={concern.image}
                        alt={concern.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 transform-gpu will-change-transform group-hover/card:scale-125"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col px-1 pb-10 relative">
                      <h3 className="text-[#181428] group-hover/card:text-[#f9c602] font-bold text-[22px] tracking-tight mb-2 transition-colors duration-500">
                        {concern.title}
                      </h3>
                      <p className="text-gray-600 group-hover/card:text-gray-800 text-[15px] leading-relaxed transition-colors duration-500 line-clamp-3 pr-2">
                        {concern.description}
                      </p>
                    </div>

                    {/* Interactive Button (Bottom Right) */}
                    <div className="absolute -bottom-1 -right-1 w-[52px] h-[52px] z-20 rounded-full border-[5px] border-white bg-[#181428] group-hover/card:bg-[#f9c602] transition-colors duration-500 overflow-hidden">
                      {/* Thin inner border (only visible in default state) */}
                      <div className="absolute inset-0 w-full h-full rounded-full border border-white/10 transition-opacity duration-500 group-hover/card:opacity-0" />

                      {/* Default Arrow (Slides out to Top-Right) */}
                      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 transform-gpu group-hover/card:translate-x-full group-hover/card:-translate-y-full">
                        <ArrowRight
                          className="w-7 h-7 text-white/80"
                          strokeWidth={1.5}
                        />
                      </div>

                      {/* Hover Arrow (Slides in from Bottom-Left) */}
                      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 transform-gpu -translate-x-full translate-y-full group-hover/card:translate-x-0 group-hover/card:translate-y-0">
                        <ArrowUpRight
                          className="w-7 h-7 text-[#181428]"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows (Visible on section hover) */}
          <button
            ref={prevRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-20 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-xl flex items-center justify-center text-[#181428] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 hover:bg-[#f9c602] hover:border-[#f9c602] hover:text-[#181428] disabled:opacity-0 disabled:hidden"
            aria-label="Previous slide"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            ref={nextRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-20 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-xl flex items-center justify-center text-[#181428] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 hover:bg-[#f9c602] hover:border-[#f9c602] hover:text-[#181428] disabled:opacity-0 disabled:hidden"
            aria-label="Next slide"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
