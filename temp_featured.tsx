import Image from "next/image";
import Link from "next/link";

const properties = [
  {
    id: 1,
    title: "Villa With Panoramic View",
    specs: "5 Bedrooms  ·  3 Baths  ·  Size 250 ft²",
    price: "$5,500,000",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    badges: { left: ["Featured"], right: ["For Sale", "Sold"] },
  },
  {
    id: 2,
    title: "Townhouse For Sale",
    specs: "3 Bedrooms  ·  2 Baths  ·  Size 150 ft²",
    price: "$210,000",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    badges: { left: ["Featured"], right: ["For Sale", "Sold"] },
  },
  {
    id: 3,
    title: "Family House For Sale",
    specs: "2 Bedrooms  ·  5 Baths  ·  Size 29,000 ft²",
    price: "$1000,000",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    badges: { left: ["Featured"], right: ["For Sale", "Sold"] },
  },
  {
    id: 4,
    title: "Gorgeous Studio For Rent",
    specs: "5 Bedrooms  ·  6 Baths  ·  Size 190 ft²",
    price: "$770,000",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop",
    badges: { left: ["Featured"], right: ["For Sale", "Active"] },
  },
  {
    id: 5,
    title: "Awesome Family Apartment",
    specs: "3 Bedrooms  ·  2.5 Baths  ·  Size 1,300 ft²",
    price: "$5,500,000",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=800&auto=format&fit=crop",
    badges: { left: [], right: ["For Rent", "Sold"] },
  },
  {
    id: 6,
    title: "Apartment Space For Rent",
    specs: "2 Bedrooms  ·  4 Baths  ·  Size 500 ft²",
    price: "$800 / month",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
    badges: { left: [], right: ["For Rent", "Active"] },
  },
  {
    id: 7,
    title: "Modern Home For Sale",
    specs: "5 Bedrooms  ·  6 Baths  ·  Size 190 ft²",
    price: "$775,000",
    image:
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=800&auto=format&fit=crop",
    badges: { left: [], right: ["For Sale", "Sold"] },
  },
  {
    id: 8,
    title: "Spacious Home ForSale",
    specs: "2 Bedrooms  ·  4 Baths  ·  Size 500 ft²",
    price: "$800,000",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800&auto=format&fit=crop",
    badges: { left: [], right: ["For Sale", "Sold"] },
  },
];

export function FeaturedProjects({
  initialProjects = [],
}: {
  initialProjects?: any[];
}) {
  return (
    <section className="w-full bg-white py-16 lg:py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="flex flex-col gap-3 mb-10">
          <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-700">
            <span className="w-2 h-2 rounded-full border border-[#084E37] bg-transparent"></span>
            Properties
          </div>
          <h2 className="text-3xl md:text-[32px] leading-tight font-serif text-[#181428]">
            Residential & Commercial Plots
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="flex flex-col bg-white border border-gray-100 rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden group/img">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover/img:scale-105"
                />

                {/* Image Arrows */}
                <button className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 hidden group-hover/img:block">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 hidden group-hover/img:block">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {property.badges.left.map((badge, idx) => (
                    <span
                      key={idx}
                      className="bg-[#f97316] text-white text-[11px] font-medium px-3 py-1 rounded-[2px] tracking-wide"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  {property.badges.right.map((badge, idx) => (
                    <span
                      key={idx}
                      className="bg-[#181428]/95 text-white text-[11px] font-medium px-3 py-1 rounded-[2px] tracking-wide"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Bottom Overlay Icons */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 z-10">
                  <button className="w-7 h-7 rounded-[3px] bg-black/40 flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <circle cx="18" cy="5" r="3"></circle>
                      <circle cx="6" cy="12" r="3"></circle>
                      <circle cx="18" cy="19" r="3"></circle>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                  </button>
                  <button className="w-7 h-7 rounded-[3px] bg-black/40 flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                  <button className="w-7 h-7 rounded-[3px] bg-black/40 flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col">
                <h3 className="text-[17px] font-bold text-[#181428] mb-2">
                  {property.title}
                </h3>
                <p className="text-[12px] font-medium text-gray-500 tracking-wide mb-4">
                  {property.specs}
                </p>

                {/* Divider Line */}
                <div className="w-full h-[1px] bg-gray-100 mb-4"></div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#181428]">
                    {property.price}
                  </span>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-1.5 border border-[#084E37] rounded-full py-1.5 px-4 text-[12px] font-medium text-black hover:bg-[#084E37] hover:text-white transition-colors group/btn"
                  >
                    Read More
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="transition-transform group-hover/btn:translate-x-0.5"
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
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <button className="bg-[#084E37] hover:bg-[#063b2a] text-white text-[13px] font-semibold py-2.5 px-6 rounded transition-colors">
            Load More Listings
          </button>
        </div>
      </div>
    </section>
  );
}
