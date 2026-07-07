import AlbumGallery from "@/components/gallery/image/AlbumGallery";
import ImageGalleryBanner from "@/components/gallery/image/banner";


export default function ImageGalleryPage() {
  return (
    <main className="w-full bg-black min-h-screen">
      {/* Banner Section with Wood Background and Scattered Photos */}
      <ImageGalleryBanner />

      {/* Dome Gallery Section */}
      <section className="w-full  relative bg-white flex items-center justify-center">
   <AlbumGallery/>
      </section>
    </main>
  );
}
