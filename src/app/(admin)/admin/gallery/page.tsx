import { constructMetadata } from "@/lib/metadata";
import AdminGalleryListClient from "@/components/gallery/AdminGalleryListClient";

export const metadata = constructMetadata({
  title: "Admin Dashboard",
  noIndex: true,
});

export default function AdminGalleryList() {
  return <AdminGalleryListClient />;
}
