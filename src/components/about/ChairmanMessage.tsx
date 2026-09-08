"use client";

import React from "react";
import Image from "next/image";
import { Quote, Sparkles, Award, ShieldCheck } from "lucide-react";

export function ChairmanMessage({ data }: { data: any }) {
  return (
    <section className="relative fanam-section bg-[#392f5f] text-white overflow-hidden py-20 lg:py-28">
      {/* Ambient gold glow elements */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#f9c602]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-[#f9c602]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle geometric grid background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="fanam-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Side: Executive Portrait Showcase */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-[420px]">
              {/* Outer decorative gold halo */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#f9c602]/30 via-transparent to-[#f9c602]/30 rounded-[2rem] blur-sm" />

              {/* Main Portrait Frame */}
              <div className="relative aspect-[4/5] rounded-[1.8rem] overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl group">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                  alt="Chairman Md. Ashraful Islam"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Bottom Card Inside Image */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#f9c602] flex items-center justify-center text-[#392f5f] shadow-[0_0_15px_rgba(249,198,2,0.4)] shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base tracking-tight">
                        Md. Ashraful Islam
                      </h4>
                      <p className="text-[#f9c602] text-xs font-medium tracking-wide">
                        Chairman, Fanam Group
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Golden Seal */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-brand-gold to-brand-gold-dark text-[#1c1c1c] px-4 py-2 rounded-xl font-bold text-xs shadow-lg flex items-center gap-1.5 border border-white/20">
                <ShieldCheck className="w-4 h-4 text-[#392f5f]" />
                <span>Executive Leadership</span>
              </div>
            </div>
          </div>

          {/* Right Side: Message & Vision */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f9c602]/15 border border-[#f9c602]/30 text-[#f9c602] text-xs font-bold uppercase tracking-wider mb-6 self-start">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chairman&apos;s Message</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-[1.2] tracking-tight mb-6">
              Leading with Purpose,{" "}
              <span className="text-[#f9c602]">Building Enduring Trust</span>
            </h2>

            {/* Large Decorative Quote Icon */}
            <div className="text-[#f9c602]/25 mb-4">
              <Quote className="w-12 h-12" />
            </div>

            {/* Executive Message Content */}
            <div className="space-y-4 text-white/85 text-base sm:text-lg leading-relaxed font-normal">
              <p className="italic text-white font-medium border-l-2 border-[#f9c602] pl-4">
                &ldquo;At Fanam Group, we believe that enduring success is never accidental —
                it is forged through steadfast integrity, bold innovation, and an unwavering
                commitment to societal progress.&rdquo;
              </p>
              <p>
                Since our journey began, our north star has been clear: to build enterprises
                that deliver genuine, quantifiable value to our clients, partners, and the communities
                we proudly serve.
              </p>
              <p>
                As we continue to expand our footprint across multiple industries, our focus remains
                firm on sustainable industrial development, ethical corporate governance, and empowering
                future generations. Together, we are not merely building businesses — we are shaping
                a resilient legacy for tomorrow.
              </p>
            </div>

            {/* Signature & Credentials Block */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
              <div>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#f9c602]">
                  Md. Ashraful Islam
                </h4>
                <p className="text-white/60 text-sm font-medium mt-0.5">
                  Chairman, Fanam Group of Companies
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#f9c602] animate-pulse" />
                <span>Strategic Vision 2030</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
