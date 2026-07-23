import { constructMetadata } from "@/lib/metadata";
import { getProjectsByAdmin, Project } from "@/services/project.service";
import AdminProjectListClient from "@/components/project/AdminProjectListClient";

export const metadata = constructMetadata({
  title: "Projects Management - Admin Dashboard",
  noIndex: true,
});

export default async function AdminProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; status?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1");
  const search = resolvedParams.search || "";
  const status = resolvedParams.status || "";

  let projects: Project[] = [];
  let totalPages = 1;

  try {
    const res = await getProjectsByAdmin({ page, search, status, limit: 10 });
    if (res.success) {
      projects = res.data;
      totalPages = res.count;
    }
  } catch (error) {
    console.error("Failed to fetch projects in SSR", error);
  }

  return (
    <AdminProjectListClient
      initialProjects={projects}
      totalPages={totalPages}
      currentPage={page}
      currentSearch={search}
      currentStatus={status}
    />
  );
}
