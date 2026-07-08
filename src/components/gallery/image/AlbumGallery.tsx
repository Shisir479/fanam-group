"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Album {
  id: string;
  title: string;
  thumbnail: string;
  images: string[];
}

const ALBUMS: Album[] = [
  {
    id: "annual-conference-2024",
    title: "Annual Conference 2024",
    thumbnail:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop",
    ],
  },
  {
    id: "outing-2023",
    title: "Outing 2023",
    thumbnail:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1473621038520-5c621ffbc412?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506869640319-ce1a46062758?q=80&w=2070&auto=format&fit=crop",
    ],
  },
  {
    id: "falgun-utshob-2023",
    title: "Falgun Utshob 2023",
    thumbnail:
      "https://images.unsplash.com/photo-1604085572504-a392ddf0d86a?q=80&w=2142&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1604085572504-a392ddf0d86a?q=80&w=2142&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop",
    ],
  },
  {
    id: "tree-plantation-2023",
    title: "Tree Plantation 2023",
    thumbnail:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=1974&auto=format&fit=crop",
    ],
  },
  {
    id: "corporate-meeting",
    title: "Corporate Meeting",
    thumbnail:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=1932&auto=format&fit=crop",
    ],
  },
  {
    id: "edison-royal-club",
    title: "Edison Royal Club",
    thumbnail:
      "https://images.unsplash.com/photo-1561489396-888724a1543d?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1561489396-888724a1543d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    ],
  },
];

export default function AlbumGallery() {
  const [activeAlbum, setActiveAlbum] = useState<Album | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const openAlbum = (album: Album) => {
    setActiveAlbum(album);
    setCurrentImageIndex(0);
  };

  const closeAlbum = () => {
    setActiveAlbum(null);
  };

  const nextImage = () => {
    if (!activeAlbum) return;
    setCurrentImageIndex((prev) =>
      prev === activeAlbum.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    if (!activeAlbum) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? activeAlbum.images.length - 1 : prev - 1,
    );
  };

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto px-5 md:px-16">
        {/* Albums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
          {ALBUMS.map((album) => (
            <div key={album.id} className="flex flex-col gap-3">
              <div
                className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer group"
                onClick={() => openAlbum(album)}
              >
                <Image
                  src={album.thumbnail}
                  alt={album.title}
                  fill
                  className="object-cover transform-gpu transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500 flex items-center justify-center">
                  <span className="text-white text-[17px] font-bold tracking-wider">
                    View All
                  </span>
                </div>
              </div>
              <h3 className="text-[14px] font-medium text-gray-700 text-left">
                {album.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeAlbum && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-50"
            onClick={closeAlbum}
          >
            <X className="w-8 h-8" />
          </button>

          {activeAlbum.images.length > 1 && (
            <button
              className="absolute left-4 md:left-10 text-white hover:text-gray-300 transition-colors z-50 p-2 bg-black/20 rounded-full"
              onClick={prevImage}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          <div className="relative w-full max-w-5xl aspect-video md:aspect-[16/9]">
            <Image
              src={activeAlbum.images[currentImageIndex]}
              alt={`${activeAlbum.title} image ${currentImageIndex + 1}`}
              fill
              className="object-contain"
            />
            <div className="absolute bottom-4 left-0 right-0 text-center text-white/80 text-sm">
              {currentImageIndex + 1} / {activeAlbum.images.length}
            </div>
          </div>

          {activeAlbum.images.length > 1 && (
            <button
              className="absolute right-4 md:right-10 text-white hover:text-gray-300 transition-colors z-50 p-2 bg-black/20 rounded-full"
              onClick={nextImage}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
