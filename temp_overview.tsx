import Image from "next/image";

export function CompanyOverview({ data }: { data?: any }) {
  return (
    <section className="w-full bg-white py-16 lg:py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="flex flex-col gap-6 flex-1 pt-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full border border-[#084E37] bg-transparent"></span>
                Overview
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-[40px] leading-[1.2] font-serif text-[#181428] max-w-2xl">
                Planned With Intention, Built To
                <br className="hidden md:block" /> Last
              </h2>
            </div>

            <div className="max-w-xl">
              <p className="text-[#181428]/80 leading-relaxed text-sm font-medium">
                From start to finish, Sam Daniels Realty made the entire process
                smooth and stress-free. Their expertise and guidance were
                invaluable, and we highly recommend them to anyone in need of
                real estate services. With her years of experience, impressive
                property portfolio, celebrity clientele, and unparalleled
                knowledge of the market and pedigree estates.
              </p>
            </div>

            <div className="flex items-center gap-4 mt-2">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                  alt="Mona Simpson"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm font-semibold text-[#181428]">
                  Mona Simpson
                </h4>
                <p className="text-xs font-medium text-[#084E37]">
                  CEO, Portland Realty
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-[350px] xl:w-[400px] relative shrink-0">
            <div className="relative w-full aspect-square overflow-hidden rounded-[2px] rounded-tl-[40px] rounded-br-[40px] shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop"
                alt="Overview Image"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
