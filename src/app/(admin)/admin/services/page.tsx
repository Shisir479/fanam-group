import { Metadata } from "next";
import AdminServiceListClient from "@/components/admin/services/AdminServiceListClient";

export const metadata: Metadata = {
  title: "Manage Services | Bonedi Admin",
  description: "Manage your services.",
};

export default function AdminServicesPage() {
  return <AdminServiceListClient />;
}
