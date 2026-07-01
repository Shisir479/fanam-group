import ImageGalleryBanner from "@/components/gallery/image/banner";
import DomeGallery from "@/components/gallery/image/DomeGallery";

export default function ImageGalleryPage() {
  return (
    <main className="w-full bg-black min-h-screen">
      {/* Banner Section with Wood Background and Scattered Photos */}
      <ImageGalleryBanner />

      {/* Dome Gallery Section */}
      <section className="w-full min-h-[150vh] py-32 relative bg-white flex items-center justify-center">
        <DomeGallery
          fit={1.2}
          minRadius={700}
          maxVerticalRotationDeg={15}
          segments={38}
          dragDampening={2}
          grayscale={false}
        />
      </section>
    </main>
  );
}
