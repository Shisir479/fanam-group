"use client";

import Image from "next/image";

import { useRef, useState, useEffect } from "react";
import { BlockReveal } from "@/components/ui/BlockReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SharedButton } from "@/components/ui/SharedButton";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function FeaturedProjects({
  initialProjects = [],
}: {
  initialProjects?: any[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<
    "featured" | "ongoing" | "upcoming"
  >("featured");
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const projects = initialProjects;

  const tabsData = {
    featured: {
      title: "FEATURED PROJECTS",
      subtitle: (
        <>
          BESPOKE ENCLAVES WITH FINESSE <br className="hidden md:block" /> IN
          ARCHITECTURE AND DESIGN
        </>
      ),
      projects: projects.filter(
        (p) => p.status?.toLowerCase().includes("featured") || p.featured,
      ),
    },
    ongoing: {
      title: "ONGOING PROJECTS",
      subtitle: (
        <>
          SHAPING THE FUTURE OF MODERN LIVING <br className="hidden md:block" />{" "}
          WITH EXCELLENCE
        </>
      ),
      projects: projects.filter((p) =>
        p.status?.toLowerCase().includes("ongoing"),
      ),
    },
    upcoming: {
      title: "UPCOMING PROJECTS",
      subtitle: (
        <>
          VISIONARY DESIGNS FOR <br className="hidden md:block" /> TOMORROW'S
          LIFESTYLE
        </>
      ),
      projects: projects.filter((p) =>
        p.status?.toLowerCase().includes("upcoming"),
      ),
    },
  };

  const currentData = tabsData[activeTab];
  // Only duplicate if there are very few items to prevent lag (DOM bloat).
  // We need at least 12 slides for a smooth loop on wide screens.
  const projectsCount = currentData.projects.length;
  const repeatCount =
    projectsCount === 0 ? 0 : Math.max(1, Math.ceil(12 / projectsCount));
  const extendedProjects = Array(repeatCount).fill(currentData.projects).flat();

  const scrollLeftAction = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const scrollRightAction = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
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
              <SectionLabel>{currentData.title}</SectionLabel>
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
          key={`${activeTab}-${projects.length}`}
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
              className="h-full !w-[85vw] sm:!w-[45vw] md:!w-[40vw] lg:!w-[30vw] xl:!w-[28vw] 2xl:!w-[25vw] cursor-pointer"
            >
              <ProjectCard
                project={project}
                className="w-full h-full"
                isSwiperSlide
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
