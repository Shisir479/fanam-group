"use client";

import { useRouter } from "next/navigation";
import { createTestimonialByAdmin } from "@/services/testimonial.service";
import toast from "react-hot-toast";
import DynamicAdminForm, {
  FormField,
} from "@/components/admin/ui/DynamicAdminForm";

export default function CreateTestimonialClient() {
  const router = useRouter();

  const fields: FormField[] = [
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "e.g., Amazing Service!",
      required: true,
    },
    {
      name: "name",
      label: "Client Name",
      type: "text",
      placeholder: "John Doe",
      required: true,
    },
    {
      name: "designation",
      label: "Designation",
      type: "text",
      placeholder: "CEO",
    },
    {
      name: "company",
      label: "Company",
      type: "text",
      placeholder: "Tech Corp",
    },
    {
      name: "review",
      label: "Review",
      type: "textarea",
      placeholder: "Write the testimonial here...",
      required: true,
    },
    {
      name: "image",
      label: "Client Image",
      type: "image",
      required: true,
      sidebar: true,
      imageIdKey: "imageId",
    },
    {
      name: "rating",
      label: "Rating",
      type: "select",
      options: [
        { label: "5 Stars", value: "5" },
        { label: "4 Stars", value: "4" },
        { label: "3 Stars", value: "3" },
        { label: "2 Stars", value: "2" },
        { label: "1 Star", value: "1" },
      ],
      sidebar: true,
    },
    {
      name: "sortOrder",
      label: "Sort Order",
      type: "text",
      placeholder: "0",
      sidebar: true,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
      sidebar: true,
    },
    {
      name: "featured",
      label: "Featured",
      type: "checkbox",
      sidebar: true,
    },
    {
      name: "metaTitle",
      label: "Meta Title (SEO)",
      type: "text",
      placeholder: "SEO Title...",
      sidebar: true,
    },
    {
      name: "metaDescription",
      label: "Meta Description (SEO)",
      type: "textarea",
      placeholder: "SEO Description...",
      sidebar: true,
    },
  ];

  const initialValues = {
    title: "",
    name: "",
    designation: "",
    company: "",
    review: "",
    rating: "5",
    sortOrder: "0",
    status: "active",
    featured: false,
    image: "",
    imageId: "",
    metaTitle: "",
    metaDescription: "",
  };

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      const finalData = {
        ...data,
        rating: Number(data.rating),
        sortOrder: Number(data.sortOrder) || 0,
        image: {
          _id: data.imageId || data.image,
          url: data.image,
        },
      };

      await createTestimonialByAdmin(finalData);
      toast.success("Testimonial created successfully");
      router.push("/admin/testimonials");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.message || "Failed to create testimonial");
      throw error;
    }
  };

  return (
    <DynamicAdminForm
      title="Create Testimonial"
      fields={fields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitLabel="Create Testimonial"
      backHref="/admin/testimonials"
    />
  );
}
