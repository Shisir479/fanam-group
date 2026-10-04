"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { FocusCards, FocusCardType } from "@/components/ui/focus-cards";

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
}

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

export default function VideoGallery({ videos = [] }: { videos?: Video[] }) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="w-full py-16 md:py-24 bg-white ">
      <div className="container mx-auto px-5 md:px-16">
        <div className="w-full">
          {videos.length > 0 && (
            <FocusCards
              cards={videos.map((video) => ({
                title: video.title,
                src: video.thumbnail,
                originalData: video,
              }))}
              onCardClick={(card) => setActiveVideo(card.originalData.videoUrl)}
            />
          )}
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
