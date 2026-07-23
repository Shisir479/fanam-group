import { constructMetadata } from "@/lib/metadata";
import AdminPagesListClient from "@/components/pages/AdminPageListClient";

export const metadata = constructMetadata({
  title: "Admin Dashboard",
  noIndex: true,
});

import { getPagesByAdmin, Page } from "@/services/page.service";

export default async function AdminPageListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; status?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1");
  const search = resolvedParams.search || "";
  const status = resolvedParams.status || "";

  let pages: Page[] = [];
  let totalPages = 1;

  try {
    const res = await getPagesByAdmin({ page, search, status, limit: 10 });
    if (res.success) {
      pages = res.data;
      totalPages = res.count || 1;
    }
  } catch (error) {
    console.error("Failed to fetch pages:", error);
  }

  return (
    <AdminPagesListClient
      initialPages={pages}
      totalPages={totalPages}
      currentPage={page}
      currentSearch={search}
      currentStatus={status}
    />
  );
}
