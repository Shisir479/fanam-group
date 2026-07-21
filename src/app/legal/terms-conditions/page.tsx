import { TermsConditionsView } from "@/components/pages/TermsConditionsView";
import { getPageBySlugPublic } from "@/services/page.service";

export const metadata = {
  title: "Terms & Conditions - Bonedi Homes",
  description: "Terms and Conditions for Bonedi Homes",
};

export default async function TermsConditionsPage() {
  let pageData = null;
  try {
    const res = await getPageBySlugPublic("terms-and-conditions");
    if (res?.success) {
      pageData = res.data;
    }
  } catch (error) {
    // Page not found in DB, show static view
  }

  return <TermsConditionsView pageData={pageData} />;
}
