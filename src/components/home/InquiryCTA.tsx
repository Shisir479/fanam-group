"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function InquiryCTA({
  cmsData,
  mainSettings,
  branding,
}: {
  cmsData?: Record<string, unknown>;
  mainSettings?: Record<string, unknown>;
  branding?: Record<string, unknown>;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Dynamic CTA content from CMS or main settings
  const cmsCTA = (mainSettings?.cta ||
    mainSettings?.inquiryCTA ||
    cmsData?.cta ||
    {}) as Record<string, unknown>;

  const badgeText = (cmsCTA.badge as string) || "Get In Touch";
  const headline =
    (cmsCTA.headline as string) || "Partnering for Sustainable Growth";
  const description =
    (cmsCTA.description as string) ||
    "At Fanam Group, we combine visionary leadership with uncompromising quality across diverse industries. Connect with us to explore strategic partnerships and build a better future together.";
  const primaryCTA = (cmsCTA.primaryCTA as { label: string; href: string }) || {
    label: "Contact Us",
    href: "/contact",
  };
  const secondaryCTA = (cmsCTA.secondaryCTA as {
    label: string;
    href: string;
  }) || { label: "Explore", href: "/concern" };

  const newsletterTitle = (cmsCTA.newsletterTitle as string) || "Stay Updated";
  const newsletterDesc =
    (cmsCTA.newsletterDesc as string) ||
    "Subscribe to our newsletter and be the first to know about our latest projects, achievements, and exclusive insights.";
  const subscribeLabel = (cmsCTA.subscribeLabel as string) || "Subscribe";
  const subscribeNote =
    (cmsCTA.subscribeNote as string) ||
    "Join 10,000+ subscribers. No spam, unsubscribe anytime.";

  return (
    <section
      ref={ref}
      className="w-full py-16 md:py-20 relative z-10 flex justify-center"
    >
      <div className="fanam-container w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative w-full rounded-[2rem] overflow-hidden min-h-[400px] flex items-center justify-center py-20 px-6 shadow-xl"
        >
          {/* Background Image (Abstract Dark Texture) */}
          <div className="absolute inset-0 z-0 ">
            <img
              src="https://res.cloudinary.com/duqlhfshv/image/upload/v1790834291/6a338ede5cd9b5fc0d916128_cta-background-image_kasqjo.avif"
              alt="Background"
              className="w-full h-full object-cover opacity-90 mix-blend-overlay"
            />
          </div>

          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-0" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
            <h2 className="text-white font-serif font-medium text-3xl md:text-4xl lg:text-[44px] leading-tight tracking-tight mb-6">
              {headline}
            </h2>

            <p className="text-white/90 text-sm md:text-base leading-relaxed mb-10 max-w-2xl font-light">
              {description}
            </p>

            <Link
              href={primaryCTA.href}
              className="group inline-flex items-center justify-center gap-2 bg-[#F9C602] text-[#392F5F] px-8 py-4 rounded-full font-semibold text-sm hover:bg-white hover:text-[#392F5F] transition-all duration-300 active:scale-95 shadow-lg"
            >
              <span>{primaryCTA.label}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
