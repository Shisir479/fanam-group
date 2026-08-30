import { constructMetadata } from "@/lib/metadata";
import AdminInvestmentPartnersClient from "@/components/admin/investment-partners/AdminInvestmentPartnersClient";
import {
  getInvestmentPartnersAdmin,
  InvestmentPartner,
} from "@/services/investment-partner.service";

export const metadata = constructMetadata({
  title: "Investment Partners - Admin Dashboard",
  noIndex: true,
});

export default async function AdminInvestmentPartnersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1");

  let initialPartners: InvestmentPartner[] = [];
  let totalPages = 1;

  try {
    const res = await getInvestmentPartnersAdmin({ page, limit: 10 });
    if (res?.success) {
      initialPartners = res.data || [];
      totalPages = res.count || 1;
    }
  } catch (error) {
    console.error("Failed to fetch investment partners in SSR", error);
  }

  return (
    <AdminInvestmentPartnersClient
      initialPartners={initialPartners}
      totalPages={totalPages}
      currentPage={page}
    />
  );
}
