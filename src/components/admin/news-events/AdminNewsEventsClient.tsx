"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Calendar, FileText, Search } from "lucide-react";
import { AdminTable, ColumnDef } from "@/components/ui/AdminTable";
import { getEventsByAdmin, deleteEventByAdmin, Event } from "@/services/event.service";
import { getNewsByAdmin, deleteNewsByAdmin, News } from "@/services/news.service";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { Pagination } from "@/components/ui/Pagination";

interface AdminNewsEventsClientProps {
  initialNews: News[];
  initialEvents: Event[];
}

export default function AdminNewsEventsClient({ initialNews, initialEvents }: AdminNewsEventsClientProps) {
  const [activeTab, setActiveTab] = useState<"news" | "events">("news");
  
  const [newsList, setNewsList] = useState<News[]>(initialNews);
  const [eventsList, setEventsList] = useState<Event[]>(initialEvents);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === "news") {
        const res = await getNewsByAdmin({ limit: 0, search });
        if (res.success) setNewsList(res.data);
      } else {
        const res = await getEventsByAdmin({ limit: 0, search });
        if (res.success) setEventsList(res.data);
      }
    } catch (error) {
      toast.error(`Failed to fetch ${activeTab}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if there is a search term, since initial data is SSR'd
    if (search) {
      fetchData();
    } else {
      setNewsList(initialNews);
      setEventsList(initialEvents);
    }
    setCurrentPage(1);
  }, [search, activeTab, initialNews, initialEvents]);

  const handleDeleteNews = async (id: string) => {
    if (confirm("Are you sure you want to delete this news item?")) {
      try {
        const res = await deleteNewsByAdmin(id);
        if (res.success !== false) {
          toast.success("News deleted successfully");
          fetchData();
        } else {
          toast.error(res.error || "Failed to delete news");
        }
      } catch (error) {
        toast.error("Failed to delete news");
      }
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        const res = await deleteEventByAdmin(id);
        if (res.success !== false) {
          toast.success("Event deleted successfully");
          fetchData();
        } else {
          toast.error(res.error || "Failed to delete event");
        }
      } catch (error) {
        toast.error("Failed to delete event");
      }
    }
  };

  const newsColumns: ColumnDef<News>[] = [
    {
      header: "News Item",
      render: (news) => (
        <div className="flex items-center gap-4 group">
          {news.cover?.url ? (
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image src={news.cover.url} alt={news.title} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-gray-400" />
            </div>
          )}
          <div>
            <div className="font-semibold text-white group-hover:text-[#CBA35E] transition-colors line-clamp-1">
              {news.title}
            </div>
            <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">/{news.slug}</div>
          </div>
        </div>
      )
    },
    { 
      header: "Status", 
      render: (e) => (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold w-fit ${
          e.status === 'published' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'
        }`}>
          {e.status.charAt(0).toUpperCase() + e.status.slice(1)}
        </span>
      )
    },
    {
      header: "Actions", 
      className: "text-right space-x-2",
      render: (e) => (
        <>
          <Link href={`/admin/news-events/edit/news/${e._id}`} className="inline-flex p-1.5 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded transition-colors">
            <Edit className="w-4 h-4" />
          </Link>
          <button onClick={() => handleDeleteNews(e._id)} className="inline-flex p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </>
      )
    }
  ];

  const eventsColumns: ColumnDef<Event>[] = [
    {
      header: "Event Item",
      render: (event) => (
        <div className="flex items-center gap-4 group">
          {event.cover?.url ? (
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image src={event.cover.url} alt={event.title} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
          )}
          <div>
            <div className="font-semibold text-white group-hover:text-[#CBA35E] transition-colors line-clamp-1">
              {event.title}
            </div>
            <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">
              {new Date(event.eventDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
      )
    },
    {
      header: "Location",
      render: (e) => <span className="text-sm text-gray-300">{e.eventLocation}</span>
    },
    { 
      header: "Status", 
      render: (e) => (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold w-fit ${
          e.status === 'published' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'
        }`}>
          {e.status.charAt(0).toUpperCase() + e.status.slice(1)}
        </span>
      )
    },
    {
      header: "Actions", 
      className: "text-right space-x-2",
      render: (e) => (
        <>
          <Link href={`/admin/news-events/edit/event/${e._id}`} className="inline-flex p-1.5 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded transition-colors">
            <Edit className="w-4 h-4" />
          </Link>
          <button onClick={() => handleDeleteEvent(e._id)} className="inline-flex p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </>
      )
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">News & Events</h2>
          <p className="text-sm text-gray-400 mt-1">Manage your corporate news and upcoming events.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/admin/news-events/create?type=${activeTab}`} className="glass-btn whitespace-nowrap">
            <Plus className="w-4 h-4" /> Create New {activeTab === "news" ? "News" : "Event"}
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-white/10 pb-4">
        <button
          onClick={() => { setActiveTab("news"); setSearch(""); }}
          className={`px-4 py-2 rounded-xl text-sm font-medium outline-none focus:outline-none transition-all flex items-center gap-2 ${
            activeTab === "news"
              ? "bg-white/10 text-white border border-white/10"
              : "text-gray-400 hover:text-white border border-transparent"
          }`}
        >
          <FileText className="w-4 h-4" />
          News Articles
        </button>
        <button
          onClick={() => { setActiveTab("events"); setSearch(""); }}
          className={`px-4 py-2 rounded-xl text-sm font-medium outline-none focus:outline-none transition-all flex items-center gap-2 ${
            activeTab === "events"
              ? "bg-white/10 text-white border border-white/10"
              : "text-gray-400 hover:text-white border border-transparent"
          }`}
        >
          <Calendar className="w-4 h-4" />
          Events
        </button>
      </div>
      
      {/* Search */}
      <div className="glass-panel p-4 flex gap-4">
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
        />
      </div>

      {/* Table */}
      {activeTab === "news" ? (
        <div className="space-y-4">
          <AdminTable 
            columns={newsColumns} 
            data={newsList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} 
            isLoading={isLoading} 
            keyExtractor={(e) => e._id} 
          />
          {!isLoading && newsList.length > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(newsList.length / itemsPerPage)}
              onPageChange={setCurrentPage}
              theme="dark"
            />
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <AdminTable 
            columns={eventsColumns} 
            data={eventsList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} 
            isLoading={isLoading} 
            keyExtractor={(e) => e._id} 
          />
          {!isLoading && eventsList.length > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(eventsList.length / itemsPerPage)}
              onPageChange={setCurrentPage}
              theme="dark"
            />
          )}
        </div>
      )}
    </div>
  );
}
