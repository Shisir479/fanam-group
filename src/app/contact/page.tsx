import { constructMetadata } from "@/lib/metadata";
import { getBannerByPageAdmin } from "@/services/banner.service";
import { ContactView } from "@/components/contact/ContactView";
import { getBrandingSettingsPublic } from "@/services/settings.service";

export const metadata = constructMetadata({
  title: "Contact Us - Fanam Group",
  description:
    "Get in touch with Fanam Group. Find our office locations, contact information, and business hours.",
});

export default async function ContactPage() {
  let banner = null;
  try {
    const res = await getBannerByPageAdmin("contact");
    if (res?.success) banner = res.data;
  } catch (e) {}

  let brandingData: any = null;
  try {
    const brandingRes = await getBrandingSettingsPublic();
    if (brandingRes?.success) {
      brandingData = brandingRes.data;
    }
  } catch (error) {
    // fallback
  }

  return <ContactView data={brandingData?.contact} />;
}
