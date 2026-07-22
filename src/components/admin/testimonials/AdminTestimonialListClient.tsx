"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  TestimonialType,
  getTestimonialsByAdmin,
  deleteTestimonialByIdAdmin,
} from "@/services/testimonial.service";
import { DeleteModal } from "@/components/ui/DeleteModal";
import { Edit, Trash2, Plus, Search, MessageSquare, Star } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { Pagination } from "@/components/ui/Pagination";
import { AdminTable, ColumnDef } from "@/components/ui/AdminTable";

export default function AdminTestimonialListClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [totalPages, setTotalPages] = useState(1);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(
    null,
  );

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const res = await getTestimonialsByAdmin(page, 10, search);
      if (res.success) {
        setTestimonials(res.data || []);
        setTotalPages(res.count || 1);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch testimonials");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [page, search]);

  const confirmDelete = (id: string) => {
    setTestimonialToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!testimonialToDelete) return;
    setIsDeleting(true);
    try {
      const res = await deleteTestimonialByIdAdmin(testimonialToDelete);
      if (!res || res.success !== false) {
        toast.success("Testimonial deleted successfully");
        setDeleteModalOpen(false);
        setTestimonialToDelete(null);
        fetchTestimonials();
      } else {
        toast.error(res.message || "Failed to delete testimonial.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting.");
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: ColumnDef<TestimonialType>[] = [
    {
      header: "Testimonial",
      render: (item) => (
        <div className="flex items-center gap-3">
          {item.image?.url ? (
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item.image.url}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-gray-400" />
            </div>
          )}
          <div>
            <div className="font-semibold text-white group-hover:text-[#CBA35E] transition-colors line-clamp-1">
              {item.name}
            </div>
            <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">
              {item.designation} {item.company ? `- ${item.company}` : ""}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Rating",
      render: (item) => (
        <div className="flex items-center gap-1 text-yellow-500">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm text-gray-300 ml-1">{item.rating}/5</span>
        </div>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
            item.status === "active"
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}
        >
          {item.status === "active" ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-right space-x-2",
      render: (item) => (
        <>
          <Link
            href={`/admin/testimonials/edit/${item._id}`}
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
            Testimonials
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage client reviews and testimonials.
          </p>
        </div>
        <Link
          href="/admin/testimonials/create"
          className="glass-btn flex items-center gap-2 px-6 py-2"
        >
          <Plus className="w-4 h-4" />
          <span className="font-semibold">Add New Testimonial</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="glass-panel p-4 flex gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search testimonials..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={testimonials}
        isLoading={isLoading}
        keyExtractor={(item) => item._id || Math.random().toString()}
        emptyMessage="No testimonials found. Create one to get started!"
      />

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setTestimonialToDelete(null);
        }}
        onConfirm={handleDelete}
        title="Delete Testimonial"
        description="Are you sure you want to delete this testimonial? This action cannot be undone."
        isLoading={isDeleting}
      />
    </div>
  );
}
