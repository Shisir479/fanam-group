import Link from "next/link";
import { BlogPost } from "@/lib/blogData";
import { ArrowRight, Clock, CalendarDays } from "lucide-react";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex flex-col bg-white border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,59,109,0.12)] transition-all duration-700 overflow-hidden h-full">
      
      {/* Image Container */}
      <Link href={`/blog/${post.slug}`} className="relative w-full aspect-[16/9] overflow-hidden block">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[#003B6D]/0 group-hover:bg-[#003B6D]/10 transition-colors duration-500 mix-blend-multiply"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 shadow-sm">
          <span className="text-[11px] font-bold text-[#003B6D] uppercase tracking-wider">
            {post.category}
          </span>
        </div>
      </Link>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-5 lg:p-6">
        
        {/* Meta info */}
        <div className="flex items-center gap-4 text-[13px] text-gray-500 font-light mb-3">
          <div className="flex items-center gap-1.5">
            <CalendarDays className="w-4 h-4 text-[#003B6D]/70" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#003B6D]/70" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl lg:text-2xl font-light text-[#003B6D] leading-tight mb-3 group-hover:opacity-80 transition-opacity duration-300 line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 text-[15px] leading-relaxed font-light mb-5 line-clamp-2 flex-grow">
          {post.excerpt}
        </p>

        {/* Footer (Author & Read More) */}
        <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <img 
              src={post.authorImage} 
              alt={post.author} 
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-[13px] font-medium text-[#003B6D]">{post.author}</span>
          </div>
          
          <Link href={`/blog/${post.slug}`} className="flex items-center gap-2 text-[13px] font-bold text-[#003B6D] uppercase tracking-wider group/link">
            Read <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
        
      </div>
    </article>
  );
}
