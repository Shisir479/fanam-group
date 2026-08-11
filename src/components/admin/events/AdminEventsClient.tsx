"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Calendar, Search } from "lucide-react";
import { AdminTable, ColumnDef } from "@/components/ui/AdminTable";
import { getEventsByAdmin, deleteEventByAdmin, Event } from "@/services/event.service";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminEventsClient() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const res = await getEventsByAdmin({ limit: 0, search }); // Fetch all or paginated based on your setup
      if (res.success) {
        setEvents(res.data);
      }
    } catch (error) {
      toast.error("Failed to fetch events");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [search]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        const res = await deleteEventByAdmin(id);
        if (res.success !== false) {
          toast.success("Event deleted successfully");
          fetchEvents();
        } else {
          toast.error(res.error || "Failed to delete event");
        }
      } catch (error) {
        toast.error("Failed to delete event");
      }
    }
  };

  const columns: ColumnDef<Event>[] = [
    {
      header: "Event",
      render: (event) => (
        <div className="flex items-center gap-4 group">
          {event.cover?.url ? (
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <img src={event.cover.url} alt={event.title} className="w-full h-full object-cover" />
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
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold w-fit bg-[#f7f8fa] border border-transparent shadow-[2px_2px_5px_rgba(180,185,195,0.4),-2px_-2px_5px_rgba(255,255,255,0.9)] ${
          e.status === 'published' ? 'text-green-600' : 'text-amber-600'
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
          <Link href={`/admin/events/edit/${e._id}`} className="inline-flex p-1.5 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded transition-colors">
            <Edit className="w-4 h-4" />
          </Link>
          <button onClick={() => handleDelete(e._id)} className="inline-flex p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </>
      )
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Events</h2>
          <p className="text-sm text-gray-400 mt-1">Manage upcoming and past events.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/events/create" className="glass-btn whitespace-nowrap">
            <Plus className="w-4 h-4" /> Create New Event
          </Link>
        </div>
      </div>
      
      <div className="glass-panel p-4 flex gap-4">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
        />
      </div>

      <AdminTable columns={columns} data={events} isLoading={isLoading} keyExtractor={(e) => e._id} />
    </div>
  );
}
