import { constructMetadata } from "@/lib/metadata";
import EditHomepageClient from "@/components/admin/homepage/EditHomepageClient";
import { getHomepageCMSAdmin } from "@/services/homepage-cms.service";

export const metadata = constructMetadata({
  title: "Admin Dashboard",
  noIndex: true,
});

export default async function AdminHomepagePage() {
  const res = await getHomepageCMSAdmin();
  const initialData = res?.data || null;

  return <EditHomepageClient initialData={initialData} />;
}
