"use client";

import { useEffect, useState } from "react";
import { BlockReveal } from "@/components/ui/BlockReveal";
import { ScrollReelTestimonials } from "@/components/ui/scroll-reel-testimonials";
import {
  getTestimonialsPublic,
  TestimonialType,
} from "@/services/testimonial.service";

export function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await getTestimonialsPublic();
        if (res?.data && res.data.length > 0) {
          // Map backend format to frontend ScrollReelTestimonials format
          const formatted = res.data.map((t: TestimonialType) => ({
            title: t.title,
            quote: t.review,
            author: t.name,
            designation: t.company
              ? `${t.designation} - ${t.company}`
              : t.designation || "",
            image: t.image?.url || "",
          }));
          setTestimonials(formatted);
        }
      } catch (error) {
        console.error("Failed to load testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto px-5 md:px-16 overflow-hidden">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4">
          <BlockReveal color="var(--color-brand-blue)">
            <div className="flex items-center text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
              TESTIMONIAL
            </div>
          </BlockReveal>

          <BlockReveal color="var(--color-brand-blue)" delay={0.2}>
            <h2 className="text-2xl md:text-[34px] font-bold tracking-tight text-brand-blue leading-[1.3] uppercase max-w-2xl">
              WHAT CUSTOMERS <br className="hidden md:block" /> SAY ABOUT US
            </h2>
          </BlockReveal>
        </div>

        {/* Content Slider Area */}
        <div className="relative w-full overflow-hidden  flex justify-center mt-10">
          <ScrollReelTestimonials testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
}
