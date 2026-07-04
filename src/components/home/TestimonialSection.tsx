"use client";

import { BlockReveal } from "@/components/ui/BlockReveal";
import { ScrollReelTestimonials } from "@/components/ui/scroll-reel-testimonials";

const testimonials = [
  {
    title: "Heartfelt Tales of Our Happy Homeowners",
    quote: "Hear from Edison Adelia homeowners as they share their stories about their homes. Their experiences inspire us to keep providing the best for everyone we serve.",
    author: "A.S.M Faizullah & AL Batul Sabera",
    designation: "Apartment Owner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "A Truly Professional Experience",
    quote: "The property management team at Bonedi Homes has been outstanding. They took care of everything and gave us peace of mind from day one.",
    author: "Michael Chen",
    designation: "Commercial Investor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "Transforming Spaces with Excellence",
    quote: "The interior design transformed our space completely. We couldn't be happier with the results and the attention to detail throughout the process.",
    author: "Emily Rodriguez",
    designation: "Villa Owner",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400"
  },
  {
    title: "Understanding Our Needs Perfectly",
    quote: "They understood exactly what our business needed for a new commercial space. The process was smooth, professional, and highly recommended.",
    author: "David Thompson",
    designation: "Business Owner",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
  }
];

export function TestimonialSection() {
  return (
    <section className="w-full md:py-20 py-16 bg-white">
      <div className="container mx-auto px-5 md:px-16 overflow-hidden">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4">
          <BlockReveal color="#003B6D">
            <div className="flex items-center text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
              TESTIMONIAL
            </div>
          </BlockReveal>

          <BlockReveal color="#003B6D" delay={0.2}>
            <h2 className="text-2xl md:text-[34px] font-bold tracking-tight text-[#003B6D] leading-[1.3] uppercase max-w-2xl">
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
