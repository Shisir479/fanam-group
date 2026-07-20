"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BlogSidebarProps {
  categories: string[];
  recentPosts: any[];
}

export function BlogSidebar({ categories, recentPosts }: BlogSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";

  return (
    <div className="flex flex-col gap-16">
      {/* Categories Widget */}
      <div>
        <h3 className="text-[13px] font-bold text-brand-blue uppercase tracking-widest mb-6">
          Categories
        </h3>
        <ul className="flex flex-col gap-1">
          {categories.map((category) => (
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
            <div key={post.id} className="flex items-start gap-4">
              <Link href={`/blog/${post.slug}`} className="group relative block w-[90px] h-[75px] flex-shrink-0 overflow-hidden rounded-lg">
                <img
                  src={post.image || post.cover?.url || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop"}
                  alt={post.title || post.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </Link>
              <div className="flex flex-col justify-center">
                <h4 className="text-sm font-semibold text-gray-900 leading-tight group-hover:text-brand-blue transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>{post.title || post.name}</Link>
                </h4>
                <p className="text-xs text-gray-400 mt-1.5">{post.date || new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
