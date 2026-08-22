import Image from "next/image";
import Link from "next/link";
import { Check, ArrowUpRight, ArrowRight } from "lucide-react";

export function AboutSection() {
  const points = [
    "A trusted name in Bangladesh's business landscape.",
    "Real estate, e-commerce, trading, FMCG, and more.",
    "Long-term relationships built on transparency.",
    "Skilled professionals across every sector.",
    "Nearly a decade of consistent growth.",
  ];

  return (
    <section className="fanam-section bg-white">
      <div className="fanam-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="flex flex-col gap-4 lg:col-span-7">
            <h3 className="text-[#f9c602] font-serif font-semibold text-base md:text-lg tracking-wide">
              About Fanam Group
            </h3>

            <h2 className="text-[#181428] font-serif font-bold text-2xl md:text-3xl leading-snug mb-1">
              Fanam Group Trusted Growth Since
              <br />
              2018
            </h2>

            <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed max-w-xl">
              Starting as a real estate venture in 2018, Fanam Group has grown
              into a diversified multinational conglomerate spanning real
              estate, e-commerce, trading, hospitality, and more built on trust,
              quality, and innovation.
            </p>

            <ul className="flex flex-col gap-3 mt-2">
              {points.map((point, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full border border-[#22c55e] flex items-center justify-center">
                    <Check
                      className="w-2.5 h-2.5 text-[#22c55e]"
                      strokeWidth={3}
                    />
                  </div>
                  <span className="text-[#181428]/90 font-medium text-sm">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 bg-[#181428] hover:bg-[#f9c602] border border-[#181428] hover:border-[#f9c602] shadow-lg text-white hover:text-[#181428] px-5 py-1.5 rounded-full font-medium transition-all duration-300"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1 text-sm">
                  Explore Our Details
                </span>
                <span className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-[#181428]/10 flex items-center justify-center transition-all duration-300 group-hover:-translate-x-1 group-hover:-rotate-45">
                  <ArrowRight className="w-3.5 h-3.5 text-white group-hover:text-[#181428]" />
                </span>
              </Link>
            </div>
          </div>
          {/* Right Column (Image with decorative elements) */}
          <div className="relative w-full aspect-square max-w-[450px] md:max-w-[550px] mx-auto lg:col-span-5 lg:ml-auto mt-12 lg:mt-0">
            {/* Top Left Border Line (thin gold corner bracket) */}
            <div className="absolute -top-5 -left-5 w-[60%] h-[80%] border-t border-l border-[#f9c602] rounded-tl-3xl z-0" />

            {/* Bottom Right Border Line (thin gold corner bracket) */}
            <div className="absolute -bottom-5 -right-5 w-[64%] h-[85%] border-b border-r border-[#f9c602] rounded-br-3xl z-0" />

            {/* Top Right Gold Dots Pattern */}
            <div className="absolute -top-8 -right-6 md:-top-10 md:-right-8 w-28 h-28 z-0 opacity-90">
              <svg width="100%" height="100%">
                <pattern
                  id="dots"
                  x="0"
                  y="0"
                  width="14"
                  height="14"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1.5" cy="1.5" r="1.5" fill="#f9c602" />
                </pattern>
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="url(#dots)"
                />
              </svg>
            </div>

            {/* Solid Frame Container */}
            <div className="relative w-full h-full p-2.5 md:p-3 z-10 bg-white border border-gray-100 rounded-3xl shadow-2xl">
              {/* Main Image */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
                  alt="Fanam Group Team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Floating Solid Card (Bottom Left) */}
            <div className="absolute -bottom-14 -left-6 md:left-6 z-20">
              <div className="bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-2xl flex flex-col items-center gap-3 min-w-[160px]">
                <div className="flex -space-x-3">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop"
                    width={40}
                    height={40}
                    alt="User 1"
                    className="rounded-full border-2 border-white shadow-sm w-10 h-10 object-cover"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop"
                    width={40}
                    height={40}
                    alt="User 2"
                    className="rounded-full border-2 border-white shadow-sm w-10 h-10 object-cover"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop"
                    width={40}
                    height={40}
                    alt="User 3"
                    className="rounded-full border-2 border-white shadow-sm w-10 h-10 object-cover"
                  />
                  <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm bg-[#f9c602] flex items-center justify-center text-[#181428] text-lg font-bold z-10 leading-none">
                    +
                  </div>
                </div>
                <p className="text-[#181428] font-bold text-sm whitespace-nowrap">
                  8000+ reviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
