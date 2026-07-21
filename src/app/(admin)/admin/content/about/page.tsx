
import EditAboutClient from "@/components/admin/about/EditAboutClient";
import { getAboutAdmin } from "@/services/about.service";

export const metadata = {
  title: "Manage About Content | Bonedi Admin",
};

export default async function AdminAboutPage() {
  const res = await getAboutAdmin();
  const initialData = res?.data || null;

  return <EditAboutClient initialData={initialData} />;
}
