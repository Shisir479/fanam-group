import { constructMetadata } from "@/lib/metadata";
import EditServiceClient from "@/components/admin/services/EditServiceClient";

export const metadata = constructMetadata({
  title: "Admin Dashboard",
  noIndex: true,
});

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  return <EditServiceClient slug={resolvedParams.slug} />;
}
