import EditProjectClient from "@/components/project/EditProjectClient";

export const metadata = {
  title: "Edit Project | Admin",
  description: "Edit an existing real estate project.",
};

export default async function EditProjectPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  return <EditProjectClient slug={resolvedParams.slug} />;
}
