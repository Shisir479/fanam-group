import { constructMetadata } from "@/lib/metadata";
import { seoService, SeoSettings } from "@/services/seo.service";
import AdminSeoSettingsListClient from "@/components/admin/settings/seo/SeoSettingsClient";

export const metadata = constructMetadata({
  title: "SEO Settings | Fanam Admin",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default async function SeoSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1");
  const search = resolvedParams.search || "";

  let initialData: SeoSettings[] = [];
  let totalPages = 1;

  try {
    const res = await seoService.getAll({ page, search, limit: 10 });
    if (res?.success && res.data) {
      initialData = res.data;
      totalPages = res.count || 1;
    }
  } catch (error) {
    console.error("Failed to fetch SEO settings in SSR", error);
  }

  return (
    <AdminSeoSettingsListClient
      initialData={initialData}
      totalPages={totalPages}
      currentPage={page}
      currentSearch={search}
    />
  );
}
