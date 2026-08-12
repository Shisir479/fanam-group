"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, FileText } from "lucide-react";
import { AdminTable, ColumnDef } from "@/components/ui/AdminTable";
import { DeleteModal } from "@/components/ui/DeleteModal";
import toast from "react-hot-toast";

export default function AdminDocumentsClient() {
  const [docs, setDocs] = useState([
    {
      _id: "1",
      title: "Q3 2023 Financial Report",
      type: "PDF",
      size: "2.4 MB",
    },
  ]);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    // Simulate delete
    setTimeout(() => {
      setDocs(docs.filter((d) => d._id !== deleteTarget));
      toast.success("Document deleted successfully");
      setIsDeleting(false);
      setDeleteTarget(null);
    }, 500);
  };

  const columns: ColumnDef<any>[] = [
    {
      header: "Document",
      render: (d) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
            <FileText className="w-4 h-4 text-gray-400" />
          </div>
          <div>
            <div className="font-semibold text-white">{d.title}</div>
            <div className="text-xs text-gray-400">
              {d.type} • {d.size}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      render: (d) => (
        <div className="space-x-2">
          <button className="text-gray-400 hover:text-green-400">
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteTarget(d._id)}
            className="text-gray-400 hover:text-red-400"
          >
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
          <h2 className="text-2xl font-bold text-white">Investor Documents</h2>
          <p className="text-gray-400 text-sm">
            Manage downloadable reports and PDFs.
          </p>
        </div>
        <button className="glass-btn">
          <Plus className="w-4 h-4" /> Upload Document
        </button>
      </div>
      <AdminTable
        columns={columns}
        data={docs}
        isLoading={false}
        keyExtractor={(d) => d._id}
      />

      <DeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Delete Document"
        description="Are you sure you want to delete this document? It will be permanently removed from the database."
      />
    </div>
  );
}
