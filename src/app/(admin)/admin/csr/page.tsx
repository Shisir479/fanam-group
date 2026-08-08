import { constructMetadata } from "@/lib/metadata";
import AdminCSRClient from "@/components/admin/csr/AdminCSRClient";
export const metadata = constructMetadata({ title: "CSR Activities - Admin Dashboard", noIndex: true });
export default function AdminCSRPage() { return <AdminCSRClient />; }
