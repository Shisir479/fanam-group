import { constructMetadata } from "@/lib/metadata";
import AdminAwardsClient from "@/components/admin/awards/AdminAwardsClient";

export const metadata = constructMetadata({
  title: "Awards Management - Admin Dashboard",
  noIndex: true,
});

export default function AdminAwardsPage() {
  return <AdminAwardsClient />;
}
