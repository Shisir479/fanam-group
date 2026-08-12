"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Heart } from "lucide-react";
import { AdminTable, ColumnDef } from "@/components/ui/AdminTable";

export default function AdminCSRClient() {
  const [csrs, setCsrs] = useState([
    {
      _id: "1",
      title: "Winter Cloth Distribution",
      date: "2024-01-10",
      status: "Completed",
    },
  ]);

  const columns: ColumnDef<any>[] = [
    {
      header: "CSR Activity",
      render: (csr) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
            <Heart className="w-4 h-4 text-gray-400" />
          </div>
          <div>
            <div className="font-semibold text-white">{csr.title}</div>
            <div className="text-xs text-gray-400">{csr.date}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      render: (e) => (
        <span className="text-green-500 text-xs font-bold">{e.status}</span>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      render: () => (
        <div className="space-x-2">
          <button className="text-gray-400 hover:text-green-400">
            <Edit className="w-4 h-4" />
          </button>
          <button className="text-gray-400 hover:text-red-400">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">CSR Activities</h2>
          <p className="text-gray-400 text-sm">
            Manage Corporate Social Responsibility initiatives.
          </p>
        </div>
        <button className="glass-btn">
          <Plus className="w-4 h-4" /> Add CSR
        </button>
      </div>
      <AdminTable
        columns={columns}
        data={csrs}
        isLoading={false}
        keyExtractor={(e) => e._id}
      />
    </div>
  );
}
