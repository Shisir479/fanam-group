import { BlockReveal } from "@/components/ui/BlockReveal";

export function AboutHero() {
  return (
    <section className="relative w-full h-[50vh] md:h-[60vh] min-h-[400px] flex items-center bg-[#003B6D] overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
          alt="Bonedi Office" 
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      <div className="container mx-auto px-5 md:px-16 relative z-20">
        <div className="max-w-3xl">
          <div className="flex flex-col gap-4">
            <BlockReveal color="#ffffff">
              <div className="flex items-center text-[12px] md:text-[14px] font-semibold tracking-[0.2em] text-white/80 uppercase">
                <span className="w-8 h-[2px] bg-white/80 mr-4"></span>
                Discover Our Story
              </div>
            </BlockReveal>
            <BlockReveal color="#ffffff" delay={0.2}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.2] uppercase">
                Building Legacies <br /> Since Inception
              </h1>
            </BlockReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
