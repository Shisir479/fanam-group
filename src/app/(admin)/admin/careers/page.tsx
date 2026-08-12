import { constructMetadata } from "@/lib/metadata";
import AdminCareersClient from "@/components/admin/careers/AdminCareersClient";
import { getJobsAdmin } from "@/services/job.service";
import { getApplicationsAdmin } from "@/services/application.service";

export const metadata = constructMetadata({
  title: "Careers - Admin Dashboard",
  noIndex: true,
});

export default async function AdminCareersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1");

  let initialJobs = [];
  let initialApplications = [];
  let totalJobsPages = 1;
  let totalAppsPages = 1;

  try {
    const [jobsRes, appsRes] = await Promise.all([
      getJobsAdmin({ page, limit: 10 }),
      getApplicationsAdmin({ page, limit: 10 }),
    ]);

    if (jobsRes?.success) {
      initialJobs = jobsRes.data || [];
      totalJobsPages = jobsRes.count || 1;
    }
    if (appsRes?.success) {
      initialApplications = appsRes.data || [];
      totalAppsPages = appsRes.count || 1;
    }
  } catch (error) {
    console.error("Failed to fetch careers data in SSR", error);
  }

  return (
    <AdminCareersClient
      initialJobs={initialJobs}
      initialApplications={initialApplications}
      totalJobsPages={totalJobsPages}
      totalAppsPages={totalAppsPages}
      currentPage={page}
    />
  );
}
