"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DynamicAdminForm, {
  FormField,
} from "@/components/admin/ui/DynamicAdminForm";

export default function CreateBlogClient({
  onSubmit,
  availableTags = [],
}: {
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
      imageIdKey: "coverImage", // or coverId, but checking original it used coverId local state and sent coverImage
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

  const handleCreate = async (data: Record<string, any>) => {
    // Transform payload to match what backend expects
    const payload = {
      ...data,
      coverImage: data.coverImage, // if imageIdKey populated this
      tags: data.tags, // assuming array of one element is fine
    };

    await onSubmit(payload);
    toast.success("Blog created successfully!");
    router.push("/admin/blog");
    router.refresh();
  };

  return (
    <DynamicAdminForm
      title="Create New Blog"
      fields={fields}
      initialValues={{
        status: "draft",
        tags: [],
      }}
      onSubmit={handleCreate}
      submitLabel="Save Blog"
      backHref="/admin/blog"
    />
  );
}
