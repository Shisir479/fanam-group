import EditPageClient from "@/components/pages/EditPageClient";

export const metadata = {
  title: "Edit Page Page | Admin Panel",
  description: "Update an existing pages or dynamic page.",
};

export default async function EditPagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EditPageClient slug={slug} />;
}
