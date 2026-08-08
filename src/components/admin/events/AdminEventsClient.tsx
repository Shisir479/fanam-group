"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Calendar } from "lucide-react";
import { AdminTable, ColumnDef } from "@/components/ui/AdminTable";

export default function AdminEventsClient() {
  const [events, setEvents] = useState([{ _id: "1", title: "Annual General Meeting", date: "2024-10-15", status: "Upcoming" }]);

  const columns: ColumnDef<any>[] = [
    {
      header: "Event",
      render: (event) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/10"><Calendar className="w-4 h-4 text-gray-400" /></div>
          <div><div className="font-semibold text-white">{event.title}</div><div className="text-xs text-gray-400">{event.date}</div></div>
        </div>
      )
    },
    { header: "Status", render: (e) => <span className="text-green-500 text-xs font-bold">{e.status}</span> },
    {
      header: "Actions", className: "text-right",
      render: () => <div className="space-x-2"><button className="text-gray-400 hover:text-green-400"><Edit className="w-4 h-4" /></button><button className="text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button></div>
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24">
      <div className="flex justify-between items-center">
        <div><h2 className="text-2xl font-bold text-white">Events</h2><p className="text-gray-400 text-sm">Manage upcoming and past events.</p></div>
        <button className="glass-btn"><Plus className="w-4 h-4" /> Add Event</button>
      </div>
      <AdminTable columns={columns} data={events} isLoading={false} keyExtractor={(e) => e._id} />
    </div>
  );
}
