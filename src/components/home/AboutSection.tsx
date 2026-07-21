import Image from "next/image";
import Link from "next/link";
import { BlockReveal } from "@/components/ui/BlockReveal";
import { getAboutPublic } from "@/services/about.service";

export async function AboutSection() {
  let aboutData: any = null;
  try {
    const res = await getAboutPublic();
    if (res?.success || res?.data) {
      aboutData = res.data;
    }
  } catch (error) {
    // fallback to static
  }

  const heading = aboutData?.companyHeading || "Redefining your standard of living";
  const title =  "ABOUT US";
  const description = aboutData?.companyDescription || `<p>Bonedi Homes is committed to building extraordinary spaces that reflect architectural brilliance and uncompromising quality. Our projects span across prime locations, offering unparalleled convenience, state-of-the-art amenities, and a community-centric lifestyle.</p>`;
  const imageUrl = aboutData?.companyImage?.url || "https://images.unsplash.com/photo-1637909336968-0687e3086c63?q=80&w=870&auto=format&fit=crop";

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto px-5 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center overflow-hidden">
          {/* Left Column */}
          <div className="flex flex-col gap-5 min-w-0">
            <BlockReveal color="var(--color-brand-blue)">
              <div className="flex items-center text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
                {title}
              </div>
            </BlockReveal>

            <BlockReveal color="var(--color-brand-blue)" delay={0.2}>
              <h2 className="text-2xl md:text-[34px] font-bold text-brand-blue leading-[1.2] uppercase">
                {heading}
              </h2>
            </BlockReveal>

            {/* Description with line clamp */}
            <div
              className="text-gray-700 leading-relaxed text-sm md:text-[14px] mt-2 font-semibold prose max-w-none w-full"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 6,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
              dangerouslySetInnerHTML={{ __html: description }}
            />

            {/* See More Button */}
            <div className="md:mt-4 mt-3 self-start">
              <Link
                href="/about"
                className="group relative inline-flex items-center gap-2 overflow-hidden border border-brand-blue px-6 py-2.5 text-sm font-bold uppercase text-brand-blue transition-colors duration-300 hover:text-white"
              >
                <span className="absolute inset-0 h-full w-full -translate-x-full bg-brand-blue transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative z-10 tracking-wider">See More</span>
                <svg
                  className="relative z-10 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column (Image) */}
          <div className="relative w-full h-[220px] md:h-[350px] overflow-hidden group">
            <Image
              src={imageUrl}
              alt={heading}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
