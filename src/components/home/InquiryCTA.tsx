"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function InquiryCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="w-full py-24 relative z-10 overflow-hidden bg-gradient-to-br from-[#1f1b3a] via-[#2a2545] to-[#3d3560]">
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -right-24 w-96 h-96 bg-[#F9C602]/25 blur-[110px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#F9C602]/20 blur-[110px] pointer-events-none"
      />
      <div className="relative z-10 fanam-container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto px-6">
        {/* Left Column: Get In Touch */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.3em] uppercase text-[#F9C602] mb-8"
          >
            <span className="w-8 h-px bg-[#F9C602]" />
            Get In Touch
            <span className="w-8 h-px bg-[#F9C602] lg:hidden" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-[50px] lg:text-[56px] font-serif text-white leading-[1.05] mb-8 tracking-tight"
          >
            Ready to Start Your
            <br />
            <span className="text-[#F9C602]">Next Project?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-base md:text-lg leading-relaxed font-medium mb-12 max-w-2xl"
          >
            Whether you&apos;re looking for premium real estate, innovative business solutions, or strategic partnerships — Fanam Group is here to exceed your expectations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-5"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 bg-white text-[#1f1b3a] px-7 py-3.5 font-semibold text-sm hover:bg-[#F9C602] transition-all duration-300 active:scale-[0.98]"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                Contact Us
              </span>
              <span className="relative z-10 w-7 h-7 bg-[#1f1b3a]/10 group-hover:bg-[#1f1b3a]/15 flex items-center justify-center transition-all duration-300">
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>

            <Link
              href="/concern"
              className="group inline-flex items-center gap-3 bg-transparent text-white px-7 py-3.5 font-semibold text-sm border border-white/30 hover:bg-white/10 hover:border-[#F9C602] transition-all duration-300 active:scale-[0.98]"
            >
              <span>Explore</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Newsletter Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full bg-white border border-[#1f1b3a]/10 p-8 md:p-10"
        >
          <h3 className="text-2xl font-serif text-[#1f1b3a] mb-4 text-center lg:text-left">Stay Updated</h3>
          <p className="text-[#1f1b3a]/60 text-sm md:text-base mb-8 text-center lg:text-left">
            Subscribe to our newsletter and be the first to know about our latest projects, achievements, and exclusive insights.
          </p>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-6 py-3.5 bg-[#F5F8FC] border border-[#1f1b3a]/15 text-[#1f1b3a] placeholder-[#1f1b3a]/40 focus:border-[#F9C602] focus:ring-2 focus:ring-[#F9C602]/20 transition-all outline-none"
            />
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 bg-[#1f1b3a] text-white px-7 py-3.5 font-semibold text-sm hover:bg-[#F9C602] hover:text-[#1f1b3a] transition-all duration-300 active:scale-[0.98] whitespace-nowrap"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>

          <p className="text-[#1f1b3a]/40 text-xs mt-6 text-center lg:text-left">
            Join 10,000+ subscribers. No spam, unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
