"use client";

import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Home } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: ReactNode;
  subtitle?: string;
  bgImage: string;
  altText?: string;
  children?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

// Helper function to capitalize and format route segments
const formatSegment = (segment: string) => {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function PageBanner({
  title,
  subtitle,
  bgImage,
  altText = "Banner Image",
  children,
  breadcrumbs,
}: PageBannerProps) {
  const pathname = usePathname();

  // Dynamically generate breadcrumbs if not provided
  let displayBreadcrumbs = breadcrumbs;

  if (!displayBreadcrumbs) {
    displayBreadcrumbs = [{ label: "Home", href: "/" }];

    // e.g. pathname = "/news-events/my-post"
    const segments = pathname.split("/").filter(Boolean);

    let currentPath = "";
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;
      displayBreadcrumbs!.push({
        label: formatSegment(segment),
        href: isLast ? undefined : currentPath,
      });
    });
  }

  return (
    <section className="relative w-full h-[40vh] min-h-[350px] md:min-h-[350px] flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt={altText}
          fill
          className="object-cover"
          priority
        />
        {/* Subtle Golden/Yellow Shade Overlay */}
        <div className="absolute inset-0 bg-[#f9c602]/30 z-10" />
        <div className="absolute inset-0 bg-black/70 z-10" />
      </div>

      <div className="container mx-auto px-5 md:px-16 relative z-20 h-full flex flex-col pt-28 md:pt-36 pb-12">
        {/* Breadcrumb at Top Left */}
        <div className="w-full flex justify-start mb-auto">
          <div className="flex items-center flex-wrap gap-2 text-white/90 text-[13px] md:text-[15px] font-medium drop-shadow-sm">
            {displayBreadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="flex items-center gap-1.5 hover:text-white text-white/80 transition-colors"
                  >
                    {crumb.label === "Home" && (
                      <Home size={14} className="mb-[1px]" />
                    )}
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="flex items-center gap-1.5 text-white">
                    {crumb.label === "Home" && (
                      <Home size={14} className="mb-[1px]" />
                    )}
                    {crumb.label}
                  </span>
                )}

                {index < displayBreadcrumbs.length - 1 && (
                  <span className="text-white/60">/</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Centered Content */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
          {/* Centered Title */}
          <div className="flex justify-center w-full">
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <SectionLabel dark>FANAM GROUP</SectionLabel>
              </div>
              <h1 className="text-center text-4xl font-bold uppercase leading-tight tracking-wide text-white drop-shadow-md md:text-5xl">
                {title}
                {typeof title === "string" && !title.endsWith(".") ? "." : ""}
              </h1>
            </div>
          </div>

          {/* Subtitle */}
          {subtitle && (
            <div className="flex justify-center w-full mt-1">
              <p className="text-base md:text-xl lg:text-2xl text-white uppercase tracking-wider drop-shadow-md text-center font-medium">
                {subtitle}
              </p>
            </div>
          )}

          {/* Optional Description / Children */}
          {children && (
            <div className="mt-8 text-white/90 text-sm md:text-lg max-w-2xl text-center font-medium leading-relaxed drop-shadow-md">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
