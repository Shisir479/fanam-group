import Link from "next/link";
import Image from "next/image";

export function InquiryCTA() {
  return (
    <section className="relative w-full py-24 md:py-32 lg:py-40 flex items-center justify-center overflow-hidden mt-16">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop"
        alt="Contact Us Background"
        fill
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center max-w-3xl">
        <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-white/90 mb-4">
          <span className="w-2 h-2 rounded-full border border-[#f8a502] bg-transparent"></span>
          Contact Us
        </div>

        <h2 className="text-4xl md:text-[50px] lg:text-[56px] font-serif text-white leading-[1.1] mb-6">
          Are You Looking <br className="hidden md:block" /> To Buy A Home?
        </h2>

        <p className="text-white/80 text-[13px] md:text-sm leading-relaxed font-medium mb-10 max-w-lg mx-auto">
          Explore Portland's real estate opportunities and discover your next
          home in one of the Pacific Northwest's most dynamic cities.
        </p>

        <Link
          href="/contact"
          className="bg-[#084E37] hover:bg-[#063b2a] text-white text-[14px] font-semibold py-3.5 px-8 rounded-[4px] transition-colors inline-block"
        >
          Contact Us Today
        </Link>
      </div>
    </section>
  );
}
