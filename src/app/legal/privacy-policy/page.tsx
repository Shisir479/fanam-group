import { PrivacyPolicyView } from "@/components/pages/PrivacyPolicyView";
import { getPageBySlugPublic } from "@/services/page.service";

export const metadata = {
  title: "Privacy Policy - Bonedi Homes",
  description: "Privacy Policy for Bonedi Homes",
};

export default async function PrivacyPolicyPage() {
  let pageData = null;
  try {
    const res = await getPageBySlugPublic("privacy-policy");
    if (res?.success) {
      pageData = res.data;
    }
  } catch (error) {
    // Page not found in DB, show static view
  }

  return <PrivacyPolicyView pageData={pageData} />;
}
