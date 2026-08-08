import { constructMetadata } from "@/lib/metadata";
import AdminCareersClient from "@/components/admin/careers/AdminCareersClient";
export const metadata = constructMetadata({ title: "Careers - Admin Dashboard", noIndex: true });
export default function AdminCareersPage() { return <AdminCareersClient />; }
