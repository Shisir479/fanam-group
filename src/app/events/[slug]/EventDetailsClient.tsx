"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageBanner } from "@/components/ui/PageBanner";
import { Event } from "@/services/event.service";
import { format } from "date-fns";

export default function EventDetailsClient({ event }: { event: Event }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 pb-24">
      
      <PageBanner
        title={event.title}
        subtitle="CORPORATE EVENT"
        bgImage={event.cover?.url || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920"}
      />

      <div className="container mx-auto px-5 md:px-16 pt-16">
        <div className="max-w-4xl mx-auto">
          
          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-6 gap-4">
            <Link 
              href="/news-events" 
              className="inline-flex items-center gap-2 text-brand-blue font-bold tracking-widest uppercase text-sm hover:text-[#4ea24b] transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Events
            </Link>
            
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
              {event.eventDate && <span>{format(new Date(event.eventDate), "MMMM dd, yyyy")}</span>}
              {event.eventDate && event.eventLocation && <span className="text-gray-300">|</span>}
              {event.eventLocation && <span>{event.eventLocation}</span>}
            </div>
          </div>

          <div
            className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-brand-blue prose-a:text-[#4ea24b] hover:prose-a:text-green-700 prose-img:rounded-none"
            dangerouslySetInnerHTML={{ __html: event.description }}
          />

        </div>
      </div>
    </div>
  );
}
