"use client";

import React from "react";
import {
  Clock,
  Brain,
  Building,
  Briefcase,
  Handshake,
  Eye,
  Users,
  Lightbulb,
  ShieldCheck,
  Leaf,
  Sparkles,
} from "lucide-react";

const historyItems = [
  {
    year: "2012",
    title: "Foundation & Visionary Inception",
    desc: "Fanam Group was established in 2012 with a visionary commitment to build trusted, future-proof businesses across key growth sectors.",
    icon: <Building className="w-5 h-5 text-[#392f5f]" />,
  },
  {
    year: "2016",
    title: "Multi-Industry Enterprise Expansion",
    desc: "Expanded dynamically into real estate development, e-commerce, and specialized corporate services, establishing a respected multi-sector presence.",
    icon: <Briefcase className="w-5 h-5 text-[#392f5f]" />,
  },
  {
    year: "2020",
    title: "Strategic Alliances & Digital Transformation",
    desc: "Forged institutional partnerships and modernized operations with cloud technologies to accelerate high-velocity business delivery.",
    icon: <Handshake className="w-5 h-5 text-[#392f5f]" />,
  },
  {
    year: "2026+",
    title: "Sustainable Scale & Global Horizons",
    desc: "Accelerating green practices, international trading hubs, and cutting-edge ventures to shape a sustainable legacy for future generations.",
    icon: <Eye className="w-5 h-5 text-[#392f5f]" />,
  },
];

const philosophyItems = [
  {
    title: "Purpose-Driven Leadership",
    desc: "We lead with clarity and conviction, creating lasting positive impact through responsible stewardship and visionary long-term strategy.",
    icon: <Users className="w-5 h-5 text-[#392f5f]" />,
  },
  {
    title: "Innovation & Excellence",
    desc: "We continually raise the bar, integrating modern technologies and continuous improvement to deliver superior products and services.",
    icon: <Lightbulb className="w-5 h-5 text-[#392f5f]" />,
  },
  {
    title: "Integrity & Radical Trust",
    desc: "We build enduring stakeholder relationships through unwavering honesty, corporate transparency, and strict adherence to ethics.",
    icon: <ShieldCheck className="w-5 h-5 text-[#392f5f]" />,
  },
  {
    title: "Sustainable Development",
    desc: "We are deeply committed to environmentally conscious growth that enriches society, empowers communities, and protects the future.",
    icon: <Leaf className="w-5 h-5 text-[#392f5f]" />,
  },
];

export function CompanyHistory({ data }: { data: any }) {
  return (
    <section className="relative fanam-section bg-white overflow-hidden py-20 lg:py-28">
      <div className="fanam-container relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f9c602]/15 border border-[#f9c602]/35 text-[#392f5f] text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#392f5f]" />
            <span>Heritage & Philosophy</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#392f5f] leading-[1.2] tracking-tight mb-5">
            Our Journey & Guiding{" "}
            <span className="relative whitespace-nowrap text-[#392f5f]">
              Philosophy
              <span className="absolute left-0 -bottom-1 w-full h-1 bg-[#f9c602] rounded-full" />
            </span>
          </h2>

          <p className="text-gray-600 text-base md:text-lg font-normal leading-relaxed max-w-3xl mx-auto">
            Explore the milestones that have defined Fanam Group&apos;s ascent
            and the core philosophies that steer our daily actions toward
            enduring excellence.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column: Chronological History */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3.5 mb-8 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 rounded-xl bg-[#f9c602] flex items-center justify-center text-[#392f5f] shadow-sm">
                <Clock className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-[#392f5f]">
                  Corporate Evolution
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  A roadmap of growth and milestones
                </p>
              </div>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-[#f9c602]/40 space-y-6">
              {historyItems.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Node */}
                  <div className="absolute -left-[35px] sm:-left-[43px] top-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#f9c602] border-4 border-white shadow-md flex items-center justify-center text-[#392f5f] group-hover:scale-110 transition-transform duration-300" />

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#f9c602]/60 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#f9c602]/20 text-[#392f5f]">
                        {item.year}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                        {item.icon}
                      </div>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-[#392f5f] mb-2 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Philosophy */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3.5 mb-8 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 rounded-xl bg-[#392f5f] flex items-center justify-center text-[#f9c602] shadow-sm">
                <Brain className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-[#392f5f]">
                  Corporate Philosophy
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  The principles that anchor our choices
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {philosophyItems.map((item, idx) => (
                <div
                  key={idx}
                  className="group p-5 sm:p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#f9c602]/60 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#f9c602] text-[#392f5f] flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:scale-105 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-[#392f5f] mb-1.5 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
