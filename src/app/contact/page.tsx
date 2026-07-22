import { constructMetadata } from "@/lib/metadata";
import { ContactView } from "@/components/contact/ContactView";
import { getBrandingSettingsPublic } from "@/services/settings.service";

export const metadata = constructMetadata({
  title: "Contact Us - Bonedi Homes",
  description:
    "Get in touch with Bonedi Homes. Find our office locations, contact information, and business hours.",
});

export default async function ContactPage() {
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
