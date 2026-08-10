import { constructMetadata } from "@/lib/metadata";
import { getConcernBySlugAdmin } from "@/services/concern.service";
import EditConcernClient from "@/components/admin/concerns/EditConcernClient";
import { notFound } from "next/navigation";

export const metadata = constructMetadata({
  title: "Admin Dashboard - Edit Concern",
  noIndex: true,
});

export default async function EditConcernPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  let data = null;

  try {
    const res = await getConcernBySlugAdmin(slug);
    if (res.success) {
      data = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch concern details in SSR", error);
  }

  if (!data) {
    notFound();
  }

  return <EditConcernClient initialData={data} />;
}
