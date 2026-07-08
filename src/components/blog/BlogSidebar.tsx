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
    <div className="flex flex-col gap-16">
      {/* Search Widget */}
      <div>
        <h3 className="text-[13px] font-bold text-brand-blue uppercase tracking-widest mb-6">
          Search
        </h3>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-b border-gray-200 py-3 pl-0 pr-10 text-[15px] focus:outline-none focus:border-brand-blue transition-colors placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 bottom-0 flex items-center justify-center text-gray-400 hover:text-brand-blue transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Categories Widget */}
      <div>
        <h3 className="text-[13px] font-bold text-brand-blue uppercase tracking-widest mb-6">
          Categories
        </h3>
        <ul className="flex flex-col gap-1">
          {blogCategories.map((category) => (
            <li key={category}>
              <Link
                href={
                  category === "All"
                    ? "/blog"
                    : `/blog?category=${encodeURIComponent(category)}`
                }
                className={`flex items-center justify-between group py-3 border-b border-gray-100 last:border-0 transition-all ${currentCategory === category ? "text-brand-blue font-medium" : "text-gray-500 font-light hover:text-brand-blue"}`}
              >
                <span className="text-[15px]">{category}</span>
                <ChevronRight
                  className={`w-4 h-4 transition-all duration-300 ${currentCategory === category ? "translate-x-1 opacity-100" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts Widget */}
      <div>
        <h3 className="text-[13px] font-bold text-brand-blue uppercase tracking-widest mb-6">
          Recent Posts
        </h3>
        <div className="flex flex-col gap-8">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="flex items-start gap-4 group"
            >
              <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  {post.date}
                </span>
                <h4 className="text-[15px] font-light text-brand-blue leading-snug group-hover:opacity-80 transition-opacity line-clamp-3">
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
