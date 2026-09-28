"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  Building,
  Laptop,
  ShoppingBag,
  Plane,
  Sprout,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";

const defaultConcerns = [
  {
    category: "Real Estate",
    icon: Building,
    title: "Fanam Real Estate",
    description:
      "Landmark residential and commercial developments including Purbachal Fanam City, crafted for visionary living.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    href: "/concern",
  },
  {
    category: "Tech & Innovation",
    icon: Laptop,
    title: "Fanam IT & Software",
    description:
      "Pioneering digital solutions, cloud infrastructure, and custom software systems powering modern enterprise transformation.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    href: "/concern",
  },
  {
    category: "E-Commerce",
    icon: ShoppingBag,
    title: "Fanam Shop",
    description:
      "Next-generation retail platform with seamless digital shopping and a nationwide fulfillment network.",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
    href: "/concern",
  },
  {
    category: "Hospitality & Travel",
    icon: Plane,
    title: "Fanam Trip & Tours",
    description:
      "Curated domestic and international excursions, luxury packages, and corporate travel solutions executed to perfection.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
    href: "/concern",
  },
  {
    category: "Agro & Commodities",
    icon: Sprout,
    title: "Fanam Agro & Trading",
    description:
      "Sustainable agricultural supply chains and global commodity trading ensuring quality from source to distribution.",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop",
    href: "/concern",
  },
];

interface Concern {
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  image: string;
  href: string;
}

export function ConcernsSection({
  cmsData,
  branding,
}: {
  cmsData?: Record<string, unknown>;
  branding?: Record<string, unknown>;
}) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Dynamic concerns from CMS
  const cmsConcerns = (cmsData?.concerns ||
    cmsData?.enterprises ||
    []) as Array<Record<string, unknown>>;
  const concerns: Concern[] =
    cmsConcerns.length > 0
      ? cmsConcerns.map((concern: Record<string, unknown>, index: number) => {
          const iconMap: Record<
            string,
            React.ComponentType<{ className?: string }>
          > = {
            building: Building,
            laptop: Laptop,
            shoppingbag: ShoppingBag,
            plane: Plane,
            sprout: Sprout,
          };
          const IconComponent =
            iconMap[(concern.icon as string)?.toLowerCase()] || Building;
          return {
            category: (concern.category as string) || "",
            icon: IconComponent,
            title: (concern.title as string) || "",
            description: (concern.description as string) || "",
            image:
              ((concern.image as Record<string, unknown>)?.url as string) ||
              (concern.image as string) ||
              "",
            href: (concern.href as string) || "/concern",
          };
        })
      : defaultConcerns;

  return (
    <section className="fanam-section bg-gradient-to-b from-white via-[#F3F0FA] to-[#EDE8F7] text-[#392F5F] relative overflow-hidden">
      {/* Decorative animated accent shapes */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#F9C602]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#F9C602]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="fanam-container relative z-10">
        {/* Section Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#392F5F]/10 text-[#392F5F] text-xs md:text-sm font-semibold tracking-wide mb-4 shadow-sm">
              <Layers className="w-3.5 h-3.5 text-[#F9C602]" />
              <span>Enterprise Portfolio</span>
            </div>

            <h2 className="text-[#392F5F] font-serif font-bold text-3xl md:text-4xl mb-4 tracking-tight leading-tight">
              Our Strategic <span className="text-[#F9C602]">Enterprises</span>
            </h2>
            <p className="text-[#392F5F]/60 text-sm sm:text-base mt-3 leading-relaxed">
              From landmark real estate developments to digital commerce and
              international travel — explore the synergistic enterprises
              defining Fanam Group.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => swiperInstance?.slidePrev()}
              disabled={isBeginning}
              className="w-12 h-12 border border-[#392F5F]/15 bg-white hover:bg-[#392F5F] text-[#392F5F] hover:text-white hover:border-[#392F5F] flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 cursor-pointer shadow-sm"
              aria-label="Previous Concern"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => swiperInstance?.slideNext()}
              disabled={isEnd}
              className="w-12 h-12 border border-[#392F5F]/15 bg-white hover:bg-[#F9C602] text-[#392F5F] hover:border-[#F9C602] flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 cursor-pointer shadow-sm"
              aria-label="Next Concern"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="w-full">
          <Swiper
            onSwiper={(swiper) => {
              setSwiperInstance(swiper);
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            spaceBetween={20}
            slidesPerView={1.1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 3.5 },
            }}
            className="w-full !pb-4"
          >
            {concerns.map((concern, index) => {
              const IconComponent = concern.icon;
              return (
                <SwiperSlide key={index} className="!h-auto">
                  <Link
                    href={concern.href}
                    className="block group/card h-full outline-none"
                  >
                    <div className="relative h-full flex flex-col bg-white border border-[#392F5F]/10 hover:border-[#F9C602]/50 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 shadow-[0_8px_30px_rgba(14,42,71,0.08)] hover:shadow-[0_16px_45px_rgba(14,42,71,0.14)] p-3.5">
                      {/* Image Container with Zoom & Floating Category Badge */}
                      <div className="relative w-full aspect-[4/3] overflow-hidden mb-5">
                        <Image
                          src={concern.image}
                          alt={concern.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                        />
                        {/* Gradient Fade */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#392F5F]/85 via-[#6B4E9E]/25 to-transparent" />

                        {/* Floating Category Pill — sharp */}
                        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/15 text-[#f9c602] text-xs font-medium">
                          <IconComponent className="w-3.5 h-3.5" />
                          <span>{concern.category}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col px-1 pb-10">
                        <h3 className="text-[#392F5F] group-hover/card:text-[#F9C602] font-serif font-bold text-xl tracking-tight mb-2.5 transition-colors duration-300">
                          {concern.title}
                        </h3>
                        <p className="text-[#392F5F]/60 group-hover/card:text-[#392F5F]/80 text-sm leading-relaxed transition-colors duration-300 line-clamp-3">
                          {concern.description}
                        </p>
                      </div>

                      {/* Interactive Button at Bottom Right — sharp */}
                      <div className="absolute bottom-3 right-3 w-10 h-10 bg-white/10 group-hover/card:bg-[#f9c602] border border-white/15 group-hover/card:border-[#f9c602] flex items-center justify-center transition-all duration-300 group-hover/card:scale-110 shadow-md">
                        <ArrowUpRight className="w-4 h-4 text-white group-hover/card:text-[#392f5f] transition-all duration-300 group-hover/card:rotate-45" />
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
