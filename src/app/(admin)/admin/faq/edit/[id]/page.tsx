import { constructMetadata } from "@/lib/metadata";
import { faqService } from "@/services/faq.service";
import EditFaqClient from "@/components/admin/faq/EditFaqClient";

export const metadata = constructMetadata({
  title: "Edit FAQ - Admin Dashboard",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  let faq = null;

  try {
    const res = await faqService.getById(resolvedParams.id);
    if (res.success) {
      faq = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch FAQ", error);
  }

  if (!faq) {
    return (
      <div className="p-8 text-center text-gray-500">
        FAQ not found or could not be loaded.
      </div>
    );
  }

  return <EditFaqClient initialData={faq} />;
}
