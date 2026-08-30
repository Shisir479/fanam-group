import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    title: "HOME SEARCH",
    desc: "Searching for a new home is an exciting journey for buyers and sellers.",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    link: "#",
  },
  {
    title: "HOME VALUATION",
    desc: "Accurate home valuation ensures fair pricing for sellers & appropriate offers for buyers.",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    link: "#",
  },
  {
    title: "LET'S CONNECT",
    desc: "Whether you're looking to buy, sell, or simply have questions about the real estate.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    link: "#",
  },
  {
    title: "HOME VALUATION",
    desc: "Accurate home valuation ensures fair pricing for sellers & appropriate offers for buyers.",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop",
    link: "#",
  },
];

export function AboutSection({ aboutData }: { aboutData?: any }) {
  return (
    <section className="w-full bg-white py-16 lg:py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-12">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-gray-700">
              <span className="w-2.5 h-2.5 rounded-full border border-[#0b6b4a] bg-transparent"></span>
              Master Plan
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[40px] leading-tight font-serif text-[#181428] lg:whitespace-nowrap">
              One Plan, Every Detail Accounted For
            </h2>
          </div>

          {/* Vertical Green Line (Hidden on mobile) */}
          <div className="hidden lg:block w-[1.5px] h-20 bg-[#0b6b4a]/30 ml-4 mr-4"></div>

          <div className="max-w-[450px]">
            <p className="text-[#181428]/80 leading-relaxed text-sm font-medium">
              Sam stands out to all—clients, developers, vendors, and industry
              professionals alike—for her exceptional talents, innovative
              spirit, and unwavering dedication in guiding buyers and sellers.
              Her ability to navigate the complexities of the market with ease
              and precision sets her apart.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div key={i} className="flex flex-col gap-5 group">
              <div className="relative w-full aspect-square md:aspect-[4/5] lg:aspect-square overflow-hidden rounded-tl-[32px] rounded-br-[32px] shadow-sm">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <h3 className="text-lg font-serif text-[#181428]">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {card.desc}
                </p>
                <Link
                  href={card.link}
                  className="inline-flex items-center gap-2 border border-gray-300 rounded-full py-1.5 px-5 w-fit text-xs font-medium text-gray-700 hover:border-black hover:text-black transition-colors mt-1"
                >
                  Read More
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14M12 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
