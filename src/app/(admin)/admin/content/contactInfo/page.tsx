import { constructMetadata } from "@/lib/metadata";
import EditContactInfoClient from "@/components/admin/contactInfo/EditContactInfoClient";

export const metadata = constructMetadata({
  title: "Admin Dashboard",
  noIndex: true,
});

export default function AdminContactInfoPage() {
  return <EditContactInfoClient />;
}
