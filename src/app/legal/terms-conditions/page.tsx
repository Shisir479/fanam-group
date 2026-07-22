import { constructMetadata } from "@/lib/metadata";
import { TermsConditionsView } from "@/components/pages/TermsConditionsView";
import { getPageBySlugPublic } from "@/services/page.service";

export async function generateMetadata() {
  let pageData = null;
  try {
    const res = await getPageBySlugPublic("terms-conditions");
    if (res?.success) pageData = res.data;
  } catch (e) {}

  return constructMetadata({
    title: pageData?.metaTitle || "Terms & Conditions - Bonedi Homes",
    description:
      pageData?.metaDescription || "Terms & Conditions for Bonedi Homes",
  });
}

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
