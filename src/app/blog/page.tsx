import { constructMetadata } from "@/lib/metadata";
import {
  BlogCardLight,
  BlogCardCompact,
  MagazineMainFeature,
  MagazineSideFeature,
  MagazineListFeature,
} from "@/components/blog/BlogCard";
import { TagGroupedRow } from "@/components/blog/TagGroupedRow";
import { PageBanner } from "@/components/ui/PageBanner";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBlogsPublic } from "@/services/blog.service";
import { getBlogTagsPublic } from "@/services/blog-tag.service";
import { getBannerByPageAdmin } from "@/services/banner.service";

export const metadata = constructMetadata({
  title: "News & Blog - Fanam Group",
  description: "Latest news, insights, and market trends from Fanam Group.",
});

async function getBlogs(searchParams: any) {
  const params: any = {};
  if (searchParams.q) params.search = searchParams.q;
  if (searchParams.tag && searchParams.tag !== "All") {
    params.tag = searchParams.tag; // This should be the tag ID now
  }

  try {
    const res = await getBlogsPublic(params);
    return res.data || [];
  } catch (error) {
    return [];
  }
}

// Helper to map DB blog to the UI format expected by BlogCard
function mapBlogToUI(blog: any) {
  return {
    id: blog._id,
    title: blog.name,
    slug: blog.slug,
    tags: blog.tags || [],
    date: new Date(
      blog.publishedAt || blog.createdAt || Date.now(),
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    readTime: `${blog.readingTime || 5} Min Read`,
    image: blog.cover?.url || "",
    excerpt:
      blog.excerpt ||
      blog.description?.replace(/<[^>]+>/g, "").substring(0, 120) + "...",
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  let banner = null;
  try {
    const res = await getBannerByPageAdmin("blog");
    if (res?.success) banner = res.data;
  } catch (error) {}

  const searchQuery =
    typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q : "";
  const activeTagSlug =
    typeof resolvedSearchParams.tag === "string"
      ? resolvedSearchParams.tag
      : "All";

  // Fetch tags for sidebar
  const tagsRes = await getBlogTagsPublic();
  const allTags = tagsRes?.data || [];

  // Resolve tag slug to ID for fetching
  const queryParams = { ...resolvedSearchParams };
  if (activeTagSlug !== "All") {
    const matchedTag = allTags.find(
      (t) => t.slug === activeTagSlug || t.name === activeTagSlug,
    );
    if (matchedTag) {
      queryParams.tag = matchedTag._id;
    }
  }

  const rawBlogs = await getBlogs(queryParams);
  const mappedPosts = rawBlogs.map(mapBlogToUI);

  const tagsList = ["All", ...allTags.map((t) => t.name)];
  const recentPosts = mappedPosts.slice(0, 3);

  const hasFilters = searchQuery || activeTagSlug !== "All";
  const heroPosts = !hasFilters ? mappedPosts.slice(0, 7) : [];
  const standardPosts = !hasFilters ? mappedPosts.slice(7) : mappedPosts;

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <PageBanner
        title={banner?.title || "News & Blog"}
        subtitle={banner?.eyebrowText || "Insights"}
        bgImage={
          banner?.backgroundImage ||
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070"
        }
        altText={banner?.title || "News & Blog"}
      >
        {banner?.description && (
          <p className="text-white/80 text-[14px] md:text-[15px] leading-relaxed max-w-2xl mt-4">
            {banner.description}
          </p>
        )}
      </PageBanner>

      {/* Magazine Hero Layout */}
      {heroPosts.length > 0 && (
        <section className="container mx-auto px-5 md:px-16 pt-16 pb-8 border-b border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column (2 Medium Posts) */}
            <div className="lg:col-span-3 flex flex-col justify-between hidden md:flex">
              {heroPosts[1] && <MagazineSideFeature post={heroPosts[1]} />}
              {heroPosts[2] && <MagazineSideFeature post={heroPosts[2]} />}
            </div>

            {/* Center Column (1 Large Post) */}
            <div className="lg:col-span-6 flex flex-col justify-center border-x border-gray-100 px-0 lg:px-8">
              <MagazineMainFeature post={heroPosts[0]} />
            </div>

            {/* Right Column (Latest List) */}
            <div className="lg:col-span-3">
              <div className="mb-6 pb-2 border-b-2 border-black inline-block">
                <h3 className="text-[13px] font-black uppercase tracking-[0.2em] text-black">
                  Latest
                </h3>
              </div>
              <div className="flex flex-col">
                {heroPosts.slice(3, 7).map((post: any) => (
                  <MagazineListFeature key={post.id} post={post} />
                ))}
                {heroPosts.length < 4 && (
                  <p className="text-gray-400 text-sm mt-4 italic">
                    More posts coming soon...
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Section */}
      <section className="py-16 md:py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-5 md:px-16">
          <div className="flex flex-col gap-12 mb-20 max-w-7xl mx-auto w-full">
            {/* Filtered Posts Grid (When a user clicks a tag pill like 'AI') */}
            {hasFilters && mappedPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 mb-20">
                {mappedPosts.map((post: any) => (
                  <BlogCardLight key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* Tag Grouped Posts (Inline Expanding Rows) */}
            {!hasFilters && mappedPosts.length > 0 && (
              <div className="flex flex-col gap-16">
                {tagsList
                  .filter((tag) => tag !== "All")
                  .map((tag) => {
                    // Find ALL mapped posts that have this tag
                    const tagPosts = mappedPosts.filter(
                      (post: any) =>
                        post.tags &&
                        post.tags.some(
                          (t: any) =>
                            t.name.toLowerCase() === tag.toLowerCase(),
                        ),
                    );

                    if (tagPosts.length === 0) return null;

                    return (
                      <TagGroupedRow key={tag} tag={tag} posts={tagPosts} />
                    );
                  })}
              </div>
            )}

            {mappedPosts.length === 0 && (
              <div className="py-32 flex flex-col items-center justify-center bg-white rounded-3xl border border-gray-100 mx-4">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <ArrowRight className="w-8 h-8 text-gray-300 rotate-90" />
                </div>
                <p className="text-gray-400 text-xl font-light tracking-wide text-center">
                  No articles found matching your criteria.
                </p>
                <Link
                  href="/blog"
                  className="mt-8 text-sm font-bold text-gray-900 uppercase tracking-widest hover:text-[#f9c602] transition-colors border-b-2 border-[#f9c602] pb-1"
                >
                  Clear Filters
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
