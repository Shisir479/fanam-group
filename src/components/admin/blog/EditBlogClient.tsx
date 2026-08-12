"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DynamicAdminForm, {
  FormField,
} from "@/components/admin/ui/DynamicAdminForm";

export default function EditBlogClient({
  initialData,
  slug,
  onSubmit,
  availableTags = [],
}: {
  initialData: any;
  slug: string;
  onSubmit: (payload: any) => Promise<any>;
  availableTags?: any[];
}) {
  const router = useRouter();

  const fields: FormField[] = [
    {
      name: "name",
      label: "Blog Title",
      type: "text",
      placeholder: "Enter blog title",
      required: true,
    },
    {
      name: "slug",
      label: "Slug (URL)",
      type: "text",
      placeholder: "my-blog-post",
      required: true,
      autoGenerateSlugFrom: "name",
    },
    {
      name: "tags",
      label: "Tag",
      type: "select",
      placeholder: "Select a tag",
      options: availableTags.map((t) => ({
        label: t.name,
        value: String(t._id),
      })),
      required: true,
      validationMessage: "At least one tag is required",
    },
    {
      name: "excerpt",
      label: "Excerpt (Short Description)",
      type: "textarea",
      placeholder: "A brief summary of the blog post...",
    },
    {
      name: "description",
      label: "Main Content",
      type: "rich-text",
      placeholder: "Write your blog post content here...",
      required: true,
    },
    // Sidebar fields
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Active (Published)", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
      sidebar: true,
    },
    {
      name: "coverUrl",
      label: "Cover Image",
      type: "image",
      imageIdKey: "coverId",
      required: true,
      sidebar: true,
    },
    {
      name: "metaTitle",
      label: "SEO Title",
      type: "text",
      placeholder: "SEO Title",
      required: true,
      sidebar: true,
    },
    {
      name: "metaDescription",
      label: "Meta Description",
      type: "textarea",
      placeholder: "SEO Description...",
      required: true,
      sidebar: true,
    },
  ];

  const handleEdit = async (data: Record<string, any>) => {
    try {
      const payload = {
        ...data,
        cover: {
          _id: data.coverId || Date.now().toString(),
          url: data.coverUrl,
        },
      };

      const res = await onSubmit(payload);
      if (res.success) {
        toast.success("Blog updated successfully!");
        router.push("/admin/blog");
        router.refresh();
      } else {
        toast.error(res.message || "Failed to update blog");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update blog");
    }
  };

  return (
    <DynamicAdminForm
      title="Edit Blog"
      fields={fields}
      initialValues={{
        name: initialData.name || "",
        slug: initialData.slug || "",
        excerpt: initialData.excerpt || "",
        description: initialData.description || "",
        metaTitle: initialData.metaTitle || "",
        metaDescription: initialData.metaDescription || "",
        status: initialData.status || "draft",
        tags: initialData.tags?.map((t: any) => t._id || t) || [],
        coverUrl: initialData.cover?.url || "",
        coverId: initialData.cover?._id || "",
      }}
      onSubmit={handleEdit}
      submitLabel="Save Changes"
      backHref="/admin/blog"
    />
  );
}
