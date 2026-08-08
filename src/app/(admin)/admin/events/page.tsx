import { constructMetadata } from "@/lib/metadata";
import AdminEventsClient from "@/components/admin/events/AdminEventsClient";
export const metadata = constructMetadata({ title: "Events - Admin Dashboard", noIndex: true });
export default function AdminEventsPage() { return <AdminEventsClient />; }
