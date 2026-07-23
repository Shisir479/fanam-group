"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ServiceType,
  deleteServiceBySlugAdmin,
} from "@/services/service.service";
import { DeleteModal } from "@/components/ui/DeleteModal";
import { Edit, Trash2, Plus, Search, Briefcase, Eye } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { Pagination } from "@/components/ui/Pagination";
import { AdminTable, ColumnDef } from "@/components/ui/AdminTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdminServiceListClientProps {
  initialServices: ServiceType[];
  totalPages: number;
  currentPage: number;
  currentSearch: string;
  currentStatus: string;
}

export default function AdminServiceListClient({
  initialServices,
  totalPages,
  currentPage,
  currentSearch,
  currentStatus,
}: AdminServiceListClientProps) {
  const router = useRouter();
  const [search, setSearch] = useState(currentSearch);
  const [status, setStatus] = useState(currentStatus);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);

  const confirmDelete = (slug: string) => {
    setServiceToDelete(slug);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!serviceToDelete) return;
    setIsDeleting(true);
    try {
      const res = await deleteServiceBySlugAdmin(serviceToDelete);
      if (!res || res.success !== false) {
        toast.success("Service deleted successfully");
        setDeleteModalOpen(false);
        setServiceToDelete(null);
        router.refresh();
      } else {
        toast.error(res.message || "Failed to delete service.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting.");
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: ColumnDef<ServiceType>[] = [
    {
      header: "Service",
      render: (service) => (
        <div className="flex items-center gap-3">
          {service.image?.url ? (
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={service.image.url}
                alt={service.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-5 h-5 text-gray-400" />
            </div>
          )}
          <div>
            <div className="font-semibold text-white group-hover:text-[#CBA35E] transition-colors line-clamp-1">
              {service.name}
            </div>
            <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">
              /{service.slug}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      render: (service) => (
        <span className="text-sm text-gray-300">{service.category}</span>
      ),
    },
    {
      header: "Status",
      render: (service) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold w-fit bg-[#f7f8fa] border border-transparent shadow-[2px_2px_5px_rgba(180,185,195,0.4),-2px_-2px_5px_rgba(255,255,255,0.9)] ${
            service.status === "active" ? "text-green-600" : "text-red-500"
          }`}
        >
          {service.status === "active" ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-right space-x-2",
      render: (service) => (
        <>
          <Link
            href={`/services/${service.slug}`}
            target="_blank"
            className="inline-flex p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
            title="View Public"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <Link
            href={`/admin/services/edit/${service.slug}`}
            className="inline-flex p-1.5 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => confirmDelete(service.slug)}
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
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Services Management</h2>
          <p className="text-sm text-gray-400 mt-1">
            Create, edit, and manage services offered.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/services/create"
            className="glass-btn whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Service
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-panel p-4 flex gap-4">
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => {
            const val = e.target.value;
            setSearch(val);
            const params = new URLSearchParams();
            if (val) params.set("search", val);
            if (status) params.set("status", status);
            params.set("page", "1");
            router.push(`?${params.toString()}`);
          }}
          className="w-full md:w-1/3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
        />

        <div className="w-full md:w-48">
          <Select
            value={status}
            onValueChange={(val) => {
              const newStatus = val === "all" || val === null ? "" : val;
              setStatus(newStatus);
              const params = new URLSearchParams();
              if (search) params.set("search", search);
              if (newStatus) params.set("status", newStatus);
              params.set("page", "1");
              router.push(`?${params.toString()}`);
            }}
          >
            <SelectTrigger className="w-full bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={initialServices}
        isLoading={false}
        keyExtractor={(row) => row.slug}
        emptyMessage="No services found. Add your first service to get started."
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const params = new URLSearchParams();
                if (search) params.set("search", search);
                if (status) params.set("status", status);
                params.set("page", (idx + 1).toString());
                router.push(`?${params.toString()}`);
              }}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                currentPage === idx + 1
                  ? "bg-purple-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Service"
        description="Are you sure you want to delete this service? This action cannot be undone."
        isLoading={isDeleting}
      />
    </div>
  );
}
