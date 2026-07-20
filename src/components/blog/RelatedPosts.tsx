import { BlogCard } from "./BlogCard";

interface RelatedPostsProps {
  relatedPosts: any[];
}

export function RelatedPosts({ relatedPosts }: RelatedPostsProps) {
  if (!relatedPosts || relatedPosts.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-brand-navy">Related Posts</h3>
        <div className="h-[1px] flex-1 bg-gray-200 ml-6"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {relatedPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
