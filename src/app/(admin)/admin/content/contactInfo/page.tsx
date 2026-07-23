import { constructMetadata } from "@/lib/metadata";
import EditContactInfoClient from "@/components/admin/contactInfo/EditContactInfoClient";

export const metadata = constructMetadata({
  title: "Admin Dashboard",
  noIndex: true,
});

import { getBrandingSettingsAdmin } from "@/services/settings.service";

export default async function AdminContactInfoPage() {
  const res = await getBrandingSettingsAdmin();
  const initialData = res.success ? res.data : null;

  return <EditContactInfoClient initialData={initialData} />;
}
