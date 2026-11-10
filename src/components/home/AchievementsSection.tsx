"use client";

import React from "react";
import Image from "next/image";
import CountUp from "react-countup";
import { SectionLabel } from "@/components/ui/SectionLabel";

const defaultAchievements = [
  {
    id: "01",
    stat: "25+",
    label: "Years of Excellence",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
    type: "up",
  },
  {
    id: "02",
    stat: "10+",
    label: "Business Ventures",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop",
    type: "down",
  },
  {
    id: "03",
    stat: "5000k+",
    label: "Dedicated Employees",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600&auto=format&fit=crop",
    type: "up",
  },
  {
    id: "04",
    stat: "50k+",
    label: "Happy Customers",
    image:
      "https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "down",
  },
  {
    id: "05",
    stat: "10+",
    label: "Global Presence",
    image:
      "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?q=80&w=600&auto=format&fit=crop",
    type: "up",
  },
];

const parseStat = (statStr: string) => {
  const match = statStr.match(/([\d,\.]+)(.*)/);
  if (match) {
    return {
      num: parseFloat(match[1].replace(/,/g, "")),
      suffix: match[2],
    };
  }
  return { num: 0, suffix: statStr };
};

export function AchievementsSection({
  cmsData,
}: {
  cmsData?: Record<string, unknown>;
}) {
  // Homepage CMS achievements use the number/title shape from AchievementSchema.
  const cmsAchievements = (cmsData?.achievements || []) as Array<
    Record<string, unknown>
  >;

  const validCmsAchievements = cmsAchievements
    .map((item, index) => {
      const fallback = defaultAchievements[index % defaultAchievements.length];

      return {
        id: (item._id as string) || `${index + 1}`,
        stat: (item.number as string) || "",
        label: (item.title as string) || "",
        image: fallback.image,
        type: fallback.type,
      };
    })
    .filter((item) => item.stat && item.label);

  const achievements =
    validCmsAchievements.length > 0
      ? validCmsAchievements
      : defaultAchievements;

  return (
    <section className="fanam-section py-16 md:py-20 bg-gradient-to-b from-white via-[#F3F0FA] to-white relative overflow-hidden shadow-[0_12px_24px_-20px_rgba(249,198,2,0.34),0_2px_8px_-4px_rgba(57,47,95,0.16)] z-[1]">
      <div className="fanam-container">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <div className="mb-6">
            <SectionLabel>Milestones</SectionLabel>
          </div>
          <h2 className="text-[#392F5F] font-serif font-medium text-3xl md:text-4xl lg:text-[44px] leading-[1.2] tracking-tight mb-6">
            Legacy of Achievement
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-16 gap-x-4 lg:gap-x-6">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="flex flex-col w-full relative group max-w-[280px] mx-auto lg:max-w-none [font-family:ui-sans-serif,system-ui]"
            >
              {/* Top Half */}
              <div className="w-full aspect-[1.8/1] flex flex-col justify-end">
                {item.type === "up" ? (
                  <div className="relative w-full h-full rounded-t-[1000px] border-t-2 border-x-2 border-b-0 border-[#f9c602] shadow-sm overflow-hidden">
                    <Image
                      src={item.image}
                      fill
                      sizes="(max-width: 639px) 280px, (max-width: 1023px) 50vw, 20vw"
                      className="object-cover"
                      alt={item.label}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full pb-6">
                    <h3 className="text-[#392F5F] text-3xl xl:text-4xl font-bold leading-none mb-1.5">
                      {(() => {
                        const { num, suffix } = parseStat(item.stat);
                        if (num === 0) return item.stat;
                        return (
                          <CountUp
                            end={num}
                            suffix={suffix}
                            enableScrollSpy
                            scrollSpyOnce
                            duration={2.5}
                          />
                        );
                      })()}
                    </h3>
                    <p className="text-gray-600 text-xs xl:text-sm text-center px-1 font-medium">
                      {item.label}
                    </p>
                  </div>
                )}
              </div>

              {/* Middle Number Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                {/* Simulated Transparent Gap */}
                <div className="rounded-full bg-white p-[2px]">
                  {/* Glass Circle */}
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-md">
                    <span className="text-[#392F5F] font-bold text-lg md:text-xl">
                      {item.id}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Half */}
              <div className="w-full aspect-[1.8/1] flex flex-col justify-start">
                {item.type === "down" ? (
                  <div className="relative w-full h-full rounded-b-[1000px] border-b-2 border-x-2 border-t-0 border-[#f9c602] shadow-sm overflow-hidden">
                    <Image
                      src={item.image}
                      fill
                      sizes="(max-width: 639px) 280px, (max-width: 1023px) 50vw, 20vw"
                      className="object-cover"
                      alt={item.label}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full pt-6">
                    <h3 className="text-[#392F5F] text-3xl xl:text-4xl font-bold leading-none mb-1.5">
                      {(() => {
                        const { num, suffix } = parseStat(item.stat);
                        if (num === 0) return item.stat;
                        return (
                          <CountUp
                            end={num}
                            suffix={suffix}
                            enableScrollSpy
                            scrollSpyOnce
                            duration={2.5}
                          />
                        );
                      })()}
                    </h3>
                    <p className="text-gray-600 text-xs xl:text-sm text-center px-1 font-medium">
                      {item.label}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
