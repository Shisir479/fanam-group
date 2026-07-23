"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Project, deleteProjectBySlugAdmin } from "@/services/project.service";
import { DeleteModal } from "@/components/ui/DeleteModal";
import {
  Edit,
  Trash2,
  Plus,
  Search,
  Building,
  MapPin,
  Eye,
} from "lucide-react";
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

interface AdminProjectListClientProps {
  initialProjects: Project[];
  totalPages: number;
  currentPage: number;
  currentSearch: string;
  currentStatus: string;
}

export default function AdminProjectListClient({
  initialProjects,
  totalPages,
  currentPage,
  currentSearch,
  currentStatus,
}: AdminProjectListClientProps) {
  const router = useRouter();
  const [search, setSearch] = useState(currentSearch);
  const [status, setStatus] = useState(currentStatus);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const confirmDelete = (slug: string) => {
    setProjectToDelete(slug);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;
    setIsDeleting(true);
    try {
      const res = await deleteProjectBySlugAdmin(projectToDelete);
      if (!res || res.success !== false) {
        toast.success("Project deleted successfully");
        setDeleteModalOpen(false);
        setProjectToDelete(null);
        router.refresh();
      } else {
        toast.error(res.message || "Failed to delete project.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting.");
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: ColumnDef<Project>[] = [
    {
      header: "Project",
      render: (project) => (
        <div className="flex items-center gap-3">
          {project.cover?.url ? (
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={project.cover.url}
                alt={project.name}
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
              {project.name}
              {project.featured && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-500/20 text-amber-300 border border-amber-500/20">
                  Featured
                </span>
              )}
            </div>
            <div className="text-xs text-gray-400 mt-1 line-clamp-1 max-w-[200px]">
              {project.slug}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Location",
      render: (project) => (
        <div className="flex items-center gap-1.5 text-sm text-gray-300">
          <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span className="line-clamp-1">
            {project.location?.area || project.location?.city || "N/A"}
          </span>
        </div>
      ),
    },
    {
      header: "Status",
      className: "text-center",
      render: (project) => (
        <div className="flex flex-col gap-1 items-center justify-center">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium w-fit ${
              project.publishStatus === "active"
                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                : "bg-red-500/10 text-red-400 border border-red-500/20"
            }`}
          >
            {project.publishStatus === "active" ? "Published" : "Draft"}
          </span>
          <span className="text-[11px] text-gray-400 uppercase tracking-wider font-medium text-center">
            {project.status}
          </span>
        </div>
      ),
    },
    {
      header: "Actions",
      className: "text-right space-x-2",
      render: (project) => (
        <>
          <Link
            href={`/projects/${project.slug}`}
            target="_blank"
            className="inline-flex p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
            title="View Public"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <Link
            href={`/admin/project/edit/${project.slug}`}
            className="inline-flex p-1.5 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => confirmDelete(project.slug)}
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
              Project Management
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Manage your real estate projects.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/project/create"
              className="glass-btn whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Create New Project
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-panel p-4 flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full px-10 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
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
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <Select
            value={status || "all"}
            onValueChange={(value) => {
              const val = value || "";
              const newValue = val === "all" ? "" : val;
              setStatus(newValue);
              const params = new URLSearchParams();
              if (search) params.set("search", search);
              if (newValue) params.set("status", newValue);
              params.set("page", "1");
              router.push(`?${params.toString()}`);
            }}
          >
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Projects List */}
        <AdminTable
          columns={columns}
          data={initialProjects}
          isLoading={false}
          keyExtractor={(project) => project._id!}
          emptyMessage="No projects found."
        />
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(newPage) => {
            const params = new URLSearchParams();
            if (search) params.set("search", search);
            if (status) params.set("status", status);
            params.set("page", newPage.toString());
            router.push(`?${params.toString()}`);
          }}
          theme="dark"
        />
      </div>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setProjectToDelete(null);
        }}
        onConfirm={handleDelete}
        title="Delete Project"
        description="Are you sure you want to delete this project? This action cannot be undone."
        isLoading={isDeleting}
      />
    </>
  );
}
