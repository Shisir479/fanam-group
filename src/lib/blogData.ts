export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  author: string;
  authorRole: string;
  authorImage: string;
  readTime: string;
  tags: string[];
}

export const blogCategories = [
  "All",
  "Real Estate",
  "Interior Design",
  "Market Trends",
  "Company News",
  "Architecture",
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Luxury Real Estate in Dhaka",
    slug: "future-of-luxury-real-estate-dhaka",
    excerpt:
      "Explore the emerging trends that are redefining high-end residential spaces in Bangladesh's capital.",
    content:
      "Luxury real estate in Dhaka has seen a paradigm shift over the last decade. From merely spacious apartments, the demand has pivoted towards holistic living experiences that offer smart home integration, sustainable architecture, and exclusive amenities... (Full content goes here for the article).",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    category: "Real Estate",
    date: "July 12, 2026",
    author: "Tariqur Rahman",
    authorRole: "Managing Director",
    authorImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    readTime: "5 min read",
    tags: ["Luxury", "Dhaka", "Investment"],
  },
  {
    id: "2",
    title: "Minimalist Interior Design: A Timeless Trend",
    slug: "minimalist-interior-design-timeless-trend",
    excerpt:
      "How reducing clutter and focusing on essential elements can transform your living space into a sanctuary.",
    content:
      "Minimalism is more than a design aesthetic; it's a way of living. By stripping away the unnecessary, we allow the essential to shine. In our latest Bonedi Homes projects, we've integrated minimalist principles to create spaces that feel both expansive and intimate...",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
    category: "Interior Design",
    date: "June 28, 2026",
    author: "Dr. Laila Zaman",
    authorRole: "Director of Operations",
    authorImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    readTime: "4 min read",
    tags: ["Interior", "Design", "Minimalism"],
  },
  {
    id: "3",
    title: "Understanding Current Real Estate Market Trends",
    slug: "understanding-current-real-estate-market-trends",
    excerpt:
      "A comprehensive guide to making informed property investment decisions in today's volatile market.",
    content:
      "The real estate market is constantly evolving, influenced by economic indicators, interest rates, and demographic shifts. Understanding these trends is crucial for both buyers and investors. Currently, we are seeing a strong lean towards eco-friendly and smart homes...",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    category: "Market Trends",
    date: "May 15, 2026",
    author: "Riyad Hossain",
    authorRole: "Chief Analyst",
    authorImage:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop",
    readTime: "7 min read",
    tags: ["Market", "Investing", "Trends"],
  },
  {
    id: "4",
    title: "Bonedi Homes Wins Excellence in Architecture Award",
    slug: "bonedi-homes-wins-excellence-architecture-award",
    excerpt:
      "We are thrilled to announce our recent recognition at the National Architecture Awards.",
    content:
      "It is with great pride that we announce Bonedi Homes has been awarded the prestigious Excellence in Architecture Award for our flagship project. This recognition is a testament to our team's unwavering commitment to innovative design and structural integrity...",
    image:
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070&auto=format&fit=crop",
    category: "Company News",
    date: "April 02, 2026",
    author: "Tariqur Rahman",
    authorRole: "Managing Director",
    authorImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    readTime: "3 min read",
    tags: ["Awards", "News", "Achievement"],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(
  currentPostId: string,
  category: string,
  limit: number = 2,
): BlogPost[] {
  return blogPosts
    .filter((post) => post.id !== currentPostId && post.category === category)
    .slice(0, limit);
}
