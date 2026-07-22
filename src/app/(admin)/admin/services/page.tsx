import { constructMetadata } from "@/lib/metadata";
import AdminServiceListClient from "@/components/admin/services/AdminServiceListClient";

export const metadata = constructMetadata({
  title: "Admin Dashboard",
  noIndex: true,
});

export default function AdminServicesPage() {
  return <AdminServiceListClient />;
}
