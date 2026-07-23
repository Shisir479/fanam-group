import { constructMetadata } from "@/lib/metadata";
import CreateBlogClient from "@/components/admin/blog/CreateBlogClient";
import { createBlogByAdmin } from "@/services/blog.service";

export const metadata = constructMetadata({
  title: "Admin Dashboard",
  noIndex: true,
});

export default function CreateBlogPage() {
  const handleCreate = async (payload: any) => {
    "use server";
    return await createBlogByAdmin(payload);
  };

  return <CreateBlogClient onSubmit={handleCreate} />;
}
