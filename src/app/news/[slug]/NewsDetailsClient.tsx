"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { News } from "@/services/news.service";
import { format } from "date-fns";

export default function NewsDetailsClient({ news }: { news: News }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* Hero Section */}
      <div className="relative w-full min-h-[50vh] flex items-end pb-16 pt-32">
        <div className="absolute inset-0">
          {news.cover?.url ? (
            <Image
              src={news.cover.url}
              alt={news.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/20" />
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white mb-6">
              <span className="text-sm font-medium tracking-wide uppercase">Press Release</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              {news.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 font-medium text-sm">
              {news.publishDate && (
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                  <Calendar size={16} className="text-[#f9c602]" />
                  <span>{format(new Date(news.publishDate), "MMMM dd, yyyy")}</span>
                </div>
              )}
              {news.author && (
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                  <User size={16} className="text-[#f9c602]" />
                  <span>By {news.author}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 md:px-20 py-20">
        <div className="max-w-4xl mx-auto">

          <div className="mb-12 flex items-center justify-between border-b border-gray-200 pb-6">
            <Link
              href="/news-events"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-[#f9c602] font-semibold transition-colors"
            >
              <ArrowLeft size={20} />
              Back to News & Events
            </Link>

            <button className="inline-flex items-center gap-2 text-gray-600 hover:text-[#f9c602] font-semibold transition-colors">
              <Share2 size={20} />
              Share
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-[#f9c602] hover:prose-a:text-yellow-600 prose-img:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: news.description }}
          />

        </div>
      </div>
    </div>
  );
}
