import { BlockReveal } from "@/components/ui/BlockReveal";
import { Counter } from "@/components/ui/Counter";

export function CompanyProfile() {
  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto px-5 md:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Left Text Side */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="flex flex-col gap-4 mb-2">
              <BlockReveal color="var(--color-brand-blue)">
                <div className="flex items-center text-[14px] md:text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
                  COMPANY PROFILE
                </div>
              </BlockReveal>
              <BlockReveal color="var(--color-brand-blue)" delay={0.2}>
                <h2 className="text-2xl md:text-[34px] font-bold text-brand-blue leading-[1.3] uppercase">
                  Pioneering Luxury Real Estate
                </h2>
              </BlockReveal>
            </div>

            <p className="text-gray-600 text-base leading-relaxed">
              At Bonedi Homes, we do more than just build structures; we create
              legacies. With a deep-rooted commitment to architectural brilliance
              and uncompromising quality, we have established ourselves as
              pioneers in the luxury real estate sector.
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              Our projects span across prime locations, offering unparalleled
              convenience, state-of-the-art amenities, and a community-centric
              lifestyle. We pride ourselves on our meticulous attention to
              detail, uncompromising quality, and a customer-first approach that
              ensures every Bonedi home is a masterpiece.
            </p>

            <div className="grid grid-cols-2 gap-8 mt-6">
              <div className="flex flex-col gap-2">
                <h4 className="text-4xl font-bold text-brand-blue">
                  <Counter end={15} suffix="+" duration={600} />
                </h4>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Years Experience
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-4xl font-bold text-brand-blue">
                  <Counter end={50} suffix="+" duration={800} />
                </h4>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Projects Completed
                </p>
              </div>
            </div>
          </div>

          {/* Right Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden shadow-lg border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop"
                alt="Modern Apartment Building"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-[8px] border-white/20 pointer-events-none"></div>
            </div>
            {/* Decorative block */}
            <div className="hidden lg:block absolute -bottom-6 -left-6 w-32 h-32 bg-gray-100 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
