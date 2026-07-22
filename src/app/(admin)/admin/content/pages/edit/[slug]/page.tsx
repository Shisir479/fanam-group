import { constructMetadata } from "@/lib/metadata";
import EditPageClient from "@/components/pages/EditPageClient";

export const metadata = constructMetadata({
  title: "Admin Dashboard",
  noIndex: true,
});

export default async function EditPagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EditPageClient slug={slug} />;
}
