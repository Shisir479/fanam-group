import { constructMetadata } from "@/lib/metadata";

import EditAboutClient from "@/components/admin/about/EditAboutClient";
import { getAboutAdmin } from "@/services/about.service";

export const metadata = constructMetadata({
  title: "Admin Dashboard",
  noIndex: true,
});

export default async function AdminAboutPage() {
  const res = await getAboutAdmin();
  const initialData = res?.data || null;

  return <EditAboutClient initialData={initialData} />;
}
