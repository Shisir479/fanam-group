"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { News } from "@/services/news.service";
import { PlayCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const NewsImageFeature = ({ news }: { news: News }) => (
  <Link
    href={`/news/${news.slug}`}
    className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-black/10 transition-all duration-300"
  >
    <div className="relative w-full h-56 lg:h-full lg:flex-1 overflow-hidden">
      {news.cover?.url ? (
        <Image
          src={news.cover.url}
          alt={news.title}
          fill
          className="object-cover transition-transform duration-700"
        />
      ) : (
        <div className="w-full h-full bg-gray-200" />
      )}
    </div>
    <div className="p-6 flex flex-col flex-1">
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-500 mb-3">
        {news.publishDate && (
          <span>{format(new Date(news.publishDate), "MMM dd, yyyy")}</span>
        )}
      </div>
      <h3 className="text-2xl lg:text-3xl font-bold text-[#392F5F] mb-4  transition-colors leading-tight tracking-tight">
        {news.title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
        {news.excerpt}
      </p>
      <div className="flex items-center gap-3 mt-auto">
        <div className="text-xs">
          <p className="font-bold text-[#392F5F]">
            By {news.author || "Editorial Team"}
          </p>
        </div>
      </div>
    </div>
  </Link>
);

const NewsSmallImageCard = ({ news }: { news: News }) => (
  <Link
    href={`/news/${news.slug}`}
    className="group flex flex-col h-full bg-white rounded-xl overflow-hidden  border border-black/10 transition-all duration-300"
  >
    <div className="relative w-full h-32 lg:h-full lg:flex-[1.5] overflow-hidden">
      {news.cover?.url ? (
        <Image
          src={news.cover.url}
          alt={news.title}
          fill
          className="object-cover "
        />
      ) : (
        <div className="w-full h-full bg-gray-200" />
      )}
    </div>
    <div className="p-3 flex flex-col flex-1 justify-center">
      <h3 className="text-sm font-bold text-[#392F5F] mb-1 transition-colors leading-tight line-clamp-2">
        {news.title}
      </h3>
      <div className="flex items-center gap-2 mt-1">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
          {news.publishDate
            ? format(new Date(news.publishDate), "MMM dd, yyyy")
            : "Updates"}
        </p>
      </div>
    </div>
  </Link>
);
export default function LatestUpdates({
  publishedNews,
}: {
  publishedNews: News[];
}) {
  const [visibleCount, setVisibleCount] = useState(5); // Show 5 initially (4 left, 1 right)

  if (!publishedNews || publishedNews.length === 0) return null;

  const leftCards = publishedNews.slice(1, 5); // 4 cards for the left side
  const bigCard = publishedNews[0]; // 1 big card for the right side

  return (
    <section>
      <div className="mb-12 text-center flex flex-col items-center">
        <h2 className="text-4xl font-extrabold text-[#392F5F] mb-2">
          Latest Updates
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 max-w-7xl mx-auto h-auto lg:h-[520px]">
        {/* Left Side: 1 Big Flat Card */}
        <div className="lg:col-span-7 flex flex-col h-full">
          {bigCard && <NewsImageFeature news={bigCard} />}
        </div>

        {/* Right Side: 4 Small Cards (2x2 grid) */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 h-full">
          {leftCards.map((news) => (
            <NewsSmallImageCard key={news._id} news={news} />
          ))}
        </div>
      </div>

      {/* Overflow standard grid if there are more than 5 items */}
      {publishedNews.length > 5 && (
        <>
          {visibleCount > 5 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pt-12 border-t border-black/10">
              {publishedNews.slice(5, visibleCount).map((news) => (
                <Link
                  href={`/news/${news.slug}`}
                  key={news._id}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-black/10 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden transform-gpu">
                    {news.cover?.url ? (
                      <Image
                        src={news.cover.url}
                        alt={news.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-500 mb-3">
                      {news.publishDate && (
                        <span>
                          {format(new Date(news.publishDate), "MMM dd, yyyy")}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-[#392F5F] mb-3 group-hover:text-[#f9c602] transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 mb-5 flex-1 line-clamp-2 text-sm">
                      {news.excerpt}
                    </p>
                    <span className="inline-flex items-center text-[#392F5F] font-bold group-hover:text-[#f9c602] transition-colors duration-300 text-sm">
                      Read More
                      <ArrowRight
                        size={16}
                        className="ml-2 group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {visibleCount < publishedNews.length && (
            <div
              className={`text-center ${visibleCount > 5 ? "mt-12" : "mt-10 pt-10 border-t border-black/10"}`}
            >
              <button
                onClick={() => setVisibleCount((prev) => prev + 4)}
                className=" text-white font-bold py-3 px-8 rounded-full cursor-pointer bg-[#f9c602] hover:text-[#392F5F] transition-colors shadow-md"
              >
                See More News
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
