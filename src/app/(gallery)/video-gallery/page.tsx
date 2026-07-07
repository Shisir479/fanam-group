"use client";

import VideoGalleryBanner from "@/components/gallery/video/banner";
import VideoGallery from "@/components/gallery/video/VideoGallery";

export default function VideoGalleryPage() {
  return (
    <main className="w-full bg-[#E5E7EB] min-h-screen">
      <VideoGalleryBanner />
      <VideoGallery />
    </main>
  );
}
