import { constructMetadata } from "@/lib/metadata";
import { createGalleryByAdmin } from "@/services/gallery.service";
import CreateGalleryClient from "@/components/gallery/CreateGalleryClient";

export const metadata = constructMetadata({
  title: "Admin Dashboard",
  noIndex: true,
});

export default function CreateGalleryPage() {
  const handleCreate = async (payload: any) => {
    "use server";
    return await createGalleryByAdmin(payload);
  };

  return <CreateGalleryClient onSubmit={handleCreate} />;
}
