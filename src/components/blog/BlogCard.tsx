import Link from "next/link";

// 1. Dark Vertical Card
export function BlogCardDark({ post }: { post: any }) {
  const tagName =
    post.tags && post.tags.length > 0 ? post.tags[0].name : "Uncategorized";
  const imageUrl = post.image || post.cover?.url || "/placeholder.jpg";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative block w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
    >
      <img
        src={imageUrl}
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>

      <div className="absolute top-5 right-5 bg-white px-4 py-1.5 rounded-full shadow-md">
        <span className="text-[10px] font-extrabold text-black uppercase tracking-wider">
          Editor's Pick
        </span>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-8">
        <h2 className="text-2xl font-semibold text-white leading-tight mb-4 group-hover:text-[#f9c602] transition-colors line-clamp-3">
          {post.title}
        </h2>
        <p className="text-white/80 text-sm line-clamp-2">{post.excerpt}</p>
      </div>
    </Link>
  );
}

// Ultra Premium Blog Card
export function BlogCardLight({ post }: { post: any }) {
  const tagName =
    post.tags && post.tags.length > 0 ? post.tags[0].name : "Uncategorized";
  const imageUrl = post.image || post.cover?.url || "/placeholder.jpg";

  return (
    <article className="group relative flex flex-col h-full bg-white rounded-[2rem] border border-black/10 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,59,109,0.15)]">
      {/* Decorative background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f9c602]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

      <Link
        href={`/blog/${post.slug}`}
        className="relative w-full aspect-[4/3] overflow-hidden block z-10 p-2"
      >
        <div className="w-full h-full rounded-t-[1.5rem] rounded-b-xl overflow-hidden relative">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-1000 ease-[0.25,1,0.5,1] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Floating Tag */}
          <div className="absolute top-4 left-4 z-20 transition-transform duration-500 transform group-hover:-translate-y-1">
            <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#f9c602] text-[10px] font-black uppercase tracking-[0.15em] shadow-lg border border-white/20">
              {tagName}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-col flex-grow px-8 pt-6 pb-8 z-10 relative">
        <div className="flex items-center gap-3 mb-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">
          <span className="text-[#f9c602] font-black">•</span> {post.readTime}
        </div>

        <Link href={`/blog/${post.slug}`} className="inline-block mb-4">
          <h2 className="text-2xl font-bold text-black leading-[1.3] group-hover:text-[#f9c602] transition-colors duration-300 line-clamp-2">
            {post.title}
          </h2>
        </Link>

        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-auto pt-6 border-t border-black/10 flex items-center justify-between">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-[13px] font-bold text-[#f9c602] uppercase tracking-widest group/link"
          >
            Read Story
            <span className="w-6 h-6 rounded-full bg-[#f9c602]/10 flex items-center justify-center group-hover/link:bg-[#f9c602] group-hover/link:text-white transition-all duration-300">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transform group-hover/link:translate-x-0.5 transition-transform"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
          <span className="text-xs font-semibold text-gray-300">
            {post.date}
          </span>
        </div>
      </div>
    </article>
  );
}

