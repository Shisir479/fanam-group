import { BlogCard } from "./BlogCard";

interface RelatedPostsProps {
  currentPostId: string;
  category: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/api`
  : "http://localhost:8003/api";

async function getRelatedBlogs(categoryId: string, excludeId: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/blogs?category=${categoryId}&limit=3`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    let blogs = data.data || [];
    blogs = blogs.filter((b: any) => b._id !== excludeId).slice(0, 2);
    return blogs.map((blog: any) => ({
      id: blog._id,
      title: blog.name,
      slug: blog.slug,
      category: blog.category?.name || "Uncategorized",
      date: new Date(blog.publishedAt || blog.createdAt).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        },
      ),
      readTime: `${blog.readingTime || 5} Min Read`,
      image:
        blog.cover?.url ||
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop",
      excerpt:
        blog.excerpt ||
        blog.description?.replace(/<[^>]+>/g, "").substring(0, 120) + "...",
    }));
  } catch (error) {
    return [];
  }
}

export async function RelatedPosts({
  currentPostId,
  category,
}: RelatedPostsProps) {
  const related = await getRelatedBlogs(category, currentPostId);

  if (related.length === 0) return null;

  return (
    <section className="py-16 border-t border-gray-100">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-2xl md:text-3xl font-light text-brand-blue">
          Related <span className="font-bold">Articles</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {related.map((post: any) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
