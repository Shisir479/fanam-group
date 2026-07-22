import { constructMetadata } from "@/lib/metadata";
import EditProjectClient from "@/components/project/EditProjectClient";

export const metadata = constructMetadata({
  title: "Admin Dashboard",
  noIndex: true,
});

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  return <EditProjectClient slug={resolvedParams.slug} />;
}
