"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Gallery, getGalleriesByAdmin, deleteGalleryBySlugByAdmin } from "@/services/gallery.service";
import { DeleteModal } from "@/components/ui/DeleteModal";
import { Edit, Trash2, Plus, Search, Image as ImageIcon, Video as VideoIcon } from "lucide-react";
import toast from "react-hot-toast";

interface AdminGalleryListClientProps {}

export default function AdminGalleryListClient() {
  const router = useRouter();
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [galleryToDelete, setGalleryToDelete] = useState<string | null>(null);

  const fetchGalleries = async () => {
    setIsLoading(true);
    try {
      const res = await getGalleriesByAdmin({ page, search, limit: 10, _t: Date.now() });
      if (res.success) {
        setGalleries(res.data || []);
        setTotalPages(res.count || 1);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch galleries");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, [page, search]);

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
        fetchGalleries();
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
            setSearch(e.target.value);
            router.push(`/admin/gallery?search=${e.target.value}&page=1`);
          }}
        />
      </div>

      <div className="glass-panel overflow-x-auto rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-4 font-semibold text-gray-300">Media</th>
              <th className="p-4 font-semibold text-gray-300">Details</th>
              <th className="p-4 font-semibold text-gray-300">Status</th>
              <th className="p-4 font-semibold text-gray-300 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {galleries.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  No gallery items found.
                </td>
              </tr>
            ) : (
              galleries.map((gallery) => (
                <tr key={gallery._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 w-24">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center relative">
                      {gallery.type === "image" && gallery.cover?.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={gallery.cover.url} alt={gallery.title} className="w-full h-full object-cover" />
                      ) : gallery.type === "video" && gallery.thumbnail?.url ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={gallery.thumbnail.url} alt={gallery.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <VideoIcon className="text-white w-6 h-6" />
                          </div>
                        </>
                      ) : (
                        gallery.type === "video" ? <VideoIcon className="text-gray-500" /> : <ImageIcon className="text-gray-500" />
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-white">{gallery.title}</div>
                    <div className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                      <span className="uppercase text-[10px] tracking-wider px-2 py-0.5 rounded-full bg-white/10 font-medium">
                        {gallery.type}
                      </span>
                      <span className="truncate max-w-[150px]">{gallery.slug}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full w-fit ${
                          gallery.status === "active"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {gallery.status}
                      </span>
                      {gallery.featured && (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full w-fit bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/gallery/edit/${gallery.slug}`}
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => confirmDelete(gallery.slug)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 border rounded-md transition-colors ${
                page === i + 1
                 ? "bg-blue-600 text-white border-blue-600"
                  : "bg-[#120a1c] text-gray-400 border-white/10 hover:text-white hover:border-white/30"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
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
