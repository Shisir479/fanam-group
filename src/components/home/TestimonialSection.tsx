"use client";

import { useEffect, useState } from "react";
import { BlockReveal } from "@/components/ui/BlockReveal";
import { ScrollReelTestimonials } from "@/components/ui/scroll-reel-testimonials";
import { SectionLabel } from "./SectionLabel";
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
    <section className="w-full py-16 md:py-20 bg-white">
      <div className="container mx-auto px-5 md:px-16 overflow-hidden">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6">
            <SectionLabel>Testimonials</SectionLabel>
          </div>
          <h2 className="text-[#392F5F] font-serif font-medium text-3xl md:text-4xl lg:text-[44px] leading-[1.2] tracking-tight">
            Trusted By <br className="hidden md:block" /> Industry Leaders
          </h2>
        </div>

        {/* Content Slider Area */}
        <div className="relative w-full overflow-hidden  flex justify-center mt-10">
          <ScrollReelTestimonials testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
}
