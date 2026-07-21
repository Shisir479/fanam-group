import { Metadata } from "next";
import EditServiceClient from "@/components/admin/services/EditServiceClient";

export const metadata: Metadata = {
  title: "Edit Service | Bonedi Admin",
  description: "Edit an existing service.",
};

export default async function EditServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <EditServiceClient slug={resolvedParams.slug} />;
}
