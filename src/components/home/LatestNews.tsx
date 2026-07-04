import { BlockReveal } from "@/components/ui/BlockReveal";

const newsItems = [
  {
    title: "The Future of Real Estate in 2024",
    date: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600",
    excerpt: "Discover the emerging trends and what to expect in the housing market this year."
  },
  {
    title: "Tips for First-Time Home Buyers",
    date: "April 02, 2024",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600",
    excerpt: "Navigate the complex process of buying your first home with these expert tips."
  },
  {
    title: "Maximizing Your Property Value",
    date: "April 18, 2024",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
    excerpt: "Simple yet effective renovations that can significantly boost your home's market value."
  }
];

export function LatestNews() {
  return (
    <section className="w-full py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-5 md:px-16">
        <div className="mb-12 flex flex-col gap-4">
          <BlockReveal color="#003B6D">
            <div className="flex items-center text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
              INSIGHTS
            </div>
          </BlockReveal>
          <BlockReveal color="#003B6D" delay={0.2}>
            <h2 className="text-2xl md:text-[34px] font-bold tracking-tight text-[#003B6D] leading-[1.3] uppercase">
              Latest News & Blogs
            </h2>
          </BlockReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {newsItems.map((item, idx) => (
            <div key={idx} className="group flex flex-col bg-white overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="relative h-60 overflow-hidden transform-gpu">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 transform-gpu" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-sm font-medium text-[#003B6D]">
                  {item.date}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#003B6D] transition-colors">{item.title}</h3>
                <p className="text-gray-600 mb-6 flex-1 line-clamp-2">{item.excerpt}</p>
                <a href="#" className="inline-flex items-center text-[#003B6D] font-semibold hover:gap-2 transition-all duration-300">
                  Read More
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
