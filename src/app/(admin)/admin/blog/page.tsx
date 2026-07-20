"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getBlogsByAdmin,
  deleteBlogBySlugByAdmin,
  Blog,
} from "@/services/blog.service";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Loader2,
  Calendar,
  Database,
} from "lucide-react";
import toast from "react-hot-toast";
import { DeleteModal } from "@/components/ui/DeleteModal";
import { AdminTable, ColumnDef } from "@/components/ui/AdminTable";

export default function AdminBlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  // Delete Modal State
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await getBlogsByAdmin({ page, search, limit: 10 });
      if (res.success) {
        setBlogs(res.data);
        setTotalPages(res.count);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch blogs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, search]);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await deleteBlogBySlugByAdmin(deleteTarget);
      if (!res || res.success !== false) {
        toast.success("Blog deleted successfully");
        setDeleteTarget(null);
        fetchBlogs();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete blog");
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: ColumnDef<Blog>[] = [
    {
      header: "Post Details",
      render: (blog) => (
        <div>
          <p className="font-medium text-white line-clamp-1">{blog.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">/{blog.slug}</p>
        </div>
      ),
    },
    {
      header: "Status",
      render: (blog) => (
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${
            blog.status === "active"
              ? "bg-green-500/20 text-green-400"
              : blog.status === "inactive"
              ? "bg-red-500/20 text-red-400"
              : "bg-gray-500/20 text-gray-400"
          }`}
        >
          {blog.status}
        </span>
      ),
    },
    {
      header: "Author",
      render: (blog) => (
        <span className="text-gray-300 capitalize">
          {blog.author?.firstName
            ? `${blog.author.firstName} ${blog.author.lastName || ""}`
            : "Unknown"}
        </span>
      ),
    },
    {
      header: "Date",
      render: (blog) => (
        <span className="flex items-center gap-1.5 text-gray-400 text-xs">
          <Calendar className="w-3.5 h-3.5" />
          {new Date(blog.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-right space-x-2",
      render: (blog) => (
        <>
          <Link
            href={`/blog/${blog.slug}`}
            target="_blank"
            className="inline-flex p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
            title="View Public"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <Link
            href={`/admin/blog/edit/${blog.slug}`}
            className="inline-flex p-1.5 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setDeleteTarget(blog.slug)}
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
          <h2 className="text-2xl font-bold text-white">Blog & News</h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage your blog posts, news, and articles.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog/create"
            className="glass-btn whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Create New Post
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-panel p-4 flex gap-4">
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-1/3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
        />
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={blogs}
        isLoading={isLoading}
        keyExtractor={(blog) => blog._id}
        emptyMessage="No blogs found. Create one to get started."
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPage(idx + 1)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${page === idx + 1
                ? "bg-purple-600 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* Reusable Delete Modal */}
      <DeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Delete Blog Post"
        description="Are you sure you want to delete this blog post? It will be permanently removed from the database."
      />
    </div>
  );
}
