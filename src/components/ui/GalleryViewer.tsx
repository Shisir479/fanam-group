"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryViewerProps {
  images: string[];
}

export function GalleryViewer({ images }: GalleryViewerProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 auto-rows-[120px] md:auto-rows-[150px]">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`relative overflow-hidden group shadow-sm border border-gray-200 cursor-pointer ${
              idx === 0
                ? "md:col-span-8 row-span-2"
                : idx === 1
                  ? "md:col-span-4 row-span-1"
                  : idx === 2
                    ? "md:col-span-4 row-span-1"
                    : "md:col-span-4 row-span-1"
            }`}
          >
            <Image
              src={img}
              alt={`Gallery ${idx}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/20 transition-colors duration-500"></div>
          </div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-50"
            onClick={() => setSelectedIndex(null)}
          >
            <X className="w-8 h-8" />
          </button>

          <button
            className="absolute left-4 md:left-10 text-white hover:text-gray-300 transition-colors z-50 p-2 bg-black/20 rounded-full"
            onClick={() =>
              setSelectedIndex((prev) =>
                prev === null || prev === 0 ? images.length - 1 : prev - 1,
              )
            }
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="relative w-full max-w-5xl aspect-video md:aspect-[16/9]">
            <Image
              src={images[selectedIndex]}
              alt={`Gallery view ${selectedIndex}`}
              fill
              className="object-contain"
            />
          </div>

          <button
            className="absolute right-4 md:right-10 text-white hover:text-gray-300 transition-colors z-50 p-2 bg-black/20 rounded-full"
            onClick={() =>
              setSelectedIndex((prev) =>
                prev === null || prev === images.length - 1 ? 0 : prev + 1,
              )
            }
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </>
  );
}
