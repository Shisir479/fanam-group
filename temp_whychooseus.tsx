import Image from "next/image";
import Link from "next/link";

const locations = [
  {
    id: 1,
    title: "Oregon",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Alberta Arts",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Nob Hill",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop",
  },
];

export function WhyChooseUs({ data }: { data?: any }) {
  return (
    <section className="w-full bg-[#0b0c10] py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-12 lg:gap-8">
          
          {/* Left Content */}
          <div className="flex flex-col gap-6 lg:w-[35%] shrink-0 pt-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-400">
                <span className="w-2 h-2 rounded-full border border-[#084E37] bg-transparent"></span>
                COMMUNITY & INFRASTRUCTURE
              </div>
              <h2 className="text-3xl md:text-[36px] leading-[1.1] font-serif text-white max-w-[280px]">
                Everything A Township Needs
              </h2>
            </div>

            <div className="flex flex-col gap-4 text-gray-400 text-sm leading-relaxed pr-4">
              <p>
                Dynamic approach, and tireless commitment to facilitating transactions for buyers and sellers.
              </p>
              <p>
                In the vibrant neighborhood of Portland, Maryland, Sam is renowned among residents, property developers, local businesses, and professionals in the.
              </p>
            </div>

            <Link href="/contact" className="text-[#f8a502] font-semibold text-sm hover:text-white transition-colors mt-2 inline-block w-fit">
              Contact Me
            </Link>
          </div>

          {/* Right Content - Images */}
          <div className="lg:w-[65%] w-full grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {locations.map((loc) => (
              <div key={loc.id} className="relative w-full aspect-[3/4] md:aspect-[2.5/4] lg:aspect-[3/4] overflow-hidden rounded-[2px] rounded-tl-[40px] rounded-br-[40px] group">
                <Image
                  src={loc.image}
                  alt={loc.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlay for Text Visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

                {/* Title */}
                <div className="absolute bottom-6 left-0 w-full flex justify-center z-10">
                  <h3 className="text-white font-serif text-2xl lg:text-3xl">{loc.title}</h3>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
