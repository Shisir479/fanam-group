import { BlockReveal } from "@/components/ui/BlockReveal";
import Link from "next/link";

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

export function LatestNews({ blogs = [] }: { blogs?: any[] }) {
  // Use dynamic blogs if available, otherwise fallback to default static items
  const displayItems =
    blogs.length > 0
      ? blogs.map((blog) => ({
          title: blog.name || blog.title,
          date: new Date(blog.createdAt || blog.publishedAt).toLocaleDateString(
            "en-US",
            { month: "long", day: "numeric", year: "numeric" },
          ),
          image:
            blog.cover?.url ||
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600",
          excerpt: blog.excerpt || blog.description?.substring(0, 100) + "...",
          link: `/blog/${blog.slug}`,
        }))
      : newsItems.map((item) => ({ ...item, link: "/blog" }));

  return (
    <section className="w-full py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-5 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="flex flex-col gap-4">
            <BlockReveal color="var(--color-brand-blue)">
              <div className="flex items-center text-[16px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
                INSIGHTS
              </div>
            </BlockReveal>
            <BlockReveal color="var(--color-brand-blue)" delay={0.2}>
              <h2 className="text-2xl md:text-[34px] font-bold tracking-tight text-brand-blue leading-[1.3] uppercase">
                Latest News & Blogs
              </h2>
            </BlockReveal>
          </div>

          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-4 text-sm font-bold text-brand-blue uppercase tracking-wider group"
          >
            <span className="relative overflow-hidden">
              <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">
                See All News
              </span>
              <span className="inline-block absolute left-0 top-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0 text-[#4ea24b]">
                See All News
              </span>
            </span>
            <div className="w-10 h-10 border border-brand-blue/20 flex items-center justify-center transition-colors duration-500 group-hover:border-[#4ea24b] group-hover:bg-[#4ea24b]">
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
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {displayItems.slice(0, 3).map((item, idx) => (
            <Link
              href={item.link}
              key={idx}
              className="group flex flex-col bg-white overflow-hidden shadow-sm transition-all duration-300"
            >
              <div className="relative h-60 overflow-hidden transform-gpu">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-blue transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-1 line-clamp-2">
                  {item.excerpt}
                </p>
                <span className="inline-flex items-center text-brand-blue font-semibold hover:gap-2 transition-all duration-300">
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
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Button */}
        <Link
          href="/blog"
          className="md:hidden mt-8 w-full flex items-center justify-center gap-2 text-sm font-bold text-brand-blue uppercase border border-brand-blue/30 py-4 "
        >
          See All News
        </Link>
      </div>
    </section>
  );
}
