import { constructMetadata } from "@/lib/metadata";
import CreateBlogClient from "@/components/admin/blog/CreateBlogClient";
import { createBlogByAdmin } from "@/services/blog.service";
import { getBlogTagsByAdmin } from "@/services/blog-tag.service";

export const metadata = constructMetadata({
  title: "Admin Dashboard",
  noIndex: true,
});

export default async function CreateBlogPage() {
  const tagRes = await getBlogTagsByAdmin();
  const tags = tagRes?.data || [];

  const handleCreate = async (payload: any) => {
    "use server";
    return await createBlogByAdmin(payload);
  };

  return <CreateBlogClient onSubmit={handleCreate} availableTags={tags} />;
}
