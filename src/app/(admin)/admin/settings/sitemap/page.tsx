import AdminSitemapSettingsClient from "@/components/admin/settings/sitemap/AdminSitemapSettingsClient";
import { constructMetadata } from "@/lib/metadata";
import { getSitemapSettings } from "@/services/settings.service";

export const metadata = constructMetadata({
  title: "Sitemap Settings | Admin Dashboard",
  noIndex: true,
});

export default async function AdminSitemapSettingsPage() {
  const res = await getSitemapSettings();
  const initialData = res.success ? res.data : [];

  return <AdminSitemapSettingsClient initialData={initialData} />;
}
