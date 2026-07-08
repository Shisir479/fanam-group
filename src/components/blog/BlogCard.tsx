import Link from "next/link";
import { BlogPost } from "@/lib/blogData";
import { ArrowRight, Clock, CalendarDays } from "lucide-react";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex flex-col h-full">
      {/* Image Container */}
      <Link href={`/blog/${post.slug}`} className="relative w-full aspect-[4/3] md:aspect-[3/2] overflow-hidden mb-6 block">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/5 transition-colors duration-500"></div>
        
        {/* Category Label */}
        <div className="absolute top-4 left-4 bg-white/95 px-4 py-2">
          <span className="text-[10px] font-bold text-brand-blue uppercase tracking-[0.2em]">
            {post.category}
          </span>
        </div>
      </Link>

      {/* Content Container */}
      <div className="flex flex-col flex-grow px-2">
        {/* Meta info */}
        <div className="flex items-center gap-4 text-[12px] text-gray-500 font-medium tracking-wide uppercase mb-4">
          <div className="flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5 text-gray-400" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`} className="inline-block">
          <h2 className="text-2xl lg:text-3xl font-light text-brand-blue leading-tight mb-5 group-hover:opacity-80 transition-opacity duration-300 line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-500 text-[15px] leading-relaxed font-light mb-8 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        {/* Read More Link */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-[12px] font-bold text-brand-blue uppercase tracking-[0.15em] group/link">
            Read Article 
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </article>
  );
}
