"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const VIDEOS = [
  {
    id: 1,
    title: "Homecoming diaries | Edison Apricus",
    thumbnail:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
  },
  {
    id: 2,
    title: "Homecoming Diaries | Edison Angelo",
    thumbnail:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
  },
  {
    id: 3,
    title: "Celebration of Ownership",
    thumbnail:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
  },
];

const PlayButton = () => (
  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md ">
      <svg
        className="w-7 h-7 text-gray-800 ml-1"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  </div>
);

export default function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="w-full py-16 md:py-24 bg-white ">
      <div className="container mx-auto px-5 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          {VIDEOS.map((video) => (
            <div
              key={video.id}
              className="flex flex-col gap-4 group cursor-pointer"
              onClick={() => setActiveVideo(video.videoUrl)}
            >
              <div className="relative h-[270px] w-full overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transform-gpu transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500"></div>
                <PlayButton />
              </div>
              <h3 className="text-[17px] md:text-lg font-medium text-gray-900 text-left">
                {video.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-50"
            onClick={() => setActiveVideo(null)}
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="relative w-full max-w-5xl aspect-video rounded-lg overflow-hidden shadow-2xl">
            <iframe
              src={activeVideo}
              title="Video player"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}
