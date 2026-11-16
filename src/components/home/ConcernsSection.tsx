"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  cloudinaryImageLoader,
  isCloudinaryImage,
} from "@/lib/cloudinary-image-loader";
import {
  ArrowUpRight,
  Building,
  Laptop,
  ShoppingBag,
  Plane,
  Sprout,
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { REAL_ESTATE_PROJECTS } from "@/lib/real-estate-projects";

const defaultConcerns = [
  {
    category: "Real Estate",
    icon: Building,
    title: "Fanam Real Estate",
    description:
      "Landmark residential and commercial developments shaping visionary living.",
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

interface ApiConcern {
  category?: string;
  name: string;
  shortDescription?: string;
  heroImage?: { url?: string };
  slug?: string;
}

function ContainedConcernImage({
  src,
  alt,
  sizes,
  priority = false,
  onLoad,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  onLoad: React.ReactEventHandler<HTMLImageElement>;
}) {
  const loader = isCloudinaryImage(src) ? cloudinaryImageLoader : undefined;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      loader={loader}
      sizes={sizes}
      className="object-contain"
      onLoad={onLoad}
      priority={priority}
    />
  );
}

export function ConcernsSection({
  cmsData,
  apiConcerns,
}: {
  cmsData?: Record<string, unknown>;
  branding?: Record<string, unknown>;
  apiConcerns?: ApiConcern[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageAspectRatios, setImageAspectRatios] = useState<
    Record<string, number>
  >({});

  let concerns: Concern[] = defaultConcerns;

  if (apiConcerns && apiConcerns.length > 0) {
    const icons = [Building, Laptop, ShoppingBag, Plane, Sprout];
    concerns = apiConcerns.map((concern, i) => {
      const category = concern.category || concern.name;
      const title = concern.name;
      const description = concern.shortDescription || "";

      return {
        category,
        icon: icons[i % icons.length],
        title,
        description,
        image: concern.heroImage?.url || "",
        href: concern.slug ? `/concern/${concern.slug}` : "/concern",
      };
    });
  } else {
    // Dynamic concerns from CMS fallback
    const cmsConcerns = (cmsData?.concerns ||
      cmsData?.enterprises ||
      []) as Array<Record<string, unknown>>;
    if (cmsConcerns.length > 0) {
      concerns = cmsConcerns.map((concern: Record<string, unknown>) => {
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
        const category = (concern.category as string) || "";
        const title = (concern.title as string) || "";
        const description = (concern.description as string) || "";

        return {
          category,
          icon: IconComponent,
          title,
          description,
          image:
            ((concern.image as Record<string, unknown>)?.url as string) ||
            (concern.image as string) ||
            "",
          href: (concern.href as string) || "/concern",
        };
      });
    }
  }

  const activeImageRatio =
    imageAspectRatios[concerns[activeIndex]?.image] || 4 / 3;
  const updateImageAspectRatio = (
    src: string,
    event: React.SyntheticEvent<HTMLImageElement>,
  ) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    if (!naturalWidth || !naturalHeight) return;

    const ratio = naturalWidth / naturalHeight;
    setImageAspectRatios((current) =>
      current[src] === ratio ? current : { ...current, [src]: ratio },
    );
  };

  // Track scrolling to determine active item
  useEffect(() => {
    const handleScroll = () => {
      const items = document.querySelectorAll(".concern-scroll-item");
      let active = 0;
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        // If the item is in the middle of the screen
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          active = index;
        }
      });
      setActiveIndex(active);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-[#EFECE6] relative w-full py-16 md:py-20">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Section Intro - Moved to Top */}
        <div className="mb-16 text-center">
          <div className="mb-6">
            <SectionLabel>Enterprise Portfolio</SectionLabel>
          </div>
          <h2 className="text-[#392F5F] font-serif font-medium text-3xl md:text-4xl lg:text-[44px] leading-[1.2] tracking-tight">
            Strategic Enterprises
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row relative">
          {/* Left Side: Sticky Image Area (Desktop Only) */}
          <div className="hidden lg:block w-1/2 sticky top-24 self-start">
            <div
              className="relative mx-auto overflow-hidden rounded-[2rem]"
              style={{
                aspectRatio: activeImageRatio,
                width: `min(100%, ${activeImageRatio * 80}vh)`,
              }}
            >
              {concerns.map((concern, idx) => (
                <motion.div
                  key={idx}
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{
                    opacity: activeIndex === idx ? 1 : 0,
                    scale: activeIndex === idx ? 1 : 1.05,
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <ContainedConcernImage
                    src={concern.image}
                    alt={concern.title}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    onLoad={(event) =>
                      updateImageAspectRatio(concern.image, event)
                    }
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Scrollable Content List */}
          <div className="w-full lg:w-1/2 flex flex-col px-4 lg:px-12 xl:px-20 border-l border-[#392F5F]/10">
            {/* Concern Items */}
            {concerns.map((concern, idx) => (
              <div
                key={idx}
                className="concern-scroll-item flex flex-col justify-center items-center text-center py-12 lg:py-12 border-b border-[#392F5F]/10 last:border-b-0 min-h-[55vh]"
              >
                <div className="text-lg md:text-xl font-medium tracking-widest text-[#392F5F]/60 mb-8">
                  {String(idx + 1).padStart(2, "0")} /{" "}
                  {String(concerns.length).padStart(2, "0")}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold leading-[1.2] mb-10 text-[#392F5F] max-w-md">
                  {concern.title}
                </h3>

                {/* Small Inline Image */}
                <div
                  className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl mb-12"
                  style={{
                    aspectRatio: imageAspectRatios[concern.image] || 4 / 3,
                    width: `min(100%, ${(imageAspectRatios[concern.image] || 4 / 3) * 50}vh)`,
                  }}
                >
                  <ContainedConcernImage
                    src={concern.image}
                    alt={concern.title}
                    sizes="(max-width: 640px) calc(100vw - 2rem), 384px"
                    onLoad={(event) =>
                      updateImageAspectRatio(concern.image, event)
                    }
                  />
                </div>

                <p className="text-[#392F5F]/80 text-base leading-relaxed mb-10 max-w-md">
                  {concern.description}
                </p>

                {`${concern.category} ${concern.title}`
                  .toLowerCase()
                  .includes("real estate") && (
                  <div className="mb-10 w-full max-w-md">
                    <h4 className="mb-3 text-base font-semibold text-[#392F5F]">
                      Key Projects
                    </h4>
                    <ul className="flex flex-col items-center gap-2 text-base text-[#392F5F]/80">
                      {REAL_ESTATE_PROJECTS.map((project) => (
                        <li key={project} className="flex items-center gap-3">
                          <span
                            aria-hidden="true"
                            className="h-2 w-2 shrink-0 rounded-full bg-[#f9c602]"
                          />
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link
                  href={concern.href}
                  className="group inline-flex items-center gap-3 bg-[#F9C602] hover:bg-[#392F5F] text-[#392F5F] hover:text-white px-5 py-2.5 rounded-full w-fit transition-all duration-300"
                >
                  <span className="font-semibold text-sm">
                    Explore Services
                  </span>
                  <div className="w-6 h-6 bg-[#392F5F]/10 group-hover:bg-white/20 rounded-full flex items-center justify-center text-[#392F5F] group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
