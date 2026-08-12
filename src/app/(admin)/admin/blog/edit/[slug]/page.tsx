import { constructMetadata } from "@/lib/metadata";
import {
  getBlogBySlugByAdmin,
  updateBlogBySlugByAdmin,
} from "@/services/blog.service";
import { getBlogTagsByAdmin } from "@/services/blog-tag.service";
import EditBlogClient from "@/components/admin/blog/EditBlogClient";
import { notFound } from "next/navigation";

export const metadata = constructMetadata({
  title: "Admin Dashboard",
  noIndex: true,
});

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch data on the server
  let blogData = null;
  let tags: any[] = [];
  try {
    const [res, tagRes] = await Promise.all([
      getBlogBySlugByAdmin(slug),
      getBlogTagsByAdmin(),
    ]);
    if (res.success && res.data) {
      blogData = res.data;
    } else {
      return notFound();
    }
    if (tagRes?.success) {
      tags = tagRes.data;
    }
  } catch (error) {
    return notFound();
  }

  const handleUpdate = async (payload: any) => {
    "use server";
    return await updateBlogBySlugByAdmin(slug, payload);
  };

  return (
    <EditBlogClient
      initialData={blogData}
      slug={slug}
      onSubmit={handleUpdate}
      availableTags={tags}
    />
  );
}
