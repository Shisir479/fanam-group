"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

const testimonials = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000&auto=format&fit=crop",
    title: "A Journey to Finding Home",
    quote:
      "Hear from Edison Adelia homeowners as they share their stories about their homes. Their experiences inspire us to keep providing the best for everyone we serve.",
    name: "Faisal Obaid",
    role: "Apartment Owner",
    overlayRole: "APARTMENT OWNER",
    overlayProject: "EDISON ADELIA",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop",
    title: "Unmatched Quality and Service",
    quote:
      "The attention to detail and customer service provided by the team was simply phenomenal. We couldn't have asked for a better experience.",
    name: "Sarah Ahmed",
    role: "Home Owner",
    overlayRole: "HOME OWNER",
    overlayProject: "EDISON VERONA",
  },
];

export function TestimonialSection() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const subTitleRef = useRef<HTMLDivElement>(null);
  const subBlockRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Reset initial states
      gsap.set([subTitleRef.current, titleRef.current], { opacity: 0 });
      gsap.set([subBlockRef.current, blockRef.current], {
        scaleX: 0,
        transformOrigin: "left",
      });

      // Animation sequence
      tl.to(subBlockRef.current, {
        scaleX: 1,
        duration: 0.5,
        ease: "power3.inOut",
      })
        .set(subTitleRef.current, { opacity: 1 })
        .to(subBlockRef.current, {
          scaleX: 0,
          transformOrigin: "right",
          duration: 0.5,
          ease: "power3.inOut",
        })

        .to(
          blockRef.current,
          { scaleX: 1, duration: 0.5, ease: "power3.inOut" },
          "-=0.4",
        )
        .set(titleRef.current, { opacity: 1 })
        .to(blockRef.current, {
          scaleX: 0,
          transformOrigin: "right",
          duration: 0.5,
          ease: "power3.inOut",
        });
    }
  }, []);

  return (
    <section ref={sectionRef} className="w-full md:py-20 py-16 bg-white">
      <div className="container mx-auto px-5 md:px-16">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4">
          <div className="relative self-start">
            <div
              ref={subTitleRef}
              className="flex items-center text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase"
            >
              TESTIMONIAL
            </div>
            <div
              ref={subBlockRef}
              className="absolute inset-0 bg-[#003B6D] origin-left"
            ></div>
          </div>

          <div className="relative self-start">
            <h2
              ref={titleRef}
              className="text-2xl md:text-[34px] font-bold tracking-tight text-[#003B6D] leading-[1.3] uppercase max-w-2xl"
            >
              WHAT CUSTOMERS <br className="hidden md:block" /> SAY ABOUT US
            </h2>
            <div
              ref={blockRef}
              className="absolute inset-0 bg-[#003B6D] origin-left"
            ></div>
          </div>
        </div>

        {/* Content Slider Area using Swiper */}
        <div className="relative w-full">
          <div className="pb-4">
            <Swiper
              onSwiper={setSwiperInstance}
              speed={700}
              loop={true}
              grabCursor={true}
              className="w-full"
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.id}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center select-none">
                    {/* Left: Video Thumbnail */}
                    <div className="flex justify-start">
                      <div className="w-full max-w-md lg:max-w-[480px] overflow-hidden">
                        <div className="relative w-full aspect-[4/3] md:aspect-[3/2] overflow-hidden group cursor-pointer shadow-lg">
                          <img
                            src={t.image}
                            alt={t.name}
                            className="absolute inset-0 w-full h-full object-cover "
                          />

                          {/* Play Button */}
                          <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="w-10 h-10 md:w-15 md:h-15 bg-white rounded-full flex items-center justify-center shadow-xl ">
                              <svg
                                className="w-6 h-6 md:w-8 md:h-8 text-[#003B6D] ml-1"
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

                    {/* Right: Testimonial Details */}
                    <div className="flex  relative h-full justify-center">
                      {/* Quote Mark SVG */}
                      <div className="absolute -top-6 -left-8 md:-top-1 md:-left-10 opacity-5 pointer-events-none z-0">
                        <svg
                          width="45"
                          height="45"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>

                      <div className="w-full relative z-10">
                        <h3 className="text-2xl md:text-[24px] font-bold text-[#003B6D] mb-4">
                          {t.title}
                        </h3>

                        <p className="text-gray-600 text-[12px] md:text-[14px] leading-relaxed mb-4 max-w-lg">
                          {t.quote}
                        </p>

                        <div className="mb-4">
                          <h4 className="font-bold text-gray-900 text-[15px] mb-1">
                            {t.name}
                          </h4>
                          <p className="text-gray-500 text-[12px]">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Navigation Arrows positioned outside the slider track, perfectly aligned with the right column */}
          <div className="flex items-center gap-2  lg:ml-[50%] lg:pl-10">
            <button
              onClick={() => swiperInstance?.slidePrev()}
              className=" transition-colors p-2 -ml-2 select-none group cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="16"
                viewBox="0 0 21 11"
                className="rotate-180"
              >
                <g stroke="currentColor" strokeWidth="1" fill="none">
                  <line x1="0" y1="5.5" x2="20" y2="5.5" />
                  <line x1="15" y1="0.5" x2="20" y2="5.5" />
                  <line x1="15" y1="10.5" x2="20" y2="5.5" />
                </g>
              </svg>
            </button>
            <button
              onClick={() => swiperInstance?.slideNext()}
              className=" transition-colors p-2 select-none group cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="16"
                viewBox="0 0 21 11"
              >
                <g stroke="currentColor" strokeWidth="1" fill="none">
                  <line x1="0" y1="5.5" x2="20" y2="5.5" />
                  <line x1="15" y1="0.5" x2="20" y2="5.5" />
                  <line x1="15" y1="10.5" x2="20" y2="5.5" />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
