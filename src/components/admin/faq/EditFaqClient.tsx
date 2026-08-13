"use client";

import { useRouter } from "next/navigation";
import { faqService, FAQ } from "@/services/faq.service";
import toast from "react-hot-toast";
import DynamicAdminForm, {
  FormField,
} from "@/components/admin/ui/DynamicAdminForm";

interface EditFaqClientProps {
  initialData: FAQ;
}

export default function EditFaqClient({ initialData }: EditFaqClientProps) {
  const router = useRouter();

  const fields: FormField[] = [
    {
      name: "question",
      label: "Question",
      type: "text",
      placeholder: "e.g., What are your service hours?",
      required: true,
      defaultValue: initialData.question,
    },
    {
      name: "answer",
      label: "Answer",
      type: "textarea",
      placeholder: "Write the answer here...",
      required: true,
      defaultValue: initialData.answer,
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
      defaultValue: initialData.isActive ? "true" : "false",
    },
  ];

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      const payload = {
        question: data.question,
        answer: data.answer,
        isActive: data.isActive === "true" || data.isActive === true,
      };

      const res = await faqService.update(initialData._id, payload);
      if (!res || res.success !== false) {
        toast.success("FAQ updated successfully");
        router.push("/admin/faq");
        router.refresh();
      } else {
        toast.error(res.message || "Failed to update FAQ.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating.");
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto w-full">
      <DynamicAdminForm
        title="Edit FAQ"
        description="Update frequently asked question."
        fields={fields}
        onSubmit={handleSubmit}
        submitButtonText="Update FAQ"
        backHref="/admin/faq"
      />
    </div>
  );
}
