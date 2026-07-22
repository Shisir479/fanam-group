import { constructMetadata } from "@/lib/metadata";
import AdminProjectListClient from "@/components/project/AdminProjectListClient";

export const metadata = constructMetadata({
  title: "Admin Dashboard",
  noIndex: true,
});

export default function AdminProjectList() {
  return <AdminProjectListClient />;
}
