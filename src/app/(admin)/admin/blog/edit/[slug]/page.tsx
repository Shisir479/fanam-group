import { getBlogBySlugByAdmin, updateBlogBySlugByAdmin } from "@/services/blog.service";
import EditBlogClient from "@/components/blog/EditBlogClient";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Blog | Admin",
  description: "Edit your existing blog post",
};

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch data on the server
  let blogData = null;
  try {
    const res = await getBlogBySlugByAdmin(slug);
    if (res.success && res.data) {
      blogData = res.data;
    } else {
      return notFound();
    }
  } catch (error) {
    return notFound();
  }

  const handleUpdate = async (payload: any) => {
    "use server";
    return await updateBlogBySlugByAdmin(slug, payload);
  };

  return <EditBlogClient initialData={blogData} slug={slug} onSubmit={handleUpdate} />;
}
