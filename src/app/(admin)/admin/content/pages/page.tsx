import { constructMetadata } from "@/lib/metadata";
import AdminPagesListClient from "@/components/pages/AdminPageListClient";

export const metadata = constructMetadata({
  title: "Admin Dashboard",
  noIndex: true,
});

export default function AdminPageListPage() {
  return <AdminPagesListClient />;
}
