"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Calendar, Clock } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const mockNews = [
  {
    title: "Fanam Group Launches a New Residential Development",
    date: "July 18, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    excerpt:
      "Fanam Group has announced Premium living with sustainable planning and exceptional community facilities.",
    link: "#",
  },
  {
    title: "Expanding Business Operations Across New Markets",
    date: "July 12, 2026",
    readTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=1932&auto=format&fit=crop",
    excerpt:
      "As part of its growth strategy, Fanam Group continues to expand its innovation, strategic partnerships, and ventures.",
    link: "#",
  },
  {
    title: "Fanam Group Strengthens Its Vision for Sustainable Growth",
    date: "July 05, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    excerpt:
      "With a focus on innovation, responsible business practices, Fanam Group future across its diverse business sectors.",
    link: "#",
  },
  {
    title: "Strengthening Our Commitment to Excellence",
    date: "July 10, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
    excerpt:
      "Continuing to deliver quality, trust, and customer-focused solutions across every business sector.",
    link: "#",
  },
];

export function LatestNews({ blogs = [] }: { blogs?: any[] }) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const displayItems =
    blogs.length > 0
      ? blogs.map((blog) => ({
          title: blog.name || blog.title,
          date: new Date(blog.createdAt || blog.publishedAt).toLocaleDateString(
            "en-US",
            { month: "long", day: "numeric", year: "numeric" },
          ),
          readTime: "5 min read", // Mocked read time for dynamic blogs
          image:
            blog.cover?.url ||
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600",
          excerpt: blog.excerpt || blog.description?.substring(0, 100) + "...",
          link: `/blog/${blog.slug}`,
        }))
      : mockNews;

  // If there are less than 5 items, duplicate them so the swiper looks full when screen fits 4.
  const carouselItems =
    displayItems.length < 5 ? [...displayItems, ...displayItems] : displayItems;

  return (
    <section className="fanam-section bg-gray-50 relative overflow-hidden">
      <div className="fanam-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-[#f9c602] font-serif font-bold text-3xl md:text-4xl mb-4">
              Latest News & Updates
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-lg">
              Follow our latest achievements, announcements, events, and
              business insights as Fanam Group continues to grow.
            </p>
          </div>
          <Link
            href="/blog"
            className="group hidden md:inline-flex items-center gap-3 bg-[#181428] text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-[#f9c602] hover:text-[#181428] border border-[#181428] hover:border-[#f9c602] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              View All
            </span>
            <span className="w-5 h-5 rounded-full bg-white/20 group-hover:bg-[#181428]/10 text-white group-hover:text-[#181428] flex items-center justify-center transition-all duration-300 group-hover:-translate-x-1 group-hover:-rotate-45">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <Swiper
            modules={[Navigation]}
            spaceBetween={12} // Match the gap of ConcernsSection (user requested "gapping same", gap-2 was modified to spaceBetween={12})
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
            {carouselItems.map((item, idx) => (
              <SwiperSlide key={idx} className="!h-auto">
                <Link
                  href={item.link}
                  className="flex h-full w-full outline-none py-4"
                >
                  <div className="group/card w-full relative h-full flex flex-col bg-white hover:bg-gray-100 rounded-[1rem] p-3 transition-all duration-500 border border-gray-200 hover:border-[#f9c602]/50 cursor-pointer shadow-sm hover:shadow-lg">
                    {/* Image */}
                    <div className="relative w-full aspect-[4/3] rounded-[0.8rem] overflow-hidden mb-4">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 transform-gpu will-change-transform group-hover/card:scale-125"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 px-1 pb-10">
                      {/* Meta */}
                      <div className="flex items-center justify-between text-gray-500 group-hover/card:text-gray-800 text-[11px] mb-3 font-medium transition-colors duration-500">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{item.readTime}</span>
                        </div>
                      </div>

                      {/* Title & Excerpt */}
                      <h3 className="text-[#181428] font-bold text-[17px] leading-snug mb-2.5 group-hover/card:text-[#f9c602] transition-colors duration-500 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 group-hover/card:text-gray-900 text-[13px] leading-relaxed transition-colors duration-500 line-clamp-3 pr-2">
                        {item.excerpt}
                      </p>
                    </div>

                    {/* Interactive Button (Bottom Right) */}
                    <div className="absolute -bottom-1 -right-1 w-[52px] h-[52px] z-20 rounded-full border-[5px] border-white bg-[#181428] group-hover/card:bg-[#f9c602] transition-colors duration-500 overflow-hidden">
                      {/* Thin inner border */}
                      <div className="absolute inset-0 w-full h-full rounded-full border border-white/10 transition-opacity duration-500 group-hover/card:opacity-0" />
                      {/* Default Arrow */}
                      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 transform-gpu group-hover/card:translate-x-full group-hover/card:-translate-y-full">
                        <ArrowRight
                          className="w-7 h-7 text-white/80"
                          strokeWidth={1.5}
                        />
                      </div>
                      {/* Hover Arrow */}
                      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 transform-gpu -translate-x-full translate-y-full group-hover/card:translate-x-0 group-hover/card:translate-y-0">
                        <ArrowRight
                          className="w-7 h-7 text-[#181428] -rotate-45"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <button
            ref={prevRef}
            className="absolute left-8 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-xl flex items-center justify-center text-[#181428] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 hover:bg-[#f9c602] hover:border-[#f9c602] hover:text-[#181428] disabled:opacity-0 disabled:hidden"
            aria-label="Previous slide"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            ref={nextRef}
            className="absolute right-8 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-xl flex items-center justify-center text-[#181428] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 hover:bg-[#f9c602] hover:border-[#f9c602] hover:text-[#181428] disabled:opacity-0 disabled:hidden"
            aria-label="Next slide"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-3 bg-[#181428] text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-[#f9c602] hover:text-[#181428] border border-[#181428] hover:border-[#f9c602] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              View All
            </span>
            <span className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-[#181428]/10 text-white group-hover:text-[#181428] flex items-center justify-center transition-all duration-300 group-hover:-translate-x-1 group-hover:-rotate-45">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
