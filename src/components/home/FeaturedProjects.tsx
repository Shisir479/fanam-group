"use client";

import Image from "next/image";

import { useRef, useState } from "react";
import { BlockReveal } from "@/components/ui/BlockReveal";
import { SharedButton } from "@/components/ui/SharedButton";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

import { projects } from "@/lib/projectData";

const tabsData = {
  featured: {
    title: "FEATURED PROJECTS",
    subtitle: (
      <>
        BESPOKE ENCLAVES WITH FINESSE <br className="hidden md:block" /> IN
        ARCHITECTURE AND DESIGN
      </>
    ),
    projects: projects.filter((p) => p.status.includes("featured")),
  },
  ongoing: {
    title: "ONGOING PROJECTS",
    subtitle: (
      <>
        SHAPING THE FUTURE OF MODERN LIVING <br className="hidden md:block" />{" "}
        WITH EXCELLENCE
      </>
    ),
    projects: projects.filter((p) => p.status.includes("ongoing")),
  },
  upcoming: {
    title: "UPCOMING PROJECTS",
    subtitle: (
      <>
        VISIONARY DESIGNS FOR <br className="hidden md:block" /> TOMORROW'S
        LIFESTYLE
      </>
    ),
    projects: projects.filter((p) => p.status.includes("upcoming")),
  },
};

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<
    "featured" | "ongoing" | "upcoming"
  >("featured");
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const currentData = tabsData[activeTab];
  // Duplicate projects to ensure Swiper has enough slides to loop infinitely
  const extendedProjects = Array(4).fill(currentData.projects).flat();

  const scrollLeftAction = () => {
    if (swiperInstance) {
      if (window.innerWidth >= 1024) {
        swiperInstance.slideToLoop(swiperInstance.realIndex - 3);
      } else {
        swiperInstance.slidePrev();
      }
    }
  };

  const scrollRightAction = () => {
    if (swiperInstance) {
      if (window.innerWidth >= 1024) {
        swiperInstance.slideToLoop(swiperInstance.realIndex + 3);
      } else {
        swiperInstance.slideNext();
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 md:py-24 bg-gray-50 overflow-hidden"
    >
      <div className="container mx-auto px-5 md:px-16">
        {/* Tabs Section */}
        <div className="flex gap-6 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("featured")}
            className={`pb-3 text-sm md:text-base font-bold uppercase transition-colors relative ${activeTab === "featured" ? "text-brand-blue" : "text-gray-400 hover:text-gray-600"}`}
          >
            Featured Projects
            {activeTab === "featured" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-blue"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("ongoing")}
            className={`pb-3 text-sm md:text-base font-bold uppercase transition-colors relative ${activeTab === "ongoing" ? "text-brand-blue" : "text-gray-400 hover:text-gray-600"}`}
          >
            Ongoing Projects
            {activeTab === "ongoing" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-blue"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`pb-3 text-sm md:text-base font-bold uppercase transition-colors relative ${activeTab === "upcoming" ? "text-brand-blue" : "text-gray-400 hover:text-gray-600"}`}
          >
            Upcoming Projects
            {activeTab === "upcoming" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-blue"></span>
            )}
          </button>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="flex flex-col gap-4">
            <BlockReveal
              color="var(--color-brand-blue)"
              key={`title-${activeTab}`}
            >
              <div className="flex items-center text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
                {currentData.title}
              </div>
            </BlockReveal>

            <BlockReveal
              color="var(--color-brand-blue)"
              delay={0.2}
              key={`subtitle-${activeTab}`}
            >
              <h2 className="text-2xl md:text-[34px] font-bold tracking-tight text-brand-blue leading-[1.3] uppercase max-w-3xl">
                {currentData.subtitle}
              </h2>
            </BlockReveal>
          </div>

          {/* Navigation Arrows */}
          <div className="md:flex items-center gap-4  hidden">
            <button
              onClick={scrollLeftAction}
              className="w-11 h-11  border  flex items-center justify-center text-gray-600 cursor-pointer transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M19 12H5M5 12L12 19M5 12L12 5" />
              </svg>
            </button>
            <button
              onClick={scrollRightAction}
              className="w-11 h-11  border  flex items-center justify-center text-gray-600 cursor-pointer transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 12H19M19 12L12 19M19 12L12 5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Projects Carousel - Swiper Infinite Loop */}
      <div className="w-full pb-8">
        <Swiper
          key={activeTab}
          onSwiper={setSwiperInstance}
          loop={true}
          spaceBetween={16}
          slidesPerView={"auto"}
          centeredSlides={true}
          className="w-full h-[500px] md:h-[600px] flex items-center"
        >
          {extendedProjects.map((project, idx) => (
            <SwiperSlide
              key={`${project.id}-${idx}`}
              className="relative group/card h-full !w-[85vw] sm:!w-[45vw] md:!w-[40vw] lg:!w-[30vw] xl:!w-[28vw] 2xl:!w-[25vw] overflow-hidden cursor-pointer transform-gpu"
            >
              {/* Background Image that slowly zooms on hover */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 85vw, (max-width: 768px) 45vw, (max-width: 1024px) 40vw, 30vw"
                className="object-cover transition-transform duration-[10000ms] ease-out group-hover/card:scale-[1.3] will-change-transform"
              />

              {/* Dark Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity duration-500"></div>

              {/* Content Container - Pure transform approach for buttery smooth animation */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Title & Location (Translates UP on hover) */}
                <div className="absolute bottom-[90px] left-6 right-6 md:left-8 md:right-8 transform transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/card:-translate-y-[90px] pointer-events-auto">
                  <h3 className="text-white text-2xl md:text-2xl font-bold uppercase tracking-wide">
                    {project.title}
                  </h3>
                  <p className="text-white/90 text-sm md:text-[15px] font-medium mt-1">
                    {project.location}
                  </p>
                </div>

                {/* Description (Fades in and fills the space left by the title) */}
                <div className="absolute bottom-[90px] left-6 right-6 md:left-8 md:right-8 opacity-0 transform translate-y-4 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/card:opacity-100 group-hover/card:translate-y-0 pointer-events-auto">
                  <p className="text-white text-[14px] md:text-[15px] leading-relaxed font-semibold pt-4 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Always visible Explore Button */}
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 pointer-events-auto">
                  <SharedButton className="text-white">Explore</SharedButton>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
