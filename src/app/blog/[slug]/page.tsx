import { constructMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { BlockReveal } from "@/components/ui/BlockReveal";
import { CalendarDays, Clock, Share2 } from "lucide-react";
import { getBlogBySlugPublic } from "@/services/blog.service";

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

async function getBlogDetails(slug: string) {
  try {
    const res = await getBlogBySlugPublic(slug);
    return res.data || null;
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
  if (!post)
    return constructMetadata({
      title: "Post Not Found",
    });

  return constructMetadata({
    title: `${post.metaTitle || post.name} - Fanam Group`,
    description: post.metaDescription || post.excerpt,
  });
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
    category:
      rawPost.tags && rawPost.tags.length > 0 ? rawPost.tags[0].name : "",
    date: new Date(
      rawPost.publishedAt || rawPost.createdAt || Date.now(),
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
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
    <main className="flex min-h-screen flex-col bg-white pt-24 md:pt-32">
      {/* Article Header (Title & Meta) */}
      <section className="container mx-auto px-5 md:px-16 pt-10 pb-12">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {post?.category && (
            <span className="inline-block text-[#f9c602] bg-[#f9c602]/10 text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-md mb-8">
              {post.category}
            </span>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.2] mb-10 text-center">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 text-[13px] font-medium uppercase tracking-wider">
            <div className="flex items-center gap-3">
              <img
                src={post.authorImage}
                alt={post.author}
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
              />
              <div className="flex flex-col normal-case text-left">
                <span className="font-bold text-gray-900">{post.author}</span>
                <span className="text-[12px] capitalize">
                  {post.authorRole}
                </span>
              </div>
            </div>
            <div className="h-6 w-[1px] bg-gray-200 hidden md:block"></div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-[#f9c602]" />
              <span>{post.date}</span>
            </div>
            <div className="h-6 w-[1px] bg-gray-200 hidden md:block"></div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#f9c602]" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Image */}
      <section className="container mx-auto px-5 md:px-16 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden relative shadow-lg">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="pb-20 md:pb-32">
        <div className="container mx-auto px-5 md:px-16">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {/* Social Share (Centered Row) */}
            <div className="flex flex-row justify-center gap-4 mb-12">
              <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#f9c602] hover:border-[#f9c602] hover:bg-[#f9c602]/5 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#f9c602] hover:border-[#f9c602] hover:bg-[#f9c602]/5 transition-colors">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#f9c602] hover:border-[#f9c602] hover:bg-[#f9c602]/5 transition-colors">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#f9c602] hover:border-[#f9c602] hover:bg-[#f9c602]/5 transition-colors">
                <Linkedin className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <article className="prose prose-lg md:prose-xl max-w-none text-gray-600 font-normal leading-[1.8] mb-20 prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-[#f9c602] prose-strong:text-gray-900 text-center w-full">
              {post.excerpt && (
                <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed mb-12 border-l-4 border-[#f9c602] pl-6 py-1 bg-gray-50/50 rounded-r-lg">
                  {post.excerpt}
                </p>
              )}
              <div
                dangerouslySetInnerHTML={{
                  __html: (post.content || "").replace(/\n/g, "<br/>"),
                }}
              />
            </article>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-3 mb-20 pb-16 border-b border-gray-200 w-full">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mr-2">
                  Tags
                </span>
                {post.tags.map((tag: any) => (
                  <span
                    key={tag._id || tag}
                    className="px-4 py-1.5 rounded-md bg-gray-50 border border-gray-200 text-gray-600 text-[12px] font-semibold hover:border-[#f9c602] hover:text-[#f9c602] cursor-pointer transition-colors"
                  >
                    {tag.name || tag}
                  </span>
                ))}
              </div>
            )}

            {/* Related Posts */}
          </div>
        </div>
      </section>
    </main>
  );
}
