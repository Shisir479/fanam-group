import AlbumGallery, { Album } from "@/components/gallery/image/AlbumGallery";
import ImageGalleryBanner from "@/components/gallery/image/banner";
import { getGalleriesPublic } from "@/services/gallery.service";

export default async function ImageGalleryPage() {
  const res = await getGalleriesPublic({ limit: 100 });
  const rawGalleries = res?.data || [];

  // Filter image galleries
  const imageGalleries = rawGalleries.filter(g => g.type === "image");

  // Group by title to form albums
  const albumMap = new Map<string, Album>();

  imageGalleries.forEach((gallery) => {
    if (!albumMap.has(gallery.title)) {
      albumMap.set(gallery.title, {
        id: gallery.slug,
        title: gallery.title,
        thumbnail: gallery.cover?.url || "",
        images: [],
      });
    }
    const album = albumMap.get(gallery.title)!;
    if (gallery.cover?.url) {
      album.images.push(gallery.cover.url);
      // Use the first image as thumbnail if not set
      if (!album.thumbnail) {
        album.thumbnail = gallery.cover.url;
      }
    }
  });

  const albums = Array.from(albumMap.values());

  return (
    <main className="w-full bg-black min-h-screen">
      {/* Banner Section with Wood Background and Scattered Photos */}
      <ImageGalleryBanner />

      {/* Dome Gallery Section */}
      <section className="w-full relative bg-white flex items-center justify-center">
        <AlbumGallery albums={albums} />
      </section>
    </main>
  );
}
