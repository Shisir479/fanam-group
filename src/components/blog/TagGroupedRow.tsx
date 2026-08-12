"use client";

import { useState } from "react";
import { BlogCardCompact } from "./BlogCard";

export function TagGroupedRow({ tag, posts }: { tag: string; posts: any[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // If there are no posts, don't render anything
  if (!posts || posts.length === 0) return null;

  // Determine how many posts to show
  const visiblePosts = isExpanded ? posts : posts.slice(0, 4);

  // Only show the "View more" button if there are more than 4 posts
  const hasMore = posts.length > 4;

  return (
    <div className="flex flex-col">
      <div className="flex items-end justify-between border-b border-gray-400 pb-2 mb-6">
        <h2 className="text-lg md:text-xl font-bold uppercase tracking-[0.1em] text-black">
          {tag}
        </h2>
        {hasMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#f9c602] text-sm md:text-base font-semibold hover:underline bg-transparent border-none cursor-pointer"
          >
            {isExpanded ? "View less \u00AB" : "View more \u00BB"}
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visiblePosts.map((post: any) => (
          <BlogCardCompact key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
