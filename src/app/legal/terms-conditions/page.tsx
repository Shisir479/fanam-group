import { constructMetadata } from "@/lib/metadata";
import { getBannerByPageAdmin } from "@/services/banner.service";
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
  let banner = null;
  try {
    const res = await getBannerByPageAdmin("terms-conditions");
    if (res?.success) banner = res.data;
  } catch (e) {}

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
