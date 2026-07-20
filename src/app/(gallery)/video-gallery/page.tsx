

import VideoGalleryBanner from "@/components/gallery/video/banner";
import VideoGallery, { Video } from "@/components/gallery/video/VideoGallery";
import { getGalleriesPublic } from "@/services/gallery.service";

export default async function VideoGalleryPage() {
  const res = await getGalleriesPublic({ limit: 100 });
  const rawGalleries = res?.data || [];

  const videoGalleries = rawGalleries.filter(g => g.type === "video");

  const videos: Video[] = videoGalleries.map((gallery) => ({
    id: gallery._id || gallery.slug,
    title: gallery.title,
    thumbnail: gallery.thumbnail?.url || gallery.cover?.url || "",
    videoUrl: gallery.videoUrl || "",
  }));

  return (
    <main className="w-full bg-brand-gray min-h-screen">
      <VideoGalleryBanner />
      <VideoGallery videos={videos} />
    </main>
  );
}
