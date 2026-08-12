import { constructMetadata } from "@/lib/metadata";
import AdminPressClient from "@/components/admin/press/AdminPressClient";
export const metadata = constructMetadata({
  title: "Media Coverage - Admin Dashboard",
  noIndex: true,
});
export default function AdminPressPage() {
  return <AdminPressClient />;
}
