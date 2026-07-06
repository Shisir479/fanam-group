import { BlogHero } from "@/components/blog/BlogHero";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { blogPosts } from "@/lib/blogData";

export const metadata = {
  title: "News & Blog - Bonedi Homes",
  description: "Latest news, insights, and market trends from Bonedi Homes.",
};

export default function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchQuery = typeof searchParams.q === "string" ? searchParams.q : "";
  const category =
    typeof searchParams.category === "string" ? searchParams.category : "All";

  let filteredPosts = blogPosts;

  if (category && category !== "All") {
    filteredPosts = filteredPosts.filter((post) => post.category === category);
  }

  if (searchQuery) {
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <BlogHero />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 md:px-16">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Main Content */}
            <div className="w-full lg:w-2/3">
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-200">
                <h2 className="text-2xl font-light text-[#003B6D]">
                  {searchQuery ? (
                    <>
                      Search results for{" "}
                      <span className="font-bold">"{searchQuery}"</span>
                    </>
                  ) : category !== "All" ? (
                    <>
                      Category: <span className="font-bold">{category}</span>
                    </>
                  ) : (
                    <>
                      All <span className="font-bold">Articles</span>
                    </>
                  )}
                </h2>
                <span className="text-gray-500 text-sm">
                  Showing {filteredPosts.length} post
                  {filteredPosts.length !== 1 ? "s" : ""}
                </span>
              </div>

              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <p className="text-gray-500 text-lg font-light">
                    No articles found matching your criteria.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-1/3">
              <div className="sticky top-28">
                <BlogSidebar />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
