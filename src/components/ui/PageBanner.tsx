import { ReactNode } from "react";
import { BlockReveal } from "@/components/ui/BlockReveal";
import Image from "next/image";
import Link from "next/link";

interface PageBannerProps {
  title: ReactNode;
  subtitle?: string;
  bgImage: string;
  altText?: string;
  children?: ReactNode;
}

export function PageBanner({
  title,
  subtitle,
  bgImage,
  altText = "Banner Image",
  children,
}: PageBannerProps) {
  return (
    <section className="relative w-full h-[40vh] min-h-[300px] md:min-h-[400px] flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Background with light yellow shade overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt={altText}
          fill
          className="object-cover"
          priority
        />
        {/* Yellow/Gold Shade Overlay */}
        <div className="absolute inset-0 bg-[#f9c602]/30 z-10" />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      <div className="container mx-auto px-5 md:px-16 relative z-20 flex flex-col items-center justify-center pt-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Centered Title */}
          <div className="flex justify-center w-full">
            <BlockReveal color="#ffffff" delay={0}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-wide drop-shadow-md mb-4 text-center">
                {title}
              </h1>
            </BlockReveal>
          </div>

          {/* Breadcrumb */}
          <div className="flex justify-center w-full mt-2">
            <BlockReveal color="#ffffff" delay={0.2}>
              <div className="flex items-center justify-center gap-4 text-white text-[11px] md:text-[13px] font-bold tracking-[0.2em] uppercase drop-shadow-sm">
                <Link
                  href="/"
                  className="hover:text-[#f9c602] transition-colors"
                >
                  Homepage
                </Link>
                <span>•</span>
                <span className="text-white/80">{title}</span>
              </div>
            </BlockReveal>
          </div>

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
