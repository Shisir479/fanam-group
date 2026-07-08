import { ReactNode } from "react";
import { BlockReveal } from "@/components/ui/BlockReveal";
import Image from "next/image";

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
    <section className="relative w-full h-[20vh] md:h-[60vh] min-h-[300px] md:min-h-[400px] flex items-center bg-brand-blue overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src={bgImage}
          alt={altText}
          fill
          className="object-cover opacity-80"
          priority
        />
      </div>

      <div className="container mx-auto px-5 md:px-16 relative z-20">
        <div className="max-w-3xl">
          <div className="flex flex-col gap-4">
            {subtitle && (
              <BlockReveal color="#ffffff">
                <div className="flex items-center text-[12px] md:text-[14px] font-semibold tracking-[0.2em] text-white/80 uppercase">
                  <span className="w-8 h-[2px] bg-white/80 mr-4"></span>
                  {subtitle}
                </div>
              </BlockReveal>
            )}
            <BlockReveal color="#ffffff" delay={0.2}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.2] uppercase">
                {title}
              </h1>
            </BlockReveal>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
