import AlbumGallery from "@/components/gallery/image/AlbumGallery";
import ImageGalleryBanner from "@/components/gallery/image/banner";
import VideoGallery from "@/components/gallery/video/VideoGallery";

export default function GalleryPage() {
  return (
    <main className="w-full bg-white min-h-screen">
      <ImageGalleryBanner />
      <AlbumGallery />
      <VideoGallery />
    </main>
  );
}
