import { constructMetadata } from "@/lib/metadata";
import { PageBanner } from "@/components/ui/PageBanner";
import InvestorsClient from "@/components/investors/InvestorsClient";
import {
  getInvestorReportsPublic,
  InvestorReport,
} from "@/services/investor.service";
import {
  getInvestmentPartnersPublic,
  InvestmentPartner,
} from "@/services/investment-partner.service";

export const metadata = constructMetadata({
  title: "Investor Relations | Fanam Group",
});

export default async function InvestorsPage() {
  let initialReports: InvestorReport[] = [];
  let initialPartners: InvestmentPartner[] = [];

  try {
    const [reportsRes, partnersRes] = await Promise.all([
      getInvestorReportsPublic({ limit: 100 }),
      getInvestmentPartnersPublic({ limit: 50 }),
    ]);

    if (reportsRes?.success) {
      initialReports = reportsRes.data || [];
    }
    if (partnersRes?.success) {
      initialPartners = partnersRes.data || [];
    }
  } catch (error) {
    console.error("Failed to fetch public investor data", error);
  }

  return (
    <main className="min-h-screen bg-white">
      <PageBanner
        title="Investor Relations"
        subtitle="Empowering Growth and Sustainability"
        bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop"
      ></PageBanner>

      <InvestorsClient
        initialReports={initialReports}
        initialPartners={initialPartners}
      />
    </main>
  );
}
