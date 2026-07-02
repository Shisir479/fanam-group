"use client";

import Image from "next/image";

import { useRef, useEffect, useState } from "react";
import { BlockReveal } from "@/components/ui/BlockReveal";

const projects = [
  {
    title: "EDISON PORTIA",
    location: "Bashundhara R/A",
    description:
      "Experience the pinnacle of luxury living in the heart of Bashundhara. Edison Portia offers unmatched elegance and modern amenities.",
    image:
      "https://images.unsplash.com/photo-1568295123886-8d09a5986b4e?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "EDISON VERONA",
    location: "Uttara",
    description:
      "Edison Verona stands as a beacon of refined living, where the romance of design and the innovation of modern architecture come together to create a space that feels both aspirational and welcoming.",
    image:
      "https://images.unsplash.com/photo-1516069429726-51d80d545cbf?q=80&w=901&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "EDISON DESDEMONA",
    location: "Bashundhara R/A",
    description:
      "A sanctuary of peace and contemporary design, offering a unique blend of comfort and style in an exclusive neighborhood.",
    image:
      "https://images.unsplash.com/photo-1633591691478-b238b428223f?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "EDISON MARIGOLD",
    location: "Gulshan",
    description:
      "Edison Marigold redefines premium living with state-of-the-art facilities and breathtaking views of the city skyline.",
    image:
      "https://images.unsplash.com/photo-1709913492535-56fb1ac85092?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "EDISON VIVIANA",
    location: "Banani",
    description:
      "A testament to architectural brilliance, Edison Viviana offers an elite living experience tailored for the modern family.",
    image:
      "https://images.unsplash.com/photo-1595040398700-85ddd233d6f6?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "EDISON OAK",
    location: "Dhanmondi",
    description:
      "Nestled in the lush greenery of Dhanmondi, Edison Oak provides a perfect escape from the hustle and bustle of the city.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "EDISON PINE",
    location: "Mirpur",
    description:
      "An affordable yet luxurious living space, Edison Pine is designed to cater to all your modern lifestyle needs with convenience.",
    image:
      "https://images.unsplash.com/photo-1621645541495-9bbe8b167a43?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "EDISON MAPLE",
    location: "Baridhara",
    description:
      "Exclusivity meets tranquility. Edison Maple is the ultimate address for those who appreciate the finer things in life.",
    image:
      "https://images.unsplash.com/photo-1692210212021-c7e887fc7076?q=80&w=348&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "EDISON WILLOW",
    location: "Mohakhali",
    description:
      "Strategically located to keep you connected, Edison Willow is the epitome of smart and accessible urban living.",
    image:
      "https://images.unsplash.com/photo-1615651885088-3ff35a7e0b5a?q=80&w=420&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "EDISON CEDAR",
    location: "Badda",
    description:
      "Discover a new standard of community living. Edison Cedar brings people together with thoughtfully designed shared spaces.",
    image:
      "https://images.unsplash.com/photo-1667238324671-c2fe726f6084?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// Duplicate projects 4 times (40 items total) - enough for infinite illusion without lagging the browser
const extendedProjects = Array(4).fill(projects).flat();

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const cardWidth =
        scrollContainerRef.current.firstElementChild?.clientWidth || 400;

      // Start in the middle of our array (around the 2nd set)
      scrollContainerRef.current.scrollLeft =
        (cardWidth + 16) * projects.length * 1.5;

      requestAnimationFrame(() => {
        setIsReady(true);
      });
    }
  }, []);

  const scrollLeftAction = () => {
    if (scrollContainerRef.current) {
      const cardWidth =
        scrollContainerRef.current.firstElementChild?.clientWidth || 400;
      scrollContainerRef.current.scrollBy({
        left: -((cardWidth + 16) * 3),
        behavior: "smooth",
      });
    }
  };

  const scrollRightAction = () => {
    if (scrollContainerRef.current) {
      const cardWidth =
        scrollContainerRef.current.firstElementChild?.clientWidth || 400;
      scrollContainerRef.current.scrollBy({
        left: (cardWidth + 16) * 3,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 bg-gray-50 overflow-hidden"
    >
      <div className="container mx-auto px-5 md:px-16">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="flex flex-col gap-4">
            <BlockReveal color="#003B6D">
              <div className="flex items-center text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
                FEATURED PROJECTS
              </div>
            </BlockReveal>

            <BlockReveal color="#003B6D" delay={0.2}>
              <h2 className="text-2xl md:text-[34px] font-bold tracking-tight text-[#003B6D] leading-[1.3] uppercase max-w-3xl">
                BESPOKE ENCLAVES WITH FINESSE <br className="hidden md:block" />{" "}
                IN ARCHITECTURE AND DESIGN
              </h2>
            </BlockReveal>
          </div>

          {/* Navigation Arrows */}
          <div className="md:flex items-center gap-4  hidden">
            <button
              onClick={scrollLeftAction}
              className="w-12 h-12 rounded-full border  flex items-center justify-center text-gray-600 cursor-pointer transition-colors"
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
              className="w-12 h-12 rounded-full border  flex items-center justify-center text-gray-600 cursor-pointer transition-colors"
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

      {/* Projects Carousel - Native CSS Infinite Loop */}
      <div
        className={`w-full pb-8 transition-opacity duration-300 ${isReady ? "opacity-100" : "opacity-0"}`}
      >
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide w-full will-change-scroll"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {extendedProjects.map((project, idx) => (
            <div
              key={idx}
              className="relative group/card w-[85vw] sm:w-[45vw] md:w-[40vw] lg:w-[30vw] xl:w-[28vw] h-[500px] md:h-[600px] shrink-0 snap-center overflow-hidden cursor-pointer transform-gpu"
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
                  <p className="text-white text-[15px] leading-relaxed font-semibold">
                    {project.description}
                  </p>
                </div>

                {/* Always visible Explore Button */}
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 pointer-events-auto">
                  <button className="relative group/btn border border-white px-12 py-3 text-sm font-bold text-white overflow-hidden transition-colors duration-500 hover:text-[#003B6D]">
                    <span className="relative z-10">Explore</span>
                    <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-500 ease-out group-hover/btn:scale-x-100 z-0"></span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
