"use client";

import { useState } from "react";
import NewsForm from "@/components/admin/news/NewsForm";
import EventForm from "@/components/admin/events/EventForm";
import { FileText, Calendar } from "lucide-react";

export default function CreateNewsEventsClient({ initialType }: { initialType: "news" | "events" }) {
  const [activeTab, setActiveTab] = useState<"news" | "events">(initialType);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab("news")}
          className={`px-4 py-2 rounded-xl text-sm font-medium outline-none focus:outline-none transition-all flex items-center gap-2 ${
            activeTab === "news"
              ? "bg-white/10 text-white border border-white/10"
              : "text-gray-400 hover:text-white border border-transparent"
          }`}
        >
          <FileText className="w-4 h-4" />
          Add News Article
        </button>
        <button
          onClick={() => setActiveTab("events")}
          className={`px-4 py-2 rounded-xl text-sm font-medium outline-none focus:outline-none transition-all flex items-center gap-2 ${
            activeTab === "events"
              ? "bg-white/10 text-white border border-white/10"
              : "text-gray-400 hover:text-white border border-transparent"
          }`}
        >
          <Calendar className="w-4 h-4" />
          Add Event
        </button>
      </div>

      {/* Render selected form */}
      {activeTab === "news" ? <NewsForm /> : <EventForm />}
    </div>
  );
}
