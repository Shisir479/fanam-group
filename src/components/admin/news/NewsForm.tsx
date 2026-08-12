"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  createNewsByAdmin,
  updateNewsByAdmin,
  News,
} from "@/services/news.service";
import DynamicAdminForm, {
  FormField,
} from "@/components/admin/ui/DynamicAdminForm";

interface NewsFormProps {
  initialData?: News;
}

export default function NewsForm({ initialData }: NewsFormProps) {
  const router = useRouter();

  const fields: FormField[] = [
    {
      name: "title",
      label: "News Title",
      type: "text",
      placeholder: "Enter news title",
      required: true,
    },
    {
      name: "slug",
      label: "Slug (URL)",
      type: "text",
      placeholder: "my-news-article",
      required: true,
      autoGenerateSlugFrom: "title",
    },
    {
      name: "excerpt",
      label: "Excerpt (Short Description)",
      type: "textarea",
      placeholder: "A brief summary of the news...",
    },
    {
      name: "description",
      label: "Main Content",
      type: "rich-text",
      placeholder: "Write your news content here...",
      required: true,
    },
    // Sidebar fields
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Draft (Hidden)", value: "draft" },
        { label: "Published (Visible)", value: "published" },
      ],
      sidebar: true,
    },
    {
      name: "author",
      label: "Author",
      type: "text",
      placeholder: "Author name",
      sidebar: true,
    },
    {
      name: "publishDate",
      label: "Publish Date",
      type: "date",
      sidebar: true,
    },
    {
      name: "isFeatured",
      label: "Featured News",
      type: "checkbox",
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
      sidebar: true,
    },
    {
      name: "metaDescription",
      label: "Meta Description",
      type: "textarea",
      placeholder: "SEO Description...",
      sidebar: true,
    },
  ];

  const handleSave = async (data: Record<string, any>) => {
    try {
      const payload = {
        ...data,
        cover: {
          _id: data.coverId || Date.now().toString(),
          url: data.coverUrl,
        },
      };

      let res;
      if (initialData?._id) {
        res = await updateNewsByAdmin(initialData._id, payload);
      } else {
        res = await createNewsByAdmin(payload);
      }

      if (res.success !== false) {
        toast.success(
          `News ${initialData ? "updated" : "created"} successfully`,
        );
        router.push("/admin/news-events");
        router.refresh();
      } else {
        toast.error(
          res.error || `Failed to ${initialData ? "update" : "create"} news`,
        );
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <DynamicAdminForm
      title={initialData ? "Edit News" : "Create New News Article"}
      fields={fields}
      initialValues={{
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        description: initialData?.description || "",
        excerpt: initialData?.excerpt || "",
        status: initialData?.status || "draft",
        metaTitle: initialData?.metaTitle || "",
        metaDescription: initialData?.metaDescription || "",
        author: initialData?.author || "",
        publishDate: initialData?.publishDate
          ? new Date(initialData.publishDate).toISOString().split("T")[0]
          : "",
        isFeatured: initialData?.isFeatured || false,
        coverUrl: initialData?.cover?.url || "",
        coverId: initialData?.cover?._id || "",
      }}
      onSubmit={handleSave}
      submitLabel="Save News"
      backHref="/admin/news-events"
    />
  );
}
