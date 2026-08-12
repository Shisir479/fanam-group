import { constructMetadata } from "@/lib/metadata";
import AdminDocumentsClient from "@/components/admin/documents/AdminDocumentsClient";
export const metadata = constructMetadata({
  title: "Investor Documents - Admin Dashboard",
  noIndex: true,
});
export default function AdminDocumentsPage() {
  return <AdminDocumentsClient />;
}
