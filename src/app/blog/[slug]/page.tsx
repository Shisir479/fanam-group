import { notFound } from "next/navigation";
import { BlockReveal } from "@/components/ui/BlockReveal";
import { CalendarDays, Clock, Share2 } from "lucide-react";
import { RelatedPosts } from "@/components/blog/RelatedPosts";

const Facebook = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const Twitter = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const Linkedin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/api`
  : "http://localhost:8003/api";

async function getBlogDetails(slug: string) {
  try {
    const res = await fetch(`${BASE_URL}/blogs/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await getBlogDetails(resolvedParams.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.metaTitle || post.name} - Bonedi Homes`,
    description: post.metaDescription || post.excerpt,
  };
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const rawPost = await getBlogDetails(resolvedParams.slug);

  if (!rawPost) {
    notFound();
  }

  const post = {
    id: rawPost._id,
    title: rawPost.name,
    category: rawPost.category?.name || "Uncategorized",
    date: new Date(rawPost.publishedAt || rawPost.createdAt).toLocaleDateString(
      "en-US",
      { year: "numeric", month: "long", day: "numeric" },
    ),
    readTime: `${rawPost.readingTime || 5} Min Read`,
    image:
      rawPost.cover?.url ||
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop",
    author: rawPost.author?.firstName
      ? `${rawPost.author.firstName} ${rawPost.author.lastName || ""}`
      : "Admin",
    authorImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    authorRole: rawPost.author?.role || "Editor",
    excerpt: rawPost.excerpt,
    content: rawPost.description,
    tags: rawPost.tags || [],
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Article Hero */}
      <section className="relative w-full h-[70vh] min-h-[600px] flex items-end pb-20 bg-brand-blue">
        <div className="absolute inset-0 z-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
        </div>

        <div className="container mx-auto px-5 md:px-16 relative z-20">
          <div className="max-w-4xl mx-auto">
            <BlockReveal color="#ffffff">
              <span className="inline-block bg-white text-brand-blue text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 mb-8">
                {post.category}
              </span>
            </BlockReveal>

            <BlockReveal color="#ffffff" delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-white leading-[1.1] mb-8">
                {post.title}
              </h1>
            </BlockReveal>

            <BlockReveal color="#ffffff" delay={0.4}>
              <div className="flex flex-wrap items-center gap-6 text-white/80 text-[13px] font-light tracking-wide uppercase">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorImage}
                    alt={post.author}
                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                  />
                  <div className="flex flex-col normal-case">
                    <span className="font-medium text-white">
                      {post.author}
                    </span>
                    <span className="text-[12px] capitalize">
                      {post.authorRole}
                    </span>
                  </div>
                </div>
                <div className="h-6 w-[1px] bg-white/20 hidden md:block"></div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-white/60" />
                  <span>{post.date}</span>
                </div>
                <div className="h-6 w-[1px] bg-white/20 hidden md:block"></div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-white/60" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </BlockReveal>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-5 md:px-16">
          <div className="max-w-4xl mx-auto">
            {/* Social Share (Floating Left on Desktop, Top on Mobile) */}
            <div className="flex flex-row md:flex-col gap-4 md:absolute md:-ml-24 mb-12 md:mb-0">
              <button className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-blue hover:border-brand-blue transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-blue hover:border-brand-blue transition-colors">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-blue hover:border-brand-blue transition-colors">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-blue hover:border-brand-blue transition-colors">
                <Linkedin className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <article className="prose prose-lg md:prose-xl max-w-none text-gray-500 font-light leading-[2.2] mb-20">
              {post.excerpt && (
                <p className="text-2xl md:text-3xl text-brand-blue font-light leading-relaxed mb-12 border-l-2 border-brand-blue pl-8 py-2">
                  {post.excerpt}
                </p>
              )}
              <div
                dangerouslySetInnerHTML={{
                  __html: post.content.replace(/\n/g, "<br/>"),
                }}
              />
            </article>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex items-center gap-3 mb-20 pb-16 border-b border-gray-100">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mr-2">
                  Tags
                </span>
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-5 py-2 border border-gray-100 text-gray-500 text-[13px] hover:border-brand-blue hover:text-brand-blue cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Related Posts */}
            <RelatedPosts currentPostId={post.id} category={post.category} />
          </div>
        </div>
      </section>
    </main>
  );
}
