import { constructMetadata } from "@/lib/metadata";
import AdminMilestonesClient from "@/components/admin/milestones/AdminMilestonesClient";
export const metadata = constructMetadata({
  title: "Milestones - Admin Dashboard",
  noIndex: true,
});
export default function AdminMilestonesPage() {
  return <AdminMilestonesClient />;
}
