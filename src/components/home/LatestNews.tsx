import { BlockReveal } from "@/components/ui/BlockReveal";

const newsItems = [
  {
    title: "The Future of Real Estate in 2024",
    date: "March 15, 2024",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600",
    excerpt:
      "Discover the emerging trends and what to expect in the housing market this year.",
  },
  {
    title: "Tips for First-Time Home Buyers",
    date: "April 02, 2024",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600",
    excerpt:
      "Navigate the complex process of buying your first home with these expert tips.",
  },
  {
    title: "Maximizing Your Property Value",
    date: "April 18, 2024",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
    excerpt:
      "Simple yet effective renovations that can significantly boost your home's market value.",
  },
];

export function LatestNews() {
  return (
    <section className="w-full py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-5 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="flex flex-col gap-4">
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

          <button className="hidden md:inline-flex items-center gap-4 text-sm font-bold text-[#003B6D] uppercase tracking-wider group">
            <span className="relative overflow-hidden">
              <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">
                See All News
              </span>
              <span className="inline-block absolute left-0 top-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0 text-[#4ea24b]">
                See All News
              </span>
            </span>
            <div className="w-10 h-10 border border-[#003B6D]/20 flex items-center justify-center transition-colors duration-500 group-hover:border-[#4ea24b] group-hover:bg-[#4ea24b]">
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300 group-hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {newsItems.map((item, idx) => (
            <div
              key={idx}
              className="group flex flex-col bg-white overflow-hidden  shadow-sm transition-all duration-300"
            >
              <div className="relative h-60 overflow-hidden transform-gpu">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover "
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-sm font-medium text-[#003B6D]">
                  {item.date}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#003B6D] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-1 line-clamp-2">
                  {item.excerpt}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-[#003B6D] font-semibold hover:gap-2 transition-all duration-300"
                >
                  Read More
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <button className="md:hidden mt-8 w-full flex items-center justify-center gap-2 text-sm font-bold text-[#003B6D] uppercase border border-[#003B6D]/30 py-4 ">
          See All News
        </button>
      </div>
    </section>
  );
}
