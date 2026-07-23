import { constructMetadata } from "@/lib/metadata";
import { getGalleriesByAdmin, Gallery } from "@/services/gallery.service";
import AdminGalleryListClient from "@/components/admin/gallery/AdminGalleryListClient";

export const metadata = constructMetadata({
  title: "Gallery Management - Admin Dashboard",
  noIndex: true,
});

export default async function AdminGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1");
  const search = resolvedParams.search || "";

  let galleries: Gallery[] = [];
  let totalPages = 1;

  try {
    const res = await getGalleriesByAdmin({ page, search, limit: 10 });
    if (res.success) {
      galleries = res.data;
      totalPages = res.count;
    }
  } catch (error) {
    console.error("Failed to fetch galleries in SSR", error);
  }

  return (
    <AdminGalleryListClient
      initialGalleries={galleries}
      totalPages={totalPages}
      currentPage={page}
      currentSearch={search}
    />
  );
}
