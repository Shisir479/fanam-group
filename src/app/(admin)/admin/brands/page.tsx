import { constructMetadata } from "@/lib/metadata";
import AdminBrandsClient from "@/components/admin/brands/AdminBrandsClient";
export const metadata = constructMetadata({
  title: "Brands - Admin Dashboard",
  noIndex: true,
});
export default function AdminBrandsPage() {
  return <AdminBrandsClient />;
}
