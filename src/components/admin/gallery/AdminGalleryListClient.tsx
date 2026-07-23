"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Gallery,
  deleteGalleryBySlugByAdmin,
} from "@/services/gallery.service";
import { DeleteModal } from "@/components/ui/DeleteModal";
import { Pagination } from "@/components/ui/Pagination";
import {
  Edit,
  Trash2,
  Plus,
  Image as ImageIcon,
  Video as VideoIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import { AdminTable, ColumnDef } from "@/components/ui/AdminTable";

interface AdminGalleryListClientProps {
  initialGalleries: Gallery[];
  totalPages: number;
  currentPage: number;
  currentSearch: string;
}

export default function AdminGalleryListClient({
  initialGalleries,
  totalPages,
  currentPage,
  currentSearch,
}: AdminGalleryListClientProps) {
  const router = useRouter();
  const [search, setSearch] = useState(currentSearch);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [galleryToDelete, setGalleryToDelete] = useState<string | null>(null);

  const confirmDelete = (slug: string) => {
    setGalleryToDelete(slug);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!galleryToDelete) return;
    setIsDeleting(true);
    try {
      const res = await deleteGalleryBySlugByAdmin(galleryToDelete);
      if (!res || res.success !== false) {
        toast.success("Gallery item deleted successfully");
        setDeleteModalOpen(false);
        setGalleryToDelete(null);
        router.refresh();
      } else {
        toast.error(res.message || "Failed to delete gallery item.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting.");
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: ColumnDef<Gallery>[] = [
    {
      header: "Media",
      className: "w-24",
      render: (gallery) => (
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center relative">
          {gallery.type === "image" && gallery.cover?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={gallery.cover.url}
              alt={gallery.title}
              className="w-full h-full object-cover"
            />
          ) : gallery.type === "video" && gallery.thumbnail?.url ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={gallery.thumbnail.url}
                alt={gallery.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <VideoIcon className="text-white w-6 h-6" />
              </div>
            </>
          ) : gallery.type === "video" ? (
            <VideoIcon className="text-gray-500" />
          ) : (
            <ImageIcon className="text-gray-500" />
          )}
        </div>
      ),
    },
    {
      header: "Details",
      render: (gallery) => (
        <div>
          <div className="font-medium text-white">{gallery.title}</div>
          <div className="text-sm text-gray-400 mt-1 flex items-center gap-2">
            <span className="uppercase text-[10px] tracking-wider px-2 py-0.5 rounded-full bg-white/10 font-medium">
              {gallery.type}
            </span>
            <span className="truncate max-w-[150px]">{gallery.slug}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      render: (gallery) => (
        <div className="flex flex-col gap-2 items-start">
          <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${
              gallery.status === "active"
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {gallery.status}
          </span>
          {gallery.featured && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-purple-500/20 text-purple-400">
              Featured
            </span>
          )}
        </div>
      ),
    },
    {
      header: "Actions",
      className: "text-right space-x-2",
      render: (gallery) => (
        <>
          <Link
            href={`/admin/gallery/edit/${gallery.slug}`}
            className="inline-flex p-1.5 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => confirmDelete(gallery.slug)}
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Gallery Management</h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage your gallery items and media.
          </p>
        </div>
        <div className="">
          <Link
            href="/admin/gallery/create"
            className="glass-btn whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Create New
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-panel p-4 flex gap-4">
        <input
          type="text"
          placeholder="Search galleries..."
          className="w-full md:w-1/3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
          value={search}
          onChange={(e) => {
            const val = e.target.value;
            setSearch(val);
            const params = new URLSearchParams();
            if (val) params.set("search", val);
            params.set("page", "1");
            router.push(`?${params.toString()}`);
          }}
        />
      </div>

      <AdminTable
        columns={columns}
        data={initialGalleries}
        isLoading={false}
        keyExtractor={(gallery) => gallery._id!}
        emptyMessage="No gallery items found."
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(newPage) => {
            const params = new URLSearchParams();
            if (search) params.set("search", search);
            params.set("page", newPage.toString());
            router.push(`?${params.toString()}`);
          }}
          theme="dark"
        />
      )}

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Gallery Item"
        description="Are you sure you want to delete this gallery item? This action cannot be undone."
      />
    </div>
  );
}
