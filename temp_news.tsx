import Image from "next/image";
import Link from "next/link";

const newsItems = [
  {
    id: 1,
    title: "Best Family Friendly Areas",
    date: "March 4, 2016",
    excerpt: "New York County as a whole covers a total area of 33.77 square miles (87.5 km2), of which 22.96 square miles (59.5 ...",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "The Top Neighborhoods",
    date: "May 28, 2014",
    excerpt: "New York County as a whole covers a total area of 33.77 square miles (87.5 km2), of which 22.96 square miles (59.5 ...",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Buyer's Guide",
    date: "May 27, 2014",
    excerpt: "New York County as a whole covers a total area of 33.77 square miles (87.5 km2), of which 22.96 square miles (59.5 ...",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Seller's Guide",
    date: "May 27, 2014",
    excerpt: "New York County as a whole covers a total area of 33.77 square miles (87.5 km2), of which 22.96 square miles (59.5 ...",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "The Top Neighborhoods",
    date: "May 28, 2014",
    excerpt: "New York County as a whole covers a total area of 33.77 square miles (87.5 km2), of which 22.96 square miles (59.5 ...",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Market Updates",
    date: "June 10, 2015",
    excerpt: "New York County as a whole covers a total area of 33.77 square miles (87.5 km2), of which 22.96 square miles (59.5 ...",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Investment Strategies",
    date: "August 12, 2016",
    excerpt: "New York County as a whole covers a total area of 33.77 square miles (87.5 km2), of which 22.96 square miles (59.5 ...",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Interior Design Trends",
    date: "September 5, 2017",
    excerpt: "New York County as a whole covers a total area of 33.77 square miles (87.5 km2), of which 22.96 square miles (59.5 ...",
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 9,
    title: "First-time Home Buyers",
    date: "October 20, 2018",
    excerpt: "New York County as a whole covers a total area of 33.77 square miles (87.5 km2), of which 22.96 square miles (59.5 ...",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 10,
    title: "Luxury Real Estate",
    date: "November 15, 2019",
    excerpt: "New York County as a whole covers a total area of 33.77 square miles (87.5 km2), of which 22.96 square miles (59.5 ...",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
  }
];

export function LatestNews({ blogs = [] }: { blogs?: any[] }) {
  return (
    <section className="w-full bg-[#FAFAFA] py-16 lg:py-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Header */}
        <div className="flex flex-col gap-3 mb-12">
          <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-700">
            <span className="w-2 h-2 rounded-full border border-[#084E37] bg-transparent"></span>
            Media
          </div>
          <h2 className="text-3xl md:text-[32px] leading-tight font-serif text-[#181428]">
            See The Township Take Shape
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {newsItems.map((item) => (
            <div key={item.id} className="flex flex-col bg-white border border-gray-100 rounded-[4px] shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              
              {/* Image */}
              <div className="relative w-full aspect-[4/3] p-1.5 pb-0">
                <div className="relative w-full h-full overflow-hidden rounded-[2px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <h4 className="text-[14px] font-bold text-[#181428] mb-1 line-clamp-1">
                  {item.title}
                </h4>
                <span className="text-[10px] font-medium text-gray-400 mb-3 block">
                  {item.date}
                </span>
                
                <p className="text-[11px] leading-[1.6] font-medium text-gray-500 mb-5 flex-1 line-clamp-3">
                  {item.excerpt}
                </p>

                <Link href="#" className="text-[11px] font-bold text-[#181428] hover:text-[#084E37] transition-colors inline-flex items-center gap-1 w-fit">
                  Continue reading
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/></svg>
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
