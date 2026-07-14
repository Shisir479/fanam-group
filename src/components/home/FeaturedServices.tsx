"use client";

import Image from "next/image";
import Link from "next/link";
import { BlockReveal } from "@/components/ui/BlockReveal";
import { useState } from "react";

const services = [
  {
    title: "Residential\nProperties",
    description:
      "Discover luxury apartments, penthouses, and bespoke villas designed for comfort and modern living.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=400&auto=format&fit=crop",
    href: "/services/residential-properties",
  },
  {
    title: "Commercial\nSpaces",
    description:
      "State-of-the-art office buildings and retail spaces tailored for business success and growth.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400&auto=format&fit=crop",
    href: "/services/commercial-spaces",
  },
  {
    title: "Interior\nDesign",
    description:
      "Transforming empty spaces into beautifully curated environments that reflect your personality.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=400&auto=format&fit=crop",
    href: "/services/interior-design",
  },
  {
    title: "Property\nManagement",
    description:
      "Comprehensive management services ensuring your investments are maintained and profitable.",
    image:
      "https://images.unsplash.com/photo-1628859250369-c513b3468843?q=80&w=874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    href: "/services/property-management",
  },
];

export function FeaturedServices() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section className="w-full py-16 md:py-24 bg-white text-brand-blue">
      <div className="container mx-auto px-5 md:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="flex flex-col gap-4 max-w-2xl">
            <BlockReveal color="var(--color-brand-blue)">
              <div className="text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
                What We Do
              </div>
            </BlockReveal>

            <BlockReveal color="var(--color-brand-blue)" delay={0.2}>
              <h2 className="text-2xl md:text-[34px] font-bold text-brand-blue leading-[1.2] uppercase">
                Featured Services
              </h2>
            </BlockReveal>
          </div>

          <Link
            href="/services"
            className="hidden md:inline-flex items-center gap-4 text-sm font-bold text-brand-blue uppercase tracking-wider group"
          >
            <span className="relative overflow-hidden">
              <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">
                Explore All
              </span>
              <span className="inline-block absolute left-0 top-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0 text-[#4ea24b]">
                Explore All
              </span>
            </span>
            <div className="w-10 h-10  border border-brand-blue/20 flex items-center justify-center transition-colors duration-500 group-hover:border-[#4ea24b] group-hover:bg-[#4ea24b]">
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300 group-hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </Link>
        </div>

        {/* Premium Accordion Gallery */}
        <div className="flex flex-col md:flex-row h-[800px] md:h-[600px] w-full gap-4">
          {services.map((service, idx) => {
            const isActive = hoveredIndex === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(0)} // Resets to first item on mouse leave
                className={`relative overflow-hidden  cursor-pointer transition-all duration-500 ease-in-out transform-gpu ${
                  isActive ? "flex-[4] md:flex-[3]" : "flex-[1]"
                }`}
              >
                {/* Image Background */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className={`object-cover transform-gpu transition-transform duration-[10000ms] ease-linear ${
                    isActive ? "scale-110 grayscale-0" : "scale-100 grayscale"
                  }`}
                />

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 transition-colors duration-700 ${
                    isActive
                      ? "bg-gradient-to-t from-black/90 via-black/20 to-transparent"
                      : "bg-black/60"
                  }`}
                ></div>

                {/* Content Container: Fixed width to prevent shake! */}
                {/* By anchoring ONLY to left and bottom with a MASSIVE fixed width (e.g. 600px), 
                    this container NEVER changes size when the parent flex-box expands. 
                    It completely eliminates layout subpixel jitter! */}
                <div className="absolute left-0 bottom-0 w-[400px] md:w-[600px] h-full p-6 md:p-10 flex flex-col justify-end">
                  <div
                    className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end overflow-hidden"
                    style={{
                      WebkitFontSmoothing: "antialiased",
                      transform: "translateZ(0)",
                    }}
                  >
                    {/* Icon/Indicator (Visible when inactive) */}
                    <div
                      className={`transition-all duration-500 ease-in-out overflow-hidden transform-gpu ${
                        isActive
                          ? "max-h-0 opacity-0 mb-0"
                          : "max-h-[60px] opacity-100 mb-6"
                      }`}
                    >
                      <div className="w-12 h-12  border border-white/30 flex items-center justify-center shrink-0">
                        <span className="text-white font-bold">0{idx + 1}</span>
                      </div>
                    </div>

                    <div
                      className={`transition-opacity duration-500 w-[250px] md:w-[400px] shrink-0`}
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <h3 className="text-2xl md:text-[32px] font-bold text-white uppercase leading-[1.1] whitespace-pre-line">
                        {service.title}
                      </h3>

                      <div
                        className={`transition-all duration-500 ease-in-out overflow-hidden transform-gpu ${
                          isActive
                            ? "max-h-[200px] opacity-100 mt-6"
                            : "max-h-0 opacity-0 mt-0"
                        }`}
                      >
                        <p className="text-gray-300 text-sm md:text-[15px] font-medium leading-relaxed">
                          {service.description}
                        </p>

                        <Link
                          href={service.href}
                          className="mt-6 flex items-center gap-3 text-sm font-bold text-[#4ea24b] uppercase tracking-wider group/btn"
                        >
                          <span className="relative overflow-hidden">
                            <span className="inline-block transition-transform duration-300 group-hover/btn:-translate-y-full">
                              Discover
                            </span>
                            <span className="inline-block absolute left-0 top-0 translate-y-full transition-transform duration-300 group-hover/btn:translate-y-0">
                              Discover
                            </span>
                          </span>
                          <svg
                            className="w-5 h-5 transform transition-transform duration-300 group-hover/btn:translate-x-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <Link
          href="/services"
          className="md:hidden mt-12 w-full flex items-center justify-center gap-2 text-sm font-bold text-brand-blue uppercase border border-brand-blue/30 py-4 "
        >
          Explore All Services
        </Link>
      </div>
    </section>
  );
}
