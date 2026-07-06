"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ChevronRight } from "lucide-react";
import { blogCategories, blogPosts } from "@/lib/blogData";
import Link from "next/link";

export function BlogSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/blog?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push(`/blog`);
    }
  };

  const recentPosts = blogPosts.slice(0, 3);

  return (
    <div className="flex flex-col gap-10">
      {/* Search Widget */}
      <div className="bg-gray-50 p-8 border border-gray-100">
        <h3 className="text-lg font-bold text-[#003B6D] uppercase tracking-widest mb-6">
          Search
        </h3>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 py-3 pl-4 pr-12 text-[15px] focus:outline-none focus:border-[#003B6D] transition-colors"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center text-gray-400 hover:text-[#003B6D] transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Categories Widget */}
      <div className="bg-gray-50 p-8 border border-gray-100">
        <h3 className="text-lg font-bold text-[#003B6D] uppercase tracking-widest mb-6">
          Categories
        </h3>
        <ul className="flex flex-col gap-3">
          {blogCategories.map((category) => (
            <li key={category}>
              <Link
                href={
                  category === "All"
                    ? "/blog"
                    : `/blog?category=${encodeURIComponent(category)}`
                }
                className={`flex items-center justify-between group py-2 border-b border-gray-200 last:border-0 transition-colors ${currentCategory === category ? "text-[#003B6D] font-medium" : "text-gray-600 hover:text-[#003B6D]"}`}
              >
                <span className="text-[15px] font-light">{category}</span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${currentCategory === category ? "translate-x-1" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"}`}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts Widget */}
      <div className="bg-gray-50 p-8 border border-gray-100">
        <h3 className="text-lg font-bold text-[#003B6D] uppercase tracking-widest mb-6">
          Recent Posts
        </h3>
        <div className="flex flex-col gap-6">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="flex items-center gap-4 group"
            >
              <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#003B6D]/70 uppercase tracking-wider mb-1">
                  {post.date}
                </span>
                <h4 className="text-[14px] font-medium text-[#003B6D] leading-snug group-hover:opacity-80 transition-opacity duration-300 line-clamp-2">
                  {post.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
