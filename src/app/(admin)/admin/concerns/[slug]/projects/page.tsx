import ConcernProjectsClient from "@/components/admin/concerns/ConcernProjectsClient";
import { constructMetadata } from "@/lib/metadata";
import { getConcernBySlugAdmin } from "@/services/concern.service";

import { notFound } from "next/navigation";

export const metadata = constructMetadata({
  title: "Admin Dashboard - Manage Concern Projects",
  noIndex: true,
});

export default async function ConcernProjectsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  let concern = null;

  try {
    const res = await getConcernBySlugAdmin(slug);
    if (res.success && res.data) {
      concern = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch concern details in SSR", error);
  }

  if (!concern) {
    notFound();
  }

  return <ConcernProjectsClient initialData={concern} />;
}
