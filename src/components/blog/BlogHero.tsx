import { BlockReveal } from "@/components/ui/BlockReveal";

export function BlogHero() {
  return (
    <section className="relative w-full h-[50vh] md:h-[60vh] min-h-[400px] flex items-center bg-[#003B6D] overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=2070&auto=format&fit=crop"
          alt="Bonedi Homes News and Insights"
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      <div className="container mx-auto px-5 md:px-16 relative z-20">
        <div className="max-w-3xl">
          <div className="flex flex-col gap-4">
            <BlockReveal color="#ffffff">
              <div className="flex items-center text-[12px] md:text-[14px] font-semibold tracking-[0.2em] text-white/80 uppercase">
                <span className="w-8 h-[2px] bg-white/80 mr-4"></span>
                Insights & Updates
              </div>
            </BlockReveal>
            <BlockReveal color="#ffffff" delay={0.2}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.2] uppercase">
                News & <br /> Perspectives
              </h1>
            </BlockReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
