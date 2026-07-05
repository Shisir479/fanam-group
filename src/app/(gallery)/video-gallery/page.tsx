"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import VideoGalleryBanner from "@/components/gallery/video/banner";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const heroVideos = [
  {
    id: 1,
    thumbnail:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    thumbnail:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    thumbnail:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    thumbnail:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1600585154526-990dced4ea0d?q=80&w=800&auto=format&fit=crop",
  },
];

const gridVideos = [
  {
    id: 1,
    title: "Homecoming diaries | Edison Apricus",
    thumbnail:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Homecoming Diaries | Edison Angelo",
    thumbnail:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
  },
];

const PlayButton = () => (
  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
    <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
      <svg
        className="w-6 h-6 md:w-8 md:h-8 text-gray-700 ml-1"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  </div>
);

export default function VideoGalleryPage() {
  return (
    <main className="w-full bg-[#E5E7EB] min-h-screen">
      <VideoGalleryBanner />

      {/* Grid Videos Section */}
      <div className="w-full bg-white py-16">
        <div className="container mx-auto px-5 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            {gridVideos.map((video) => (
              <div
                key={video.id}
                className="flex flex-col group cursor-pointer"
              >
                <div className="relative w-full aspect-video border-[6px] border-[#0a1128] overflow-hidden mb-4">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                  <PlayButton />
                </div>
                <h3 className="text-lg md:text-xl font-medium text-gray-900 border-l-2 border-gray-300 pl-3">
                  {video.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
