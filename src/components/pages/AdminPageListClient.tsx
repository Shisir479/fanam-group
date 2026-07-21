"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Page, getPagesByAdmin, deletePageBySlugByAdmin } from "@/services/page.service";
import { DeleteModal } from "@/components/ui/DeleteModal";
import { Edit, Trash2, Plus, Search, FileText, Eye } from "lucide-react";
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

export default function AdminPagesListClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [totalPages, setTotalPages] = useState(1);
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<string | null>(null);

  const fetchPages = async () => {
    setIsLoading(true);
    try {
      const res = await getPagesByAdmin({ page, search, status, limit: 10, _t: Date.now() });
      if (res.success) {
        setPages(res.data || []);
        setTotalPages(res.count || 1);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch pages");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, [page, search, status]);

  const confirmDelete = (slug: string) => {
    setPageToDelete(slug);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!pageToDelete) return;
    setIsDeleting(true);
    try {
      const res = await deletePageBySlugByAdmin(pageToDelete);
      if (!res || res.success !== false) {
        toast.success("Page deleted successfully");
        setDeleteModalOpen(false);
        setPageToDelete(null);
        fetchPages();
      } else {
        toast.error(res.message || "Failed to delete page.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting.");
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: ColumnDef<Page>[] = [
    {
      header: "Page",
      render: (pageObj) => (
        <div className="flex items-center gap-3">
          {pageObj.cover?.url ? (
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={pageObj.cover.url}
                alt={pageObj.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-gray-400" />
            </div>
          )}
          <div>
            <div className="font-medium text-white flex items-center gap-2">
              {pageObj.name}
            </div>
            <div className="text-xs text-gray-400 mt-1 line-clamp-1 max-w-[200px]">
              {pageObj.slug}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Link Path",
      render: (pageObj) => (
        <div className="flex items-center gap-1.5 text-sm text-gray-300">
          <span className="line-clamp-1">{pageObj.link}</span>
        </div>
      ),
    },
    {
      header: "Status",
      className: "text-center",
      render: (pageObj) => (
        <div className="flex flex-col gap-1 items-center justify-center">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium w-fit ${
              pageObj.status === "active"
                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                : "bg-red-500/10 text-red-400 border border-red-500/20"
            }`}
          >
            {pageObj.status === "active" ? "Active" : "Inactive"}
          </span>
        </div>
      ),
    },
    {
      header: "Actions",
      className: "text-right space-x-2",
      render: (pageObj) => (
        <>
          <Link
            href={pageObj.link}
            target="_blank"
            className="inline-flex p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
            title="View Public"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <Link
            href={`/admin/content/pages/edit/${pageObj.slug}`}
            className="inline-flex p-1.5 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => confirmDelete(pageObj.slug)}
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
            <h2 className="text-2xl font-bold text-white">Page Pages</h2>
            <p className="text-sm text-gray-400 mt-1">
              Manage dynamic pages like Privacy Policy and Terms & Conditions.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/content/pages/create"
              className="glass-btn whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Create New Page
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-panel p-4 flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search pages..."
              className="w-full px-10 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
                router.push(`/admin/content/pages?search=${e.target.value}&status=${status}&page=1`);
              }}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <Select
            value={status || "all"}
            onValueChange={(value) => {
              const val = value || "";
              const newValue = val === "all" ? "" : val;
              setStatus(newValue);
              setPage(1);
              router.push(`/admin/content/pages?search=${search}&status=${newValue}&page=1`);
            }}
          >
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* List */}
        <AdminTable
          columns={columns}
          data={pages}
          isLoading={isLoading}
          keyExtractor={(p) => p._id!}
          emptyMessage="No pages found."
        />
        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => {
            setPage(newPage);
            router.push(`/admin/content/pages?search=${search}&status=${status}&page=${newPage}`);
          }}
          theme="dark"
        />
      </div>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setPageToDelete(null);
        }}
        onConfirm={handleDelete}
        title="Delete Page"
        description="Are you sure you want to delete this page? This action cannot be undone."
        isLoading={isDeleting}
      />
    </>
  );
}
