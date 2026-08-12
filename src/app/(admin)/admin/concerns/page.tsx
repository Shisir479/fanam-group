import { constructMetadata } from "@/lib/metadata";
import { getConcernsByAdmin, ConcernType } from "@/services/concern.service";
import AdminConcernsListClient from "@/components/admin/concerns/AdminConcernsListClient";

export const metadata = constructMetadata({
  title: "Concerns Management - Admin Dashboard",
  noIndex: true,
});

export default async function AdminConcernsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1");
  const search = resolvedParams.search || "";

  let concerns: ConcernType[] = [];
  let totalPages = 1;

  try {
    const res = await getConcernsByAdmin({ page, search, limit: 10 });
    if (res.success) {
      concerns = res.data;
      totalPages = res.count || 1;
    }
  } catch (error) {
    console.error("Failed to fetch concerns in SSR", error);
  }

  return (
    <AdminConcernsListClient
      initialConcerns={concerns}
      totalPages={totalPages}
      currentPage={page}
      currentSearch={search}
    />
  );
}
