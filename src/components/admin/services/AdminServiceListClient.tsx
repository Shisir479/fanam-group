"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ServiceType, getServicesByAdmin, deleteServiceBySlugAdmin } from "@/services/service.service";
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

export default function AdminServiceListClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [services, setServices] = useState<ServiceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [totalPages, setTotalPages] = useState(1);
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const res = await getServicesByAdmin({ page, search, status, limit: 10, _t: Date.now() });
      if (res.success) {
        setServices(res.data || []);
        setTotalPages(res.count || 1);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch services");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [page, search, status]);

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
        fetchServices();
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
        <span className="text-sm text-gray-300">
          {service.category}
        </span>
      ),
    },
    {
      header: "Status",
      render: (service) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
            service.status === "active"
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}
        >
          {service.status === "active" ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Actions",
      render: (service) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/services/${service.slug}`}
            target="_blank"
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
            title="View public page"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <Link
            href={`/admin/services/edit/${service.slug}`}
            className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded transition-colors"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => confirmDelete(service.slug)}
            className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Services Management
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Create, edit, and manage services offered.
          </p>
        </div>
        <Link
          href="/admin/services/create"
          className="flex items-center gap-2 px-6 py-2.5 bg-[#CBA35E] hover:bg-[#b58e4e] text-black rounded-lg font-bold transition-all shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </Link>
      </div>

      {/* Filters */}
      <div className="glass-panel p-4 mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-black/20 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#CBA35E] transition-colors"
          />
        </div>
        
        <div className="w-full md:w-48">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full bg-black/20 border-white/10 text-white">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="bg-[#120a1c] border-white/10">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Data Table */}
      <div className="glass-panel overflow-hidden">
        <AdminTable
          columns={columns}
          data={services}
          isLoading={isLoading}
          keyExtractor={(row) => row.slug}
          emptyMessage="No services found. Add your first service to get started."
        />
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-white/10 flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Service"
        description="Are you sure you want to delete this service? This action cannot be undone."
        isDeleting={isDeleting}
      />
    </div>
  );
}
