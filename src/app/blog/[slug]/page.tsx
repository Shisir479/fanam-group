import { getPostBySlug } from "@/lib/blogData";
import { notFound } from "next/navigation";
import { BlockReveal } from "@/components/ui/BlockReveal";
import { CalendarDays, Clock, Share2 } from "lucide-react";

const Facebook = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const Twitter = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const Linkedin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
import { RelatedPosts } from "@/components/blog/RelatedPosts";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: `${post.title} - Bonedi Homes`,
    description: post.excerpt,
  };
}

export default function BlogDetailsPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Article Hero */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-end pb-16 bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </div>

        <div className="container mx-auto px-5 md:px-16 relative z-20">
          <div className="max-w-4xl mx-auto">
            <BlockReveal color="#ffffff">
              <span className="inline-block bg-[#D4AF37] text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 mb-6">
                {post.category}
              </span>
            </BlockReveal>
            
            <BlockReveal color="#ffffff" delay={0.2}>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6">
                {post.title}
              </h1>
            </BlockReveal>

            <BlockReveal color="#ffffff" delay={0.4}>
              <div className="flex flex-wrap items-center gap-6 text-white/80 text-[13px] font-light">
                <div className="flex items-center gap-3">
                  <img src={post.authorImage} alt={post.author} className="w-10 h-10 rounded-full object-cover border border-white/20" />
                  <div className="flex flex-col">
                    <span className="font-medium text-white">{post.author}</span>
                    <span>{post.authorRole}</span>
                  </div>
                </div>
                <div className="h-6 w-[1px] bg-white/20 hidden md:block"></div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-[#D4AF37]" />
                  <span>{post.date}</span>
                </div>
                <div className="h-6 w-[1px] bg-white/20 hidden md:block"></div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </BlockReveal>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-5 md:px-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Social Share (Floating Left on Desktop, Top on Mobile) */}
            <div className="flex flex-row md:flex-col gap-4 md:absolute md:-ml-20 mb-8 md:mb-0">
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#003B6D] hover:border-[#003B6D] transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#003B6D] hover:border-[#003B6D] transition-colors">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#003B6D] hover:border-[#003B6D] transition-colors">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#003B6D] hover:border-[#003B6D] transition-colors">
                <Linkedin className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <article className="prose prose-lg max-w-none text-gray-600 font-light leading-loose mb-16">
              <p className="text-xl md:text-2xl text-[#003B6D] font-light leading-relaxed mb-8">
                {post.excerpt}
              </p>
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
            </article>

            {/* Tags */}
            <div className="flex items-center gap-3 mb-16 pb-16 border-b border-gray-100">
              <span className="text-[13px] font-bold text-[#003B6D] uppercase tracking-widest mr-2">Tags:</span>
              {post.tags.map((tag) => (
                <span key={tag} className="px-4 py-1.5 bg-gray-50 text-gray-600 text-[13px] hover:bg-gray-100 cursor-pointer transition-colors">
                  {tag}
                </span>
              ))}
            </div>

            {/* Related Posts */}
            <RelatedPosts currentPostId={post.id} category={post.category} />

          </div>
        </div>
      </section>
    </main>
  );
}
