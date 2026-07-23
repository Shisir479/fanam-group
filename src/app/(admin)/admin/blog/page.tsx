import { constructMetadata } from "@/lib/metadata";
import { getBlogsByAdmin, Blog } from "@/services/blog.service";
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
  let totalPages = 1;

  try {
    const res = await getBlogsByAdmin({ page, search, limit: 10 });
    if (res.success) {
      blogs = res.data;
      totalPages = res.count;
    }
  } catch (error) {
    console.error("Failed to fetch blogs in SSR", error);
  }

  return (
    <AdminBlogClient
      initialBlogs={blogs}
      totalPages={totalPages}
      currentPage={page}
      currentSearch={search}
    />
  );
}
