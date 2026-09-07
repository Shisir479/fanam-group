"use client";

import { useRouter } from "next/navigation";
import { faqService } from "@/services/faq.service";
import toast from "react-hot-toast";
import DynamicAdminForm, {
  FormField,
} from "@/components/admin/ui/DynamicAdminForm";

export default function CreateFaqClient() {
  const router = useRouter();

  const fields: FormField[] = [
    {
      name: "question",
      label: "Question",
      type: "text",
      placeholder: "e.g., What are your service hours?",
      required: true,
    },
    {
      name: "answer",
      label: "Answer",
      type: "textarea",
      placeholder: "Write the answer here...",
      required: true,
    },
    {
      name: "isActive",
      label: "Status",
      type: "select",
      options: [
        { label: "Active", value: "true" },
        { label: "Inactive", value: "false" },
      ],
      sidebar: true,
    },
  ];

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      const payload = {
        question: data.question,
        answer: data.answer,
        isActive: data.isActive === "true" || data.isActive === true,
      };

      const res = await faqService.create(payload);
      if (!res || res.success !== false) {
        toast.success("FAQ created successfully");
        router.push("/admin/faq");
        router.refresh();
      } else {
        toast.error(res.message || "Failed to create FAQ.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating.");
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto w-full">
      <DynamicAdminForm
        title="Add New FAQ"
        fields={fields}
        initialValues={{ question: "", answer: "", status: "active", order: 0 }}
        onSubmit={handleSubmit}
        submitLabel="Create FAQ"
        backHref="/admin/faq"
      />
    </div>
  );
}
