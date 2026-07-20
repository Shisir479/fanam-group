import CreateBlogClient from "@/components/blog/CreateBlogClient";
import { createBlogByAdmin } from "@/services/blog.service";

export const metadata = {
  title: "Create Blog | Admin",
  description: "Create a new blog post",
};

export default function CreateBlogPage() {
  const handleCreate = async (payload: any) => {
    "use server";
    return await createBlogByAdmin(payload);
  };

  return <CreateBlogClient onSubmit={handleCreate} />;
}
