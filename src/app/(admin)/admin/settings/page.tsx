import AdminGeneralSettingsClient from "@/components/admin/settings/AdminGeneralSettingsClient";
import { constructMetadata } from "@/lib/metadata";
import { getBrandingSettingsAdmin } from "@/services/settings.service";

export const metadata = constructMetadata({
  title: "General Settings | Admin Dashboard",
  noIndex: true,
});

export default async function AdminGeneralSettingsPage() {
  const res = await getBrandingSettingsAdmin();
  const initialData = res.success ? res.data : null;

  return <AdminGeneralSettingsClient initialData={initialData} />;
}
