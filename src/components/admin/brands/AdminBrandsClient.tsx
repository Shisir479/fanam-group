"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Hexagon } from "lucide-react";
import { AdminTable, ColumnDef } from "@/components/ui/AdminTable";

export default function AdminBrandsClient() {
  const [brands, setBrands] = useState([{ _id: "1", name: "Tech Corp", status: "active" }]);

  const columns: ColumnDef<any>[] = [
    {
      header: "Partner Brand",
      render: (b) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/10"><Hexagon className="w-4 h-4 text-gray-400" /></div>
          <div className="font-semibold text-white">{b.name}</div>
        </div>
      )
    },
    { header: "Status", render: (b) => <span className="text-green-500 text-xs font-bold">{b.status}</span> },
    {
      header: "Actions", className: "text-right",
      render: () => <div className="space-x-2"><button className="text-gray-400 hover:text-green-400"><Edit className="w-4 h-4" /></button><button className="text-gray-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button></div>
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24">
      <div className="flex justify-between items-center">
        <div><h2 className="text-2xl font-bold text-white">Business Partners</h2><p className="text-gray-400 text-sm">Manage partner logos.</p></div>
        <button className="glass-btn"><Plus className="w-4 h-4" /> Add Partner</button>
      </div>
      <AdminTable columns={columns} data={brands} isLoading={false} keyExtractor={(b) => b._id} />
    </div>
  );
}
