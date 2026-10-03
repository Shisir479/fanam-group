"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  CornerDownRight,
} from "lucide-react";
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

  const safeItems = [...displayItems, ...displayItems, ...displayItems].slice(
    0,
    6,
  );

  return (
    <section className="fanam-section py-16 md:py-20 bg-[#EFECE6] relative overflow-hidden">
      <div className="fanam-container">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[#F9C602] font-bold tracking-widest text-base">
              &lt; &lt; &lt;
            </span>
            <span className="text-gray-500 font-semibold tracking-widest uppercase text-[13px]">
              Latest News
            </span>
            <span className="text-[#F9C602] font-bold tracking-widest text-base">
              &gt; &gt; &gt;
            </span>
          </div>
          <h2 className="text-[#392F5F] font-serif font-medium text-3xl md:text-4xl lg:text-[44px] leading-[1.2] tracking-tight mb-4">
            Corporate Insights
          </h2>
        </div>

        {/* 4-Column Flex Masonry Grid */}
        <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
          {/* Column 1 */}
          <div className="flex-1 flex flex-col gap-4 lg:gap-6">
            <Link
              href={safeItems[0].link}
              className="bg-white hover:bg-[#392F5F] rounded-[1.2rem] p-6 lg:p-8 shadow-md transition-colors duration-500 flex flex-col items-center text-center justify-center py-10 lg:py-12 relative group overflow-hidden"
            >
              <div className="flex flex-col items-center transition-transform duration-500 group-hover:-translate-y-6">
                <div className="text-gray-500 font-bold text-[10px] uppercase tracking-widest mb-3 transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-4">
                  PUBLISHED: {safeItems[0].date}
                </div>
                <h3 className="text-[#392F5F] group-hover:text-white transition-colors duration-500 font-serif text-[18px] lg:text-[22px] leading-snug">
                  {safeItems[0].title}
                </h3>
              </div>
              <div className="absolute bottom-10 opacity-0 translate-y-6 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 flex items-center gap-2 text-[#F9C602] font-semibold text-sm">
                <CornerDownRight className="w-4 h-4" />
                <span className="underline underline-offset-4">Read more</span>
              </div>
            </Link>
            <Link
              href={safeItems[1].link}
              className="relative rounded-[1.2rem] overflow-hidden bg-gray-200 shadow-md group flex-1 min-h-[250px] lg:min-h-[300px]"
            >
              <Image
                src={safeItems[1].image}
                alt={safeItems[1].title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-full px-4 py-1.5 text-white font-bold text-[10px] tracking-widest z-10 uppercase">
                BRANDING
              </div>
            </Link>
          </div>

          {/* Column 2 */}
          <div className="flex-1 flex flex-col gap-4 lg:gap-6">
            <Link
              href={safeItems[2].link}
              className="relative rounded-[1.2rem] overflow-hidden bg-gray-200 shadow-sm group flex-1 min-h-[250px] lg:min-h-[300px]"
            >
              <Image
                src={safeItems[2].image}
                alt={safeItems[2].title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-full px-4 py-1.5 text-white font-bold text-[10px] tracking-widest z-10 uppercase">
                MODERN BRANDING
              </div>
            </Link>
            <Link
              href={safeItems[3].link}
              className="bg-white hover:bg-[#392F5F] rounded-[1.2rem] p-6 lg:p-8 shadow-md transition-colors duration-500 flex flex-col items-center text-center justify-center py-10 lg:py-12 relative group overflow-hidden"
            >
              <div className="flex flex-col items-center transition-transform duration-500 group-hover:-translate-y-6">
                <div className="text-gray-500 font-bold text-[10px] uppercase tracking-widest mb-3 transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-4">
                  PUBLISHED: {safeItems[3].date}
                </div>
                <h3 className="text-[#392F5F] group-hover:text-white transition-colors duration-500 font-serif text-[18px] lg:text-[22px] leading-snug">
                  {safeItems[3].title}
                </h3>
              </div>
              <div className="absolute bottom-10 opacity-0 translate-y-6 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 flex items-center gap-2 text-[#F9C602] font-semibold text-sm">
                <CornerDownRight className="w-4 h-4" />
                <span className="underline underline-offset-4">Read more</span>
              </div>
            </Link>
          </div>

          {/* Column 3 */}
          <div className="flex-1 flex flex-col gap-4 lg:gap-6">
            <Link
              href={safeItems[4].link}
              className="bg-white hover:bg-[#392F5F] rounded-[1.2rem] p-6 lg:p-8 shadow-md transition-colors duration-500 flex flex-col items-center text-center justify-center py-10 lg:py-12 relative group overflow-hidden"
            >
              <div className="flex flex-col items-center transition-transform duration-500 group-hover:-translate-y-6">
                <div className="text-gray-500 font-bold text-[10px] uppercase tracking-widest mb-3 transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-4">
                  PUBLISHED: {safeItems[4].date}
                </div>
                <h3 className="text-[#392F5F] group-hover:text-white transition-colors duration-500 font-serif text-[18px] lg:text-[22px] leading-snug">
                  {safeItems[4].title}
                </h3>
              </div>
              <div className="absolute bottom-10 opacity-0 translate-y-6 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 flex items-center gap-2 text-[#F9C602] font-semibold text-sm">
                <CornerDownRight className="w-4 h-4" />
                <span className="underline underline-offset-4">Read more</span>
              </div>
            </Link>
            <Link
              href={safeItems[5].link}
              className="relative rounded-[1.2rem] overflow-hidden bg-gray-200 shadow-sm group flex-1 min-h-[250px] lg:min-h-[300px]"
            >
              <Image
                src={safeItems[5].image}
                alt={safeItems[5].title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-full px-4 py-1.5 text-white font-bold text-[10px] tracking-widest z-10 uppercase">
                REBRANDING
              </div>
            </Link>
          </div>

          {/* Column 4 (CTA Card) */}
          <div className="flex-1 flex flex-col">
            {/* CTA Card (Matches exactly the last item in the reference image) */}
            <div className="relative rounded-[1.5rem] overflow-hidden shadow-sm flex flex-col min-h-[400px] flex-1">
              <Image
                src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                fill
                className="object-cover absolute inset-0 z-0"
                alt="View All Insights"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-white rounded-xl p-6 lg:p-8 text-center flex flex-col items-center justify-center shadow-xl z-10 h-auto">
                <h3 className="text-[#392F5F] font-serif text-[20px] lg:text-[22px] leading-snug mb-8">
                  Understand trends that define modern digital success
                </h3>
                <Link
                  href="/blog"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#F9C602] text-[#392F5F] px-6 py-3.5 lg:py-4 rounded-full font-semibold text-sm hover:bg-[#392F5F] hover:text-white transition-all active:scale-95"
                >
                  View All Insights <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
