"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { faqService, FAQ } from "@/services/faq.service";
import { DeleteModal } from "@/components/ui/DeleteModal";
import toast from "react-hot-toast";
import { AdminTable, ColumnDef } from "@/components/ui/AdminTable";
import Link from "next/link";
import { Edit, Trash2, Plus } from "lucide-react";
import { div } from "three/src/nodes/math/OperatorNode.js";

interface AdminFaqListClientProps {
  initialFaqs: FAQ[];
}

export default function AdminFaqListClient({
  initialFaqs,
}: AdminFaqListClientProps) {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState<string | null>(null);

  const confirmDelete = (id: string) => {
    setFaqToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!faqToDelete) return;
    setIsDeleting(true);
    try {
      const res = await faqService.delete(faqToDelete);
      if (!res || res.success !== false) {
        toast.success("FAQ deleted successfully");
        setDeleteModalOpen(false);
        setFaqToDelete(null);
        router.refresh();
      } else {
        toast.error(res.message || "Failed to delete FAQ.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting.");
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: ColumnDef<FAQ>[] = [
    {
      header: "Question",
      className: "w-[30%] min-w-[250px]",
      render: (item) => (
        <div className="font-semibold text-white group-hover:text-[#CBA35E] transition-colors whitespace-normal">
          <p className="line-clamp-2">{item.question}</p>
        </div>
      ),
    },
    {
      header: "Answer",
      className: "w-[40%] min-w-[300px]",
      render: (item) => (
        <div className="text-sm text-gray-400 whitespace-normal">
          <p className="line-clamp-2">{item.answer}</p>
        </div>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            item.isActive
              ? "bg-green-500/10 text-green-500 border border-green-500/20"
              : "bg-red-500/10 text-red-500 border border-red-500/20"
          }`}
        >
          {item.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-right space-x-2",
      render: (item) => (
        <>
          <Link
            href={`/admin/faq/edit/${item._id}`}
            className="inline-flex p-1.5 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => confirmDelete(item._id!)}
            className="inline-flex p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-12 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            FAQ Management
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your frequently asked questions.
          </p>
        </div>
        <Link
          href="/admin/faq/create"
          className="glass-btn flex items-center gap-2 px-6 py-2"
        >
          <Plus className="w-4 h-4" />
          <span className="font-semibold">Add New FAQ</span>
        </Link>
      </div>

      <AdminTable
        columns={columns}
        data={initialFaqs}
        keyExtractor={(item: FAQ) => item._id}
        emptyMessage="No FAQs found. Create one to get started!"
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete FAQ"
        description="Are you sure you want to delete this FAQ? This action cannot be undone."
      />
    </div>
  );
}
