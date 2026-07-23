import { constructMetadata } from "@/lib/metadata";
import { getServicesByAdmin, ServiceType } from "@/services/service.service";
import AdminServiceListClient from "@/components/admin/services/AdminServiceListClient";

export const metadata = constructMetadata({
  title: "Services Management - Admin Dashboard",
  noIndex: true,
});

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; status?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1");
  const search = resolvedParams.search || "";
  const status = resolvedParams.status || "";

  let services: ServiceType[] = [];
  let totalPages = 1;

  try {
    const res = await getServicesByAdmin({ page, search, status, limit: 10 });
    if (res.success) {
      services = res.data;
      totalPages = res.count;
    }
  } catch (error) {
    console.error("Failed to fetch services in SSR", error);
  }

  return (
    <AdminServiceListClient
      initialServices={services}
      totalPages={totalPages}
      currentPage={page}
      currentSearch={search}
      currentStatus={status}
    />
  );
}
