import { BlockReveal } from "@/components/ui/BlockReveal";

export function VisionMission() {
  return (
    <section className="w-full py-16 md:py-24 bg-[#003B6D] text-white">
      <div className="container mx-auto px-5 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 relative">
          {/* Vertical divider on desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/20 transform -translate-x-1/2"></div>

          {/* Vision */}
          <div className="flex flex-col gap-6 md:pr-8">
            <div className="flex flex-col gap-4">
              <BlockReveal color="#ffffff">
                <div className="flex items-center text-[14px] md:text-[16px] font-semibold tracking-[0.2em] text-white/60 uppercase">
                  OUR VISION
                </div>
              </BlockReveal>
              <BlockReveal color="#ffffff" delay={0.2}>
                <h2 className="text-2xl md:text-[34px] font-bold text-white leading-[1.3] uppercase">
                  SHAPING TOMORROW
                </h2>
              </BlockReveal>
            </div>
            <p className="text-white/80 text-lg leading-relaxed font-light">
              To be the most trusted and globally recognized real estate
              developer, setting new benchmarks in architectural innovation,
              sustainability, and community living. We envision a future where
              every Bonedi home stands as a symbol of timeless elegance and
              unmatched quality.
            </p>
          </div>

          {/* Mission */}
          <div className="flex flex-col gap-6 md:pl-8">
            <div className="flex flex-col gap-4">
              <BlockReveal color="#ffffff">
                <div className="flex items-center text-[14px] md:text-[16px] font-semibold tracking-[0.2em] text-white/60 uppercase">
                  OUR MISSION
                </div>
              </BlockReveal>
              <BlockReveal color="#ffffff" delay={0.2}>
                <h2 className="text-2xl md:text-[34px] font-bold text-white leading-[1.3] uppercase">
                  DELIVERING EXCELLENCE
                </h2>
              </BlockReveal>
            </div>
            <p className="text-white/80 text-lg leading-relaxed font-light">
              To consistently deliver premium real estate projects that exceed
              customer expectations through meticulous planning, cutting-edge
              technology, and a commitment to environmental stewardship. We
              strive to create value for our clients, partners, and the
              communities we serve.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
