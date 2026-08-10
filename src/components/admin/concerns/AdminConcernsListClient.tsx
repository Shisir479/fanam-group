"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ConcernType, deleteConcernBySlugAdmin } from "@/services/concern.service";
import { DeleteModal } from "@/components/ui/DeleteModal";
import {
  Edit,
  Trash2,
  Plus,
  Building,
  Eye,
  Folder,
} from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { AdminTable, ColumnDef } from "@/components/ui/AdminTable";

interface AdminConcernsListClientProps {
  initialConcerns: ConcernType[];
}

export default function AdminConcernsListClient({
  initialConcerns,
}: AdminConcernsListClientProps) {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [concernToDelete, setConcernToDelete] = useState<string | null>(null);

  const confirmDelete = (slug: string) => {
    setConcernToDelete(slug);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!concernToDelete) return;
    setIsDeleting(true);
    try {
      const res = await deleteConcernBySlugAdmin(concernToDelete);
      if (!res || res.success !== false) {
        toast.success("Concern deleted successfully");
        setDeleteModalOpen(false);
        setConcernToDelete(null);
        router.refresh();
      } else {
        toast.error(res.message || "Failed to delete concern.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting.");
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: ColumnDef<ConcernType>[] = [
    {
      header: "Concern",
      render: (concern) => (
        <div className="flex items-center gap-3">
          {concern.heroImage?.url ? (
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={concern.heroImage.url}
                alt={concern.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <Building className="w-5 h-5 text-gray-400" />
            </div>
          )}
          <div>
            <div className="font-medium text-white flex items-center gap-2">
              {concern.name}
            </div>
            <div className="text-xs text-gray-400 mt-1 line-clamp-1 max-w-[200px]">
              {concern.slug}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Description",
      render: (concern) => (
        <div className="text-sm text-gray-300 max-w-[300px] line-clamp-2">
          {concern.shortDescription}
        </div>
      ),
    },
    {
      header: "Projects",
      className: "text-center",
      render: (concern) => (
        <div className="text-sm font-bold text-gray-300">
          {concern.projects?.length || 0}
        </div>
      ),
    },
    {
      header: "Actions",
      className: "text-right space-x-2",
      render: (concern) => (
        <>
          <Link
            href={`/concern/${concern.slug}`}
            target="_blank"
            className="inline-flex p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
            title="View Public"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <Link
            href={`/admin/concerns/${concern.slug}/projects`}
            className="inline-flex p-1.5 text-gray-400 hover:text-amber-400 hover:bg-amber-400/10 rounded transition-colors"
            title="Manage Projects"
          >
            <Folder className="w-4 h-4" />
          </Link>
          <Link
            href={`/admin/concerns/edit/${concern.slug}`}
            className="inline-flex p-1.5 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => confirmDelete(concern.slug)}
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
    <>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Concerns Management
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Manage your corporate business concerns.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/concerns/create"
              className="glass-btn whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Create New Concern
            </Link>
          </div>
        </div>

        {/* Concerns List */}
        <AdminTable
          columns={columns}
          data={initialConcerns}
          isLoading={false}
          keyExtractor={(c) => c._id!}
          emptyMessage="No concerns found."
        />
      </div>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setConcernToDelete(null);
        }}
        onConfirm={handleDelete}
        title="Delete Concern"
        description="Are you sure you want to delete this concern? This action cannot be undone."
        isLoading={isDeleting}
      />
    </>
  );
}
