import { constructMetadata } from "@/lib/metadata";
import { getBlogsByAdmin, Blog } from "@/services/blog.service";
import { getBlogTagsByAdmin, BlogTag } from "@/services/blog-tag.service";
import AdminBlogClient from "@/components/admin/blog/AdminBlogClient";

export const metadata = constructMetadata({
  title: "Blog Management - Admin Dashboard",
  noIndex: true,
});

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1");
  const search = resolvedParams.search || "";

  let blogs: Blog[] = [];
  let tags: BlogTag[] = [];
  let totalPages = 1;

  try {
    const [blogRes, tagRes] = await Promise.all([
      getBlogsByAdmin({ page, search, limit: 10 }),
      getBlogTagsByAdmin(),
    ]);

    if (blogRes.success) {
      blogs = blogRes.data;
      totalPages = blogRes.count;
    }

    if (tagRes?.success) {
      tags = tagRes.data;
    }
  } catch (error) {
    console.error("Failed to fetch blogs in SSR", error);
  }

  return (
    <AdminBlogClient
      initialBlogs={blogs}
      initialTags={tags}
      totalPages={totalPages}
      currentPage={page}
      currentSearch={search}
    />
  );
}
