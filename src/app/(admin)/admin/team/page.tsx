import { constructMetadata } from "@/lib/metadata";
import AdminTeamClient from "@/components/admin/team/AdminTeamClient";

export const metadata = constructMetadata({
  title: "Leadership Team Management - Admin Dashboard",
  noIndex: true,
});

export default function AdminTeamPage() {
  return <AdminTeamClient />;
}
