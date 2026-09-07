"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function InquiryCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="w-full py-24 bg-[#0a0a0a] relative z-10 overflow-hidden">
      {/* Content */}
      <div className="relative z-10 fanam-container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto px-6">
        
        {/* Left Column: Get In Touch */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.3em] uppercase text-[#f9c602] mb-8"
          >
            <span className="w-8 h-px bg-[#f9c602]" />
            Get In Touch
            <span className="w-8 h-px bg-[#f9c602] lg:hidden" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-[50px] lg:text-[56px] font-serif text-white leading-[1.05] mb-8 tracking-tight"
          >
            Ready to Start Your
            <br />
            <span className="text-[#f9c602]">Next Project?</span>
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
              className="group relative inline-flex items-center gap-3 bg-[#f9c602] text-[#0a0a0a] px-8 py-4 rounded-full font-bold text-sm hover:bg-white transition-all duration-500 shadow-2xl hover:shadow-[#f9c602]/40"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                Contact Us
              </span>
              <span className="relative z-10 w-8 h-8 rounded-full bg-[#0a0a0a]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#0a0a0a] group-hover:text-white">
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-45" />
              </span>
            </Link>

            <Link
              href="/concern"
              className="group inline-flex items-center gap-3 bg-transparent text-white px-8 py-4 rounded-full font-medium text-sm border-2 border-white/30 hover:bg-white/10 hover:border-white/60 transition-all duration-300"
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
          className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-[2rem]"
        >
          <h3 className="text-2xl font-serif text-white mb-4 text-center lg:text-left">Stay Updated</h3>
          <p className="text-white/70 text-sm md:text-base mb-8 text-center lg:text-left">
            Subscribe to our newsletter and be the first to know about our latest projects, achievements, and exclusive insights.
          </p>
          
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-[#f9c602] focus:ring-2 focus:ring-[#f9c602]/20 transition-all outline-none"
            />
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 bg-[#f9c602] text-[#0a0a0a] px-8 py-4 rounded-full font-bold text-sm hover:bg-white transition-all duration-300 shadow-xl whitespace-nowrap"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>
          
          <p className="text-white/50 text-xs mt-6 text-center lg:text-left">
            Join 10,000+ subscribers. No spam, unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
