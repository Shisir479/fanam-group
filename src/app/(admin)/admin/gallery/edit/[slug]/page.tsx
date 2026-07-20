import { getGalleryBySlugByAdmin, updateGalleryByAdmin } from "@/services/gallery.service";
import EditGalleryClient from "@/components/gallery/EditGalleryClient";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Gallery | Admin",
  description: "Update an existing gallery item.",
};

export default async function EditGalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let initialData = null;
  try {
    const res = await getGalleryBySlugByAdmin(slug);
    if (res.success && res.data) {
      initialData = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch gallery item:", error);
  }

  if (!initialData) {
    notFound();
  }

  const handleUpdate = async (payload: any) => {
    "use server";
    return await updateGalleryByAdmin(slug, payload);
  };

  return <EditGalleryClient initialData={initialData} onSubmit={handleUpdate} />;
}
