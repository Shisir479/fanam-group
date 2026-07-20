import { createGalleryByAdmin } from "@/services/gallery.service";
import CreateGalleryClient from "@/components/gallery/CreateGalleryClient";

export const metadata = {
  title: "Create Gallery | Admin",
  description: "Add a new image or video to your gallery.",
};

export default function CreateGalleryPage() {
  const handleCreate = async (payload: any) => {
    "use server";
    return await createGalleryByAdmin(payload);
  };

  return <CreateGalleryClient onSubmit={handleCreate} />;
}
