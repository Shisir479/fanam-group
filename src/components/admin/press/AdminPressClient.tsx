"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Newspaper } from "lucide-react";
import { AdminTable, ColumnDef } from "@/components/ui/AdminTable";

export default function AdminPressClient() {
  const [articles, setArticles] = useState([{ _id: "1", title: "Fanam Group Wins Big", publisher: "Daily Star", date: "2024-03-12" }]);

  const columns: ColumnDef<any>[] = [
    {
      header: "Article",
      render: (a) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/10"><Newspaper className="w-4 h-4 text-gray-400" /></div>
          <div><div className="font-semibold text-white">{a.title}</div><div className="text-xs text-gray-400">{a.publisher} • {a.date}</div></div>
        </div>
      )
    },
    {
      header: "Actions", className: "text-right",
      render: () => <div className="space-x-2"><button className="text-gray-400 hover:text-green-400"><Edit className="w-4 h-4" /></button><button className="text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button></div>
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24">
      <div className="flex justify-between items-center">
        <div><h2 className="text-2xl font-bold text-white">Media Coverage</h2><p className="text-gray-400 text-sm">Manage press mentions.</p></div>
        <button className="glass-btn"><Plus className="w-4 h-4" /> Add Article</button>
      </div>
      <AdminTable columns={columns} data={articles} isLoading={false} keyExtractor={(a) => a._id} />
    </div>
  );
}
