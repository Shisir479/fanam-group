import { getRelatedPosts } from "@/lib/blogData";
import { BlogCard } from "./BlogCard";

interface RelatedPostsProps {
  currentPostId: string;
  category: string;
}

export function RelatedPosts({ currentPostId, category }: RelatedPostsProps) {
  const related = getRelatedPosts(currentPostId, category, 2);

  if (related.length === 0) return null;

  return (
    <section className="py-16 border-t border-gray-100">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-2xl md:text-3xl font-light text-[#003B6D]">
          Related <span className="font-bold">Articles</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {related.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
