import { constructMetadata } from "@/lib/metadata";
import AdminInvestorsClient from "@/components/admin/investors/AdminInvestorsClient";
import {
  getInvestorReportsByAdmin,
  InvestorReport,
} from "@/services/investor.service";

export const metadata = constructMetadata({
  title: "Investor Reports - Admin Dashboard",
  noIndex: true,
});

export default async function AdminInvestorsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1");

  let initialReports: InvestorReport[] = [];
  let totalPages = 1;

  try {
    const res = await getInvestorReportsByAdmin({ page, limit: 10 });
    if (res?.success) {
      initialReports = res.data || [];
      totalPages = res.count || 1;
    }
  } catch (error) {
    console.error("Failed to fetch investor reports in SSR", error);
  }

  return (
    <AdminInvestorsClient
      initialReports={initialReports}
      totalPages={totalPages}
      currentPage={page}
    />
  );
}