// 3. Light Split Card (Full Width)
export function BlogCardSplitLight({ post }: { post: any }) {
  const tagName =
    post.tags && post.tags.length > 0 ? post.tags[0].name : "Uncategorized";
  const imageUrl = post.image || post.cover?.url || "/placeholder.jpg";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden border border-black/10 shadow-sm hover:shadow-2xl transition-all duration-500 min-h-[450px]"
    >
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
        <div className="flex mb-8">
          <span className="px-5 py-2 rounded-full border border-gray-200 text-gray-700 text-[11px] font-bold uppercase tracking-wider">
            {tagName}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold text-black leading-tight mb-6 group-hover:text-[#f9c602] transition-colors line-clamp-3">
          {post.title}
        </h2>
        <p className="text-gray-500 text-lg mb-10 line-clamp-2">
          {post.excerpt}
        </p>
        <div>
          <span className="inline-flex items-center justify-center px-8 py-3 rounded-xl border border-gray-200 text-black text-sm font-semibold hover:bg-gray-50 transition-colors">
            Read now
          </span>
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-[#f9c602]/10 overflow-hidden">
        <img
          src={imageUrl}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </Link>
  );
}

// 4. Dark Split Card (Full Width)
export function BlogCardSplitDark({ post }: { post: any }) {
  const tagName =
    post.tags && post.tags.length > 0 ? post.tags[0].name : "Uncategorized";
  const imageUrl = post.image || post.cover?.url || "/placeholder.jpg";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col md:flex-row rounded-3xl overflow-hidden bg-[#141414] shadow-xl hover:shadow-2xl transition-all duration-500 min-h-[450px]"
    >
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
        <div className="flex gap-3 mb-8">
          <span className="px-5 py-2 rounded-full border border-white/20 text-white text-[11px] font-bold uppercase tracking-wider">
            {tagName}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold text-white leading-tight mb-8 group-hover:text-[#f9c602] transition-colors line-clamp-3">
          {post.title}
        </h2>
        <p className="text-gray-400 text-lg mb-10 line-clamp-2">
          {post.excerpt}
        </p>
        <div>
          <span className="inline-flex items-center justify-center px-8 py-3 rounded-xl border border-white/20 text-white text-sm font-semibold hover:bg-white hover:text-black transition-colors">
            Read now
          </span>
        </div>
      </div>
      <div className="w-full md:w-1/2 overflow-hidden">
        <img
          src={imageUrl}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
      </div>
    </Link>
  );
}

// --- MAGAZINE LAYOUT COMPONENTS ---

export function MagazineMainFeature({ post }: { post: any }) {
  const tagName =
    post.tags && post.tags.length > 0 ? post.tags[0].name : "Uncategorized";
  const imageUrl = post.image || post.cover?.url || "/placeholder.jpg";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col items-center text-center pb-8 lg:pb-0"
    >
      <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 relative shadow-sm">
        <img
          src={imageUrl}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <span className="text-[#f9c602] text-[11px] font-bold uppercase tracking-[0.15em] mb-4">
        {tagName}
      </span>
      <h2 className="text-3xl md:text-5xl font-black text-black leading-[1.1] mb-4  transition-colors">
        {post.title}
      </h2>
      <p className="text-gray-500 text-sm">{post.date}</p>
    </Link>
  );
}

export function MagazineSideFeature({ post }: { post: any }) {
  const tagName =
    post.tags && post.tags.length > 0 ? post.tags[0].name : "Uncategorized";
  const imageUrl = post.image || post.cover?.url || "/placeholder.jpg";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col mb-10 last:mb-0"
    >
      <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4 relative shadow-sm">
        <img
          src={imageUrl}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <span className="text-[#f9c602] text-[10px] font-bold uppercase tracking-[0.15em] mb-2">
        {tagName}
      </span>
      <h3 className="text-xl font-bold text-black leading-[1.2] mb-2 transition-colors">
        {post.title}
      </h3>
      <p className="text-gray-500 text-xs">{post.date}</p>
    </Link>
  );
}

export function MagazineListFeature({ post }: { post: any }) {
  const imageUrl = post.image || post.cover?.url || "/placeholder.jpg";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex items-start gap-4 py-5 border-b border-black/10 last:border-0"
    >
      <div className="flex-1 pr-2">
        <h4 className="text-sm font-bold text-black leading-[1.3] mb-2  transition-colors line-clamp-3">
          {post.title}
        </h4>
        <p className="text-gray-400 text-[11px]">{post.date}</p>
      </div>
      <div className="w-20 h-20 bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden relative shadow-sm">
        <img
          src={imageUrl}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
    </Link>
  );
}

export function BlogCardCompact({ post }: { post: any }) {
  const tagName =
    post.tags && post.tags.length > 0 ? post.tags[0].name : "Uncategorized";
  const imageUrl = post.image || post.cover?.url || "/placeholder.jpg";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col h-full rounded-2xl border border-gray-200  overflow-hidden"
    >
      <div className="w-full aspect-[4/3] overflow-hidden relative">
        <img
          src={imageUrl}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col p-5 flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#f9c602] bg-[#f9c602]/10 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
            {tagName}
          </span>
        </div>
        <h3 className="text-[17px] font-bold text-black leading-snug mb-3 transition-colors line-clamp-3">
          {post.title}
        </h3>
        <p className="text-gray-500 text-[12px] font-medium mt-auto border-t border-black/10 pt-3 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {post.date}
        </p>
      </div>
    </Link>
  );
}
