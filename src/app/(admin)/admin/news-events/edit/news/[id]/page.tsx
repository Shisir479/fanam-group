import { constructMetadata } from "@/lib/metadata";
import NewsForm from "@/components/admin/news/NewsForm";
import { getNewsByIdByAdmin } from "@/services/news.service";
import { redirect } from "next/navigation";

export const metadata = constructMetadata({ title: "Edit News - Admin Dashboard", noIndex: true });

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  let newsData = null;

  try {
    const res = await getNewsByIdByAdmin(resolvedParams.id);
    if (res.success && res.data) {
      newsData = res.data;
    } else {
      redirect("/admin/news-events");
    }
  } catch (error) {
    redirect("/admin/news-events");
  }

  return (
    <div className="max-w-7xl mx-auto">
      <NewsForm initialData={newsData} />
    </div>
  );
}
