"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, Users, ArrowUpRight } from "lucide-react";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["500", "600", "700"] });

const YELLOW = "#F9C602";
const DARK = "#06202A";

export function AboutSection({
  cmsData,
  mainSettings,
}: {
  cmsData?: Record<string, unknown>;
  mainSettings?: Record<string, unknown>;
}) {
  return (
    <section className="relative w-full bg-white py-12 md:py-18 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          {/* ───────── Left: geometric triangles ───────── */}
          <div className="relative w-full max-w-[540px] mx-auto aspect-[1.15] lg:ml-auto">

            {/* Pale beige wedge behind the images */}
            <div
              className="absolute left-[47%] top-[40%] w-[52%] h-[50%] bg-[#F6F5F2] z-0"
              style={{ clipPath: "polygon(0 100%, 100% 0, 100% 22%, 25% 100%)" }}
            />

            {/* Small yellow triangle (points right) */}
            <motion.div
              animate={{
                rotate: [0, 180, 0],
                opacity: [0.4, 1, 0.4],
                scale: [0.85, 1.1, 0.85]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute left-[19%] top-[35%] w-[12%] h-[15%] z-10 origin-center"
              style={{
                background: YELLOW,
                clipPath: "polygon(0 0, 100% 50%, 0 100%)",
              }}
            />

            {/* Top image triangle (points right) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="absolute left-[52%] top-[5%] w-[47%] h-[75%] z-10"
              style={{ clipPath: "polygon(0 0, 0 100%, 100% 50%)" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
                alt="Business meeting"
                fill
                sizes="300px"
                className="object-cover object-[30%_center] grayscale"
              />
              <div className="absolute inset-0 bg-[#9fc4cf]/25 mix-blend-multiply" />
            </motion.div>

            {/* Bottom image triangle (points left) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute left-0 top-[38%] w-[48%] h-[60%] z-20"
              style={{ clipPath: "polygon(100% 0, 100% 100%, 0 50%)" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                alt="Team working"
                fill
                sizes="300px"
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-[#9fc4cf]/25 mix-blend-multiply" />
            </motion.div>

            {/* Big yellow triangle (bottom left, points right, transparent overlay) */}
            <motion.div
              animate={{ x: [0, 40, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute left-21 top-[60%] w-[25%] h-[35%] z-30 mix-blend-multiply opacity-90"
              style={{
                background: YELLOW,
                clipPath: "polygon(0 0, 0 100%, 100% 50%)",
              }}
            />
          </div>

          {/* ───────── Right: content ───────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col max-w-[520px]"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-2">
              <span
                className="font-bold tracking-[0.15em] text-[11px]"
                style={{ color: YELLOW }}
              >
                &lt;&lt;&lt;
              </span>
              <span className="text-gray-500 font-semibold tracking-wide uppercase text-[12px]">
                Get to know us
              </span>
              <span
                className="font-bold tracking-[0.15em] text-[11px]"
                style={{ color: YELLOW }}
              >
                &gt;&gt;&gt;
              </span>
            </div>

            {/* Heading */}
            <h2
              className={`${syne.className} font-medium text-3xl md:text-4xl leading-[1.15] mb-6`}
              style={{ color: DARK }}
            >
              We&apos;re Partner of Your Growth
            </h2>

            <p className="text-gray-500 text-[13px] md:text-sm leading-relaxed mb-10">
              Fanam Group is a diversified, multi-industry powerhouse united under a gold standard of uncompromising quality. We provide visionary leadership and sustainable development solutions tailored to your business goals.
            </p>

            {/* Features + floating card */}
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <div className="flex flex-col flex-1">
                <div className="flex gap-4 pb-6">
                  <Trophy
                    className="w-9 h-9 shrink-0 stroke-[1.25] mt-1"
                    style={{ color: YELLOW }}
                  />
                  <div>
                    <h4
                      className={`${syne.className} font-semibold text-[16px] mb-1 pb-1`}
                      style={{ color: DARK }}
                    >
                      Award Winning Group
                    </h4>
                    <p className="text-gray-500 text-[12px] leading-relaxed">
                      Recognized globally for delivering excellence across diverse sectors.
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-[#e9e4cf]" />

                <div className="flex gap-4 pt-6">
                  <TrendingUp
                    className="w-9 h-9 shrink-0 stroke-[1.25] mt-1"
                    style={{ color: YELLOW }}
                  />
                  <div>
                    <h4
                      className={`${syne.className} font-semibold text-[16px] mb-1 pb-1`}
                      style={{ color: DARK }}
                    >
                      Highest Success Rates
                    </h4>
                    <p className="text-gray-500 text-[12px] leading-relaxed">
                      Proven track record of driving sustainable innovation for our partners.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating card: square corners, full height of features */}
              <div className="flex flex-col items-center justify-center text-center bg-[#F3F2ED] px-4 py-6 sm:w-[120px] shrink-0 sm:self-stretch">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center mb-3"
                  style={{ background: YELLOW }}
                >
                  <Users className="w-4 h-4" style={{ color: DARK }} />
                </div>
                <p
                  className={`${syne.className} font-medium text-[12px] leading-snug`}
                  style={{ color: DARK }}
                >
                  Trusted By
                  <br />
                  Global
                  <br />
                  Partners
                  <br />
                  Worldwide
                </p>
              </div>
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center gap-3 bg-[#392F5F] hover:bg-[#F6B705] text-white hover:text-[#18202b] px-5 py-2.5 rounded-full w-fit transition-all duration-300"
            >
              <span className="font-bold text-[13px]">Discover More</span>
              <div className="w-7 h-7 bg-white/20 group-hover:bg-[#18202b]/10 rounded-full flex items-center justify-center text-white group-hover:text-[#18202b] transition-colors">
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}