"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  createEventByAdmin,
  updateEventByAdmin,
  Event,
} from "@/services/event.service";
import DynamicAdminForm, {
  FormField,
} from "@/components/admin/ui/DynamicAdminForm";

interface EventFormProps {
  initialData?: Event;
}

export default function EventForm({ initialData }: EventFormProps) {
  const router = useRouter();

  const fields: FormField[] = [
    {
      name: "title",
      label: "Event Title",
      type: "text",
      placeholder: "Enter event title",
      required: true,
    },
    {
      name: "slug",
      label: "Slug (URL)",
      type: "text",
      placeholder: "event-slug",
      required: true,
      autoGenerateSlugFrom: "title",
    },
    {
      name: "eventDate",
      label: "Event Date",
      type: "date",
      required: true,
    },
    {
      name: "eventLocation",
      label: "Location",
      type: "text",
      placeholder: "e.g., Fanam Headquarters",
      required: true,
    },
    {
      name: "excerpt",
      label: "Excerpt (Short Description)",
      type: "textarea",
      placeholder: "Short summary for lists",
    },
    {
      name: "description",
      label: "Main Content",
      type: "rich-text",
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
      name: "isFeatured",
      label: "Featured Event",
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
        res = await updateEventByAdmin(initialData._id, payload);
      } else {
        res = await createEventByAdmin(payload);
      }

      if (res.success !== false) {
        toast.success(
          `Event ${initialData ? "updated" : "created"} successfully`,
        );
        router.push("/admin/news-events");
        router.refresh();
      } else {
        toast.error(
          res.error || `Failed to ${initialData ? "update" : "create"} event`,
        );
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <DynamicAdminForm
      title={initialData ? "Edit Event" : "Create New Event"}
      fields={fields}
      initialValues={{
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        description: initialData?.description || "",
        excerpt: initialData?.excerpt || "",
        eventDate: initialData?.eventDate
          ? new Date(initialData.eventDate).toISOString().split("T")[0]
          : "",
        eventLocation: initialData?.eventLocation || "",
        status: initialData?.status || "draft",
        metaTitle: initialData?.metaTitle || "",
        metaDescription: initialData?.metaDescription || "",
        isFeatured: initialData?.isFeatured || false,
        coverUrl: initialData?.cover?.url || "",
        coverId: initialData?.cover?._id || "",
      }}
      onSubmit={handleSave}
      submitLabel="Save Event"
      backHref="/admin/news-events"
    />
  );
}
