"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PageBanner } from "@/components/ui/PageBanner";
import { News } from "@/services/news.service";
import { Event } from "@/services/event.service";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import EventsList from "@/components/events/EventsList";
import LatestUpdates from "@/components/news/LatestUpdates";

export default function NewsEventsClient({
  initialNews,
  initialEvents,
}: {
  initialNews: News[];
  initialEvents: Event[];
}) {
  const publishedNews = initialNews.filter((n) => n.status === "published");
  const publishedEvents = initialEvents.filter((e) => e.status === "published");

  return (
    <div className="min-h-screen bg-white text-black pb-24">
      <PageBanner
        title="News & Events"
        subtitle="CORPORATE UPDATES"
        bgImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920"
      />

      <div className="container mx-auto px-5 md:px-16 space-y-24 mt-16">
        {/* Latest News Section */}
        <LatestUpdates publishedNews={publishedNews} />

        {/* Events Sections (Interactive Calendar) */}
        <EventsList initialEvents={publishedEvents} />
      </div>
    </div>
  );
}
