import { BlogHero } from "@/components/blog/BlogHero";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { blogPosts } from "@/lib/blogData";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: 'News & Blog - Bonedi Homes',
  description: 'Latest news, insights, and market trends from Bonedi Homes.',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const searchQuery = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : '';
  const category = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : 'All';

  let filteredPosts = blogPosts;

  if (category && category !== 'All') {
    filteredPosts = filteredPosts.filter((post) => post.category === category);
  }

  if (searchQuery) {
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const hasFilters = searchQuery || category !== 'All';
  const featuredPost = !hasFilters && filteredPosts.length > 0 ? filteredPosts[0] : null;
  const standardPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts;

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <BlogHero />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 md:px-16">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Main Content */}
            <div className="w-full lg:w-8/12">
              <div className="flex items-center justify-between mb-12 pb-6 border-b border-gray-200">
                <h2 className="text-2xl lg:text-3xl font-light text-[#003B6D] tracking-wide">
                  {searchQuery ? (
                    <>Search results for <span className="font-medium">"{searchQuery}"</span></>
                  ) : category !== 'All' ? (
                    <>Category: <span className="font-medium">{category}</span></>
                  ) : (
                    <>Latest <span className="font-medium">Articles</span></>
                  )}
                </h2>
                <span className="text-gray-400 text-sm tracking-widest uppercase">
                  {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Featured Post (Only on main view) */}
              {featuredPost && (
                <div className="mb-20">
                  <Link href={`/blog/${featuredPost.slug}`} className="group block">
                    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden mb-8">
                      <img 
                        src={featuredPost.image} 
                        alt={featuredPost.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-6 left-6 bg-white/95 px-5 py-2">
                        <span className="text-[11px] font-bold text-[#003B6D] uppercase tracking-[0.2em]">
                          {featuredPost.category}
                        </span>
                      </div>
                    </div>
                    <div className="max-w-3xl">
                      <p className="text-[13px] text-gray-500 font-medium tracking-widest uppercase mb-4">
                        {featuredPost.date} • {featuredPost.readTime}
                      </p>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#003B6D] leading-tight mb-6 group-hover:opacity-80 transition-opacity">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-500 text-lg leading-relaxed font-light mb-8 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      <div className="inline-flex items-center gap-3 text-[13px] font-bold text-[#003B6D] uppercase tracking-[0.2em] group/link">
                        Read Cover Story 
                        <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-500" />
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Standard Posts Grid */}
              {standardPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                  {standardPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : !featuredPost ? (
                <div className="py-20 text-center">
                  <p className="text-gray-400 text-lg font-light tracking-wide">No articles found matching your criteria.</p>
                </div>
              ) : null}
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-4/12">
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
