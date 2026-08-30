import Image from "next/image";

const categories = [
  {
    id: 1,
    title: "Apartments",
    count: "5 listings",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Commercial",
    count: "0 listings",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Condos",
    count: "3 listings",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Duplexes",
    count: "1 listing",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Houses",
    count: "2 listings",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Multi Family House",
    count: "4 listings",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Residential",
    count: "8 listings",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Single Family Home",
    count: "6 listings",
    image:
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=800&auto=format&fit=crop",
  },
];

export function FeaturedServices({ services = [] }: { services?: any[] }) {
  return (
    <section className="w-full bg-[#FAFAFA] py-16 lg:py-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-12 mb-12">
          {/* Left Title */}
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-700">
              <span className="w-2 h-2 rounded-full border border-[#084E37] bg-transparent"></span>
              Categories
            </div>
            <h2 className="text-3xl md:text-[32px] leading-tight font-serif text-[#181428] lg:whitespace-nowrap">
              See The Township Take Shape
            </h2>
          </div>

          {/* Vertical Green Line (Hidden on mobile) */}
          <div className="hidden lg:block w-[1.5px] h-20 bg-[#084E37]/30"></div>

          {/* Right Description */}
          <div className="flex-1">
            <p className="text-[#181428]/80 leading-relaxed text-[13px] font-medium">
              Whether you're drawn to the convenience of city living, the
              tranquility of suburban neighborhoods, or the charm of rural
              retreats, our comprehensive categories exploration will help you
              navigate the options with confidence.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white border border-gray-100 rounded-[4px] p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[16/9] md:aspect-[3/2] overflow-hidden rounded-[2px] rounded-tl-[40px] rounded-br-[40px]">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Text */}
              <div className="pt-4 pb-2 text-center flex flex-col items-center">
                <h4 className="text-[14px] font-bold text-[#181428] mb-1">
                  {category.title}
                </h4>
                <p className="text-[11px] font-medium text-gray-500">
                  {category.count}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
