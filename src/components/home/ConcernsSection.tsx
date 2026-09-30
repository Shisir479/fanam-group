"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building, Laptop, ShoppingBag, Plane, Sprout } from "lucide-react";
import { motion } from "framer-motion";

const defaultConcerns = [
  {
    category: "Real Estate",
    icon: Building,
    title: "Fanam Real Estate",
    description:
      "Landmark residential and commercial developments including Purbachal Fanam City, crafted for visionary living.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    href: "/concern",
  },
  {
    category: "Tech & Innovation",
    icon: Laptop,
    title: "Fanam IT & Software",
    description:
      "Pioneering digital solutions, cloud infrastructure, and custom software systems powering modern enterprise transformation.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    href: "/concern",
  },
  {
    category: "E-Commerce",
    icon: ShoppingBag,
    title: "Fanam Shop",
    description:
      "Next-generation retail platform with seamless digital shopping and a nationwide fulfillment network.",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
    href: "/concern",
  },
  {
    category: "Hospitality & Travel",
    icon: Plane,
    title: "Fanam Trip & Tours",
    description:
      "Curated domestic and international excursions, luxury packages, and corporate travel solutions executed to perfection.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
    href: "/concern",
  },
  {
    category: "Agro & Commodities",
    icon: Sprout,
    title: "Fanam Agro & Trading",
    description:
      "Sustainable agricultural supply chains and global commodity trading ensuring quality from source to distribution.",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop",
    href: "/concern",
  },
];

interface Concern {
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  image: string;
  href: string;
}

export function ConcernsSection({
  cmsData,
}: {
  cmsData?: Record<string, unknown>;
  branding?: Record<string, unknown>;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Dynamic concerns from CMS
  const cmsConcerns = (cmsData?.concerns ||
    cmsData?.enterprises ||
    []) as Array<Record<string, unknown>>;
  const concerns: Concern[] =
    cmsConcerns.length > 0
      ? cmsConcerns.map((concern: Record<string, unknown>) => {
          const iconMap: Record<
            string,
            React.ComponentType<{ className?: string }>
          > = {
            building: Building,
            laptop: Laptop,
            shoppingbag: ShoppingBag,
            plane: Plane,
            sprout: Sprout,
          };
          const IconComponent =
            iconMap[(concern.icon as string)?.toLowerCase()] || Building;
          return {
            category: (concern.category as string) || "",
            icon: IconComponent,
            title: (concern.title as string) || "",
            description: (concern.description as string) || "",
            image:
              ((concern.image as Record<string, unknown>)?.url as string) ||
              (concern.image as string) ||
              "",
            href: (concern.href as string) || "/concern",
          };
        })
      : defaultConcerns;

  // Track scrolling to determine active item
  useEffect(() => {
    const handleScroll = () => {
      const items = document.querySelectorAll(".concern-scroll-item");
      let active = 0;
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        // If the item is in the middle of the screen
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          active = index;
        }
      });
      setActiveIndex(active);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-[#EFECE6] relative w-full">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row relative">
          
          {/* Left Side: Sticky Image Area (Desktop Only) */}
          <div className="hidden lg:block w-1/2 sticky top-0 h-screen p-6 xl:p-10">
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl">
               {concerns.map((concern, idx) => (
                 <motion.div
                   key={idx}
                   className="absolute inset-0 w-full h-full"
                   initial={{ opacity: 0, scale: 1.05 }}
                   animate={{ 
                     opacity: activeIndex === idx ? 1 : 0,
                     scale: activeIndex === idx ? 1 : 1.05 
                   }}
                   transition={{ duration: 0.8, ease: "easeInOut" }}
                 >
                   <Image 
                     src={concern.image} 
                     alt={concern.title} 
                     fill 
                     className="object-cover"
                     priority={idx === 0} 
                   />
                   <div className="absolute inset-0 bg-black/10" />
                 </motion.div>
               ))}
            </div>
          </div>

          {/* Right Side: Scrollable Content List */}
          <div className="w-full lg:w-1/2 flex flex-col py-24 lg:py-48 px-6 lg:px-16 xl:px-24 border-l border-[#392F5F]/10">
             
             {/* Section Intro */}
             <div className="mb-32 text-center lg:text-left">
               <span className="text-[#392F5F] font-bold text-xs tracking-widest uppercase mb-4 block">
                 Enterprise Portfolio
               </span>
               <h2 className="text-[#1A1A1A] font-serif font-bold text-4xl md:text-5xl lg:text-[56px] leading-[1.1] tracking-tight">
                 Strategic <br /> Enterprises
               </h2>
             </div>

             {/* Concern Items */}
             {concerns.map((concern, idx) => (
               <div 
                 key={idx} 
                 className="concern-scroll-item min-h-[80vh] flex flex-col justify-center items-center text-center py-24 border-b border-[#392F5F]/10 last:border-b-0"
               >
                  <div className="text-lg md:text-xl font-medium tracking-widest text-[#392F5F]/60 mb-8">
                    0{idx + 1} / 0{concerns.length}
                  </div>
                  
                  <h3 className="text-3xl md:text-[44px] font-medium leading-[1.2] mb-12 text-[#1A1A1A] max-w-md">
                    {concern.title}
                  </h3>
                  
                  {/* Small Inline Image */}
                  <div className="relative w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden mb-12 shadow-lg">
                    <Image 
                      src={concern.image} 
                      alt={concern.title} 
                      fill 
                      className="object-cover" 
                    />
                  </div>

                  <p className="text-[#1A1A1A]/70 text-lg leading-relaxed mb-12 max-w-md">
                    {concern.description}
                  </p>

                  <Link 
                    href={concern.href} 
                    className="group inline-flex items-center gap-3 bg-[#1A1A1A] hover:bg-[#392F5F] text-white px-6 py-3.5 rounded-full w-fit transition-all duration-300"
                  >
                     <span className="font-semibold text-[15px]">Explore Services</span>
                     <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#1A1A1A]">
                        <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                     </div>
                  </Link>
               </div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
}
